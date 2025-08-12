import { getSupabaseServerClient } from "../../../lib/create-supabase-client";
import decodeJWT from "../../../lib/decode-jwt";

export async function POST(context) {
  const access_token = context.cookies.get("sb-access-token")?.value;
  const user = decodeJWT(access_token);
  const request = await context.request.json();
  const localLikesContainer = request.localLikes || {};

  // not authenticated user flow
  if (!access_token || !user) {
    return new Response(
      JSON.stringify({
        message: "'Me Gusta' locales",
        data: localLikesContainer,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  let supabase;
  try {
    supabase = getSupabaseServerClient(context);
  } catch (err) {
    return new Response(
      JSON.stringify({ message: "Error al conectar con la base de datos" }),
      {
        status: 500,
      }
    );
  }

  // Fetch current likes from the database
  const { data: product_likes, error } = await supabase
    .from("product_likes")
    .select(
      `
        id,
        product_id,
        products (
          *
        )
      `
    )
    .eq("user_id", user.sub);

  if (error) {
    return new Response(
      JSON.stringify({ message: "Error al consultar tus 'Me Gusta'" }),
      {
        status: 500,
      }
    );
  }

  const dbProductIds = new Set(product_likes.map((like) => like.product_id.toString()));
  const localProductIds = new Set(Object.keys(localLikesContainer));

  const toInsert = [...localProductIds].filter((id) => !dbProductIds.has(id));

  // Insert new likes from local storage into the database
  if (toInsert.length > 0) {
    const insertPayload = toInsert.map((product_id) => ({
      user_id: user.sub,
      product_id: parseInt(product_id),
    }));

    const { error: insertError } = await supabase.from("product_likes").insert(insertPayload);
    if (insertError) {
      return new Response(
        JSON.stringify({ message: "Error al sincronizar nuevos 'Me Gusta'" }),
        {
          status: 500,
        }
      );
    }
  }

  return new Response(
    JSON.stringify({
      message: "'Me Gusta' sincronizados",
      data: localLikesContainer,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

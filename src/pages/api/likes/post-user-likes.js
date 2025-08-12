import { getSupabaseServerClient } from "../../../lib/create-supabase-client";
import decodeJWT from "../../../lib/decode-jwt";

export async function POST(context) {
  const access_token = context.cookies.get("sb-access-token")?.value;
  const user = decodeJWT(access_token);
  const request = await context.request.json();
  const productId = request.product.id;
  const localLikesContainer = request.localLikes;

  if (!productId) {
    return new Response(
      JSON.stringify({ response: "No se pudo encontrar el id del producto" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  //not authenticated user flow
  if (!access_token || !user) {
    if (localLikesContainer && localLikesContainer[productId]) {
      return new Response(
        JSON.stringify({ message: "Ya se encuentra en tus 'Me Gusta'" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    localLikesContainer[productId] = { ...request.product };
    return new Response(
      JSON.stringify({
        message: "Agregado a tus 'Me Gusta'",
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
    return new Response(JSON.stringify({ message: "Error al conectar con la base de datos" }), {
      status: 500,
    });
  }

  const { data, error } = await supabase
    .from("product_likes")
    .insert([{ user_id: user.sub, product_id: productId }])
    .select();

  if (error) {
    if(error.code === '23505'){
      return new Response(
        JSON.stringify({ message: "Ya se encuentra en tus 'Me Gusta'" }),
        {
          status: 200,
        }
      );
    }
    return new Response(
      JSON.stringify({ message: "Error al crear tu 'Me Gusta'" }),
      {
        status: 500,
      }
    );
  }

  localLikesContainer[productId] = { ...request.product };

  return new Response(
    JSON.stringify({ message: "Agregado a tus 'Me Gusta'", data: localLikesContainer }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

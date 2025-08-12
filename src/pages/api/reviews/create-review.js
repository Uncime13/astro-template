import { getSupabaseServerClient } from "../../../lib/create-supabase-client";
import decodeJWT from "../../../lib/decode-jwt";

export async function POST(context) {
  const access_token = context.cookies.get("sb-access-token")?.value;
  const refresh_token = context.cookies.get("sb-refresh-token")?.value;
  const user = decodeJWT(access_token);
  if (!access_token || !user || !refresh_token) {
    return new Response(
      JSON.stringify({ response: "Necesitas Iniciar Sesión" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  let supabase;
  try {
    supabase = getSupabaseServerClient(context);
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
  const { review, productId } = await context.request.json();

  if (!review || !productId) {
    return new Response(
      JSON.stringify({ response: "Hubo un error al obtener los datos" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  let session;
  try {
    session = await supabase.auth.setSession({
      refresh_token: refresh_token,
      access_token: access_token,
    });
    if (session.error) {
      context.cookies.delete("sb-access-token", {
        path: "/",
      });
      context.cookies.delete("sb-refresh-token", {
        path: "/",
      });
      return new Response(
        JSON.stringify({
          response: "Tu sesión expiro, por favor vuelve a iniciar sesión",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    context.cookies.delete("sb-access-token", {
      path: "/",
    });
    context.cookies.delete("sb-refresh-token", {
      path: "/",
    });
    return new Response(
      JSON.stringify({
        response: "Tu sesión expiro, por favor vuelve a iniciar sesión",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const { data, error } = await supabase
    .from('reviews')
    .insert([
      { user_id: user.sub, product_id: productId, comment: review },
    ])
    .select()

    if (error) {
      console.log(error);
      return new Response(
        JSON.stringify({ response: "Hubo un problema al enviar los datos" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

  return new Response(JSON.stringify({ response: "Reseña Creada" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

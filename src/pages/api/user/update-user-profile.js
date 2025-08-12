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
    return new Response(JSON.stringify({ response: err.message }), {
      status: 500,
    });
  }

  const formData = await context.request.formData();
  const username = formData.get("username");
  const full_name = formData.get("full_name");
  const avatar = formData.get("avatar") || user.url;

  if (!username || !full_name) {
    return new Response(
      JSON.stringify({ response: "Hay un error con los nuevos datos" }),
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

  const { data: updateUserData, error: updateUserError } =
    await supabase.auth.updateUser({
      data: {
        username: username,
        full_name: full_name,
      },
    });

  if (updateUserError) {
    console.log(updateUserError);
    return new Response(
      JSON.stringify({ response: "Hubo un problema al actualizar tus datos" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // TODO: Upload avatar file to Supabase Storage, if provided
  // TODO: Update user record in Supabase DB

  return new Response(JSON.stringify({ response: "Perfil actualizado" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

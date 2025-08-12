import { getSupabaseServerClient } from "../../../lib/create-supabase-client";

export async function POST(context) {
  const { email, password} = await context.request.json();
  let supabase;
  try {
    supabase = getSupabaseServerClient(context);
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }

  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if(error.code === 'invalid_credentials') {
      return new Response(JSON.stringify({ error: "Hay un error con tus credenciales para iniciar sesión, por favor verificalas" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    console.log(error.code);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { access_token, refresh_token } = data.session;
  context.cookies.set("sb-access-token", access_token, {
    path: "/",
    maxAge: 604800,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  context.cookies.set("sb-refresh-token", refresh_token, {
    path: "/",
    maxAge: 604800,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  return new Response(JSON.stringify({ message: "Signed up successfully" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
import { getSupabaseServerClient } from "../../../lib/create-supabase-client";

export async function POST(context) {
  const { email, password, username } = await context.request.json();
  let supabase;
  try {
    supabase = getSupabaseServerClient(context);
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
  const { data, error } = await supabase.from('users').select("email").eq('email', email);
  if (data.length > 0) {
    return new Response(JSON.stringify({ error: "Ya existe una cuenta con este correo" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { data:signUpData, error:signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  })

  if (signUpError) {
    console.log(signUpError)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify({ message: "Signed up successfully" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

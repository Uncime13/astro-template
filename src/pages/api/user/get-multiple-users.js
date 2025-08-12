import { getSupabaseServerClient } from "../../../lib/create-supabase-client";

export async function POST(context) {
  const { users} = await context.request.json();
  let supabase;
  try {
    supabase = getSupabaseServerClient(context);
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }


  const { data, error } = await supabase.from("users").select("*").in('id', users);
  if (error) {
    return new Response(JSON.stringify({ response: "Usuario no encontrado" }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ response: data }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

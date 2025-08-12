import { getSupabaseServerClient } from "../../../lib/create-supabase-client";

export async function POST(context) {
  let supabase;
  try {
    supabase = getSupabaseServerClient(context);
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }

  let { error } = await supabase.auth.signOut();

  if (error) {
    return new Response(JSON.stringify({ error: "Hubo un problema al cerrar sesión" }), {
      status: 500,
    });
  }
  
  context.cookies.delete("sb-access-token", { path: "/" });
  context.cookies.delete("sb-refresh-token", { path: "/" });
  return new Response(
    JSON.stringify({ message: "Sesión terminada con éxito!" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

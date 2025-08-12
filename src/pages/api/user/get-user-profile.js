import { getSupabaseServerClient } from "../../../lib/create-supabase-client";
import decodeJWT from "../../../lib/decode-jwt";

export async function GET(context) {
  const access_token = context.cookies.get("sb-access-token")?.value;
  const user = decodeJWT(access_token)

  if(!access_token || !user){
    return new Response(JSON.stringify({ response: "Necesitas Iniciar Sesión" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
  }
  
  let supabase;
  try {
    supabase = getSupabaseServerClient(context);
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }


  const { data, error } = await supabase.from("users").select("*").eq('id', user.sub);
  if (error) {
    return new Response(JSON.stringify({ error: "Usuario no encontrado" }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ response: data }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

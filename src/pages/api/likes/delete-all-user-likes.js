import { getSupabaseServerClient } from "../../../lib/create-supabase-client";
import decodeJWT from "../../../lib/decode-jwt";

export async function POST(context) {
  const access_token = context.cookies.get("sb-access-token")?.value;
  const user = decodeJWT(access_token);
  //not authenticated user flow
  if (!access_token || !user) {
    return new Response(
      JSON.stringify({
        message: "'Me Gusta' locales",
        data: {},
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


  const { error } = await supabase
  .from('product_likes')
  .delete()
  .eq('user_id', user.sub)

  if (error) {
    return new Response(
      JSON.stringify({ message: "Error al borrar tus 'Me Gusta'" }),
      {
        status: 500,
      }
    );
  }

  return new Response(
    JSON.stringify({
      message: "'Me Gusta' desde DB",
      data: {},
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

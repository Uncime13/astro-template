import { getSupabaseServerClient } from "../../../lib/create-supabase-client";
import decodeJWT from "../../../lib/decode-jwt";

export async function POST(context) {
  const access_token = context.cookies.get("sb-access-token")?.value;
  const user = decodeJWT(access_token);
  const request = await context.request.json();
  const localLikesContainer = request.localLikes;
  const productId = request.productId
  //not authenticated user flow

  if (!localLikesContainer || !productId) {
    return new Response(
      JSON.stringify({
        message: "No existe el id del producto",
        data: localLikesContainer,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  if (!access_token || !user) {
    delete localLikesContainer[productId]
    return new Response(
      JSON.stringify({
        message: "'Me Gusta' eliminado",
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

  const { error } = await supabase
  .from('product_likes')
  .delete()
  .eq('user_id', user.sub)
  .eq('product_id', productId);


  if (error) {
    return new Response(
      JSON.stringify({ message: "Error al borrar tu 'Me Gusta'" }),
      {
        status: 500,
      }
    );
  }

  delete localLikesContainer[productId]

  return new Response(
    JSON.stringify({
      message: "Eliminado de tus 'Me Gusta'",
      data: localLikesContainer,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

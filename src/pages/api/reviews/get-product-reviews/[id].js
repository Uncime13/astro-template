import { getSupabaseServerClient } from "../../../../lib/create-supabase-client";

export async function GET(context) {
  const productId = context.params.id;
  let supabase;
  try {
    supabase = getSupabaseServerClient(context);
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }

  if (!productId) {
    return new Response(
      JSON.stringify({ response: "Hubo un error al obtener las reseñas" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }


let { data: reviews, error } = await supabase
  .from('reviews')
  .select('*')
  .eq('product_id', productId) 

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

  return new Response(JSON.stringify({ response: reviews }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

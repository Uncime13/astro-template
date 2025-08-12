import { getSupabaseServerClient } from "../../../../lib/create-supabase-client";

export async function DELETE(context) {
  const reviewId = context.params.id;
  let supabase;
  try {
    supabase = getSupabaseServerClient(context);
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }

  if (!reviewId) {
    return new Response(
      JSON.stringify({ response: "Hubo un error al obtener el id la reseña" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }


let { error } = await supabase
  .from('reviews')
  .delete()
  .eq('id', reviewId) 

    if (error) {
      console.log(error);
      return new Response(
        JSON.stringify({ response: "Hubo un problema con la petición" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

  return new Response(JSON.stringify({ response: "Reseña Eliminada" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

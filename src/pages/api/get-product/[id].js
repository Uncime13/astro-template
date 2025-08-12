import { getSupabaseServerClient } from "../../../lib/create-supabase-client";

export async function GET(context) {
  const productId = context.params.id;
  if (!productId) {
    return new Response(
      JSON.stringify({ response: "No se pudo obtener el id del producto" }),
      { status: 400 }
    );
  }

  let supabase;
  try {
    supabase = getSupabaseServerClient(context);
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }

  // Fetch the main product
  const { data: product, error: productError } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();

  if (productError) {
    return new Response(JSON.stringify({ error: productError.message }), {
      status: 500,
    });
  }

  // Fetch 4 random products excluding the current one
  const { data: relatedProducts, error: relatedError } = await supabase
    .from("products")
    .select("*")
    .neq("id", productId)
    .limit(4);

  if (relatedError) {
    return new Response(JSON.stringify({ error: relatedError.message }), {
      status: 500,
    });
  }

  return new Response(
    JSON.stringify({
      product,
      relatedProducts,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

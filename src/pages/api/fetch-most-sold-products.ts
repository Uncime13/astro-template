import { getSupabaseServerClient } from "../../lib/create-supabase-client";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  let supabase;
  try {
    supabase = getSupabaseServerClient(context);
  } catch (err) {
    return new Response(JSON.stringify({ response: err.message }), {
      status: 500,
    });
  }

  const { data, error } = await supabase
    .from("products")
    .select("id, name, price, image, brand, category_id, stock_quantity, attributes")
    .neq("stock_quantity", 0);
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ response: data }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

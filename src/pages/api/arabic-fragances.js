import { getSupabaseServerClient } from "../../lib/create-supabase-client";

export async function GET(context) {
  let supabase;
  try {
    supabase = getSupabaseServerClient(context);
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }

  const { data, error } = await supabase.from("products").select("*").eq('attributes->>nationality', 'arabic');;
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

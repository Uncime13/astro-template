export async function POST(context) {
  const runtimeEnv = context.locals.runtime.env;
  const { name, email, message } = await context.request.json();

  const apiKey = runtimeEnv.MAILGUN_API_KEY;
  const domain = runtimeEnv.MAILGUN_DOMAIN;

  if (!apiKey || !domain) {
    return new Response(
      JSON.stringify({ error: "API key or domain is missing." }),
      {
        status: 500,
      }
    );
  }

  const body = new URLSearchParams({
    from: `Ecommerce Demo <soporte@${domain}>`,
    to: `rfigueroa.fullstackdev@gmail.com, ${email}`,
    subject: `Seguimiento de contacto para ${name} por parte de Ecommerce Demo`,
    template: "contacto pidiendo informacion",
    "h:X-Mailgun-Variables": JSON.stringify({
      name: name,
      message: message
    }),
  });

  try {
    const response = await fetch(
      `https://api.mailgun.net/v3/${domain}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: "Basic " + btoa(`api:${apiKey}`),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Mailgun error:", errorText);
      throw new Error("Mailgun error");
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "No se pudo enviar el mensaje." }),
      {
        status: 500,
      }
    );
  }
}

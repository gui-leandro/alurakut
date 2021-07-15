import { SiteClient } from "datocms-client";

export default async function recebedorDeRequests(request, response) {
  if (request.method === "POST") {
    const TOKEN = "f49adc5c8dfd730774f24c64856c72";

    const client = new SiteClient(TOKEN);

    const registroCriado = await client.items.create({
      itemType: "971979",
      ...request.body,
    });

    console.log(registroCriado);

    response.json({
      dados: "Algum dado qualquer",
      registroCriado: registroCriado,
    });
    return;
  }

  response.status(404).json({
    message: "Ainda não temos nada no GET, mas no POST tem!",
  });
}

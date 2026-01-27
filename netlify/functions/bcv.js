export async function handler() {
  const API_URL = "https://api.dolarvzla.com/public/exchange-rate";
  const KEY = process.env.DOLARVZLA_KEY

  if (!KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing API key" })
    };
  }

  try {
    const response = await fetch(API_URL, {
      headers: {
        "x-dolarvzla-key": KEY,
      }
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "No se pudieron obtener las tasas BCV" })
    };
  }
}

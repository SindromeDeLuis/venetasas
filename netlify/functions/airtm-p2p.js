export async function handler() {
  const API_URL = "https://rates.airtm.io/";

  try {
    const response = await fetch(API_URL);

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
      body: JSON.stringify({ error: "No se pudieron obtener las tasas de AirTM" })
    };
  }
}

export async function handler(event) {
  let API_URL = "https://bcv-api.rafnixg.dev";

  try {
    const {
      path,
      start_date,
      end_date
    } = event.queryStringParameters || {};

    let finalUrl = new URL(API_URL);

    // Lógica de rutas (Prioridad: Rango > Historial > Fecha única)
    if (start_date && end_date) {
      finalUrl.pathname = "/rates/history";
      finalUrl.searchParams.set("start_date", start_date);
      finalUrl.searchParams.set("end_date", end_date);
    } else if (path === "history") {
      finalUrl.pathname = "/rates/history";
    } else if (path) {
      finalUrl.pathname = `/rates/${path}`;
    }

    const response = await fetch(finalUrl.toString(), {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0"
      }
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Error desde la API externa" })
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error("Function error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Internal Server Error",
        detail: error.message
      })
    };
  }
}

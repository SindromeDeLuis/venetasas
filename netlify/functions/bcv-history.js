export async function handler(event) {
  let API_URL = "https://bcv-api.rafnixg.dev";

  try {
    const {
      path,
      start_date,
      end_date
    } = event.queryStringParameters || {};

    // Últimos 30 días
    if (path === "history") {
      API_URL += "/rates/history";
    }

    // Rango
    if (start_date && end_date) {
      API_URL += `/rates/history?start_date=${start_date}&end_date=${end_date}`;
    }

    // Fecha específica
    if (path && path !== "history") {
      API_URL += `/rates/${path}`;
    }

    const response = await fetch(API_URL);
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

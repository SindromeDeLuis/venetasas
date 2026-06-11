export async function handler(event) {
  let API_URL = "https://rates.dolarvzla.com";

  try {
    const {
      path,
      year
    } = event.queryStringParameters || {};

    let finalUrl = new URL(API_URL);

    // Lógica de rutas (Prioridad: Rango > Historial > Fecha única)
    if (path === "range") {
      finalUrl.pathname = `/bcv/${year}/list.json`;
    } else if (path === "history") {
      finalUrl.pathname = `/bcv/${year}/list.json`;
    } else if (path) {
      finalUrl.pathname = `/bcv/${path}.json`;
    }

    const response = await fetch(finalUrl.toString());

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ 
          error: "La API externa rechazó la conexión", 
          status: response.status 
        })
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
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({
        error: "Internal Server Error",
        detail: error.message
      })
    };
  }
}

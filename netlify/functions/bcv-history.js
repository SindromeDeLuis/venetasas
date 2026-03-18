export async function handler(event) {
  let API_URL = "https://api.dolarvzla.com/public/exchange-rate";
  const KEY = process.env.DOLARVZLA_KEY

  if (!KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing API key" })
    };
  }

  try {
    const {
      path,
      today,
      start_date,
      end_date
    } = event.queryStringParameters || {};

    let finalUrl = new URL(API_URL);
    finalUrl.pathname = "/public/exchange-rate/list";

    // Lógica de rutas (Prioridad: Rango > Historial > Fecha única)
    if (start_date && end_date) {
      finalUrl.searchParams.set("from", start_date);
      finalUrl.searchParams.set("to", end_date);
    } else if (path === "history") {
      const date = new Date(today);
      date.setDate(date.getDate() - 30);
      finalUrl.searchParams.set("from", date.toISOString().split('T')[0]);
      finalUrl.searchParams.set("to", today);
    } else if (path) {
      finalUrl.searchParams.set("from", path);
      finalUrl.searchParams.set("to", path);
    }

    console.log("Final API URL:", finalUrl.toString());

    const response = await fetch(finalUrl.toString(), {
      headers: {
        "x-dolarvzla-key": KEY,
      }
    });

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

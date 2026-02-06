export async function handler(event) {
  const { path, start_date, end_date } = event.queryStringParameters;

  let url = "https://bcv-api.rafnixg.dev";

  // Últimos 30 días
  if (path === "history") {
    url += "/rates/history";
  }

  // Rango
  if (start_date && end_date) {
    url += `/rates/history?start_date=${start_date}&end_date=${end_date}`;
  }

  // Fecha específica
  if (path && path !== "history") {
    url += `/rates/${path}`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(data)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error BCV API" })
    };
  }
}

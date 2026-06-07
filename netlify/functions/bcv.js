export async function handler(event, context) {
  const API_URL = "https://www.bcv.org.ve/";

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json"
  };

  // Manejo de peticiones preflight OPTIONS (Muy común que el navegador las haga en producción)
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: ""
    };
  }

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "es-ES,es;q=0.9"
      }
    });
    
    if (!response.ok) {
      return {
        statusCode: 502, // Bad Gateway (El BCV falló)
        headers,
        body: JSON.stringify({ 
          error: "El servidor del BCV rechazó la conexión en producción.",
          status: response.status 
        })
      };
    }

    const html = await response.text();
    console.log("HTML obtenido del BCV:", html.substring(0, 500)); // Log para verificar el contenido

    const data = {
      current: {
        usd: extraerMonedaPorId(html, "dolar"),
        eur: extraerMonedaPorId(html, "euro"),
        date: extraerFecha(html)
      },
      changePercentage: {
        usd: 0,
        eur: 0,
      }
    };

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
      body: JSON.stringify({ 
        message: "No se pudieron obtener las tasas BCV.",
        error: error.message
      })
    };
  }
}

function parseNumero(valor) {
  if (!valor) return null;

  return parseFloat(
    String(valor)
      .trim()
      .replace(/\./g, "")
      .replace(",", ".")
  );
}

function extraerMonedaPorId(html, id) {
  const regex = new RegExp(
    `<div\\s+id="${id}"[\\s\\S]*?<strong[^>]*>\\s*([\\d.,]+)\\s*<\\/strong>`,
    "i"
  );

  const match = html.match(regex);

  if (!match) {
    console.warn(`No se encontró la moneda con id: ${id}`);
    return null;
  }

  return parseNumero(match[1]);
}

function extraerFecha(html) {
  const regex = /<div\s+id="fecha"[^>]*>\s*<strong[^>]*>\s*([^<]+)\s*<\/strong>/i;
  const match = html.match(regex);

  if (!match) {
    console.warn(`No se encontró la fecha`);
    return null;
  }

  return match[1];
}
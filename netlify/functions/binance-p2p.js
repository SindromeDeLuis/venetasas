export async function handler(event) {
  const BINANCE_URL = "https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search";

  try {
    const {
      asset = "USDT",
      tradeType = "SELL"
    } = event.queryStringParameters || {};

    const payload = {
      asset,
      fiat: "VES",
      tradeType,
      page: 1,
      rows: 5,
      payTypes: ["PagoMovil", "BANK", "BancoDeVenezuela", "Mercantil"],
      publisherType: null
    };

    const response = await fetch(BINANCE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0"
      },
      body: JSON.stringify(payload)
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
      body: JSON.stringify({ error: "Binance proxy error" })
    };
  }
}

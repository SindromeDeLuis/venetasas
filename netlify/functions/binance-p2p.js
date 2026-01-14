export async function handler(event) {
  try {
    const { asset = "USDT" } = event.queryStringParameters || {};

    const payload = {
      asset,
      fiat: "VES",
      tradeType: "SELL",
      page: 1,
      rows: 5,
      payTypes: [],
      publisherType: null
    };

    const response = await fetch(
      "https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0"
        },
        body: JSON.stringify(payload)
      }
    );

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

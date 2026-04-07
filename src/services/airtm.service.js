const PROXY_URL = "/.netlify/functions/airtm-p2p";

/**
 * Obtiene las tasas de AirTM
 * @returns {Promise<{usd:number, date:string}>}
 */
export async function getAirTMRates() {
  const response = await fetch(PROXY_URL);

  if (!response.ok) {
    throw new Error("Error proxy AirTM");
  }

  const data = await response.json();

  const usdcBuy = data.data["ves/usd"].addValue;
  const usdcSell = data.data["ves/usd"].withdrawValue;

  return {
    usdc: {
      buy: usdcBuy,
      sell: usdcSell
    },
    updatedAt: new Date().toISOString()
  };
}

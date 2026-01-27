const PROXY_URL = "/.netlify/functions/bcv";

/**
 * Obtiene las tasas oficiales del BCV
 * @returns {Promise<{usd:number, eur:number, date:string}>}
 */
export async function getBCVRates() {
  const response = await fetch(PROXY_URL);

  if (!response.ok) {
    throw new Error("Error proxy BCV");
  }

  const data = await response.json();

  return {
    usd: Number(data.current.usd),
    eur: Number(data.current.eur),
    updatedAt: data.current.date,
    changePercentage: { 
      usd: Number(data.changePercentage.usd), 
      eur: Number(data.changePercentage.eur)
    },
  };
}

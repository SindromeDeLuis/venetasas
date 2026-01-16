const API_URL = "https://api.dolarvzla.com/public/exchange-rate";

/**
 * Obtiene las tasas oficiales del BCV
 * @returns {Promise<{usd:number, eur:number, date:string}>}
 */
export async function getBCVRates() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("No se pudieron obtener las tasas BCV");
  }

  const data = await response.json();

  return {
    usd: Number(data.current.usd),
    eur: Number(data.current.eur),
    updatedAt: data.current.date
  };
}

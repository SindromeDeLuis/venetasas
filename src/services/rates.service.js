import { getBCVRates } from "@/services/bcv.service";
import { getBinanceRates } from "@/services/binance.service";
import { getAirTMRates } from "@/services/airtm.service";

/**
 * Obtiene todas las tasas necesarias para la app
 */
export async function getAllRates() {
  const [bcv, binance, airtm] = await Promise.all([
    getBCVRates(),
    getBinanceRates(),
    getAirTMRates()
  ]);

  return { bcv, binance, airtm };
}

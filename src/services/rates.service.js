import { getBCVRates } from "@/services/bcv.service";
import { getBinanceRates } from "@/services/binance.service";

/**
 * Obtiene todas las tasas necesarias para la app
 */
export async function getAllRates() {
  const [bcv, binance] = await Promise.all([
    getBCVRates(),
    getBinanceRates()
  ]);

  return { bcv, binance };
}

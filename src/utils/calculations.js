/**
 * Calcula diferencia porcentual entre dos valores
 * @param {number} current
 * @param {number} reference
 * @returns {number}
 */
export function percentageDiff(current, reference) {
  if (!reference) return 0;
  return ((current - reference) / reference) * 100;
}

/**
 * Multiplica una tasa por un valor base
 * @param {number} rate
 * @param {number} base
 * @returns {number}
 */
export function calculateValue(rate, base) {
  return rate * base;
}

/**
 * Calcula el precio recomendado de compra en efectivo
 * @param {number} usdtPrice
 * @param {number} discountPercent
 * @returns {number}
 */
export function cashBuyPrice(usdtPrice, discountPercent = 15) {
  return usdtPrice * (1 - discountPercent / 100);
}

/**
 * Convierte una cantidad según el modo
 * @param {number} amount
 * @param {number} rate
 * @param {"USD"|"VES"} mode
 */
export function convert(amount, rate, mode) {
  if (!rate || !amount) return 0;
  return mode === "USD"
    ? amount * rate   // USD → VES
    : amount / rate;  // VES → USD
}


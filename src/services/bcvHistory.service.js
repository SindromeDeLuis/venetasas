const PROXY_URL = "/.netlify/functions/bcv-history";

// Fecha específica
export async function getRateByDate(date) {
  const response = await fetch(`${PROXY_URL}?path=${date}`);

  if (!response.ok) {
    throw new Error("Error proxy BCV History");
  }

  const data = await response.json();

  return [data];
}

// Últimos 30 días
export async function getLast30Days() {
  const res = await fetch(`${PROXY_URL}?path=history`);

  if (!response.ok) {
    throw new Error("Error proxy BCV History");
  }

  const data = await response.json();

  return data.rates;
}

// Rango
export async function getRange(start, end) {
  const res = await fetch(
    `${PROXY_URL}?start_date=${start}&end_date=${end}`
  );

  if (!response.ok) {
    throw new Error("Error proxy BCV History");
  }

  const data = await response.json();

  return data.rates;
}

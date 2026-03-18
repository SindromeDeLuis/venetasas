const PROXY_URL = "/.netlify/functions/bcv-history";

// Fecha específica
export async function getRateByDate(date) {
  const response = await fetch(`${PROXY_URL}?path=${date}`);

  if (!response.ok) {
    throw new Error("Error proxy BCV History");
  }

  const data = await response.json();

  return data.rates;
}

// Últimos 30 días
export async function getLast30Days(today) {
  const response = await fetch(`${PROXY_URL}?path=history&today=${today}`);

  if (!response.ok) {
    throw new Error("Error proxy BCV History");
  }

  const data = await response.json();

  return data.rates;
}

// Rango
export async function getRange(start, end) {
  const response = await fetch(
    `${PROXY_URL}?start_date=${start}&end_date=${end}`
  );

  if (!response.ok) {
    throw new Error("Error proxy BCV History");
  }

  const data = await response.json();

  return data.rates;
}

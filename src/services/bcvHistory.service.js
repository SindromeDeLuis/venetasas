const API = "/.netlify/functions/bcv-history";

// Fecha específica
export async function getRateByDate(date) {
  const res = await fetch(`${API}?path=${date}`);
  const data = await res.json();
  return [data];
}

// Últimos 30 días
export async function getLast30Days() {
  const res = await fetch(`${API}?path=history`);
  const data = await res.json();
  return data.rates;
}

// Rango
export async function getRange(start, end) {
  const res = await fetch(
    `${API}?start_date=${start}&end_date=${end}`
  );
  const data = await res.json();
  return data.rates;
}

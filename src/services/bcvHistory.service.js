const PROXY_URL = "/.netlify/functions/bcv-history";

// Fecha específica
export async function getRateByDate(date) {
  let path = date.split("-")
  path[1] = parseInt(path[1], 10).toString(); // Convertir el mes a número y luego a string
  path[2] = parseInt(path[2], 10).toString();
  path = path.join("/"); // Convertir "YYYY-MM-DD" a "YYYY/MM/DD"
  const response = await fetch(`${PROXY_URL}?path=${path}`);

  if (!response.ok) {
    throw new Error("Error proxy BCV History");
  }

  const data = await response.json();

  return data;
}

// Últimos 30 días
export async function getLast30Days(year) {
  const response = await fetch(`${PROXY_URL}?path=history&year=${year}`);

  if (!response.ok) {
    throw new Error("Error proxy BCV History");
  }

  const data = await response.json();

  return data.slice(0, 30);
}

// Rango
export async function getRange(start, end) {
  const year = start.split("-")[0];
  const fechaInicio = new Date(start).getTime();
  const fechaFin = new Date(end).getTime();

  const response = await fetch(`${PROXY_URL}?path=range&year=${year}`);

  if (!response.ok) {
    throw new Error("Error proxy BCV History");
  }

  const data = await response.json();

  return data.filter(item => {
    const tiempoItem = new Date(item.date).getTime();

    return tiempoItem >= fechaInicio && tiempoItem <= fechaFin;
  });
}

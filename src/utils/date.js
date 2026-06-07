export function formatDate(dateStr) {
  if (!dateStr) return ''

  // BCV: YYYY-MM-DD (sin hora)
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [year, month, day] = dateStr.split('-')
    return `${day}/${month}/${year}`
  }

  // Binance u otros: ISO completo
  const date = new Date(dateStr)

  return date.toLocaleString('es-VE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Función para obtener la fecha actual en formato dd-mm-yyyy
export function getTodayFormatted() {
    const today = new Date();

    let day = today.getDate();
    let month = today.getMonth() + 1; // Los meses van de 0 a 11
    const year = today.getFullYear();

    // Asegurar que día y mes tengan dos dígitos
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    return `${year}-${month}-${day}`;
}

// Función para obtener solo el año actual
export function getTodayYear() {
    const today = new Date();
    return today.getFullYear();
}

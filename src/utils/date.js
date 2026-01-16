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

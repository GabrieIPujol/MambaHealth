// Composable com utilitários para formatação de tempo.
export function useTimer() {
  // Converte segundos em string no formato HH:MM:SS.
  function formatDuration(sec) {
    const h = Math.floor(sec / 3600).toString().padStart(2, '0')
    const m = Math.floor((sec % 3600) / 60).toString().padStart(2, '0')
    const s = (sec % 60).toString().padStart(2, '0')
    return `${h}:${m}:${s}`
  }

  // Converte segundos em horas e minutos legíveis.
  function formatHours(sec) {
    const h = Math.floor(sec / 3600)
    const m = Math.floor((sec % 3600) / 60)
    return h ? `${h}h ${m}m` : `${m}m`
  }

  return { formatDuration, formatHours }
}

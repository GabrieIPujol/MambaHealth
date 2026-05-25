import { onUnmounted } from 'vue'
import Chart from 'chart.js/auto'

// Composable para criar e gerenciar instâncias de gráficos Chart.js.
export function useChart() {
  const instances = new Map()

  // Configurações base padrão para todos os gráficos.
  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#161b16',
        borderColor: '#1f261f',
        borderWidth: 1,
        titleColor: '#d4e8d4',
        bodyColor: '#7a9c7a',
        padding: 10,
      },
    },
    scales: {
      x: {
        grid: { color: '#1f261f' },
        ticks: { color: '#7a9c7a', font: { family: 'Rajdhani', size: 12 } },
      },
      y: {
        grid: { color: '#1f261f' },
        ticks: { color: '#7a9c7a', font: { family: 'Rajdhani', size: 12 } },
        beginAtZero: true,
      },
    },
  }

  // Cria um gráfico em um canvas e substitui instâncias antigas, se houver.
  function create(canvas, config) {
    if (!canvas) return
    const key = canvas
    if (instances.has(key)) instances.get(key).destroy()
    const inst = new Chart(canvas, {
      ...config,
      options: {
        ...baseOptions,
        ...(config.options ?? {}),
        plugins: { ...baseOptions.plugins, ...(config.options?.plugins ?? {}) },
        scales: { ...baseOptions.scales, ...(config.options?.scales ?? {}) },
      },
    })
    instances.set(key, inst)
    return inst
  }

  // Destrói um gráfico existente e remove do mapa.
  function destroy(canvas) {
    if (instances.has(canvas)) { instances.get(canvas).destroy(); instances.delete(canvas) }
  }

  // Ao desmontar o componente, destrói todos os gráficos criados.
  onUnmounted(() => instances.forEach(i => i.destroy()))

  return { create, destroy, baseOptions }
}

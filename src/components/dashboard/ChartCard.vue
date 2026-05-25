<template>
  <!-- Cartão que envolve um gráfico Chart.js. -->
  <BaseCard :title="title">
    <div class="chart-wrap">
      <canvas ref="canvasRef"></canvas>
    </div>
  </BaseCard>
</template>

<script setup>
  import { ref, onMounted, onUnmounted, watch } from 'vue'
  import Chart from 'chart.js/auto'
  import BaseCard from '@/components/ui/BaseCard.vue'

  const props = defineProps({
    title:   String,
    config:  { type: Object, required: true },
  })

  const canvasRef = ref(null)
  let inst = null

  // Configurações base de estilo e comportamento para todos os gráficos.
  const BASE_OPTIONS = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#161b16', borderColor: '#1f261f', borderWidth: 1,
        titleColor: '#d4e8d4', bodyColor: '#7a9c7a', padding: 10,
      },
    },
    scales: {
      x: { grid: { color: '#1f261f' }, ticks: { color: '#7a9c7a', font: { family: 'Rajdhani', size: 12 } } },
      y: { grid: { color: '#1f261f' }, ticks: { color: '#7a9c7a', font: { family: 'Rajdhani', size: 12 } }, beginAtZero: true },
    },
  }

  // Renderiza o gráfico usando a configuração recebida por props.
  function render() {
    if (!canvasRef.value) return
    if (inst) inst.destroy()
    inst = new Chart(canvasRef.value, {
      ...props.config,
      options: {
        ...BASE_OPTIONS,
        ...(props.config.options ?? {}),
        plugins: { ...BASE_OPTIONS.plugins, ...(props.config.options?.plugins ?? {}) },
        scales:  { ...BASE_OPTIONS.scales,  ...(props.config.options?.scales  ?? {}) },
      },
    })
  }

  // Monta e atualiza o gráfico quando a configuração muda.
  onMounted(render)
  watch(() => props.config, render, { deep: true })
  onUnmounted(() => inst?.destroy())
</script>

<style scoped>
  .chart-wrap { 
    position: relative; height: 220px; 
  }
</style>

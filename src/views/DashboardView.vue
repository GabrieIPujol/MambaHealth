<template>
  <main class="view">
    <!-- Summary stats -->
    <BaseCard title="📊 Resumo Semanal — Últimos 7 Dias">
      <WeekStats :stats="summaryStats" />
    </BaseCard>

    <!-- Calorie chart -->
    <ChartCard title="🔥 Calorias Diárias — 7 Dias" :config="calChartConfig" />

    <!-- Fast hours chart -->
    <ChartCard title="⏱ Horas em Jejum — 7 Dias" :config="fastChartConfig" />

    <!-- Recent fasts list -->
    <BaseCard title="📋 Jejuns da Semana">
      <FastHistory :items="fastingStore.recentHistory" />
    </BaseCard>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useFastingStore }   from '@/stores/fasting'
import { useNutritionStore } from '@/stores/nutrition'
import { useTimer }          from '@/composables/useTimer'

import BaseCard   from '@/components/ui/BaseCard.vue'
import WeekStats  from '@/components/dashboard/WeekStats.vue'
import ChartCard  from '@/components/dashboard/ChartCard.vue'
import FastHistory from '@/components/fasting/FastHistory.vue'

const fastingStore   = useFastingStore()
const nutritionStore = useNutritionStore()
const { formatHours } = useTimer()

/* ── date helpers ── */
const last7 = () => {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(d.toISOString().slice(0, 10))
  }
  return days
}

const dayShort = dateStr => {
  const dt = new Date(dateStr + 'T12:00:00')
  return dt.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit' })
}

/* ── computed data ── */
const days = computed(() => last7())

const caloriesByDay = computed(() =>
  days.value.map(d => nutritionStore.getCaloriesForDay(d))
)

const fastHoursByDay = computed(() =>
  days.value.map(d => {
    const dayFasts = fastingStore.history.filter(f => f.date === d)
    return parseFloat((dayFasts.reduce((s, f) => s + f.duration, 0) / 3600).toFixed(1))
  })
)

const weekFasts = computed(() =>
  fastingStore.history.filter(f => days.value.includes(f.date))
)

const avgCal = computed(() => {
  const active = caloriesByDay.value.filter(c => c > 0)
  return active.length ? Math.round(active.reduce((a, b) => a + b, 0) / active.length) : 0
})

const totalFastSec = computed(() =>
  weekFasts.value.reduce((s, f) => s + f.duration, 0)
)

/* ── summary stats ── */
const summaryStats = computed(() => [
  { label: 'Jejuns realizados', value: weekFasts.value.length },
  { label: 'Total em jejum',    value: formatHours(totalFastSec.value) },
  { label: 'Média kcal/dia',    value: avgCal.value },
])

/* ── chart configs ── */
const BAR_DATASET_BASE = {
  backgroundColor: '#39ff6a33',
  borderColor: '#39ff6a',
  borderWidth: 1.5,
  borderRadius: 6,
}

const calChartConfig = computed(() => ({
  type: 'bar',
  data: {
    labels: days.value.map(dayShort),
    datasets: [
      { ...BAR_DATASET_BASE, label: 'kcal', data: caloriesByDay.value },
      {
        type: 'line', label: 'Meta',
        data: days.value.map(() => nutritionStore.goal),
        borderColor: '#ff4d6d', borderDash: [5, 5],
        pointRadius: 0, borderWidth: 1.5, fill: false,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: true,
        labels: { color: '#7a9c7a', font: { family: 'Rajdhani', size: 12 } },
      },
    },
  },
}))

const fastChartConfig = computed(() => ({
  type: 'bar',
  data: {
    labels: days.value.map(dayShort),
    datasets: [{
      ...BAR_DATASET_BASE,
      backgroundColor: '#1a7a3644',
      data: fastHoursByDay.value,
    }],
  },
  options: {
    scales: {
      y: {
        title: { display: true, text: 'horas', color: '#4a5e4a' },
      },
    },
  },
}))
</script>

<template>
  <!-- Exibe um conjunto de estatísticas de semana em um layout de grade. -->
  <div class="week-grid">
    <div v-for="s in stats" :key="s.label" class="week-stat">
      <div class="week-val">{{ s.value }}</div>
      <div class="week-lbl">{{ s.label }}</div>
    </div>
  </div>
</template>

<script setup>
  // Recebe a lista de estatísticas para renderizar.
  defineProps({
    stats: { type: Array, default: () => [] }
  })
</script>

<style scoped>
  .week-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }

  .week-stat {
    text-align: center; padding: 16px 10px;
    background: var(--surface); border-radius: 10px;
    border: 1px solid var(--border);
  }
  .week-val {
    font-family: var(--font-head); font-size: 1.8rem;
    font-weight: 700; color: var(--green);
  }
  .week-lbl { font-size: .72rem; color: var(--text-dim); margin-top: 4px; }

  @media (max-width: 420px) {
    .week-grid { grid-template-columns: 1fr 1fr; }
  }
</style>

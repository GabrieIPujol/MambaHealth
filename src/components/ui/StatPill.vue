<template>
  <!-- Componente que mostra um valor principal e rótulo descritivo. -->
  <div class="stat">
    <span class="stat-val" :class="{ big }">{{ value }}</span>
    <span class="stat-lbl">{{ label }}</span>
  </div>
</template>

<script setup>
  // Propriedades para valor exibido, texto de rótulo e tamanho grande opcional.
  defineProps({
    value: [String, Number],
    label: String,
    big:   { type: Boolean, default: false },
  })
</script>

<style scoped>
  .stat { 
    display: flex; 
    flex-direction: column;
    gap: 2px; 
  }

  .stat-val {
    font-family: var(--font-head);
    font-size: 2rem;
    font-weight: 700;
    color: var(--green);
    line-height: 1;
  }

  .stat-val.big { 
    font-size: 2.8rem; 
  }

  .stat-lbl { 
    font-size: .72rem; 
    color: var(--text-dim); 
    letter-spacing: .5px; 
  }
</style>

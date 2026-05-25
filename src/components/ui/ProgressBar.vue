<template>
  <!-- Barra de progresso simples que indica porcentagem preenchida. -->
  <div class="progress-wrap">
    <div
      class="progress-fill"
      :class="{ over: pct > 100 }"
      :style="{ width: Math.min(pct, 100) + '%' }"
    />
  </div>
</template>

<script setup>
  // Propriedade que recebe a porcentagem de preenchimento.
  defineProps({ pct: { type: Number, default: 0 } })
</script>

<style scoped>
  .progress-wrap {
    background: var(--border);
    border-radius: 99px;
    height: 10px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    border-radius: 99px;
    background: linear-gradient(90deg, var(--green-dim), var(--green));
    box-shadow: 0 0 8px var(--green-glow);
    transition: width .5s ease;
  }
  
  .progress-fill.over {
    background: linear-gradient(90deg, #b83a4d, var(--red));
    box-shadow: 0 0 8px var(--red-glow);
  }
</style>

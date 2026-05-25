<template>
  <!-- Indicador circular de progresso com tempo e subtítulo no centro. -->
  <div class="ring-wrap">
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`" style="transform:rotate(-90deg)">
      <circle class="ring-bg" :cx="c" :cy="c" :r="r" />
      <circle
        class="ring-fg"
        :class="{ done: pct >= 100 }"
        :cx="c" :cy="c" :r="r"
        :stroke-dasharray="circ"
        :stroke-dashoffset="offset"
      />
    </svg>
    <div class="ring-center">
      <span class="ring-time">{{ time }}</span>
      <span class="ring-sub">{{ sub }}</span>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'

  // Propriedades de estado do anel: porcentagem, tempo exibido, legenda e tamanho.
  const props = defineProps({
    pct: { type: Number, default: 0 },   
    time: { type: String, default: '00:00:00' },
    sub: { type: String, default: '' },
    size: { type: Number, default: 200 },
  })

  const STROKE = 8
  const c = computed(() => props.size / 2)
  const r = computed(() => c.value - STROKE * 1.5)
  const circ = computed(() => 2 * Math.PI * r.value)
  const offset = computed(() => circ.value - (props.pct / 100) * circ.value)
</script>

<style scoped>
  .ring-wrap { 
    display: flex; 
    justify-content: center; 
    position: relative; 
    margin: 8px 0 20px; 
  }

  .ring-bg { 
    fill: none; 
    stroke: var(--border); 
    stroke-width: 8; 
  }

  .ring-fg {
    fill: none; 
    stroke: var(--green); 
    stroke-width: 8; 
    stroke-linecap: round;
    transition: stroke-dashoffset .6s ease;
    filter: drop-shadow(0 0 6px var(--green));
  }

  .ring-fg.done { 
    stroke: #ffd166; 
  }

  .ring-center {
    position: absolute; 
    inset: 0;
    display: flex; 
    flex-direction: column;
    align-items: center; 
    justify-content: center;
  }

  .ring-time {
    font-family: var(--font-head); 
    font-size: 2.2rem;
    font-weight: 700; 
    color: var(--green); 
    line-height: 1;
  }

  .ring-sub { 
    font-size: .72rem; 
    color: var(--text-dim); 
    margin-top: 4px; 
    letter-spacing: .5px; 
  }
</style>

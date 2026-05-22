<template>
  <div class="cal-wrap">
    <!-- SVG ring -->
    <div class="svg-wrap">
      <svg width="120" height="120" viewBox="0 0 120 120" style="transform:rotate(-90deg)">
        <circle cx="60" cy="60" r="50" fill="none" stroke="var(--border)" stroke-width="8" />
        <circle
          cx="60" cy="60" r="50"
          fill="none"
          :stroke="over ? 'var(--red)' : 'var(--green)'"
          stroke-width="8"
          stroke-linecap="round"
          :stroke-dasharray="circ"
          :stroke-dashoffset="offset"
          style="transition:stroke-dashoffset .5s ease, stroke .3s;"
          :style="{ filter: `drop-shadow(0 0 5px ${over ? 'var(--red-glow)' : 'var(--green-glow)'})` }"
        />
      </svg>
      <div class="svg-center">
        <span class="pct-val" :class="{ over }">{{ pct }}%</span>
      </div>
    </div>

    <!-- Info -->
    <div class="info">
      <div class="info-row">
        <span class="info-big" :class="{ over }">{{ consumed }}</span>
        <span class="info-unit">kcal</span>
      </div>
      <div class="info-goal">de {{ goal }} kcal</div>
      <div class="info-remaining" :class="{ over }">
        {{ over ? 'Meta ultrapassada!' : `${goal - consumed} kcal restantes` }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  consumed: { type: Number, default: 0 },
  goal:     { type: Number, default: 2000 },
})

const pct    = computed(() => Math.round(props.consumed / props.goal * 100))
const over   = computed(() => pct.value > 100)
const circ   = 2 * Math.PI * 50
const offset = computed(() => circ - (Math.min(pct.value, 100) / 100) * circ)
</script>

<style scoped>
.cal-wrap  { display: flex; align-items: center; gap: 20px; }
.svg-wrap  { position: relative; flex-shrink: 0; }
.svg-center {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
}
.pct-val {
  font-family: var(--font-head); font-size: 1.6rem;
  font-weight: 700; color: var(--green);
}
.pct-val.over { color: var(--red); }

.info        { flex: 1; }
.info-row    { display: flex; align-items: baseline; gap: 4px; }
.info-big    { font-family: var(--font-head); font-size: 2.4rem; font-weight: 700; color: var(--green); line-height: 1; }
.info-big.over { color: var(--red); }
.info-unit   { font-size: .8rem; color: var(--text-dim); }
.info-goal   { font-size: .8rem; color: var(--text-dim); margin-top: 4px; }
.info-remaining { font-size: .8rem; color: var(--text-dim); margin-top: 8px; }
.info-remaining.over { color: var(--red); }
</style>

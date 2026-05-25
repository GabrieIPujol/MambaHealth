<template>
  <div class="macro-row">
    <div v-for="m in items" :key="m.label" class="macro-badge">
      <span class="dot" :style="{ background: m.color }"></span>
      {{ m.label }} {{ m.value }}g
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  macros: { type: Object, default: () => ({ p: 0, c: 0, f: 0 }) },
})

const items = computed(() => [
  { label: 'Proteína', value: props.macros.p, color: '#39ff6a' },
  { label: 'Carboidrato', value: props.macros.c, color: '#ffd166' },
  { label: 'Gordura', value: props.macros.f, color: '#ff6b6b' },
])
</script>

<style scoped>
.macro-row { 
  display: flex; 
  gap: 8px; 
  flex-wrap: wrap; 
}

.macro-badge {
  display: flex; 
  align-items: center; 
  gap: 6px;
  padding: 6px 12px; 
  border-radius: 6px;
  font-size: .78rem; 
  background: var(--surface); 
  border: 1px solid var(--border);
}

.dot { 
  width: 8px; 
  height: 8px; 
  border-radius: 50%; 
  flex-shrink: 0; 
}
</style>

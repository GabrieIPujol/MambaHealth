<template>
  <!-- Lista de protocolos de jejum para seleção. -->
  <div class="protocol-list">
    <div
      v-for="p in PROTOCOLS"
      :key="p.id"
      class="protocol-item"
      :class="{ selected: modelValue === p.id, disabled: disabled && modelValue !== p.id }"
      @click="!disabled && $emit('update:modelValue', p.id)"
    >
      <div>
        <div class="protocol-name">{{ p.label }}</div>
        <div class="protocol-desc">{{ p.desc }}</div>
      </div>

      <div class="protocol-right">
        <TagBadge v-if="p.id === '16-8'" variant="green">Popular</TagBadge>

        <input
          v-if="p.id === 'custom' && modelValue === 'custom'"
          type="number" min="1" max="23"
          :value="customHours"
          class="custom-input"
          placeholder="h"
          @click.stop
          @input="$emit('update:customHours', Number($event.target.value))"
        />

        <span class="check">{{ modelValue === p.id ? '●' : '○' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import TagBadge from '@/components/ui/TagBadge.vue'
  import { useFastingStore } from '@/stores/fasting'

  // Usa a lista de protocolos diretamente da store.
  const { PROTOCOLS } = useFastingStore()

  defineProps({
    modelValue:  String,
    customHours: Number,
    disabled: { type: Boolean, default: false },
  })
  defineEmits(['update:modelValue', 'update:customHours'])
</script>

<style scoped>
  .protocol-list { 
    display: flex; 
    flex-direction: column; 
    gap: 10px; 
  }

  .protocol-item {
    display: flex; 
    align-items: center; 
    justify-content: space-between;
    padding: 14px 16px; 
    border-radius: var(--radius-sm);
    border: 1px solid var(--border); 
    background: var(--surface);
    cursor: pointer; 
    transition: all .2s;
  }

  .protocol-item:hover:not(.disabled) { 
    border-color: var(--green-dim); 
  }

  .protocol-item.selected { 
    border-color: var(--green); 
    background: var(--green-glow); 
  }

  .protocol-item.disabled { 
    opacity: .5; 
    cursor: not-allowed; 
  }

  .protocol-name { 
    font-family: var(--font-head); 
    font-size: 1.1rem; 
    font-weight: 600; 
    letter-spacing: 1px; 
  }

  .protocol-desc { 
    font-size: .75rem; 
    color: var(--text-dim);
    margin-top: 2px; 
  }

  .protocol-right { 
    display: flex; 
    align-items: center; 
    gap: 10px; 
  }

  .check { 
    color: var(--text-dim); 
    font-size: 1.1rem; 
  }

  .protocol-item.selected .check { 
    color: var(--green); 
  }

  .custom-input {
    width: 64px; 
    padding: 6px 10px; 
    text-align: center;
    background: var(--card); 
    border: 1px solid var(--green-dim);
    border-radius: 6px; 
    color: var(--text); 
    font-family: var(--font-body);
    font-size: .9rem; 
    outline: none;
  }
</style>

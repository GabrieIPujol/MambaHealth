<template>
  <div class="field">
    <label v-if="label" class="field-label">{{ label }}</label>
    <component
      :is="type === 'select' ? 'select' : 'input'"
      class="field-input"
      v-bind="attrs"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <slot />
    </component>
  </div>
</template>

<script setup>
import { useAttrs } from 'vue'

defineProps({
  modelValue: [String, Number],
  label:      String,
  type:       { type: String, default: 'text' },
})
defineEmits(['update:modelValue'])

const attrs = useAttrs()
</script>

<style scoped>
.field { display: flex; flex-direction: column; gap: 6px; }
.field-label { font-size: .78rem; color: var(--text-dim); letter-spacing: .5px; }
.field-input {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text);
  font-family: var(--font-body);
  font-size: .9rem;
  padding: 10px 14px;
  outline: none;
  transition: border .2s;
  width: 100%;
}
.field-input:focus { border-color: var(--green-dim); }
option { background: var(--card); }
</style>

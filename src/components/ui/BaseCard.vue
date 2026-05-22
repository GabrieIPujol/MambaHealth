<template>
  <div class="card" :class="{ 'glow-active': glow }">
    <div v-if="title" class="card-header">
      <p class="card-title">{{ title }}</p>
      <slot name="actions" />
    </div>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  title: String,
  glow:  { type: Boolean, default: false },
})
</script>

<style scoped>
.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
}
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.card-title {
  font-family: var(--font-head);
  font-size: .9rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text-dim);
}
</style>

<template>
  <button
    class="btn"
    :class="[`btn--${variant}`, { 'btn--sm': sm, 'btn--full': full }]"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: { type: String, default: 'green' }, // green | outline | red | ghost
  sm:      { type: Boolean, default: false },
  full:    { type: Boolean, default: false },
})
</script>

<style scoped>
.btn {
  font-family: var(--font-head);
  font-size: .95rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  border: none;
  border-radius: var(--radius-sm);
  padding: 12px 24px;
  cursor: pointer;
  transition: all .2s;
  white-space: nowrap;
}
.btn--full { width: 100%; }
.btn--sm   { padding: 6px 14px; font-size: .8rem; }

.btn--green {
  background: var(--green);
  color: #000;
  box-shadow: 0 0 20px var(--green-glow);
}
.btn--green:hover {
  box-shadow: 0 0 32px rgba(57,255,106,.4);
  transform: translateY(-1px);
}

.btn--outline {
  background: transparent;
  color: var(--green);
  border: 1px solid var(--green-dim);
}
.btn--outline:hover { background: var(--green-glow); }

.btn--red {
  background: var(--red);
  color: #fff;
  box-shadow: 0 0 20px var(--red-glow);
}
.btn--red:hover { box-shadow: 0 0 32px rgba(255,77,109,.35); transform: translateY(-1px); }

.btn--ghost {
  background: transparent;
  color: var(--text-dim);
  border: 1px solid var(--border);
}
.btn--ghost:hover { color: var(--text); border-color: var(--muted); }
</style>

<template>
  <span class="tag" :class="`tag--${variant}`">
    <slot />
  </span>
</template>

<script setup>
defineProps({
  variant: { type: String, default: 'muted' }, // green | red | muted
})
</script>

<style scoped>
.tag {
  font-size: .65rem;
  padding: 2px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: .5px;
  font-weight: 600;
}
.tag--green { background: rgba(57,255,106,.12); color: var(--green); border: 1px solid var(--green-dim); }
.tag--red   { background: rgba(255,77,109,.12); color: var(--red);   border: 1px solid rgba(255,77,109,.4); }
.tag--muted { background: var(--surface); color: var(--text-dim);     border: 1px solid var(--border); }
</style>

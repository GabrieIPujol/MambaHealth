<template>
  <div>
    <p v-if="!items.length" class="empty">Nenhum jejum registrado ainda.</p>
    <TransitionGroup name="slide-up" tag="div" class="list">
      <div v-for="f in [...items].reverse()" :key="f.date + f.duration" class="item">
        <div>
          <p class="item-label">{{ f.dateLabel }}</p>
          <p class="item-meta">{{ f.protocol }}</p>
        </div>
        <div class="item-right">
          <span class="item-val">{{ formatDuration(f.duration) }}</span>
          <TagBadge :variant="f.completed ? 'green' : 'red'">
            {{ f.completed ? 'Completo' : 'Incompleto' }}
          </TagBadge>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import TagBadge from '@/components/ui/TagBadge.vue'
import { useTimer } from '@/composables/useTimer'

const { formatDuration } = useTimer()
defineProps({ items: { type: Array, default: () => [] } })
</script>

<style scoped>
.empty { color: var(--text-dim); font-size: .85rem; text-align: center; padding: 24px 0; }
.list  { display: flex; flex-direction: column; gap: 8px; }

.item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 14px; border-radius: var(--radius-sm);
  border: 1px solid var(--border); background: var(--surface);
}
.item-label { font-size: .85rem; }
.item-meta  { font-size: .75rem; color: var(--text-dim); margin-top: 2px; }
.item-right { display: flex; flex-direction: column; align-items: flex-end; gap: 5px; }
.item-val   { font-family: var(--font-head); font-size: 1rem; font-weight: 600; color: var(--green); }

/* transition */
.slide-up-enter-active { transition: all .25s ease; }
.slide-up-enter-from   { opacity: 0; transform: translateY(8px); }
</style>

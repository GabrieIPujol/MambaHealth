<template>
  <div>
    <p v-if="!meals.length" class="empty">Nenhuma refeição registrada hoje.</p>
    <TransitionGroup name="slide-up" tag="div" class="list">
      <div v-for="m in meals" :key="m.id" class="meal-item">
        <div class="meal-main">
          <div class="meal-header">
            <p class="meal-name">{{ m.name }}</p>
            <div style="display:flex;align-items:center;gap:10px">
              <span class="meal-kcal">{{ m.cal }} kcal</span>
              <button class="del-btn" @click="$emit('remove', m.id)" title="Remover">✕</button>
            </div>
          </div>

          <div class="meal-meta-row">
            <span class="meal-meta">{{ m.type }} · {{ m.time }}</span>
            <span v-if="m.weight" class="meal-weight">{{ m.weight }}g</span>
          </div>

          <!-- macros chips, se existirem -->
          <div v-if="m.macros && hasMacros(m.macros)" class="meal-macros">
            <span v-if="m.macros.p" class="macro-chip chip-p">P {{ m.macros.p }}g</span>
            <span v-if="m.macros.c" class="macro-chip chip-c">C {{ m.macros.c }}g</span>
            <span v-if="m.macros.f" class="macro-chip chip-f">G {{ m.macros.f }}g</span>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
defineProps({ meals: { type: Array, default: () => [] } })
defineEmits(['remove'])

function hasMacros(m) {
  return m && (m.p > 0 || m.c > 0 || m.f > 0)
}
</script>

<style scoped>
.empty { color: var(--text-dim); font-size: .85rem; text-align: center; padding: 24px 0; }
.list  { display: flex; flex-direction: column; gap: 8px; }

.meal-item {
  padding: 10px 14px; border-radius: var(--radius-sm);
  border-left: 3px solid var(--green-dim);
  background: var(--surface);
}
.meal-main   { display: flex; flex-direction: column; gap: 4px; }
.meal-header { display: flex; align-items: center; justify-content: space-between; }
.meal-name   { font-size: .88rem; font-weight: 500; }
.meal-kcal   { font-family: var(--font-head); font-size: 1rem; font-weight: 700; color: var(--green); }

.meal-meta-row { display: flex; align-items: center; gap: 10px; }
.meal-meta   { font-size: .72rem; color: var(--text-dim); }
.meal-weight { font-size: .72rem; color: var(--text-dim); background: var(--border); border-radius: 4px; padding: 1px 6px; }

.del-btn {
  background: none; border: none; color: var(--muted);
  cursor: pointer; font-size: 1rem; padding: 0 4px;
  transition: color .2s; line-height: 1;
}
.del-btn:hover { color: var(--red); }

/* macro chips */
.meal-macros { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 2px; }
.macro-chip  {
  font-size: .68rem; padding: 2px 7px; border-radius: 4px; font-weight: 600;
}
.chip-p { background: rgba(57,255,106,.1);  color: #39ff6a; border: 1px solid rgba(57,255,106,.25); }
.chip-c { background: rgba(255,209,102,.1); color: #ffd166; border: 1px solid rgba(255,209,102,.25); }
.chip-f { background: rgba(255,107,107,.1); color: #ff6b6b; border: 1px solid rgba(255,107,107,.25); }

/* transition */
.slide-up-enter-active { transition: all .2s ease; }
.slide-up-enter-from   { opacity: 0; transform: translateY(6px); }
.slide-up-leave-active { transition: all .15s ease; }
.slide-up-leave-to     { opacity: 0; transform: translateX(10px); }
</style>

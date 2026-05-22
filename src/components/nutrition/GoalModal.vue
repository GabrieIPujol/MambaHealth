<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="overlay" @click.self="$emit('close')">
        <div class="modal">
          <p class="modal-title">⚙ Configurar Meta</p>

          <BaseInput label="Meta calórica diária (kcal)" type="number" v-model="local.goal" min="500" max="9999" />
          <BaseInput label="Proteína (g)"    type="number" v-model="local.p" min="0" />
          <BaseInput label="Carboidratos (g)" type="number" v-model="local.c" min="0" />
          <BaseInput label="Gordura (g)"     type="number" v-model="local.f" min="0" />

          <div class="grid-2">
            <BaseButton variant="outline" full @click="$emit('close')">Cancelar</BaseButton>
            <BaseButton variant="green"   full @click="save">Salvar</BaseButton>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { reactive, watch } from 'vue'
import BaseInput  from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const props = defineProps({
  open:   Boolean,
  goal:   Number,
  macros: Object,
})
const emit = defineEmits(['close', 'save'])

const local = reactive({ goal: 2000, p: 150, c: 200, f: 65 })

watch(() => props.open, (v) => {
  if (v) {
    local.goal = props.goal
    local.p    = props.macros?.p ?? 150
    local.c    = props.macros?.c ?? 200
    local.f    = props.macros?.f ?? 65
  }
})

function save() {
  emit('save', { goal: Number(local.goal), macros: { p: Number(local.p), c: Number(local.c), f: Number(local.f) } })
}
</script>

<style scoped>
.overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.7);
  display: flex; align-items: center; justify-content: center;
  z-index: 200; backdrop-filter: blur(4px);
}
.modal {
  background: var(--card); border: 1px solid var(--border);
  border-radius: 16px; padding: 28px;
  width: min(420px, 90vw);
  display: flex; flex-direction: column; gap: 14px;
}
.modal-title {
  font-family: var(--font-head); font-size: 1.2rem;
  font-weight: 700; letter-spacing: 1px;
}
</style>

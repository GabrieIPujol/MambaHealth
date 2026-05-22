<template>
  <main class="view">
    <!-- Toast de conclusão -->
    <Transition name="toast">
      <div v-if="store.justCompleted" class="toast" @click="store.justCompleted = false">
        <span class="toast-icon">🏆</span>
        <div>
          <p class="toast-title">Jejum concluído!</p>
          <p class="toast-sub">Meta atingida. Parabéns pela disciplina.</p>
        </div>
        <span class="toast-close">✕</span>
      </div>
    </Transition>

    <!-- Timer card -->
    <BaseCard title="⏱ Controle de Jejum" :glow="store.active">
      <RingTimer
        :pct="store.ringPct"
        :time="formatDuration(store.elapsed)"
        :sub="store.active ? 'EM JEJUM' : 'PARADO'"
      />

      <div class="grid-3" style="margin-bottom:16px">
        <StatPill :value="formatDuration(store.targetSeconds)" label="Meta" />
        <StatPill :value="store.ringPct + '%'"                 label="Progresso" />
        <StatPill
          :value="store.active ? formatDuration(Math.max(0, store.targetSeconds - store.elapsed)) : '—'"
          label="Restante"
        />
      </div>

      <BaseButton v-if="!store.active" variant="green" full @click="store.start">
        INICIAR JEJUM →
      </BaseButton>
      <BaseButton v-else variant="red" full @click="store.stop">
        FINALIZAR JEJUM
      </BaseButton>
    </BaseCard>

    <!-- Protocol -->
    <BaseCard title="⚙ Protocolo">
      <ProtocolSelector
        v-model="store.protocolId"
        v-model:customHours="store.customHours"
        :disabled="store.active"
        @update:modelValue="store.selectProtocol($event)"
      />
    </BaseCard>

    <!-- History -->
    <BaseCard title="📋 Histórico de Jejuns">
      <template #actions>
        <BaseButton v-if="store.history.length" variant="outline" sm @click="store.clearHistory">
          Limpar
        </BaseButton>
      </template>
      <FastHistory :items="store.history" />
    </BaseCard>
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import { useFastingStore } from '@/stores/fasting'
import { useTimer } from '@/composables/useTimer'

import BaseCard         from '@/components/ui/BaseCard.vue'
import BaseButton       from '@/components/ui/BaseButton.vue'
import StatPill         from '@/components/ui/StatPill.vue'
import RingTimer        from '@/components/fasting/RingTimer.vue'
import ProtocolSelector from '@/components/fasting/ProtocolSelector.vue'
import FastHistory      from '@/components/fasting/FastHistory.vue'

const store = useFastingStore()
const { formatDuration } = useTimer()

onMounted(() => store.resumeIfActive())
</script>

<style scoped>
/* ── TOAST ── */
.toast {
  display: flex; align-items: center; gap: 14px;
  padding: 16px 20px; border-radius: var(--radius);
  background: #0d2e18;
  border: 1px solid var(--green-dim);
  box-shadow: 0 0 24px var(--green-glow);
  cursor: pointer;
}
.toast-icon  { font-size: 1.6rem; flex-shrink: 0; }
.toast-title { font-family: var(--font-head); font-size: 1rem; font-weight: 700; color: var(--green); letter-spacing: 1px; }
.toast-sub   { font-size: .8rem; color: var(--text-dim); margin-top: 2px; }
.toast-close { margin-left: auto; color: var(--muted); font-size: .9rem; flex-shrink: 0; }

.toast-enter-active { transition: all .35s cubic-bezier(.34,1.56,.64,1); }
.toast-leave-active { transition: all .2s ease; }
.toast-enter-from   { opacity: 0; transform: translateY(-12px) scale(.97); }
.toast-leave-to     { opacity: 0; transform: translateY(-8px); }
</style>

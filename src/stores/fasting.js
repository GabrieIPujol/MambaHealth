import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const PROTOCOLS = [
  { id: '16-8', label: '16:8', hours: 16, desc: 'Leão — 16h jejum / 8h alimentação' },
  { id: '18-6', label: '18:6', hours: 18, desc: 'Guerreiro — 18h jejum / 6h alimentação' },
  { id: '20-4', label: '20:4', hours: 20, desc: 'Avançado — 20h jejum / 4h alimentação' },
  { id: 'custom', label: 'Customizado', hours: null, desc: 'Defina suas horas' },
]

const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }
const persist = (k, v) => localStorage.setItem(k, JSON.stringify(v))

const todayStr = () => new Date().toISOString().slice(0, 10)
const dayLabel = d => {
  const dt = new Date(d + 'T12:00:00')
  return dt.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' })
}

export const useFastingStore = defineStore('fasting', () => {
  /* ── persisted state ── */
  const saved = load('mb_fasting', {})

  const active       = ref(saved.active       ?? false)
  const startTime    = ref(saved.startTime     ?? null)
  const elapsed      = ref(saved.elapsed       ?? 0)
  const protocolId   = ref(saved.protocolId    ?? '16-8')
  const customHours  = ref(saved.customHours   ?? 16)
  const history      = ref(load('mb_fast_history', []))

  /* ── computed ── */
  const protocol = computed(() => PROTOCOLS.find(p => p.id === protocolId.value) ?? PROTOCOLS[0])

  const targetSeconds = computed(() => {
    const h = protocolId.value === 'custom' ? customHours.value : protocol.value.hours
    return (h ?? 16) * 3600
  })

  const ringPct = computed(() => Math.min(100, Math.round(elapsed.value / targetSeconds.value * 100)))

  const recentHistory = computed(() => {
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - 7)
    return history.value.filter(f => new Date(f.date) >= cutoff)
  })

  /* ── estado de conclusão automática ── */
  const justCompleted = ref(false)

  /* ── timer ── */
  let _interval = null

  function _startInterval() {
    if (_interval) return
    _interval = setInterval(() => {
      if (!active.value) return
      elapsed.value = Math.floor((Date.now() - startTime.value) / 1000)
      _save()

      // auto-finaliza ao atingir a meta
      if (elapsed.value >= targetSeconds.value) {
        clearInterval(_interval)
        _interval = null
        justCompleted.value = true
        stop()
      }
    }, 1000)
  }

  function _save() {
    persist('mb_fasting', {
      active: active.value,
      startTime: startTime.value,
      elapsed: elapsed.value,
      protocolId: protocolId.value,
      customHours: customHours.value,
    })
  }

  /* ── actions ── */
  function start() {
    active.value = true
    elapsed.value = 0
    startTime.value = Date.now()
    _save()
    _startInterval()
  }

  function stop() {
    const completed = elapsed.value >= targetSeconds.value
    const label = protocolId.value === 'custom'
      ? `Customizado (${customHours.value}h)`
      : protocol.value.label

    history.value.push({
      date: todayStr(),
      dateLabel: dayLabel(todayStr()),
      protocol: label,
      duration: elapsed.value,
      completed,
    })
    persist('mb_fast_history', history.value)

    active.value    = false
    elapsed.value   = 0
    startTime.value = null
    _save()
  }

  function selectProtocol(id) {
    if (active.value) return
    protocolId.value = id
    _save()
  }

  function clearHistory() {
    history.value = []
    persist('mb_fast_history', [])
  }

  function resumeIfActive() {
    if (active.value && startTime.value) {
      elapsed.value = Math.floor((Date.now() - startTime.value) / 1000)
      _startInterval()
    }
  }

  return {
    active, elapsed, protocolId, customHours, justCompleted,
    protocol, targetSeconds, ringPct, history, recentHistory,
    PROTOCOLS,
    start, stop, selectProtocol, clearHistory, resumeIfActive,
  }
})

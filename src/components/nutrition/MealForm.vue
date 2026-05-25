<template>
  <!-- Formulário para adicionar uma nova refeição ao diário. -->
  <div class="stack">
    <div class="grid-2">
      <BaseInput label="Nome da refeição" v-model="form.name" placeholder="Ex: Frango grelhado..." />
      <BaseInput label="Tipo" type="select" v-model="form.type">
        <option v-for="t in TYPES" :key="t" :value="t">{{ t }}</option>
      </BaseInput>
    </div>

    <div class="grid-2">
      <BaseInput label="Calorias (kcal)" type="number" v-model="form.cal" placeholder="0" min="0" />
      <BaseInput label="Peso total (g)" type="number" v-model="form.weight" placeholder="0" min="0" />
    </div>

    <div class="macros-section">
      <p class="macros-label">Macros (g)</p>
      <div class="grid-3-macros">
        <div class="macro-field">
          <span class="macro-dot" style="background:#39ff6a"></span>
          <BaseInput label="Proteína" type="number" v-model="form.macros.p" placeholder="0" min="0" />
        </div>
        <div class="macro-field">
          <span class="macro-dot" style="background:#ffd166"></span>
          <BaseInput label="Carboidrato" type="number" v-model="form.macros.c" placeholder="0" min="0" />
        </div>
        <div class="macro-field">
          <span class="macro-dot" style="background:#ff6b6b"></span>
          <BaseInput label="Gordura" type="number" v-model="form.macros.f" placeholder="0" min="0" />
        </div>
      </div>

      <div v-if="macroTotal > 0" class="macro-bar-wrap">
        <div class="macro-bar">
          <div class="macro-bar-seg seg-p" :style="{ width: macroP + '%' }" />
          <div class="macro-bar-seg seg-c" :style="{ width: macroC + '%' }" />
          <div class="macro-bar-seg seg-f" :style="{ width: macroF + '%' }" />
        </div>
        <div class="macro-bar-labels">
          <span>P {{ macroP }}%</span>
          <span>C {{ macroC }}%</span>
          <span>G {{ macroF }}%</span>
        </div>
      </div>
    </div>

    <BaseButton variant="green" full @click="submit">ADICIONAR</BaseButton>
  </div>
</template>

<script setup>
  import { reactive, computed } from 'vue'
  import BaseInput  from '@/components/ui/BaseInput.vue'
  import BaseButton from '@/components/ui/BaseButton.vue'

  const emit = defineEmits(['add'])

  // Tipos de refeição disponíveis no formulário.
  const TYPES = ['Café da manhã', 'Almoço', 'Lanche', 'Jantar', 'Outro']

  // Estado local do formulário.
  const form = reactive({
    name: '', type: 'Almoço', cal: '', weight: '',
    macros: { p: '', c: '', f: '' },
  })

  // Cálculo da distribuição percentual dos macros.
  const macroTotal = computed(() => Number(form.macros.p) + Number(form.macros.c) + Number(form.macros.f))
  const macroP = computed(() => macroTotal.value ? Math.round(Number(form.macros.p) / macroTotal.value * 100) : 0)
  const macroC = computed(() => macroTotal.value ? Math.round(Number(form.macros.c) / macroTotal.value * 100) : 0)
  const macroF = computed(() => macroTotal.value ? 100 - macroP.value - macroC.value : 0)

  // Envia o evento de adicionar refeição e limpa o formulário.
  function submit() {
    if (!form.name || !form.cal) return
    emit('add', {
      name:   form.name,
      type:   form.type,
      cal:    Number(form.cal),
      weight: Number(form.weight) || null,
      macros: {
        p: Number(form.macros.p) || 0,
        c: Number(form.macros.c) || 0,
        f: Number(form.macros.f) || 0,
      },
    })
    form.name = ''; form.cal = ''; form.weight = ''
    form.macros.p = ''; form.macros.c = ''; form.macros.f = ''
  }
</script>

<style scoped>
  .stack { 
    display: flex; 
    flex-direction: column;
    gap: 14px; 
  }

  .macros-section { 
    display: flex; 
    flex-direction: column; 
    gap: 10px; 
  }

  .macros-label { 
    font-size: .78rem; 
    color: var(--text-dim); 
    letter-spacing: .5px; 
  }

  .grid-3-macros {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .macro-field { 
    display: flex; 
    flex-direction: column; 
    gap: 4px; 
  }

  .macro-dot {
    width: 8px; 
    height: 8px; 
    border-radius: 50%;
    display: inline-block; 
    margin-bottom: 2px;
  }

  .macro-bar-wrap { 
    display: flex; 
    flex-direction: column; 
    gap: 6px; 
  }

  .macro-bar {
    display: flex; 
    height: 6px; 
    border-radius: 99px; 
    overflow: hidden;
    background: var(--border);
  }

  .macro-bar-seg { 
    height: 100%; 
    transition: width .4s ease;
  }

  .seg-p { 
    background: #39ff6a; 
  }

  .seg-c { 
    background: #ffd166; 
  }

  .seg-f { 
    background: #ff6b6b; 
  }

  .macro-bar-labels {
    display: flex; 
    justify-content: space-between;
    font-size: .7rem; 
    color: var(--text-dim);
  }

  @media (max-width: 480px) {
    .grid-3-macros { 
      grid-template-columns: 1fr 1fr; 
    }
  }
</style>

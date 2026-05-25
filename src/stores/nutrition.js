// Store de Nutrição com estado compartilhado e persistência local.
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Função auxiliar para ler valores do localStorage e tratar JSON inválido.
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }
// Função auxiliar para salvar valores no localStorage.
const persist = (k, v) => localStorage.setItem(k, JSON.stringify(v))
// Retorna a string da data atual no formato YYYY-MM-DD.
const todayStr = () => new Date().toISOString().slice(0, 10)

export const useNutritionStore = defineStore('nutrition', () => {
  // Estado reativo para meta calórica, macros e refeições registradas.
  const goal = ref(load('mb_goal',   2000))
  const macros = ref(load('mb_macros', { p: 150, c: 200, f: 65 }))
  const meals = ref(load('mb_meals',  {})) 

  // Computed que retorna as refeições do dia atual.
  const todayMeals = computed(() => meals.value[todayStr()] ?? [])

  // Total de calorias consumidas hoje.
  const totalToday = computed(() =>
    todayMeals.value.reduce((s, m) => s + m.cal, 0)
  )

  // Porcentagem da meta atingida hoje.
  const calPct = computed(() =>
    Math.round((totalToday.value / goal.value) * 100)
  )

  // Calorias restantes até a meta diária.
  const remaining = computed(() => goal.value - totalToday.value)

  // Registra uma nova refeição no dia atual e salva no localStorage.
  function addMeal({ name, type, cal, weight = null, macros = null }) {
    const today = todayStr()
    if (!meals.value[today]) meals.value[today] = []
    meals.value[today].push({
      id: Date.now(),
      name,
      type,
      cal: Number(cal),
      weight,
      macros,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    })
    persist('mb_meals', meals.value)
  }

  // Remove uma refeição pelo id da lista de hoje.
  function removeMeal(id) {
    const today = todayStr()
    meals.value[today] = (meals.value[today] ?? []).filter(m => m.id !== id)
    persist('mb_meals', meals.value)
  }

  // Atualiza a meta calórica diária e persiste.
  function setGoal(kcal) {
    goal.value = kcal
    persist('mb_goal', kcal)
  }

  // Atualiza a distribuição de macros e persiste.
  function setMacros(m) {
    macros.value = { ...m }
    persist('mb_macros', macros.value)
  }

  // Retorna refeições de um dia específico.
  function getMealsForDay(dateStr) {
    return meals.value[dateStr] ?? []
  }

  // Calcula calorias totais de um dia específico.
  function getCaloriesForDay(dateStr) {
    return (meals.value[dateStr] ?? []).reduce((s, m) => s + m.cal, 0)
  }

  return {
    goal, macros, meals,
    todayMeals, totalToday, calPct, remaining,
    addMeal, removeMeal, setGoal, setMacros,
    getMealsForDay, getCaloriesForDay,
  }
})

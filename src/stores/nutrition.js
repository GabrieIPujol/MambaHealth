import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const load    = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }
const persist = (k, v) => localStorage.setItem(k, JSON.stringify(v))
const todayStr = () => new Date().toISOString().slice(0, 10)

export const useNutritionStore = defineStore('nutrition', () => {
  /* ── persisted state ── */
  const goal   = ref(load('mb_goal',   2000))
  const macros = ref(load('mb_macros', { p: 150, c: 200, f: 65 }))
  const meals  = ref(load('mb_meals',  {})) // { 'YYYY-MM-DD': Meal[] }

  /* ── computed ── */
  const todayMeals = computed(() => meals.value[todayStr()] ?? [])

  const totalToday = computed(() =>
    todayMeals.value.reduce((s, m) => s + m.cal, 0)
  )

  const calPct = computed(() =>
    Math.round((totalToday.value / goal.value) * 100)
  )

  const remaining = computed(() => goal.value - totalToday.value)

  /* ── actions ── */
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

  function removeMeal(id) {
    const today = todayStr()
    meals.value[today] = (meals.value[today] ?? []).filter(m => m.id !== id)
    persist('mb_meals', meals.value)
  }

  function setGoal(kcal) {
    goal.value = kcal
    persist('mb_goal', kcal)
  }

  function setMacros(m) {
    macros.value = { ...m }
    persist('mb_macros', macros.value)
  }

  function getMealsForDay(dateStr) {
    return meals.value[dateStr] ?? []
  }

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

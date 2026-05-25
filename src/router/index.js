// Importa helpers do Vue Router para criar o roteador.
import { createRouter, createWebHashHistory } from 'vue-router'
// Importa as views principais da aplicação.
import FastingView   from '@/views/FastingView.vue'
import NutritionView from '@/views/NutritionView.vue'
import DashboardView from '@/views/DashboardView.vue'

// Define as rotas disponíveis na aplicação.
const routes = [
  { path: '/', component: FastingView, name: 'fasting' },
  { path: '/nutricao', component: NutritionView, name: 'nutrition' },
  { path: '/dashboard', component: DashboardView, name: 'dashboard' },
]

// Cria o roteador usando histórico hash.
export default createRouter({
  history: createWebHashHistory(),
  routes,
})

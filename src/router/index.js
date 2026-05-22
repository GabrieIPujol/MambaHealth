import { createRouter, createWebHashHistory } from 'vue-router'
import FastingView   from '@/views/FastingView.vue'
import NutritionView from '@/views/NutritionView.vue'
import DashboardView from '@/views/DashboardView.vue'

const routes = [
  { path: '/',           component: FastingView,   name: 'fasting'   },
  { path: '/nutricao',   component: NutritionView, name: 'nutrition' },
  { path: '/dashboard',  component: DashboardView, name: 'dashboard' },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})

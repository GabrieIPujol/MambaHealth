<template>
  <main class="view">
    <!-- Cartão com a meta calórica do dia e indicadores de consumo. -->
    <BaseCard title="🔥 Meta Calórica">
      <template #actions>
        <BaseButton variant="outline" sm @click="modalOpen = true"
          >Editar Meta</BaseButton
        >
      </template>

      <CalorieRing :consumed="store.totalToday" :goal="store.goal" />
      <ProgressBar :pct="store.calPct" style="margin-top: 16px" />
      <MacroRow :macros="store.macros" style="margin-top: 14px" />
    </BaseCard>

    <!-- Formulário para registrar nova refeição. -->
    <BaseCard title="➕ Registrar Refeição">
      <MealForm @add="store.addMeal($event)" />
    </BaseCard>

    <!-- Lista das refeições registradas para o dia atual. -->
    <BaseCard :title="`🍽 Refeições de Hoje — ${todayLabel}`">
      <MealList :meals="store.todayMeals" @remove="store.removeMeal($event)" />
    </BaseCard>

    <!-- Gráfico de barras mostrando calorias por refeição. -->
    <ChartCard title="📈 Consumo por Refeição (hoje)" :config="mealChartConfig" />

    <!-- Modal para editar metas e macros. -->
    <GoalModal
      :open="modalOpen"
      :goal="store.goal"
      :macros="store.macros"
      @close="modalOpen = false"
      @save="onSaveGoal"
    />
  </main>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useNutritionStore } from "@/stores/nutrition";

  import BaseCard from "@/components/ui/BaseCard.vue";
  import BaseButton from "@/components/ui/BaseButton.vue";
  import ProgressBar from "@/components/ui/ProgressBar.vue";
  import CalorieRing from "@/components/nutrition/CalorieRing.vue";
  import MacroRow from "@/components/nutrition/MacroRow.vue";
  import MealForm from "@/components/nutrition/MealForm.vue";
  import MealList from "@/components/nutrition/MealList.vue";
  import GoalModal from "@/components/nutrition/GoalModal.vue";
  import ChartCard from "@/components/dashboard/ChartCard.vue";

  // Usa a store de nutrição para acesso ao estado e ações.
  const store = useNutritionStore();
  // Controla a exibição do modal de metas.
  const modalOpen = ref(false);

  // Label de data formatada para o título da seção de refeições.
  const todayLabel = computed(() =>
    new Date().toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
    })
  );

  // Configuração do gráfico de calorias por refeição.
  const mealChartConfig = computed(() => ({
    type: "bar",
    data: {
      labels: store.todayMeals.map((m) => m.name),
      datasets: [
        {
          data: store.todayMeals.map((m) => m.cal),
          backgroundColor: "#39ff6a33",
          borderColor: "#39ff6a",
          borderWidth: 1.5,
          borderRadius: 6,
        },
      ],
    },
  }));

  // Salva a meta calórica e macros informadas pelo usuário.
  function onSaveGoal({ goal, macros }) {
    store.setGoal(goal);
    store.setMacros(macros);
    modalOpen.value = false;
  }
</script>

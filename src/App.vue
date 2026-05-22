<template>
  <div id="layout">
    <!-- TOPBAR -->
    <header class="topbar">
      <div class="topbar-logo">⚡ Mamba <span>Health</span></div>
      <div class="topbar-badge">TRACKER</div>
    </header>

    <!-- NAV -->
    <nav class="nav">
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="nav-item"
        active-class="active"
      >
        {{ link.label }}
      </RouterLink>
    </nav>

    <!-- VIEWS -->
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script setup>
const links = [
  { to: '/',          label: 'Jejum'     },
  { to: '/nutricao',  label: 'Nutrição'  },
  { to: '/dashboard', label: 'Dashboard' },
]
</script>

<style scoped>
#layout { min-height: 100vh; display: flex; flex-direction: column; }

/* ── TOPBAR ── */
.topbar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 24px; height: 56px;
  background: var(--surface); border-bottom: 1px solid var(--border);
  position: sticky; top: 0; z-index: 100;
}
.topbar-logo {
  font-family: var(--font-head); font-size: 1.3rem; font-weight: 700;
  color: var(--green); letter-spacing: 2px; text-transform: uppercase;
}
.topbar-logo span { color: var(--text); }
.topbar-badge {
  font-size: .7rem; background: var(--green-glow); color: var(--green);
  border: 1px solid var(--green-dim); border-radius: 4px;
  padding: 2px 8px; letter-spacing: 1px;
}

/* ── NAV ── */
.nav {
  display: flex; gap: 2px;
  background: var(--surface); border-bottom: 1px solid var(--border);
  padding: 0 16px; overflow-x: auto;
}
.nav-item {
  padding: 12px 20px;
  font-family: var(--font-head); font-size: .95rem; font-weight: 600;
  letter-spacing: 1px; text-transform: uppercase;
  color: var(--muted); text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: all .2s; white-space: nowrap;
}
.nav-item:hover { color: var(--text); }
.nav-item.active { color: var(--green); border-bottom-color: var(--green); }

@media (max-width: 600px) {
  .topbar { padding: 0 16px; }
}
</style>

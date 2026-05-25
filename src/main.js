// Importa a API principal do Vue para criar a aplicação.
import { createApp } from 'vue'
// Importa o gerenciador de estado Pinia.
import { createPinia } from 'pinia'
// Importa as rotas definidas no projeto.
import router from './router'
// Importa o componente raiz da aplicação.
import App from './App.vue'
// Carrega os estilos globais da aplicação.
import './styles/global.css'

// Cria a instância da aplicação Vue.
const app = createApp(App)
// Registra o plugin Pinia para gerenciamento de estado.
app.use(createPinia())
// Registra o roteador para navegação entre páginas.
app.use(router)
// Monta a aplicação no elemento com id 'app'.
app.mount('#app')

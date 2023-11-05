import { createApp } from "vue";
import { router, store } from './providers'
import { elementPlus } from './plugins'

import App from './index.vue'

export const app = createApp(App)

app.use(router)
app.use(store)

app.use(elementPlus)
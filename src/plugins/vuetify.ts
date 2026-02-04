import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
    },
    theme: {
        defaultTheme: 'dark',
        themes: {
        dark: {
            dark: true,
            colors: {
            primary: '#646cff',
            surface: '#2b2b2b',
            'on-surface': '#ffffff',
            'surface-variant': '#3a3a3a',
            'on-surface-variant': '#ffffff',
            },
        },
        },
    },
})

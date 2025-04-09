// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint', '@pinia/nuxt'],
    devtools: { enabled: true },
    css: ['~/assets/css/main.css'],
    compatibilityDate: '2024-04-03',
    eslint: {
        config: {
            stylistic: {
                indent: 4,
                quotes: 'single',
                semi: true,
            },
        },
    },
});

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxt/eslint',
        '@pinia/nuxt',
        '@nuxtjs/supabase',
    ],
    devtools: { enabled: true },
    css: ['~/assets/css/tailwind.css'],
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
    supabase: {
        url: process.env.SUPABASE_URL,
        key: process.env.SUPABASE_KEY,
        redirectOptions: {
            login: '/login',
            callback: '/confirm',
            include: undefined,
            exclude: [],
            cookieRedirect: false,
        },
    },
});

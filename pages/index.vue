<template>
    <div>
        <h1 class="headline1">
            Startseite
        </h1>
        <p>Current route: {{ route.path }}</p>
        <a
            href="https://nuxt.com/docs/getting-started/routing"
            target="_blank"
        >Learn more about Nuxt Routing</a>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
</script>

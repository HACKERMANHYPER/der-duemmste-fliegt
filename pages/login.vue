<template>
    <div>
        <h1 class="headline1">
            Login
        </h1>
        <p>Current route: {{ route.path }}</p>
        <p>A Player name from supabase: {{ playerNameFetched }}</p>
        <a
            href="https://nuxt.com/docs/getting-started/routing"
            target="_blank"
        >Learn more about Nuxt Routing</a>
    </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient();

console.log('datafetch:');
const { data: text } = await useAsyncData(
    'player',
    async () => client.from('player').select('nickname'),
    { transform: result => result.data },
);

// Speichere nur den ersten Nickname in playerNameFetched
const playerNameFetched = ref(text.value?.[0]?.nickname || null);

console.log(playerNameFetched.value);

const route = useRoute();

const signOut = async () => {
    const { error } = await client.auth.signOut();
    if (error) console.log(error);
};

onMounted(() => {
    console.log(`the component is now mounted.`);
});
</script>

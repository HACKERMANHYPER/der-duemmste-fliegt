<template>
    <div class="flex w-full justify-around border bg-primary-200 text-primary-600">
        <div class="w-1/2 float-start">
            LOGO
        </div>
        <div>
            <NuxtLink
                to="/"
            >
                Home
            </NuxtLink>
            <NuxtLink
                to="/test"
            >
                Players
            </NuxtLink>
            <NuxtLink
                v-if="currentPlayer"
                to="/login"
                @click="logout"
            >
                Logout
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
const { currentPlayer, logout } = await usePlayer();
</script>

<style scoped></style>

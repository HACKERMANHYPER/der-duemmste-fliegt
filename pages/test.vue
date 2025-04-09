<template>
    <div class="p-4">
        <h2 class="headline2">
            Geschützte Test-Seite
        </h2>
        <p v-if="currentPlayer">
            Eingeloggt als: {{ currentPlayer.nickname }}
        </p>
    </div>
</template>

<script setup lang="ts">
const { currentPlayer } = usePlayer();
</script>

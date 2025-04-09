<template>
    <div>
        <h1 class="headline1">
            Login / Registrierung
        </h1>

        <div v-if="!currentPlayer">
            <!-- Login Formular -->
            <div class="form-group">
                <input
                    v-model="nickname"
                    type="text"
                    placeholder="Nickname eingeben"
                >
                <button @click="handleLogin">
                    Einloggen
                </button>
                <button @click="handleRegister">
                    Neu registrieren
                </button>
                <p
                    v-if="error"
                    class="error"
                >
                    {{ error }}
                </p>
            </div>
        </div>

        <!-- Bereits eingeloggt -->
        <div v-else>
            <p>Eingeloggt als: {{ currentPlayer.nickname }}</p>
            <button @click="handleLogout">
                Ausloggen
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
const { currentPlayer, login, register, logout } = usePlayer();
const nickname = ref('');
const error = ref('');

const handleLogin = async () => {
    if (!nickname.value) {
        error.value = 'Bitte gib einen Nickname ein';
        return;
    }

    const result = await login(nickname.value);
    if (!result.success) {
        error.value = result.error;
    }
    else {
        error.value = '';
        nickname.value = '';
    }
};

const handleRegister = async () => {
    if (!nickname.value) {
        error.value = 'Bitte gib einen Nickname ein';
        return;
    }

    const result = await register(nickname.value);
    if (!result.success) {
        error.value = result.error || 'Registrierung fehlgeschlagen';
    }
    else {
        error.value = '';
        nickname.value = '';
    }
};

const handleLogout = () => {
    logout();
    error.value = '';
};
</script>

<style scoped>
.error {
    color: red;
    margin-top: 0.5rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 300px;
}

input, button {
    color: black;
    margin: 0.5rem 0;
    padding: 0.5rem;
}

button {
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}
</style>

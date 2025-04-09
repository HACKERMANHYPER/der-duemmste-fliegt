import { ref, onMounted } from 'vue';

export const usePlayer = () => {
    const client = useSupabaseClient();
    const currentPlayer = ref(null);

    // Prüfe ob Nickname bereits existiert
    const checkNicknameExists = async (nickname: string) => {
        const { data } = await client
            .from('player')
            .select('*')
            .eq('nickname', nickname)
            .single();
        return !!data;
    };

    const login = async (nickname: string) => {
        try {
            const { data, error } = await client
                .from('player')
                .select('*')
                .eq('nickname', nickname)
                .single();

            if (error) throw error;
            if (!data) return { success: false, error: 'Spieler nicht gefunden' };

            currentPlayer.value = data;
            localStorage.setItem('playerSessionId', data.session_id);
            return { success: true };
        }
        catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Login fehlgeschlagen' };
        }
    };

    const register = async (nickname: string) => {
        try {
            // Prüfe ob Nickname bereits existiert
            const exists = await checkNicknameExists(nickname);
            if (exists) {
                return { success: false, error: 'Dieser Nickname ist bereits vergeben' };
            }

            // Erstelle neuen Spieler
            const { data, error } = await client
                .from('player')
                .insert([{
                    nickname: nickname,
                    session_id: crypto.randomUUID(), // Generiere eine neue session_id
                }])
                .select()
                .single();

            if (error) throw error;

            currentPlayer.value = data;
            localStorage.setItem('playerSessionId', data.session_id);
            return { success: true };
        }
        catch (error) {
            console.error('Register error:', error);
            return { success: false, error: 'Registrierung fehlgeschlagen' };
        }
    };

    const logout = () => {
        currentPlayer.value = null;
        localStorage.removeItem('playerSessionId');
    };

    // Lade gespeicherte Session beim Start
    onMounted(async () => {
        const sessionId = localStorage.getItem('playerSessionId');
        if (sessionId) {
            const { data } = await client
                .from('player')
                .select('*')
                .eq('session_id', sessionId)
                .single();

            if (data) {
                currentPlayer.value = data;
            }
        }
    });

    return {
        currentPlayer,
        login,
        register,
        logout,
    };
};

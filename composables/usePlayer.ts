import { ref } from 'vue';

export const usePlayer = () => {
    // Nutze useState für SSR-Kompatibilität
    const currentPlayer = useState('currentPlayer', () => null);
    const client = useSupabaseClient();

    // Session Management
    const initSession = async () => {
        if (import.meta.client) {
            const sessionId = sessionStorage.getItem('playerSessionId');
            if (sessionId && !currentPlayer.value) {
                const { data } = await client
                    .from('player')
                    .select('*')
                    .eq('session_id', sessionId)
                    .single();

                if (data) {
                    currentPlayer.value = data;
                }
            }
        }
    };

    // Login
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
            if (import.meta.client) {
                sessionStorage.setItem('playerSessionId', data.session_id);
            }
            return { success: true };
        }
        catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Login fehlgeschlagen' };
        }
    };

    // Register
    const register = async (nickname: string) => {
        try {
            const { data: existing } = await client
                .from('player')
                .select('nickname')
                .eq('nickname', nickname)
                .single();

            if (existing) {
                return { success: false, error: 'Nickname bereits vergeben' };
            }

            const { data, error } = await client
                .from('player')
                .insert([{
                    nickname,
                    session_id: crypto.randomUUID(),
                }])
                .select()
                .single();

            if (error) throw error;

            currentPlayer.value = data;
            if (import.meta.client) {
                sessionStorage.setItem('playerSessionId', data.session_id);
            }
            return { success: true };
        }
        catch (error) {
            console.error('Register error:', error);
            return { success: false, error: 'Registrierung fehlgeschlagen' };
        }
    };

    // Logout
    const logout = () => {
        currentPlayer.value = null;
        if (import.meta.client) {
            sessionStorage.removeItem('playerSessionId');
        }
    };
    const checkSession = () => { 
        if (import.meta.client) {
            const sessionId = sessionStorage.getItem('playerSessionId');
            if (sessionId) {
                return true;
            }
        }
        return false;
    }
    // Initialize session on client
    if (import.meta.client) {
        initSession();
    }

    return {
        currentPlayer,
        login,
        register,
        logout,
        checkSession
    };
};

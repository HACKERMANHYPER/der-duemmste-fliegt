export default defineNuxtRouteMiddleware((to) => {
    const { currentPlayer } = usePlayer();

    // Öffentliche Routen, die ohne Auth zugänglich sind
    const publicRoutes = ['/login'];

    // Debug Logging
    console.log('Auth Check:', {
        route: to.path,
        isLoggedIn: !!currentPlayer.value,
        isPublicRoute: publicRoutes.includes(to.path),
    });

    // Erlaube Zugriff auf öffentliche Routen
    if (publicRoutes.includes(to.path)) {
        // Wenn eingeloggt und auf /login, redirecte zur Home
        if (currentPlayer.value && to.path === '/login') {
            return navigateTo('/');
        }
        return;
    }

    // Schütze alle anderen Routen
    if (!currentPlayer.value) {
        console.log('Nicht eingeloggt - Redirect zu /login');
        return navigateTo('/login');
    }
});

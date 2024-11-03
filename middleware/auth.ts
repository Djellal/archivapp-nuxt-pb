export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = usePocketbase();
  
  if (!isAuthenticated.value && to.path !== '/') {
    return navigateTo('/');
  }
});
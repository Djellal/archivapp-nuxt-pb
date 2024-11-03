import PocketBase from 'pocketbase';
import { ref, computed } from 'vue';

export const usePocketbase = () => {
  const config = useRuntimeConfig();
  const pb = new PocketBase(config.public.pocketbaseUrl);
  const currentUser = ref(pb.authStore.model);

  pb.authStore.onChange((auth) => {
    currentUser.value = pb.authStore.model;
  });

  const isAuthenticated = computed(() => pb.authStore.isValid);
  const userRole = computed(() => currentUser.value?.role || 'user');

  const login = async (email: string, password: string) => {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password);
      return authData;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    pb.authStore.clear();
  };

  return {
    pb,
    currentUser,
    isAuthenticated,
    userRole,
    login,
    logout
  };
};
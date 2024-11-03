<template>
  <div class="max-w-md mx-auto mt-8">
    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold">{{ $t('common.login') }}</h2>
      </template>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <UFormGroup :label="$t('common.email')">
          <UInput
            v-model="email"
            type="email"
            required
          />
        </UFormGroup>

        <UFormGroup :label="$t('common.password')">
          <UInput
            v-model="password"
            type="password"
            required
          />
        </UFormGroup>

        <UButton
          type="submit"
          :loading="loading"
          block
        >
          {{ $t('common.login') }}
        </UButton>
      </form>
    </UCard>
  </div>
</template>

<script setup>
const { login } = usePocketbase();
const router = useRouter();

const email = ref('');
const password = ref('');
const loading = ref(false);

const handleSubmit = async () => {
  loading.value = true;
  try {
    await login(email.value, password.value);
    router.push('/');
  } catch (error) {
    console.error('Login error:', error);
  } finally {
    loading.value = false;
  }
};
</script>
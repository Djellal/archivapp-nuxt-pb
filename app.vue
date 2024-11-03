<template>
  <div>
    <UContainer>
      <header class="py-4">
        <nav class="flex justify-between items-center">
          <NuxtLink to="/" class="text-xl font-bold">{{ $t('document.title') }}</NuxtLink>
          <div class="flex items-center gap-4">
            <USelect
              v-model="$i18n.locale"
              :options="['en', 'ar', 'fr']"
              class="w-24"
            />
            <template v-if="isAuthenticated">
              <UButton @click="logout">{{ $t('common.logout') }}</UButton>
            </template>
          </div>
        </nav>
      </header>

      <main>
        <NuxtPage />
      </main>
    </UContainer>
  </div>
</template>

<script setup>
const { isAuthenticated, logout } = usePocketbase();
</script>
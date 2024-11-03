<template>
  <div>
    <template v-if="!isAuthenticated">
      <LoginForm />
    </template>
    <template v-else>
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold">{{ $t('document.title') }}</h1>
          <UButton
            v-if="canEdit"
            :to="'/documents/new'"
            icon="i-heroicons-plus"
          >
            {{ $t('document.new') }}
          </UButton>
        </div>
        <DocumentList />
      </div>
    </template>
  </div>
</template>

<script setup>
const { isAuthenticated } = usePocketbase();
const { canEdit } = useDocuments();
</script>
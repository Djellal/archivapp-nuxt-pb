<template>
  <div class="space-y-4">
    <UInput
      v-model="searchQuery"
      :placeholder="$t('common.search')"
      icon="i-heroicons-magnifying-glass"
    />

    <div class="grid gap-4">
      <UCard v-for="doc in documents" :key="doc.id">
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold">{{ doc.code }}</h3>
            <UBadge>{{ doc.category }}</UBadge>
          </div>
        </template>

        <p>{{ doc.description }}</p>

        <template #footer>
          <div class="flex justify-between items-center">
            <div class="flex gap-2">
              <UButton
                icon="i-heroicons-eye"
                variant="ghost"
                :to="`/documents/${doc.id}`"
              >
                {{ $t('common.view') }}
              </UButton>
              <template v-if="canEdit">
                <UButton
                  icon="i-heroicons-pencil"
                  variant="ghost"
                  :to="`/documents/${doc.id}/edit`"
                >
                  {{ $t('common.edit') }}
                </UButton>
              </template>
              <template v-if="canDelete">
                <UButton
                  icon="i-heroicons-trash"
                  variant="ghost"
                  color="red"
                  @click="confirmDelete(doc.id)"
                >
                  {{ $t('common.delete') }}
                </UButton>
              </template>
            </div>
            <UButton
              icon="i-heroicons-share"
              variant="ghost"
              @click="showShareModal(doc)"
            >
              {{ $t('document.share') }}
            </UButton>
          </div>
        </template>
      </UCard>
    </div>

    <UModal v-model="isShareModalOpen">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">{{ $t('document.share') }}</h3>
        </template>

        <form @submit.prevent="handleShare" class="space-y-4">
          <UFormGroup :label="$t('common.email')">
            <UInput
              v-model="shareEmail"
              type="email"
              required
            />
          </UFormGroup>

          <UButton type="submit" :loading="sharing">
            {{ $t('common.submit') }}
          </UButton>
        </form>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
const {
  documents,
  loading,
  canEdit,
  canDelete,
  fetchDocuments,
  deleteDocument,
  shareDocument
} = useDocuments();

const searchQuery = ref('');
const isShareModalOpen = ref(false);
const shareEmail = ref('');
const selectedDocument = ref(null);
const sharing = ref(false);

watch(searchQuery, async (newValue) => {
  await fetchDocuments(newValue ? `code ~ "${newValue}" || description ~ "${newValue}"` : '');
});

const showShareModal = (doc) => {
  selectedDocument.value = doc;
  isShareModalOpen.value = true;
};

const handleShare = async () => {
  if (!selectedDocument.value) return;
  
  sharing.value = true;
  try {
    await shareDocument(selectedDocument.value.id, shareEmail.value);
    isShareModalOpen.value = false;
    shareEmail.value = '';
  } catch (error) {
    console.error('Share error:', error);
  } finally {
    sharing.value = false;
  }
};

const confirmDelete = async (id) => {
  if (await confirm('Are you sure you want to delete this document?')) {
    await deleteDocument(id);
  }
};

onMounted(() => {
  fetchDocuments();
});
</script>
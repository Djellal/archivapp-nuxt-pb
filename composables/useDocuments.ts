import { ref, computed } from 'vue';
import { usePocketbase } from './usePocketbase';

export const useDocuments = () => {
  const { pb, userRole } = usePocketbase();
  const documents = ref([]);
  const loading = ref(false);

  const canEdit = computed(() => ['admin', 'editor'].includes(userRole.value));
  const canDelete = computed(() => ['admin', 'editor'].includes(userRole.value));
  const canManageUsers = computed(() => userRole.value === 'admin');

  const fetchDocuments = async (filter = '') => {
    loading.value = true;
    try {
      const records = await pb.collection('documents').getList(1, 50, {
        filter,
        sort: '-created',
        expand: 'related_document'
      });
      documents.value = records.items;
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      loading.value = false;
    }
  };

  const createDocument = async (documentData) => {
    try {
      const record = await pb.collection('documents').create(documentData);
      await fetchDocuments();
      return record;
    } catch (error) {
      throw error;
    }
  };

  const updateDocument = async (id, documentData) => {
    try {
      const record = await pb.collection('documents').update(id, documentData);
      await fetchDocuments();
      return record;
    } catch (error) {
      throw error;
    }
  };

  const deleteDocument = async (id) => {
    try {
      await pb.collection('documents').delete(id);
      await fetchDocuments();
    } catch (error) {
      throw error;
    }
  };

  const shareDocument = async (documentId, recipientEmail) => {
    try {
      const shareUrl = `${window.location.origin}/documents/${documentId}`;
      await pb.collection('share_links').create({
        document_id: documentId,
        recipient_email: recipientEmail,
        share_url: shareUrl
      });
      return shareUrl;
    } catch (error) {
      throw error;
    }
  };

  return {
    documents,
    loading,
    canEdit,
    canDelete,
    canManageUsers,
    fetchDocuments,
    createDocument,
    updateDocument,
    deleteDocument,
    shareDocument
  };
};
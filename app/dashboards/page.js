'use client';
import { useApiKeys } from '@/hooks/useApiKeys';
import { 
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import ApiKeyList from '@/components/ApiKeyList';
import CreateApiKeyForm from '@/components/CreateApiKeyForm';

export default function DashboardPage() {
  const { apiKeys, loading, error, createApiKey, deleteApiKey, setError } = useApiKeys();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState(null);

  const copyToClipboard = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      alert('API key copied to clipboard');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy to clipboard');
    }
  };

  const handleDeleteClick = (key) => {
    setKeyToDelete(key);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (keyToDelete) {
      const success = await deleteApiKey(keyToDelete.id);
      if (success) {
        setDeleteModalOpen(false);
        setKeyToDelete(null);
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen">
        <h1 className="text-2xl font-bold mb-8">API Key Management</h1>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-500 rounded-lg">
            {error}
          </div>
        )}

        <CreateApiKeyForm onCreate={createApiKey} loading={loading} />

        <div className="border rounded-lg">
          <h2 className="text-xl p-4 border-b">Your API Keys</h2>
          <ApiKeyList
            apiKeys={apiKeys}
            loading={loading}
            onDelete={handleDeleteClick}
            onCopy={copyToClipboard}
          />
        </div>

        {/* Delete Confirmation Modal */}
        <Transition appear show={deleteModalOpen} as={Fragment}>
          <Dialog 
            as="div" 
            className="relative z-10" 
            onClose={() => setDeleteModalOpen(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <div className="flex items-center gap-3 text-red-600">
                      <ExclamationTriangleIcon className="h-6 w-6" />
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6"
                      >
                        Revoke secret key
                      </Dialog.Title>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm text-gray-500">
                        This API key will immediately be disabled. API requests made using this key will be rejected, which could cause any systems still depending on it to break. Once revoked, you&apos;ll no longer be able to view or modify this API key.
                      </p>
                    </div>

                    <div className="mt-6 flex gap-3 justify-end">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                        onClick={() => setDeleteModalOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        onClick={handleDeleteConfirm}
                      >
                        Revoke key
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </DashboardLayout>
  );
} 
import { useState } from 'react';

export default function CreateApiKeyForm({ onCreate, loading }) {
  const [newKeyName, setNewKeyName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onCreate(newKeyName);
    if (success) {
      setNewKeyName('');
    }
  };

  return (
    <div className="mb-8 p-4 border rounded-lg">
      <h2 className="text-xl mb-4">Create New API Key</h2>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          value={newKeyName}
          onChange={(e) => setNewKeyName(e.target.value)}
          placeholder="Enter key name"
          className="px-4 py-2 border rounded-lg flex-1"
          disabled={loading}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Key'}
        </button>
      </form>
    </div>
  );
} 
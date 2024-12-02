import { useState } from 'react';
import {
  ClipboardDocumentIcon,
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

export default function ApiKeyList({ 
  apiKeys, 
  loading, 
  onDelete, 
  onCopy 
}) {
  const [revealedKeys, setRevealedKeys] = useState(new Set());

  const toggleKeyVisibility = (keyId) => {
    setRevealedKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  };

  const maskKey = (key) => {
    const prefix = 'app6s_';
    const uuid = key.slice(prefix.length);
    return `${prefix}${'*'.repeat(uuid.length)}`;
  };

  if (loading && apiKeys.length === 0) {
    return <p className="p-4 text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="divide-y">
      {apiKeys.map((key) => (
        <div key={key.id} className="p-4 flex justify-between items-center">
          <div>
            <p className="font-semibold">{key.name}</p>
            <p className="text-sm text-gray-500 font-mono">
              {revealedKeys.has(key.id) ? key.value : maskKey(key.value)}
            </p>
            <div className="flex gap-4 text-xs text-gray-400">
              <p>Created: {new Date(key.created_at).toLocaleDateString()}</p>
              <p>Usage: {key.usage}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onCopy(key.value)}
              className="p-2 text-gray-500 border border-gray-500 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
              disabled={loading}
              title="Copy to clipboard"
            >
              <ClipboardDocumentIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleKeyVisibility(key.id)}
              className="p-2 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-50 disabled:opacity-50 transition-colors"
              disabled={loading}
              title={revealedKeys.has(key.id) ? "Hide API key" : "Reveal API key"}
            >
              {revealedKeys.has(key.id) ? (
                <EyeSlashIcon className="w-4 h-4" />
              ) : (
                <EyeIcon className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => onDelete(key)}
              className="p-2 text-red-500 border border-red-500 rounded-lg hover:bg-red-50 disabled:opacity-50 transition-colors"
              disabled={loading}
              title="Delete API key"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
      {apiKeys.length === 0 && (
        <p className="p-4 text-center text-gray-500">No API keys found</p>
      )}
    </div>
  );
} 
'use client';
import { useState } from 'react';
import { supabase } from '@/utils/supabase';
import DashboardLayout from '@/components/DashboardLayout';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function PlaygroundPage() {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateApiKey = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if the API key exists and is active
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .eq('value', apiKey)
        .eq('active', true)
        .single();

      if (error || !data) {
        toast.error('Invalid API key.', {
          style: {
            border: '1px solid #DC2626',
            padding: '16px',
            color: '#DC2626',
          },
          iconTheme: {
            primary: '#DC2626',
            secondary: '#FFFFFF',
          },
        });
        return;
      }

      // Update usage count
      const { error: updateError } = await supabase
        .from('api_keys')
        .update({ usage: data.usage + 1 })
        .eq('id', data.id);

      if (updateError) throw updateError;

      toast.success('Valid API key, redirecting to protected route...', {
        style: {
          border: '1px solid #059669',
          padding: '16px',
          color: '#059669',
        },
        iconTheme: {
          primary: '#059669',
          secondary: '#FFFFFF',
        },
      });

      // Redirect to protected route after a short delay to show the success message
      setTimeout(() => {
        router.push('/protected');
      }, 1500);

    } catch (error) {
      console.error('Error validating API key:', error);
      toast.error('Error validating API key.', {
        style: {
          border: '1px solid #DC2626',
          padding: '16px',
          color: '#DC2626',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen">
        <Toaster position="top-right" />
        
        <h1 className="text-2xl font-bold mb-8">API Playground</h1>
        
        <div className="max-w-2xl">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold mb-4">Test Your API Key</h2>
            <form onSubmit={validateApiKey} className="space-y-4">
              <div>
                <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
                  API Key
                </label>
                <input
                  id="apiKey"
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
                disabled={loading || !apiKey.trim()}
              >
                {loading ? 'Validating...' : 'Validate API Key'}
              </button>
            </form>
          </div>

          <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Note:</h3>
            <p className="text-sm text-gray-600">
              This playground allows you to test your API keys. A successful validation means 
              your key can be used to access protected endpoints. Each validation attempt 
              will increment the usage counter for the API key.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 
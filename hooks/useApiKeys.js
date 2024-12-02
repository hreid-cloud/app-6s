'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import { v4 as uuidv4 } from 'uuid';

export function useApiKeys() {
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApiKeys(data);
    } catch (error) {
      console.error('Error fetching API keys:', error);
      setError('Failed to fetch API keys');
    } finally {
      setLoading(false);
    }
  };

  const createApiKey = async (name) => {
    if (!name.trim()) {
      setError('Please enter a key name');
      return null;
    }

    try {
      setLoading(true);
      const newKey = {
        name: name,
        value: `app6s_${uuidv4()}`,
        usage: 0,
        active: true,
      };

      const { data, error } = await supabase
        .from('api_keys')
        .insert([newKey])
        .select()
        .single();

      if (error) throw error;

      setApiKeys([data, ...apiKeys]);
      return data;
    } catch (error) {
      console.error('Error creating API key:', error);
      setError('Failed to create API key');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteApiKey = async (id) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .match({ id });

      if (error) throw error;

      setApiKeys(apiKeys.filter(key => key.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting API key:', error);
      setError('Failed to delete API key');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    apiKeys,
    loading,
    error,
    createApiKey,
    deleteApiKey,
    setError
  };
} 
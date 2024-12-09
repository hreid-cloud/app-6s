import { supabase } from '@/utils/supabase';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const apiKey = request.headers.get('x-api-key');

    if (!apiKey) {
      return NextResponse.json({ error: 'API key is required' }, { status: 400 });
    }

    // Check if the API key exists and is active
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('value', apiKey)
      .eq('active', true)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
    }

    // Update usage count
    const { error: updateError } = await supabase
      .from('api_keys')
      .update({ usage: data.usage + 1 })
      .eq('id', data.id);

    if (updateError) {
      throw updateError;
    }

    // TODO: Add your GitHub summarizer logic here
    // For now, just return a success message
    return NextResponse.json({ 
      success: true, 
      message: 'API key validated successfully. Ready to process GitHub summary request.' 
    });

  } catch (error) {
    console.error('Error in GitHub summarizer endpoint:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
} 
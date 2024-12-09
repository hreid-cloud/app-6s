import { supabase } from '@/utils/supabase';
import { NextResponse } from 'next/server';
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { RunnableSequence } from "langchain/schema/runnable";
import { StringOutputParser } from "langchain/schema/output_parser";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

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

    // Get GitHub URL from request body
    const { githubUrl } = await request.json();
    if (!githubUrl) {
      return NextResponse.json({ error: 'GitHub URL is required' }, { status: 400 });
    }

    // Extract owner and repo from GitHub URL
    const urlParts = githubUrl.replace('https://github.com/', '').split('/');
    const owner = urlParts[0];
    const repo = urlParts[1];

    // Fetch README content from GitHub API
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3.raw'
        }
      }
    );

    if (!response.ok) {
      return NextResponse.json({ 
        error: 'Failed to fetch README from GitHub'
      }, { status: response.status });
    }

    const readmeContent = await response.text();
    
    // Create parser for structured output
    const parser = StructuredOutputParser.fromZodSchema(
      z.object({
        summary: z.string().describe("A clear and concise summary of the repository"),
        interestingFacts: z.array(z.string()).describe("A list of interesting technical facts about the repository"),
      })
    );

    // Create the summarization chain with updated prompt
    const prompt = PromptTemplate.fromTemplate(
      `Summarize this github repository:
      
      {readme}
      
      ${parser.getFormatInstructions()}
      
      Provide:
      1. A clear and concise summary that explains the main purpose of the repository, key features, and notable technical details
      2. A list of 3-5 interesting technical facts about the repository`
    );

    const model = new ChatOpenAI({
      temperature: 0.3,
      modelName: "gpt-3.5-turbo",
    });

    const chain = RunnableSequence.from([
      {
        readme: (input: { readme: string }) => input.readme,
      },
      prompt,
      model,
      parser,
    ]);

    // Run the chain
    const result = await chain.invoke({
      readme: readmeContent,
    });

    return NextResponse.json({ 
      success: true,
      summary: result.summary,
      interestingFacts: result.interestingFacts
    });

  } catch (error) {
    console.error('Error in GitHub summarizer endpoint:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
} 
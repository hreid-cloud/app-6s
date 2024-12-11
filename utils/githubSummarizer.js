import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate} from "@langchain/core/prompts";
import { z } from "zod";
import { RunnableSequence } from "@langchain/core/runnables";

export async function summarizeGithubRepo(readmeContent) {
  if (!readmeContent) {
    throw new Error("README content is required but was not provided");
  }

  // Create parser for structured output
  const responseSchema = z.object({
      summary: z.string().describe("A clear and concise summary of the repository"),
      interestingFacts: z.array(z.string()).describe("A list of interesting technical facts about the repository"),
    });

  const model = new ChatOpenAI({ 
    temperature: 0.0,
    openAIApiKey: process.env.OPEN_AI_KEY 
  }).withStructuredOutput(responseSchema);
  // Format instructions for the model
  const prompt = ChatPromptTemplate.fromTemplate(`

    Summarize this github repository from this README file content:
    
    {readmeContent}
    
    Provide:
    1. A clear and concise summary that explains the main purpose of the repository, key features, and notable technical details
    2. A list of 3-5 interesting technical facts about the repository`
  );

  const chain = RunnableSequence.from([prompt, model]);

  // Run the chain
  return await chain.invoke({ readmeContent});
}
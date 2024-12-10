import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate} from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";

export async function summarizeGithubRepo(readmeContent) {
  if (!readmeContent) {
    throw new Error("README content is required but was not provided");
  }

  // Create parser for structured output
  const parser = StructuredOutputParser.fromZodSchema(
    z.object({
      summary: z.string().describe("A clear and concise summary of the repository"),
      interestingFacts: z.array(z.string()).describe("A list of interesting technical facts about the repository"),
    })
  );

  // Format instructions for the model
  const formatInstructions = parser.getFormatInstructions();

  // Create the summarization chain with updated prompt
  const prompt = ChatPromptTemplate.fromTemplate(
    `Summarize this github repository from this README file content:
    
    {readmeContent}
    
    {format_instructions}
    
    Provide:
    1. A clear and concise summary that explains the main purpose of the repository, key features, and notable technical details
    2. A list of 3-5 interesting technical facts about the repository`
  );

  const model = new ChatOpenAI({ 
    temperature: 0.0,
    openAIApiKey: process.env.OPEN_AI_KEY 
  });

  const chain = prompt.pipe(model).pipe(parser);

  // Run the chain
  return await chain.invoke({
    readmeContent: readmeContent,
    format_instructions: formatInstructions,
  });
} 
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/prompts";
import { RunnableSequence } from "@langchain/schema/runnable";
import { StructuredOutputParser } from "@langchain/output_parsers";
import { z } from "zod";

export async function summarizeGithubRepo(readmeContent) {
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
    temperature: 0.0,
    modelName: "gpt-3.5-turbo",
  });

  const chain = RunnableSequence.from([
    {
      readme: (input) => input.readme,
    },
    prompt,
    model,
    parser,
  ]);

  // Run the chain
  return await chain.invoke({
    readme: readmeContent,
  });
} 
import Anthropic from "@anthropic-ai/sdk";
import type { TopicMatch } from "./search";

type UserInput = {
  confidence: string;
  trippedUp: string;
  timeAvailable: string;
};

export async function generateExplanation(
  userInput: UserInput,
  matchedTopic: TopicMatch
): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing environment variable ANTHROPIC_API_KEY. Set it in .env.local (see .env.example)."
    );
  }

  const anthropic = new Anthropic({ apiKey });

  const prompt = `A learner is deciding what to study next.

Their self-reported confidence level: ${userInput.confidence}
What tripped them up recently: "${userInput.trippedUp}"
Time available right now: ${userInput.timeAvailable} minutes

Based on this, we recommended the topic "${matchedTopic.title}" (difficulty: ${matchedTopic.difficulty}).
Topic description: ${matchedTopic.description}

Write a short (3-5 sentence), encouraging, and specific explanation of why this topic is a good thing for this learner to review next, given what they said. Speak directly to them. Return only the explanation text, with no preamble or headers.`;

  const message = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 300,
    messages: [{ role: "user", content: prompt }],
  });

  const textBlock = message.content.find((block) => block.type === "text");
  return textBlock ? textBlock.text.trim() : "";
}

import { generateExplanation } from "../lib/generate";
import type { TopicMatch } from "../lib/search";

async function main() {
  const userInput = {
    confidence: "low",
    trippedUp: "I keep struggling with problems about contiguous subarrays",
    timeAvailable: "30",
  };

  const matchedTopic: TopicMatch = {
    id: "sliding-window",
    title: "Sliding Window",
    description:
      "Sliding window is a technique for problems that ask about contiguous subarrays or substrings, such as the longest substring without repeating characters or the smallest subarray with a given sum. Instead of recomputing a window from scratch, you incrementally expand and shrink its boundaries, keeping the work close to linear time. It's a natural next step after two pointers and shows up constantly in string and array problems.",
    tags: ["arrays", "strings", "sliding-window"],
    difficulty: "medium",
    similarity: 0.3407,
  };

  const explanation = await generateExplanation(userInput, matchedTopic);

  console.log("Explanation:\n");
  console.log(explanation);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

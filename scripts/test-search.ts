import { searchTopics } from "../lib/search";

async function main() {
  const query =
    "I keep struggling with problems about contiguous subarrays and I have 30 minutes";

  const results = await searchTopics(query);

  console.log(`Query: "${query}"\n`);
  console.log("Top matches:");
  for (const result of results) {
    console.log(`- ${result.title} (similarity: ${result.similarity.toFixed(4)})`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

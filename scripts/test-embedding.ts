import { getEmbedding } from "../lib/embeddings";

async function main() {
  const embedding = await getEmbedding(
    "Sliding window is useful for finding the longest substring without repeating characters."
  );

  console.log("Embedding length:", embedding.length);
  console.log("First 5 values:", embedding.slice(0, 5));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

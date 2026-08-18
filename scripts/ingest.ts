import { topics } from "../data/topics";
import { getEmbedding } from "../lib/embeddings";
import { supabase } from "../lib/supabase";

async function main() {
  console.log(`Ingesting ${topics.length} topics...`);

  let successCount = 0;

  for (const topic of topics) {
    const textToEmbed = `${topic.title}. ${topic.description} Tags: ${topic.tags.join(", ")}.`;

    const embedding = await getEmbedding(textToEmbed);

    const { error } = await supabase.from("topics").upsert({
      id: topic.id,
      title: topic.title,
      description: topic.description,
      tags: topic.tags,
      difficulty: topic.difficulty,
      embedding,
    });

    if (error) {
      console.error(`✗ Failed to upsert "${topic.title}":`, error.message);
      continue;
    }

    successCount += 1;
    console.log(`✓ Ingested "${topic.title}" (${topic.id})`);
  }

  console.log(`\nDone. ${successCount}/${topics.length} topics ingested successfully.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

import { getEmbedding } from "./embeddings";
import { supabase } from "./supabase";

export type TopicMatch = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  difficulty: "easy" | "medium" | "hard";
  similarity: number;
};

export async function searchTopics(
  queryText: string,
  matchCount: number = 3
): Promise<TopicMatch[]> {
  const queryEmbedding = await getEmbedding(queryText);

  const { data, error } = await supabase.rpc("match_topics", {
    query_embedding: queryEmbedding,
    match_count: matchCount,
  });

  if (error) {
    throw new Error(`match_topics RPC failed: ${error.message}`);
  }

  return (data ?? []) as TopicMatch[];
}

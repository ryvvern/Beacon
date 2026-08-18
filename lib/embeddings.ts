import { pipeline, type FeatureExtractionPipeline } from "@xenova/transformers";

// Module-level singleton so the ~90MB model is downloaded/loaded once per
// process, not on every getEmbedding() call.
let extractorPromise: Promise<FeatureExtractionPipeline> | null = null;

function getExtractor(): Promise<FeatureExtractionPipeline> {
  if (!extractorPromise) {
    extractorPromise = pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    ) as Promise<FeatureExtractionPipeline>;
  }
  return extractorPromise;
}

// all-MiniLM-L6-v2 outputs one 384-dim vector per token; mean pooling
// collapses those into a single sentence-level vector, and normalize
// makes it unit-length so cosine similarity in Supabase is well-behaved.
export async function getEmbedding(text: string): Promise<number[]> {
  const extractor = await getExtractor();
  const output = await extractor(text, { pooling: "mean", normalize: true });
  return Array.from(output.data as Float32Array);
}

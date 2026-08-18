"use client";

import { useState } from "react";
import styles from "./page.module.css";

type Confidence = "low" | "medium" | "high";
type TimeAvailable = "15" | "30" | "60";

type RecommendedTopic = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  difficulty: "easy" | "medium" | "hard";
  similarity: number;
};

export default function TopicForm() {
  const [confidence, setConfidence] = useState<Confidence>("medium");
  const [strugglingWith, setStrugglingWith] = useState("");
  const [timeAvailable, setTimeAvailable] = useState<TimeAvailable>("30");
  const [result, setResult] = useState<RecommendedTopic | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!strugglingWith.trim()) {
      setValidationError("Please tell us what tripped you up recently.");
      return;
    }
    setValidationError(null);

    setIsLoading(true);
    setError(null);
    setResult(null);
    setExplanation(null);

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          confidence,
          trippedUp: strugglingWith,
          timeAvailable,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setResult(data.topic);
      setExplanation(data.explanation);
    } catch (err) {
      console.error("Recommendation request failed:", err);
      setError(
        "Couldn't reach the recommendation service. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.layout}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>01 / Confidence level</span>
          <select
            value={confidence}
            onChange={(e) => setConfidence(e.target.value as Confidence)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>02 / What tripped you up</span>
          <textarea
            value={strugglingWith}
            onChange={(e) => {
              setStrugglingWith(e.target.value);
              if (validationError) setValidationError(null);
            }}
            rows={4}
            placeholder="e.g. I keep struggling with problems about contiguous subarrays"
          />
          {validationError && (
            <span className={styles.fieldError}>{validationError}</span>
          )}
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>03 / Time available</span>
          <select
            value={timeAvailable}
            onChange={(e) => setTimeAvailable(e.target.value as TimeAvailable)}
          >
            <option value="15">15 min</option>
            <option value="30">30 min</option>
            <option value="60">60+ min</option>
          </select>
        </label>

        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          {isLoading ? "Finding your topic..." : "Submit →"}
        </button>

        {isLoading && (
          <p className={styles.loadingText}>
            Finding your topic and writing an explanation, this can take a
            few seconds...
          </p>
        )}
      </form>

      <div className={styles.resultColumn}>
        {error && (
          <div className={styles.errorBox}>
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className={styles.resultBox}>
            <div className={styles.resultHeader}>
              <span className={styles.eyebrow}>Recommended topic</span>
              <span className={styles.difficultyLabel}>
                {result.difficulty}
              </span>
            </div>
            <h2 className={styles.resultTitle}>{result.title}</h2>
            <div className={styles.tagList}>
              {result.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
            <p>{result.description}</p>
            {explanation && (
              <>
                <hr className={styles.divider} />
                <span className={styles.eyebrow}>Why this topic?</span>
                <p>{explanation}</p>
              </>
            )}
          </div>
        )}

        {!result && !error && (
          <div className={styles.placeholderBox}>
            <p>Your recommendation will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

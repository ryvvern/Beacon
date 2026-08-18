import { NextRequest, NextResponse } from "next/server";
import { searchTopics } from "@/lib/search";
import { generateExplanation } from "@/lib/generate";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  const { confidence, trippedUp, timeAvailable } = (body ?? {}) as Record<
    string,
    unknown
  >;

  if (!confidence || !trippedUp || !timeAvailable) {
    return NextResponse.json(
      {
        error:
          "Missing required fields: confidence, trippedUp, and timeAvailable are all required.",
      },
      { status: 400 }
    );
  }

  const queryText = `The user has ${confidence} confidence overall. They said this recently tripped them up: "${trippedUp}". They have ${timeAvailable} minutes available to study right now.`;

  let bestMatch;
  try {
    const matches = await searchTopics(queryText, 1);
    bestMatch = matches[0];
  } catch (error) {
    console.error("searchTopics failed:", error);
    return NextResponse.json(
      {
        error:
          "Something went wrong while finding your recommendation. Please try again.",
      },
      { status: 500 }
    );
  }

  if (!bestMatch) {
    return NextResponse.json(
      { error: "No matching topics found." },
      { status: 404 }
    );
  }

  let explanation: string;
  try {
    explanation = await generateExplanation(
      {
        confidence: confidence as string,
        trippedUp: trippedUp as string,
        timeAvailable: timeAvailable as string,
      },
      bestMatch
    );
  } catch (error) {
    console.error("generateExplanation failed:", error);
    return NextResponse.json(
      {
        error:
          "Something went wrong while generating your recommendation. Please try again.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ topic: bestMatch, explanation });
}

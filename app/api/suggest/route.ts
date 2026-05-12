import { NextResponse } from "next/server";
import { logEvent } from "@/lib/events";
import {
  createFallbackSuggestions,
  parseSuggestRequest
} from "@/lib/suggestions";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const startedAt = Date.now();

  try {
    const payload = await request.json();
    const suggestRequest = parseSuggestRequest(payload);
    const { sessionId, suggestions } = createFallbackSuggestions(suggestRequest);
    const generatedAt = new Date().toISOString();

    logEvent("suggestions_generated", {
      sessionId,
      timestamp: generatedAt,
      occasion: suggestRequest.occasion,
      relationshipStage: suggestRequest.relationshipStage,
      budgetTier: suggestRequest.budgetTier,
      source: "fallback",
      clicked: false,
      shared: false,
      latency_ms: Date.now() - startedAt,
      cards: suggestions.map((suggestion) => ({
        giftType: suggestion.giftType,
        giftArchetype: suggestion.giftArchetype,
        shoppingQuery: suggestion.shoppingQuery,
        safeGift: suggestion.safeGift
      }))
    });

    return NextResponse.json(
      {
        sessionId,
        source: "fallback",
        generatedAt,
        suggestions
      },
      {
        headers: {
          "Cache-Control": "no-store",
          "Server-Timing": `suggest;dur=${Date.now() - startedAt}`
        }
      }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Không thể tạo gợi ý lúc này.";

    logEvent("suggestions_failed", {
      source: "fallback",
      error: message,
      latency_ms: Date.now() - startedAt
    });

    return NextResponse.json(
      { error: message },
      {
        status: 400,
        headers: {
          "Cache-Control": "no-store"
        }
      }
    );
  }
}

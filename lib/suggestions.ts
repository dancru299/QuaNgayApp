import { randomUUID } from "crypto";
import {
  FALLBACK_TEMPLATES,
  KEYWORD_MAP,
  type FallbackTemplate
} from "@/lib/catalog";
import {
  BUDGET_TIERS,
  GIFT_ARCHETYPES,
  OCCASIONS,
  RELATIONSHIP_STAGES,
  type BudgetFit,
  type BudgetTier,
  type GiftArchetype,
  type GiftSuggestion,
  type Occasion,
  type RelationshipStage,
  type SuggestRequest
} from "@/lib/types";

const MAX_NOTE_LENGTH = 500;
const MAX_INTERESTS = 8;

const OCCASION_ARCHETYPES: Record<Occasion, GiftArchetype[]> = {
  valentine: [
    "sentimental",
    "comfort-home",
    "food-cozy",
    "fashion-small",
    "experience-lite"
  ],
  "birthday-lover": [
    "comfort-home",
    "skincare-beauty",
    "mini-tech",
    "hobby-creative",
    "fashion-small"
  ],
  "womens-day": [
    "skincare-beauty",
    "comfort-home",
    "food-cozy",
    "fashion-small",
    "sentimental"
  ],
  anniversary: [
    "sentimental",
    "experience-lite",
    "comfort-home",
    "fashion-small",
    "food-cozy"
  ],
  "new-crush": [
    "cute-desk",
    "food-cozy",
    "comfort-home",
    "sentimental",
    "hobby-creative"
  ]
};

const STAGE_ARCHETYPES: Record<RelationshipStage, GiftArchetype[]> = {
  "new-crush": [
    "cute-desk",
    "food-cozy",
    "comfort-home",
    "sentimental"
  ],
  dating: [
    "comfort-home",
    "food-cozy",
    "fashion-small",
    "mini-tech",
    "skincare-beauty"
  ],
  longterm: [
    "experience-lite",
    "sentimental",
    "comfort-home",
    "mini-tech",
    "wellness-active"
  ],
  married: [
    "experience-lite",
    "comfort-home",
    "wellness-active",
    "skincare-beauty",
    "sentimental"
  ]
};

const INTEREST_ARCHETYPE_MAP: Record<string, GiftArchetype[]> = {
  "Decor phòng": ["comfort-home", "cute-desk"],
  "Làm đẹp": ["skincare-beauty", "fashion-small"],
  "Cà phê / trà": ["food-cozy", "comfort-home"],
  "Đồ cute": ["cute-desk", "sentimental"],
  "Công nghệ": ["mini-tech", "cute-desk"],
  "Thể thao": ["wellness-active", "mini-tech"],
  "Viết lách": ["hobby-creative", "sentimental"],
  "Nấu ăn": ["experience-lite", "food-cozy"],
  "Âm nhạc": ["mini-tech", "experience-lite"],
  "Du lịch": ["experience-lite", "fashion-small"]
};

const BUDGET_FIT: Record<BudgetTier, BudgetFit> = {
  under200k: "tight",
  "200-500k": "medium",
  "500k-1m": "medium",
  over1m: "generous"
};

export function parseSuggestRequest(input: unknown): SuggestRequest {
  if (!isRecord(input)) {
    throw new Error("Payload không hợp lệ.");
  }

  const occasion = parseEnum(input.occasion, OCCASIONS, "occasion");
  const relationshipStage = parseEnum(
    input.relationshipStage,
    RELATIONSHIP_STAGES,
    "relationshipStage"
  );
  const budgetTier = parseEnum(input.budgetTier, BUDGET_TIERS, "budgetTier");
  const recipientAge = sanitizeText(input.recipientAge, 40);
  const note = sanitizeText(input.note, MAX_NOTE_LENGTH);
  const interests = Array.isArray(input.interests)
    ? input.interests
        .filter((item): item is string => typeof item === "string")
        .map((item) => sanitizeText(item, 32))
        .filter(Boolean)
        .slice(0, MAX_INTERESTS)
    : [];

  if (!recipientAge) {
    throw new Error("Vui lòng chọn tuổi người nhận.");
  }

  return {
    occasion,
    relationshipStage,
    recipientAge,
    budgetTier,
    interests,
    note
  };
}

export function createFallbackSuggestions(
  request: SuggestRequest,
  sessionId = randomUUID()
): { sessionId: string; suggestions: GiftSuggestion[] } {
  const rankedArchetypes = rankArchetypes(request);
  const selected = selectTemplates(rankedArchetypes, request.budgetTier, 6);
  const suggestions = selected.map((template, index) =>
    toGiftSuggestion(template, request, sessionId, index)
  );

  return {
    sessionId,
    suggestions
  };
}

function rankArchetypes(request: SuggestRequest): GiftArchetype[] {
  const score = new Map<GiftArchetype, number>(
    GIFT_ARCHETYPES.map((archetype) => [archetype, 0])
  );

  addWeighted(score, OCCASION_ARCHETYPES[request.occasion], 4);
  addWeighted(score, STAGE_ARCHETYPES[request.relationshipStage], 5);

  request.interests.forEach((interest) => {
    const mapped = INTEREST_ARCHETYPE_MAP[interest];
    if (mapped) {
      addWeighted(score, mapped, 3);
    }
  });

  if (/yêu xa|xa nhau|ship|gửi/i.test(request.note)) {
    addWeighted(score, ["comfort-home", "sentimental", "food-cozy"], 3);
  }

  if (/không sến|mới quen|áp lực|low/i.test(request.note)) {
    addWeighted(score, ["cute-desk", "food-cozy", "comfort-home"], 3);
  }

  if (/stress|mệt|ngủ|thư giãn/i.test(request.note)) {
    addWeighted(score, ["comfort-home", "wellness-active"], 3);
  }

  return [...score.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([archetype]) => archetype);
}

function selectTemplates(
  rankedArchetypes: GiftArchetype[],
  budgetTier: BudgetTier,
  count: number
) {
  const selected: FallbackTemplate[] = [];
  const selectedIds = new Set<string>();

  for (const archetype of rankedArchetypes) {
    const match = FALLBACK_TEMPLATES.find(
      (template) =>
        template.giftType === archetype &&
        template.budgetTiers.includes(budgetTier) &&
        !selectedIds.has(template.id)
    );
    if (match) {
      selected.push(match);
      selectedIds.add(match.id);
    }
    if (selected.length >= count) {
      return selected;
    }
  }

  for (const archetype of rankedArchetypes) {
    const match = FALLBACK_TEMPLATES.find(
      (template) => template.giftType === archetype && !selectedIds.has(template.id)
    );
    if (match) {
      selected.push(match);
      selectedIds.add(match.id);
    }
    if (selected.length >= count) {
      return selected;
    }
  }

  for (const template of FALLBACK_TEMPLATES) {
    if (!selectedIds.has(template.id)) {
      selected.push(template);
      selectedIds.add(template.id);
    }
    if (selected.length >= count) {
      return selected;
    }
  }

  return selected;
}

function toGiftSuggestion(
  template: FallbackTemplate,
  request: SuggestRequest,
  sessionId: string,
  index: number
): GiftSuggestion {
  const queries = KEYWORD_MAP[template.giftType];
  const shoppingQuery = queries[index % queries.length];
  const searchParams = new URLSearchParams({
    shop: "shopee",
    q: shoppingQuery,
    ref: request.occasion,
    arc: template.giftType,
    session: sessionId,
    gift: template.id,
    source: "fallback"
  });

  return {
    id: template.id,
    emoji: template.emoji,
    idea: template.idea,
    giftType: template.giftType,
    giftArchetype: template.giftType,
    why: template.why,
    safeGift: template.safeGift,
    safetyNote: buildSafetyNote(template.safeGift),
    fitTags: [...template.fitTags, `Fit ${template.priceDisplay}`].slice(0, 4),
    budgetFit: BUDGET_FIT[request.budgetTier],
    priceRange: template.priceRange,
    priceDisplay: template.priceDisplay,
    shoppingQuery,
    shopeeUrl: `/go?${searchParams.toString()}`,
    source: "fallback"
  };
}

function buildSafetyNote(safeGift: boolean) {
  if (safeGift) {
    return "An toàn - dễ nhận, ít fail dù chưa hiểu gu quá sâu.";
  }

  return "Phù hợp nếu bạn đã biết chắc người ấy thích vibe này.";
}

function addWeighted(
  score: Map<GiftArchetype, number>,
  archetypes: GiftArchetype[],
  weight: number
) {
  archetypes.forEach((archetype, index) => {
    score.set(archetype, (score.get(archetype) ?? 0) + weight - index * 0.35);
  });
}

function parseEnum<T extends readonly string[]>(
  value: unknown,
  allowed: T,
  fieldName: string
): T[number] {
  if (typeof value !== "string" || !allowed.includes(value)) {
    throw new Error(`${fieldName} không hợp lệ.`);
  }

  return value as T[number];
}

function sanitizeText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

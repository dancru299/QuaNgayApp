export const OCCASIONS = [
  "valentine",
  "birthday-lover",
  "womens-day",
  "anniversary",
  "new-crush"
] as const;

export type Occasion = (typeof OCCASIONS)[number];

export const RELATIONSHIP_STAGES = [
  "new-crush",
  "dating",
  "longterm",
  "married"
] as const;

export type RelationshipStage = (typeof RELATIONSHIP_STAGES)[number];

export const BUDGET_TIERS = [
  "under200k",
  "200-500k",
  "500k-1m",
  "over1m"
] as const;

export type BudgetTier = (typeof BUDGET_TIERS)[number];

export const GIFT_ARCHETYPES = [
  "comfort-home",
  "cute-desk",
  "skincare-beauty",
  "food-cozy",
  "experience-lite",
  "fashion-small",
  "mini-tech",
  "hobby-creative",
  "wellness-active",
  "sentimental"
] as const;

export type GiftArchetype = (typeof GIFT_ARCHETYPES)[number];

export type BudgetFit = "tight" | "medium" | "generous";
export type SuggestionSource = "ai" | "fallback";

export type SuggestRequest = {
  occasion: Occasion;
  relationshipStage: RelationshipStage;
  recipientAge: string;
  budgetTier: BudgetTier;
  interests: string[];
  note: string;
};

export type GiftSuggestion = {
  id: string;
  emoji: string;
  idea: string;
  giftType: GiftArchetype;
  giftArchetype: GiftArchetype;
  why: string;
  safeGift: boolean;
  safetyNote: string;
  fitTags: string[];
  budgetFit: BudgetFit;
  priceRange: string;
  priceDisplay: string;
  shoppingQuery: string;
  shopeeUrl: string;
  source: SuggestionSource;
};

export type SuggestResponse = {
  sessionId: string;
  source: SuggestionSource;
  generatedAt: string;
  suggestions: GiftSuggestion[];
};

export type EventPayload = {
  sessionId?: string;
  timestamp?: string;
  occasion?: Occasion | string;
  relationshipStage?: RelationshipStage | string;
  budgetTier?: BudgetTier | string;
  giftType?: GiftArchetype | string;
  giftArchetype?: GiftArchetype | string;
  shoppingQuery?: string;
  safeGift?: boolean;
  source?: SuggestionSource;
  clicked?: boolean;
  timeToClick_ms?: number;
  shared?: boolean;
  [key: string]: unknown;
};

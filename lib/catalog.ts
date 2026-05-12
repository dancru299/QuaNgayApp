import type {
  BudgetTier,
  GiftArchetype,
  Occasion,
  RelationshipStage
} from "@/lib/types";

export const OCCASION_OPTIONS: Array<{ value: Occasion; label: string }> = [
  { value: "valentine", label: "Valentine" },
  { value: "birthday-lover", label: "Sinh nhật người yêu" },
  { value: "womens-day", label: "8/3" },
  { value: "anniversary", label: "Kỷ niệm" },
  { value: "new-crush", label: "Crush mới quen" }
];

export const RELATIONSHIP_STAGE_OPTIONS: Array<{
  value: RelationshipStage;
  label: string;
}> = [
  { value: "new-crush", label: "Mới crush / chưa official" },
  { value: "dating", label: "Đang hẹn hò" },
  { value: "longterm", label: "Yêu lâu" },
  { value: "married", label: "Đã cưới" }
];

export const BUDGET_OPTIONS: Array<{
  value: BudgetTier;
  label: string;
  shortLabel: string;
}> = [
  { value: "under200k", label: "Dưới 200k", shortLabel: "<200k" },
  { value: "200-500k", label: "200k - 500k", shortLabel: "200-500k" },
  { value: "500k-1m", label: "500k - 1 triệu", shortLabel: "500k-1m" },
  { value: "over1m", label: "Trên 1 triệu", shortLabel: ">1m" }
];

export const INTEREST_OPTIONS = [
  "Decor phòng",
  "Làm đẹp",
  "Cà phê / trà",
  "Đồ cute",
  "Công nghệ",
  "Thể thao",
  "Viết lách",
  "Nấu ăn",
  "Âm nhạc",
  "Du lịch"
] as const;

export const ARCHETYPE_LABELS: Record<GiftArchetype, string> = {
  "comfort-home": "Comfort home",
  "cute-desk": "Cute desk",
  "skincare-beauty": "Skincare beauty",
  "food-cozy": "Food cozy",
  "experience-lite": "Experience lite",
  "fashion-small": "Fashion small",
  "mini-tech": "Mini tech",
  "hobby-creative": "Hobby creative",
  "wellness-active": "Wellness active",
  sentimental: "Sentimental"
};

export const KEYWORD_MAP: Record<GiftArchetype, string[]> = {
  "comfort-home": [
    "đèn ngủ capybara silicone mini",
    "máy khuếch tán tinh dầu deerma mini",
    "nến thơm paddywax hộp quà"
  ],
  "cute-desk": [
    "mini fan capybara để bàn",
    "keycap dễ thương pastel",
    "sticky note daiso phong cách nhật"
  ],
  "skincare-beauty": [
    "bộ dưỡng da cosrx starter set",
    "serum vitamin c innisfree mini set",
    "bộ skincare cerave da khô gift"
  ],
  "food-cozy": [
    "hộp quà cà phê highlands gift set",
    "trà premium l'orphic hộp quà",
    "snack premium giftbox hàn quốc"
  ],
  "experience-lite": [
    "voucher spa couple gift",
    "voucher lớp nấu ăn couple",
    "vé escape room couple"
  ],
  "fashion-small": [
    "kẹp tóc satin hộp quà",
    "ví card holder da local brand",
    "túi mini local brand nữ"
  ],
  "mini-tech": [
    "sạc không dây baseus",
    "cable organizer baseus",
    "loa bluetooth jbl mini"
  ],
  "hobby-creative": [
    "journaling kit vintage",
    "sổ moleskine sketchbook",
    "embroidery kit beginner"
  ],
  "wellness-active": [
    "khăn gym set hộp quà",
    "thảm yoga chống trượt",
    "protein bar giftbox"
  ],
  sentimental: [
    "móc khóa khắc tên custom",
    "khung ảnh mini để bàn",
    "set giấy viết thư wax seal"
  ]
};

export type FallbackTemplate = {
  id: string;
  emoji: string;
  idea: string;
  giftType: GiftArchetype;
  why: string;
  safeGift: boolean;
  fitTags: string[];
  budgetTiers: BudgetTier[];
  priceRange: string;
  priceDisplay: string;
};

export const FALLBACK_TEMPLATES: FallbackTemplate[] = [
  {
    id: "comfort-capybara-lamp",
    emoji: "🌙",
    idea: "Đèn ngủ capybara silicone mini",
    giftType: "comfort-home",
    why: "Dễ thương, ấm áp, không tạo áp lực quá lãng mạn.",
    safeGift: true,
    fitTags: ["decor nhẹ", "dễ dùng", "ít fail"],
    budgetTiers: ["under200k", "200-500k"],
    priceRange: "120000-280000",
    priceDisplay: "120k - 280k"
  },
  {
    id: "comfort-deerma-diffuser",
    emoji: "🌿",
    idea: "Máy khuếch tán tinh dầu mini Deerma",
    giftType: "comfort-home",
    why: "Tạo cảm giác chăm sóc tinh tế cho người hay stress.",
    safeGift: true,
    fitTags: ["ở nhà nhiều", "thư giãn", "practical"],
    budgetTiers: ["200-500k", "500k-1m"],
    priceRange: "300000-650000",
    priceDisplay: "300k - 650k"
  },
  {
    id: "comfort-paddywax-candle",
    emoji: "🕯️",
    idea: "Nến thơm Paddywax hộp quà",
    giftType: "comfort-home",
    why: "Nhìn chỉn chu, hợp không gian riêng và không quá phô.",
    safeGift: true,
    fitTags: ["cozy", "decor", "hộp quà đẹp"],
    budgetTiers: ["200-500k", "500k-1m"],
    priceRange: "350000-900000",
    priceDisplay: "350k - 900k"
  },
  {
    id: "desk-capybara-fan",
    emoji: "🧸",
    idea: "Mini fan capybara để bàn",
    giftType: "cute-desk",
    why: "Cute vừa đủ, hữu dụng cho bàn học hoặc bàn làm việc.",
    safeGift: true,
    fitTags: ["đồ cute", "bàn làm việc", "low-pressure"],
    budgetTiers: ["under200k", "200-500k"],
    priceRange: "90000-220000",
    priceDisplay: "90k - 220k"
  },
  {
    id: "desk-pastel-keycap",
    emoji: "⌨️",
    idea: "Set keycap pastel dễ thương",
    giftType: "cute-desk",
    why: "Hợp người thích góc làm việc xinh và cá tính nhẹ.",
    safeGift: false,
    fitTags: ["setup bàn", "gaming nhẹ", "cần biết gu"],
    budgetTiers: ["200-500k", "500k-1m"],
    priceRange: "250000-850000",
    priceDisplay: "250k - 850k"
  },
  {
    id: "desk-daiso-sticky",
    emoji: "📝",
    idea: "Bộ sticky note phong cách Nhật",
    giftType: "cute-desk",
    why: "Nhỏ xinh, dễ tặng khi mối quan hệ còn mới.",
    safeGift: true,
    fitTags: ["học tập", "văn phòng", "budget tốt"],
    budgetTiers: ["under200k"],
    priceRange: "50000-150000",
    priceDisplay: "50k - 150k"
  },
  {
    id: "beauty-cosrx-starter",
    emoji: "✨",
    idea: "Bộ dưỡng da COSRX starter set",
    giftType: "skincare-beauty",
    why: "Thoughtful nếu người nhận đã thích skincare và brand Hàn.",
    safeGift: false,
    fitTags: ["skincare", "brand quen", "cần biết loại da"],
    budgetTiers: ["500k-1m", "over1m"],
    priceRange: "550000-1200000",
    priceDisplay: "550k - 1.2tr"
  },
  {
    id: "beauty-innisfree-mini",
    emoji: "🍊",
    idea: "Serum vitamin C Innisfree mini set",
    giftType: "skincare-beauty",
    why: "Nhỏ gọn, đẹp hộp, phù hợp người thích chăm da cơ bản.",
    safeGift: false,
    fitTags: ["làm đẹp", "mini size", "hộp đẹp"],
    budgetTiers: ["200-500k", "500k-1m"],
    priceRange: "300000-750000",
    priceDisplay: "300k - 750k"
  },
  {
    id: "beauty-cerave-dry-skin",
    emoji: "🧴",
    idea: "Bộ CeraVe cleanser và kem dưỡng",
    giftType: "skincare-beauty",
    why: "Thực tế và ít màu mè, hợp người thích routine tối giản.",
    safeGift: false,
    fitTags: ["routine cơ bản", "practical", "cần biết da"],
    budgetTiers: ["500k-1m", "over1m"],
    priceRange: "650000-1300000",
    priceDisplay: "650k - 1.3tr"
  },
  {
    id: "food-highlands-coffee",
    emoji: "☕",
    idea: "Hộp quà cà phê Highlands",
    giftType: "food-cozy",
    why: "Dễ chia sẻ, thân thiện và không bị sến quá mức.",
    safeGift: true,
    fitTags: ["cà phê", "shareable", "dễ nhận"],
    budgetTiers: ["200-500k"],
    priceRange: "220000-480000",
    priceDisplay: "220k - 480k"
  },
  {
    id: "food-lorphic-tea",
    emoji: "🍵",
    idea: "Trà premium L'Orphic hộp quà",
    giftType: "food-cozy",
    why: "Chỉn chu, ấm áp, hợp người thích nhịp sống nhẹ nhàng.",
    safeGift: true,
    fitTags: ["trà", "cozy", "hộp quà"],
    budgetTiers: ["200-500k", "500k-1m"],
    priceRange: "300000-800000",
    priceDisplay: "300k - 800k"
  },
  {
    id: "food-korean-snackbox",
    emoji: "🍫",
    idea: "Snack premium giftbox Hàn Quốc",
    giftType: "food-cozy",
    why: "Vui vẻ, dễ mở câu chuyện, hợp giai đoạn mới quen.",
    safeGift: true,
    fitTags: ["vui", "ăn vặt", "low-pressure"],
    budgetTiers: ["under200k", "200-500k"],
    priceRange: "150000-420000",
    priceDisplay: "150k - 420k"
  },
  {
    id: "experience-spa-couple",
    emoji: "💆",
    idea: "Voucher spa couple",
    giftType: "experience-lite",
    why: "Tạo kỷ niệm chung mà vẫn đủ nhẹ nếu đã hẹn hò.",
    safeGift: false,
    fitTags: ["trải nghiệm", "couple", "cần đúng timing"],
    budgetTiers: ["500k-1m", "over1m"],
    priceRange: "700000-1800000",
    priceDisplay: "700k - 1.8tr"
  },
  {
    id: "experience-cooking-class",
    emoji: "🍳",
    idea: "Voucher lớp nấu ăn cho hai người",
    giftType: "experience-lite",
    why: "Có hoạt động làm cùng nhau, không chỉ là món đồ.",
    safeGift: false,
    fitTags: ["nấu ăn", "date idea", "memory-making"],
    budgetTiers: ["500k-1m", "over1m"],
    priceRange: "600000-1600000",
    priceDisplay: "600k - 1.6tr"
  },
  {
    id: "experience-escape-room",
    emoji: "🧩",
    idea: "Vé escape room couple",
    giftType: "experience-lite",
    why: "Vui và khác biệt nếu cả hai thích hoạt động nhẹ.",
    safeGift: false,
    fitTags: ["fun date", "đỡ formal", "cần hợp tính"],
    budgetTiers: ["200-500k", "500k-1m"],
    priceRange: "300000-900000",
    priceDisplay: "300k - 900k"
  },
  {
    id: "fashion-satin-hair",
    emoji: "🎀",
    idea: "Kẹp tóc satin hộp quà",
    giftType: "fashion-small",
    why: "Nhỏ, xinh, dễ dùng và ít rủi ro về size.",
    safeGift: true,
    fitTags: ["thời trang nhỏ", "không cần size", "cute"],
    budgetTiers: ["under200k", "200-500k"],
    priceRange: "80000-260000",
    priceDisplay: "80k - 260k"
  },
  {
    id: "fashion-card-holder",
    emoji: "👛",
    idea: "Ví card holder da local brand",
    giftType: "fashion-small",
    why: "Practical, gọn, nhìn trưởng thành hơn đồ lưu niệm.",
    safeGift: true,
    fitTags: ["daily carry", "local brand", "ít cần size"],
    budgetTiers: ["200-500k", "500k-1m"],
    priceRange: "250000-900000",
    priceDisplay: "250k - 900k"
  },
  {
    id: "fashion-mini-bag",
    emoji: "👜",
    idea: "Túi mini local brand",
    giftType: "fashion-small",
    why: "Có cảm giác special hơn, hợp khi đã biết style cơ bản.",
    safeGift: false,
    fitTags: ["style", "đi chơi", "cần biết gu"],
    budgetTiers: ["500k-1m", "over1m"],
    priceRange: "650000-1800000",
    priceDisplay: "650k - 1.8tr"
  },
  {
    id: "tech-baseus-wireless",
    emoji: "🔋",
    idea: "Sạc không dây Baseus",
    giftType: "mini-tech",
    why: "Hiện đại, hữu dụng mỗi ngày và không quá nerd.",
    safeGift: true,
    fitTags: ["công nghệ", "daily use", "brand quen"],
    budgetTiers: ["200-500k", "500k-1m"],
    priceRange: "300000-800000",
    priceDisplay: "300k - 800k"
  },
  {
    id: "tech-cable-organizer",
    emoji: "🧷",
    idea: "Cable organizer Baseus",
    giftType: "mini-tech",
    why: "Gọn, thực tế, hợp người hay mang nhiều thiết bị.",
    safeGift: true,
    fitTags: ["gọn gàng", "tech nhẹ", "budget tốt"],
    budgetTiers: ["under200k", "200-500k"],
    priceRange: "80000-280000",
    priceDisplay: "80k - 280k"
  },
  {
    id: "tech-jbl-mini",
    emoji: "🎵",
    idea: "Loa bluetooth JBL mini",
    giftType: "mini-tech",
    why: "Nâng trải nghiệm nghe nhạc mà vẫn dễ dùng.",
    safeGift: true,
    fitTags: ["âm nhạc", "brand mạnh", "premium hơn"],
    budgetTiers: ["500k-1m", "over1m"],
    priceRange: "800000-2200000",
    priceDisplay: "800k - 2.2tr"
  },
  {
    id: "creative-journaling-kit",
    emoji: "📔",
    idea: "Journaling kit vintage",
    giftType: "hobby-creative",
    why: "Cá nhân nhưng không quá thân mật, hợp người thích ghi chép.",
    safeGift: true,
    fitTags: ["viết lách", "creative", "xinh"],
    budgetTiers: ["under200k", "200-500k"],
    priceRange: "120000-450000",
    priceDisplay: "120k - 450k"
  },
  {
    id: "creative-moleskine",
    emoji: "✏️",
    idea: "Sổ sketchbook Moleskine",
    giftType: "hobby-creative",
    why: "Tối giản, chất lượng, hợp người vẽ hoặc ghi ý tưởng.",
    safeGift: true,
    fitTags: ["vẽ", "ghi chú", "brand tốt"],
    budgetTiers: ["500k-1m", "over1m"],
    priceRange: "550000-1200000",
    priceDisplay: "550k - 1.2tr"
  },
  {
    id: "creative-embroidery",
    emoji: "🧵",
    idea: "Embroidery kit beginner",
    giftType: "hobby-creative",
    why: "Có cảm giác riêng, hợp người thích hoạt động thủ công.",
    safeGift: false,
    fitTags: ["handmade", "thư giãn", "cần hợp sở thích"],
    budgetTiers: ["under200k", "200-500k"],
    priceRange: "120000-380000",
    priceDisplay: "120k - 380k"
  },
  {
    id: "wellness-gym-towel",
    emoji: "🏋️",
    idea: "Khăn gym set hộp quà",
    giftType: "wellness-active",
    why: "Tinh tế nếu người nhận có routine tập luyện rõ ràng.",
    safeGift: true,
    fitTags: ["thể thao", "daily use", "care"],
    budgetTiers: ["under200k", "200-500k"],
    priceRange: "150000-450000",
    priceDisplay: "150k - 450k"
  },
  {
    id: "wellness-yoga-mat",
    emoji: "🧘",
    idea: "Thảm yoga chống trượt",
    giftType: "wellness-active",
    why: "Hợp người ưu tiên sức khỏe và thích nhịp sống cân bằng.",
    safeGift: false,
    fitTags: ["yoga", "wellness", "cần biết thói quen"],
    budgetTiers: ["200-500k", "500k-1m"],
    priceRange: "300000-950000",
    priceDisplay: "300k - 950k"
  },
  {
    id: "wellness-protein-box",
    emoji: "🥜",
    idea: "Protein bar giftbox",
    giftType: "wellness-active",
    why: "Vui, healthy và dễ chia sẻ sau buổi tập.",
    safeGift: false,
    fitTags: ["fitness", "snack", "cần biết khẩu vị"],
    budgetTiers: ["200-500k", "500k-1m"],
    priceRange: "250000-700000",
    priceDisplay: "250k - 700k"
  },
  {
    id: "sentimental-keychain",
    emoji: "🔑",
    idea: "Móc khóa khắc tên custom",
    giftType: "sentimental",
    why: "Cá nhân hóa nhẹ, không quá nặng nghĩa khi mới quen.",
    safeGift: true,
    fitTags: ["custom", "nhỏ gọn", "low-pressure"],
    budgetTiers: ["under200k", "200-500k"],
    priceRange: "70000-260000",
    priceDisplay: "70k - 260k"
  },
  {
    id: "sentimental-photo-frame",
    emoji: "🖼️",
    idea: "Khung ảnh mini để bàn",
    giftType: "sentimental",
    why: "Có ý nghĩa nếu hai bạn đã có khoảnh khắc chung.",
    safeGift: false,
    fitTags: ["kỷ niệm", "desk decor", "cần đúng stage"],
    budgetTiers: ["under200k", "200-500k"],
    priceRange: "120000-380000",
    priceDisplay: "120k - 380k"
  },
  {
    id: "sentimental-letter-set",
    emoji: "💌",
    idea: "Set giấy viết thư và wax seal",
    giftType: "sentimental",
    why: "Tình cảm nhưng vẫn có thể giữ tone nhẹ và chân thành.",
    safeGift: true,
    fitTags: ["viết tay", "romantic nhẹ", "cá nhân"],
    budgetTiers: ["under200k", "200-500k"],
    priceRange: "90000-300000",
    priceDisplay: "90k - 300k"
  }
];

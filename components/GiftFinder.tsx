"use client";

import {
  ArrowUpRight,
  Gift,
  Heart,
  Loader2,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Tags,
  UserRound,
  WalletCards
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import {
  BUDGET_OPTIONS,
  INTEREST_OPTIONS,
  OCCASION_OPTIONS,
  RELATIONSHIP_STAGE_OPTIONS
} from "@/lib/catalog";
import type {
  BudgetTier,
  Occasion,
  RelationshipStage,
  SuggestRequest,
  SuggestResponse
} from "@/lib/types";

const AGE_OPTIONS = [
  "18 - 22 tuổi",
  "23 - 28 tuổi",
  "29 - 35 tuổi",
  "Trên 35 tuổi"
];

const DEFAULT_FORM: SuggestRequest = {
  occasion: "valentine",
  relationshipStage: "new-crush",
  recipientAge: "23 - 28 tuổi",
  budgetTier: "200-500k",
  interests: [],
  note: ""
};

export function GiftFinder() {
  const [form, setForm] = useState<SuggestRequest>(DEFAULT_FORM);
  const [response, setResponse] = useState<SuggestResponse | null>(null);
  const [resultsShownAt, setResultsShownAt] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedBudget = useMemo(
    () => BUDGET_OPTIONS.find((option) => option.value === form.budgetTier),
    [form.budgetTier]
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/suggest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = (await res.json()) as unknown;

      if (!res.ok) {
        throw new Error(readApiError(data));
      }

      setResponse(data as SuggestResponse);
      setResultsShownAt(Date.now());
      window.requestAnimationFrame(() => {
        document.getElementById("results")?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Có lỗi xảy ra. Vui lòng thử lại."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function updateForm<K extends keyof SuggestRequest>(
    key: K,
    value: SuggestRequest[K]
  ) {
    setForm((current) => ({
      ...current,
      [key]: value
    }));
  }

  function toggleInterest(interest: string) {
    setForm((current) => {
      const hasInterest = current.interests.includes(interest);
      return {
        ...current,
        interests: hasInterest
          ? current.interests.filter((item) => item !== interest)
          : [...current.interests, interest].slice(0, 8)
      };
    });
  }

  function resetResults() {
    setResponse(null);
    setResultsShownAt(null);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl min-w-0 flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,0.92fr)_minmax(440px,1.08fr)] lg:items-start">
        <section className="min-w-0 rounded-[28px] border border-line bg-white p-5 shadow-soft sm:p-7 lg:sticky lg:top-6">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-coral text-white shadow-soft">
              <Gift aria-hidden="true" size={24} />
            </div>
            <div className="min-w-0 max-w-[260px] flex-1 sm:max-w-none">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-honey">
                QuàNgay
              </p>
              <h1 className="mt-1 break-words text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                Quà cho crush và người yêu khó chọn
              </h1>
            </div>
          </div>

          <p className="mt-5 max-w-xl text-base leading-7 text-ink-soft">
            Lọc context mối quan hệ, ngân sách và gu cơ bản để có 6 gợi ý dễ mua
            trên Shopee.
          </p>

          <dl className="mt-6 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
            <Stat label="Cards" value="6" />
            <Stat label="Wedge" value="Romance" />
            <Stat label="CTA" value="Shopee" />
          </dl>
        </section>

        <section className="min-w-0 rounded-[28px] border border-line bg-white p-5 shadow-soft sm:p-7">
          <form className="space-y-7" onSubmit={handleSubmit}>
            <FieldGroup
              icon={<Heart aria-hidden="true" size={18} />}
              title="Dịp tặng"
            >
              <div className="grid gap-2 sm:grid-cols-5">
                {OCCASION_OPTIONS.map((option) => (
                  <ChoiceButton
                    key={option.value}
                    label={option.label}
                    selected={form.occasion === option.value}
                    onClick={() => updateForm("occasion", option.value as Occasion)}
                  />
                ))}
              </div>
            </FieldGroup>

            <FieldGroup
              icon={<UserRound aria-hidden="true" size={18} />}
              title="Context mối quan hệ"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-ink-soft">
                    Relationship stage
                  </span>
                  <select
                    value={form.relationshipStage}
                    onChange={(event) =>
                      updateForm(
                        "relationshipStage",
                        event.target.value as RelationshipStage
                      )
                    }
                    className="h-12 w-full rounded-2xl border border-line bg-paper px-4 text-sm font-medium text-ink"
                  >
                    {RELATIONSHIP_STAGE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-ink-soft">
                    Tuổi người nhận
                  </span>
                  <select
                    value={form.recipientAge}
                    onChange={(event) =>
                      updateForm("recipientAge", event.target.value)
                    }
                    className="h-12 w-full rounded-2xl border border-line bg-paper px-4 text-sm font-medium text-ink"
                  >
                    {AGE_OPTIONS.map((age) => (
                      <option key={age} value={age}>
                        {age}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </FieldGroup>

            <FieldGroup
              icon={<WalletCards aria-hidden="true" size={18} />}
              title="Ngân sách"
            >
              <div className="rounded-3xl border border-line bg-paper p-4">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <span className="text-sm text-ink-soft">Khoảng chi</span>
                  <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-coral shadow-sm">
                    {selectedBudget?.label}
                  </span>
                </div>
                <input
                  aria-label="Ngân sách"
                  type="range"
                  min={0}
                  max={BUDGET_OPTIONS.length - 1}
                  value={BUDGET_OPTIONS.findIndex(
                    (option) => option.value === form.budgetTier
                  )}
                  onChange={(event) => {
                    const next = BUDGET_OPTIONS[Number(event.target.value)];
                    updateForm("budgetTier", next.value as BudgetTier);
                  }}
                  className="h-2 w-full cursor-pointer accent-coral"
                />
                <div className="mt-3 grid grid-cols-4 gap-2 text-center text-xs font-medium text-ink-soft">
                  {BUDGET_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        updateForm("budgetTier", option.value as BudgetTier)
                      }
                      className={
                        form.budgetTier === option.value
                          ? "rounded-full bg-ink px-2 py-1.5 text-white"
                          : "rounded-full px-2 py-1.5 hover:bg-white"
                      }
                    >
                      {option.shortLabel}
                    </button>
                  ))}
                </div>
              </div>
            </FieldGroup>

            <FieldGroup
              icon={<Tags aria-hidden="true" size={18} />}
              title="Sở thích"
            >
              <div className="flex flex-wrap gap-2">
                {INTEREST_OPTIONS.map((interest) => {
                  const selected = form.interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={
                        selected
                          ? "rounded-full border border-mint bg-mint px-3 py-2 text-sm font-semibold text-white"
                          : "rounded-full border border-line bg-paper px-3 py-2 text-sm font-medium text-ink hover:border-mint hover:bg-white"
                      }
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
            </FieldGroup>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-ink">
                Ghi chú thêm
              </span>
              <textarea
                value={form.note}
                onChange={(event) => updateForm("note", event.target.value)}
                maxLength={500}
                rows={4}
                placeholder="VD: mới quen 2 tháng, thích skincare nhưng không muốn món quà trông quá cố gắng"
                className="w-full resize-none rounded-3xl border border-line bg-paper px-4 py-3 text-sm leading-6 text-ink placeholder:text-ink-soft/60"
              />
            </label>

            {error ? (
              <p className="rounded-2xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm font-medium text-coral">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-ink px-5 text-base font-semibold text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-coral disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:translate-y-0"
            >
              {isSubmitting ? (
                <Loader2 aria-hidden="true" className="animate-spin" size={20} />
              ) : (
                <Sparkles aria-hidden="true" size={20} />
              )}
              Gợi ý ngay
            </button>
          </form>
        </section>
      </div>

      {response ? (
        <section id="results" className="mx-auto mt-8 w-full max-w-6xl scroll-mt-6 pb-14">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-honey">
                Gợi ý phù hợp
              </p>
              <h2 className="mt-1 text-2xl font-semibold text-ink sm:text-3xl">
                6 món quà đáng cân nhắc
              </h2>
            </div>
            <button
              type="button"
              onClick={resetResults}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink-soft hover:border-coral hover:text-coral"
            >
              <RotateCcw aria-hidden="true" size={16} />
              Tìm lại
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {response.suggestions.map((gift) => (
              <article
                key={gift.id}
                className="flex min-h-[320px] flex-col rounded-[24px] border border-line bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="grid h-16 w-16 place-items-center rounded-3xl bg-paper text-4xl">
                    {gift.emoji}
                  </div>
                  <div className="rounded-full bg-mint/10 px-3 py-1 text-xs font-semibold text-mint">
                    {gift.budgetFit === "tight"
                      ? "Budget gọn"
                      : gift.budgetFit === "generous"
                        ? "Có dư địa"
                        : "Fit tốt"}
                  </div>
                </div>

                <h3 className="mt-5 text-xl font-semibold leading-snug text-ink">
                  {gift.idea}
                </h3>
                <p className="mt-3 text-sm leading-6 text-ink-soft">{gift.why}</p>

                <div className="mt-4 flex items-start gap-2 rounded-2xl bg-paper px-3 py-3 text-sm leading-5 text-ink-soft">
                  <ShieldCheck
                    aria-hidden="true"
                    className={gift.safeGift ? "text-mint" : "text-honey"}
                    size={18}
                  />
                  <span>{gift.safetyNote}</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {gift.fitTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line px-3 py-1 text-xs font-medium text-ink-soft"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-soft">
                      Giá tham khảo
                    </p>
                    <p className="mt-1 text-base font-semibold text-coral">
                      {gift.priceDisplay}
                    </p>
                  </div>
                  <a
                    href={gift.shopeeUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(event) => {
                      if (!resultsShownAt) {
                        return;
                      }
                      const url = new URL(
                        gift.shopeeUrl,
                        window.location.origin
                      );
                      url.searchParams.set(
                        "ttc",
                        String(Date.now() - resultsShownAt)
                      );
                      event.currentTarget.href = url.toString();
                    }}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-coral px-4 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-ink"
                  >
                    Shopee
                    <ArrowUpRight aria-hidden="true" size={16} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}

function FieldGroup({
  icon,
  title,
  children
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="flex items-center gap-2 text-sm font-semibold text-ink">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-paper text-coral">
          {icon}
        </span>
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

function ChoiceButton({
  label,
  selected,
  onClick
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        selected
          ? "min-h-12 rounded-2xl border border-ink bg-ink px-3 py-2 text-sm font-semibold text-white"
          : "min-h-12 rounded-2xl border border-line bg-paper px-3 py-2 text-sm font-medium text-ink hover:border-coral hover:bg-white"
      }
    >
      {label}
    </button>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-paper px-3 py-3">
      <dt className="text-xs font-medium uppercase tracking-[0.12em] text-ink-soft">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold text-ink">{value}</dd>
    </div>
  );
}

function readApiError(data: unknown) {
  if (
    typeof data === "object" &&
    data !== null &&
    "error" in data &&
    typeof data.error === "string"
  ) {
    return data.error;
  }

  return "Không tạo được gợi ý.";
}

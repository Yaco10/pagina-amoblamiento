import type { InstallmentPlan } from "./product.ts";

export const calculateFinalPrice = (
  originalPrice: number,
  discountPercentage?: number
) => {
  if (!discountPercentage) return originalPrice;

  return Math.round(
    originalPrice - (originalPrice * discountPercentage) / 100
  );
};

// Si hay interés, aplica interés compuesto mensual: total = price * (1+r)^n
export const calculateInstallments = (
  basePrice: number,
  plan?: InstallmentPlan
) => {
  if (!plan?.enabled) {
    return {
      hasInstallments: false as const,
      total: basePrice,
      perInstallment: basePrice,
      count: 1,
      hasInterest: false,
      monthlyInterestRate: 0,
    };
  }

  const count = Math.max(1, Math.floor(plan.count));

  const hasInterest = plan.hasInterest;
  const r = hasInterest ? (plan.monthlyInterestRate ?? 0) : 0;

  const total = hasInterest
    ? Math.round(basePrice * Math.pow(1 + r, count))
    : basePrice;

  const perInstallment = Math.round(total / count);

  return {
    hasInstallments: true as const,
    total,
    perInstallment,
    count,
    hasInterest,
    monthlyInterestRate: r,
  };
};
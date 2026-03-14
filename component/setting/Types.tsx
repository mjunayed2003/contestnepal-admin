export type Section = "menu" | "profile" | "password" | "terms" | "privacy" | "faq";

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}
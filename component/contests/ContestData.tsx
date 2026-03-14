export type ContestStatus = "Active" | "Draft" | "Closed" | "Winner Declared";
export type ContestType   = "Submission + Voting" | "Giveaway" | "Poll";

export interface Contest {
  id: number;
  title: string;
  type: ContestType;
  organizer: string;
  startDate: string;
  endDate: string;
  status: ContestStatus;
  entries: number;
  votes: number;
  description: string;
  rules: string;
  prize: string;
  pendingReview: number;
  approved: number;
}

export const contestsData: Contest[] = [
  {
    id: 1, title: "Summer Photography Showdown", type: "Submission + Voting",
    organizer: "TechBrand Inc.", startDate: "2026-01-01", endDate: "2026-01-31",
    status: "Winner Declared", entries: 234, votes: 4521,
    description: "Show us your best summer photography!",
    rules: "1. One submission per participant 2. Original work only 3. No adult content",
    prize: "$500 Gift Card + Camera Kit", pendingReview: 0, approved: 0,
  },
  {
    id: 2, title: "Logo Design Challenge", type: "Submission + Voting",
    organizer: "Creative Studio", startDate: "2026-02-01", endDate: "2026-02-28",
    status: "Active", entries: 89, votes: 1203,
    description: "Design the next iconic logo for Creative Studio.",
    rules: "1. Vector format required 2. Original designs only 3. Max 3 submissions",
    prize: "$300 + Design Contract", pendingReview: 12, approved: 77,
  },
  {
    id: 3, title: "Eco-Friendly Product Giveaway", type: "Giveaway",
    organizer: "EcoGreen Initiative", startDate: "2026-02-10", endDate: "2026-03-10",
    status: "Active", entries: 512, votes: 0,
    description: "Win eco-friendly products by entering our giveaway!",
    rules: "1. Follow our social media 2. One entry per person 3. Must be 18+",
    prize: "Eco Product Bundle ($200 value)", pendingReview: 5, approved: 507,
  },
  {
    id: 4, title: "Best Tech Startup Poll 2026", type: "Poll",
    organizer: "TechBrand Inc.", startDate: "2026-02-15", endDate: "2026-03-15",
    status: "Active", entries: 1204, votes: 8930,
    description: "Vote for the most innovative tech startup of 2026.",
    rules: "1. One vote per user 2. Must be registered 3. No proxy voting",
    prize: "Winner gets featured on TechBrand Magazine", pendingReview: 0, approved: 1204,
  },
  {
    id: 5, title: "Winter Art Exhibition", type: "Submission + Voting",
    organizer: "ArtisanCraft Co.", startDate: "2025-12-01", endDate: "2025-12-31",
    status: "Closed", entries: 167, votes: 2890,
    description: "Showcase your winter-themed artwork.",
    rules: "1. Digital or physical art accepted 2. Must be winter-themed 3. Original work only",
    prize: "$250 + Gallery Feature", pendingReview: 3, approved: 164,
  },
  {
    id: 6, title: "Fitness Challenge 2026", type: "Submission + Voting",
    organizer: "SportsPro Events", startDate: "2026-03-01", endDate: "2026-03-31",
    status: "Draft", entries: 0, votes: 0,
    description: "Submit your 30-day fitness transformation.",
    rules: "1. Before/after photos required 2. No photo editing 3. Must include workout log",
    prize: "$400 Sports Store Voucher", pendingReview: 0, approved: 0,
  },
  {
    id: 7, title: "Recipe Innovation Contest", type: "Submission + Voting",
    organizer: "FoodieWorld", startDate: "2026-02-20", endDate: "2026-03-20",
    status: "Draft", entries: 0, votes: 0,
    description: "Create and share your most innovative recipe.",
    rules: "1. Must include full ingredient list 2. Step-by-step photos 3. Original recipes only",
    prize: "Professional Kitchen Set ($600)", pendingReview: 0, approved: 0,
  },
  {
    id: 8, title: "Mobile App UX Design", type: "Submission + Voting",
    organizer: "PixelDreams Ltd.", startDate: "2026-02-01", endDate: "2026-03-01",
    status: "Active", entries: 44, votes: 312,
    description: "Design an innovative mobile app UX for everyday life.",
    rules: "1. Figma or Adobe XD only 2. Must include user flow 3. Mobile-first design",
    prize: "$350 + App Development Partnership", pendingReview: 8, approved: 36,
  },
];
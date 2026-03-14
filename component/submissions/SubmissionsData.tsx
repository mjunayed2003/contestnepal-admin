export type SubmissionStatus = "Approved" | "Pending" | "Rejected";
export type SubmissionType   = "Image" | "Text";

export interface Submission {
  id: number;
  participant: string;
  initials: string;
  avatarColor: string;
  contest: string;
  date: string;
  votes: number;
  type: SubmissionType;
  status: SubmissionStatus;
  // for image type
  imageUrl?: string;
  // for text type
  textContent?: string;
}

export const submissionsData: Submission[] = [
  { id: 1,  participant: "Sophia Anderson",  initials: "S",  avatarColor: "bg-[#9B1C1C]",   contest: "Logo Design Challenge",       date: "2026-02-03", votes: 245, type: "Image",  status: "Approved",  imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80" },
  { id: 2,  participant: "Emma Williams",    initials: "E",  avatarColor: "bg-teal-600",     contest: "Logo Design Challenge",       date: "2026-02-04", votes: 189, type: "Image",  status: "Approved",  imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80" },
  { id: 3,  participant: "Liam Johnson",     initials: "L",  avatarColor: "bg-blue-600",     contest: "Logo Design Challenge",       date: "2026-02-05", votes: 0,   type: "Image",  status: "Pending",   imageUrl: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=400&q=80" },
  { id: 4,  participant: "Olivia Davis",     initials: "O",  avatarColor: "bg-amber-600",    contest: "Mobile App UX Design",        date: "2026-02-10", votes: 78,  type: "Image",  status: "Approved",  imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80" },
  { id: 5,  participant: "William Martinez", initials: "W",  avatarColor: "bg-pink-600",     contest: "Mobile App UX Design",        date: "2026-02-12", votes: 0,   type: "Text",   status: "Pending",   textContent: "My UX design focuses on minimalism and accessibility. The navigation uses bottom tabs for easy thumb reach on mobile" },
  { id: 6,  participant: "Ava Garcia",       initials: "A",  avatarColor: "bg-violet-600",   contest: "Eco-Friendly Product Giveaway", date: "2026-02-11", votes: 0, type: "Text",   status: "Approved",  textContent: "I follow your page and share daily eco-friendly tips with my 2k followers!" },
  { id: 7,  participant: "James Rodriguez",  initials: "J",  avatarColor: "bg-orange-600",   contest: "Logo Design Challenge",       date: "2026-02-06", votes: 0,   type: "Image",  status: "Rejected",  imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80" },
  { id: 8,  participant: "Isabella Wilson",  initials: "I",  avatarColor: "bg-indigo-600",   contest: "Mobile App UX Design",        date: "2026-02-14", votes: 112, type: "Image",  status: "Approved",  imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&q=80" },
  { id: 9,  participant: "Ethan Taylor",     initials: "E",  avatarColor: "bg-emerald-600",  contest: "Eco-Friendly Product Giveaway", date: "2026-02-13", votes: 0, type: "Text",   status: "Pending",   textContent: "Followed page and shared on Instagram. Love this eco initiative!" },
  { id: 10, participant: "Charlotte Thomas", initials: "C",  avatarColor: "bg-rose-600",     contest: "Logo Design Challenge",       date: "2026-02-07", votes: 156, type: "Image",  status: "Approved",  imageUrl: "https://images.unsplash.com/photo-1542621334-a254cf47733d?w=400&q=80" },
];
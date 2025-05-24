export interface Campaign {
  id: number;
  title: string;
  slug?: string;
  image: string;
  raised: number;
  goal: number;
  endDate: string;
  status: "Active" | "Funded";
  description?: string;
  creator?: string;
}

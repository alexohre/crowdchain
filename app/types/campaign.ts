export interface Campaign {
  id: number;
  title: string;
  image: string;
  raised: number;
  goal: number;
  endDate: string;
  status: "Active" | "Funded";
}

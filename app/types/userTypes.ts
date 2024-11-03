export interface user {
  _id: number;
  organisation: string;
  userName: string;
  date: string;
  email: string;
  phoneNumber: string;
  status: "inactive" | "blacklisted" | "active" | "pending";
}

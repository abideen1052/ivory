export interface Notification {
  id: number;
  message: string;
  recipient: string;
  status: "sent" | "pending" | "failed";
  timestamp: string;
}

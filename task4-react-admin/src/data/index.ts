import type { Notification } from "../types";

export const mockNotifications: Notification[] = [
  {
    id: 1,
    message: "Welcome to our platform!",
    recipient: "user@example.com",
    status: "sent",
    timestamp: "2023-10-25 10:30:00",
  },
  {
    id: 2,
    message: "Your order has been shipped.",
    recipient: "customer@test.com",
    status: "failed",
    timestamp: "2023-10-26 14:15:00",
  },
  {
    id: 3,
    message: "Password reset request.",
    recipient: "admin@site.org",
    status: "pending",
    timestamp: "2023-10-27 09:00:00",
  },
  {
    id: 4,
    message: "New login from unknown device.",
    recipient: "security@corp.net",
    status: "sent",
    timestamp: "2023-10-27 11:45:00",
  },
];

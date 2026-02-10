import {
  generateMockNotifications,
  NotificationItem,
} from "@/data/notifications";

const ALL_NOTIFICATIONS = generateMockNotifications(100);

export const fetchNotifications = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search: string;
}): Promise<NotificationItem[]> => {
  await new Promise((res) => setTimeout(res, 300));

  const filtered = ALL_NOTIFICATIONS.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.body.toLowerCase().includes(search.toLowerCase()),
  );

  const start = page * limit;
  const end = start + limit;

  return filtered.slice(start, end);
};

export const getRelativeTime = (timestamp: number) => {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  return `${Math.floor(hours / 24)}d ago`;
};

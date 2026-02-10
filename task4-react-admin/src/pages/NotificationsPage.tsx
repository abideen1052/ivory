import { useState } from "react";
import type { Notification } from "../types";
import NotificationList from "../components/NotificationList";
import NotificationForm from "../components/NotificationForm";

interface NotificationsPageProps {
  initialNotifications: Notification[];
}

const NotificationsPage = ({
  initialNotifications,
}: NotificationsPageProps) => {
  const [notifications, setNotifications] = useState<Notification[]>(
    [...initialNotifications].sort((a, b) => b.id - a.id),
  );

  const handleResend = (id: number) => {
    // Mock resend logic
    console.log(`Resending notification ${id}`);
    alert(`Resent notification #${id}!`);
    // Optionally update status to 'sent' for demo
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id
          ? { ...n, status: "sent", timestamp: new Date().toISOString() }
          : n,
      ),
    );
  };

  const handleCreate = (
    data: Omit<Notification, "id" | "timestamp" | "status">,
  ) => {
    const newNotification: Notification = {
      id: Math.max(...notifications.map((n) => n.id), 0) + 1,
      message: data.message,
      recipient: data.recipient as string,
      status: "pending",
      timestamp: new Date().toISOString(),
    };

    setNotifications([newNotification, ...notifications]);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Admin Dashboard
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-slate-500">
            Manage your system notifications efficiently.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1">
            <NotificationForm onCreate={handleCreate} />
          </div>

          <div className="lg:col-span-2">
            <NotificationList
              notifications={notifications}
              onResend={handleResend}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;

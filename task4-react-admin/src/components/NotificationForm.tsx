import { useState } from "react";
import type { Notification } from "../types";

interface NotificationFormProps {
  onCreate: (
    notification: Omit<Notification, "id" | "timestamp" | "status">,
  ) => void;
}

const NotificationForm = ({ onCreate }: NotificationFormProps) => {
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message || !recipient) return;

    onCreate({ message, recipient });
    setMessage("");
    setRecipient("");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200 fade-in h-fit">
      <h2 className="text-xl font-bold mb-6 text-slate-800">
        Create Notification
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="block text-sm font-medium text-slate-700 mb-1"
            htmlFor="recipient"
          >
            Recipient
          </label>
          <input
            type="email"
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            placeholder="user@example.com"
            required
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-slate-700 mb-1"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            placeholder="Enter notification content..."
            rows={4}
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Send Notification
          </button>
        </div>
      </form>
    </div>
  );
};

export default NotificationForm;

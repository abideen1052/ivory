import type { Notification } from "../types";

interface NotificationListProps {
  notifications: Notification[];
  onResend: (id: number) => void;
}

const NotificationList = ({
  notifications,
  onResend,
}: NotificationListProps) => {
  return (
    <div
      className="bg-white rounded-xl shadow-md p-6 border border-slate-200 hover:shadow-lg transition-all duration-200 fade-in"
      style={{ animationDelay: "0.1s" }}
    >
      <h2 className="text-xl font-bold mb-6 text-slate-800">Notifications</h2>
      <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
        <table className="hidden sm:table w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr>
              <th className="p-4 font-semibold text-slate-500 border-b-2 border-slate-200 bg-slate-50 text-xs uppercase tracking-wider">
                ID
              </th>
              <th className="p-4 font-semibold text-slate-500 border-b-2 border-slate-200 bg-slate-50 text-xs uppercase tracking-wider">
                Recipient
              </th>
              <th className="p-4 font-semibold text-slate-500 border-b-2 border-slate-200 bg-slate-50 text-xs uppercase tracking-wider">
                Message
              </th>
              <th className="p-4 font-semibold text-slate-500 border-b-2 border-slate-200 bg-slate-50 text-xs uppercase tracking-wider">
                Status
              </th>
              <th className="p-4 font-semibold text-slate-500 border-b-2 border-slate-200 bg-slate-50 text-xs uppercase tracking-wider">
                Date
              </th>
              <th className="p-4 font-semibold text-slate-500 border-b-2 border-slate-200 bg-slate-50 text-xs uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <tr
                key={notification.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="p-4 border-b border-slate-200 text-slate-500 text-sm">
                  #{notification.id}
                </td>
                <td className="p-4 border-b border-slate-200 text-slate-800 text-sm font-medium">
                  {notification.recipient}
                </td>
                <td className="p-4 border-b border-slate-200 text-slate-600 text-sm max-w-[300px] whitespace-nowrap overflow-hidden text-ellipsis">
                  {notification.message}
                </td>
                <td className="p-4 border-b border-slate-200">
                  <span
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-medium capitalize 
                    ${
                      notification.status === "sent"
                        ? "bg-emerald-100 text-emerald-700"
                        : notification.status === "failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {notification.status}
                  </span>
                </td>
                <td className="p-4 border-b border-slate-200 text-slate-500 text-sm">
                  {new Date(notification.timestamp).toLocaleDateString()}
                </td>
                <td className="p-4 border-b border-slate-200">
                  <button
                    onClick={() => onResend(notification.id)}
                    className="inline-flex items-center px-3 py-1 border border-slate-300 rounded text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    title="Resend Notification"
                  >
                    Resend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile View: Card-based layout */}
        <div className="sm:hidden space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="border border-slate-200 rounded-lg p-4 space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    #{notification.id}
                  </span>
                  <div className="text-sm font-bold text-slate-800 truncate max-w-[150px]">
                    {notification.recipient}
                  </div>
                </div>
                <span
                  className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase 
                  ${
                    notification.status === "sent"
                      ? "bg-emerald-100 text-emerald-700"
                      : notification.status === "failed"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {notification.status}
                </span>
              </div>
              <p className="text-sm text-slate-600 line-clamp-2">
                {notification.message}
              </p>
              <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                <span className="text-[10px] text-slate-400 font-medium">
                  {new Date(notification.timestamp).toLocaleDateString()}
                </span>
                <button
                  onClick={() => onResend(notification.id)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Resend Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {notifications.length === 0 && (
          <div className="p-8 text-center text-slate-500 text-sm">
            No notifications found.
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationList;

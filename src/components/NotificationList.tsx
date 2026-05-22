 import React from "react";

import { useNotifications }
from "../contexts/NotificationContext";

export const NotificationList:
React.FC = () => {

  const {
    notifications,
    markAsRead,
  } = useNotifications();

  if (
    notifications.length === 0
  ) {

    return (

      <div className="bg-white rounded-xl shadow-md p-5">

        <h3 className="text-lg font-semibold text-slate-800 mb-3">
          Notifications
        </h3>

        <p className="text-slate-500">
          No notifications
        </p>

      </div>
    );
  }

  return (

    <div className="bg-white rounded-xl shadow-md p-5">

      <h3 className="text-lg font-semibold text-slate-800 mb-4">
        Notifications
      </h3>

      <div className="space-y-3">

        {notifications.map(
          (notif) => (

            <div
              key={notif.id}
              onClick={() =>
                markAsRead(
                  notif.id
                )
              }
              className={`
                p-4
                rounded-lg
                border
                cursor-pointer
                transition
                hover:bg-slate-50
                ${
                  notif.read
                    ? "bg-white border-slate-200"
                    : "bg-blue-50 border-blue-300"
                }
              `}
            >

              <p
                className={`${
                  notif.read
                    ? "text-slate-700"
                    : "text-slate-900 font-semibold"
                }`}
              >
                {notif.message}
              </p>

              <p className="text-xs text-slate-500 mt-1">

                {notif.createdAt
                  ?.toDate()
                  .toLocaleString()}

              </p>

            </div>
          )
        )}

      </div>

    </div>
  );
};
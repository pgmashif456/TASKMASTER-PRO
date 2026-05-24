 import React from "react";

import {
  NotificationList,
} from "../components/NotificationList";

const NotificationsPage: React.FC =
  () => {

    return (
      <div className="min-h-screen bg-slate-100 p-6">

        <div className="max-w-5xl mx-auto">

          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Notifications
          </h1>

          <p className="text-slate-500 mb-8">
            View all system updates and alerts.
          </p>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <NotificationList />
          </div>

        </div>

      </div>
    );
  };

export default NotificationsPage;
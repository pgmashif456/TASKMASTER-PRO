 import React from "react";

import {
  DashboardCharts,
} from "../components/DashboardCharts";

import {
  useTasks,
} from "../hooks/useTasks";

const ReportsPage: React.FC = () => {
  const {
    tasks,
  } = useTasks();

  const pending =
    tasks.filter(
      (t) =>
        t.status === "pending"
    ).length;

  const inProgress =
    tasks.filter(
      (t) =>
        t.status === "in-progress"
    ).length;

  const completed =
    tasks.filter(
      (t) =>
        t.status === "completed"
    ).length;

  const chartData = [
    {
      name: "Pending",
      value: pending
    },
    {
      name: "In Progress",
      value: inProgress,
    },
    {
      name: "Completed",
      value: completed,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-slate-800 mb-2">
          Reports
        </h1>

        <p className="text-slate-500 mb-8">
          Project and task analytics.
        </p>

        <DashboardCharts
          taskStatusCounts={chartData}
        />

      </div>
    </div>
  );
};

export default ReportsPage;
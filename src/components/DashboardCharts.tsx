  import React from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface TaskStatusData {
  name: string;
  value: number;
}

interface Props {
  taskStatusCounts: TaskStatusData[];
}

const COLORS = [
  "#3B82F6", // Blue
  "#10B981", // Green
  "#F59E0B", // Orange
];

export const DashboardCharts: React.FC<Props> = ({
  taskStatusCounts,
}) => {

  const totalTasks =
    taskStatusCounts.reduce(
      (sum, item) => sum + item.value,
      0
    );

  return (

    <div className="bg-white rounded-2xl shadow-md p-6">

      <div className="mb-6">

        <h2 className="text-2xl font-semibold text-slate-800">
          Task Status Overview
        </h2>

        <p className="text-slate-500 mt-1">
          Visual breakdown of task progress.
        </p>

      </div>

      {totalTasks === 0 ? (

        <div className="text-center py-12 text-slate-500">
          No task data available.
        </div>

      ) : (

        <div className="h-[350px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <PieChart>

              <Pie
                data={taskStatusCounts}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label
              >

                {taskStatusCounts.map(
                  (_, index) => (

                    <Cell
                      key={`cell-${index}`}
                      fill={
                        COLORS[
                          index %
                          COLORS.length
                        ]
                      }
                    />
                  )
                )}

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>
      )}

    </div>
  );
};
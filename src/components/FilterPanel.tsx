  import React from "react";

interface Props {
  status: string;
  setStatus: (val: string) => void;
  priority: string;
  setPriority: (val: string) => void;
}

export const FilterPanel: React.FC<Props> = ({
  status,
  setStatus,
  priority,
  setPriority,
}) => {

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      {/* Status Filter */}
      <div>

        <label className="block text-sm font-medium text-slate-700 mb-2">
          Status
        </label>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="
            w-full
            border
            border-slate-300
            rounded-lg
            p-3
            bg-white
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
          "
        >

          <option value="">
            All Statuses
          </option>

          <option value="pending">
            Pending
          </option>

          <option value="in-progress">
            In Progress
          </option>

          <option value="completed">
            Completed
          </option>

        </select>

      </div>

      {/* Priority Filter */}
      <div>

        <label className="block text-sm font-medium text-slate-700 mb-2">
          Priority
        </label>

        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
          className="
            w-full
            border
            border-slate-300
            rounded-lg
            p-3
            bg-white
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
          "
        >

          <option value="">
            All Priorities
          </option>

          <option value="low">
            Low
          </option>

          <option value="medium">
            Medium
          </option>

          <option value="high">
            High
          </option>

        </select>

      </div>

    </div>
  );
};
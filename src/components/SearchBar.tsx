  import React from "react";

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<Props> = ({
  value,
  onChange,
  placeholder,
}) => {

  return (

    <div className="relative">

      <input
        type="search"

        value={value}

        onChange={(e) =>
          onChange(e.target.value)
        }

        placeholder={
          placeholder || "Search..."
        }

        className="
          w-full
          border
          border-slate-300
          rounded-lg
          px-4
          py-3
          pr-10
          bg-white
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
          shadow-sm
        "
      />

      <span
        className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          text-slate-400
        "
      >
        🔍
      </span>

    </div>
  );
};
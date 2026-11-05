"use client";

import type { ChangeEvent } from "react";

type Props = {
  hasError: boolean;
  label?: string;
  required?: boolean;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  items: string[];
};

export default function Dropdown({ required = false, ...props }: Props) {
  return (
    <div className="mb-4">
      {props.label && <label className="block mb-2 text-sm font-medium text-[#14141a]">
        {props.label} {required && "*"}
      </label>}
      <select
        className={`w-full p-2.5 text-sm text-[#14141a] bg-white border ${props.hasError ? "border-error-border" : "border-gray-300 focus:border-brand"} rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20`}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        required
      >
        <option value="" disabled>
          Select an option
        </option>

        {props.items.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
    </div>
  );
}

"use client";

import type { ChangeEvent } from "react";

type Props = {
  hasError: boolean;
  label?: string;
  required?: boolean;
  value: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function LongText({ required = false, ...props }: Props) {
  return (
    <div className="mb-3">
      {props.label && <label className="block mb-2 text-sm font-medium text-[#14141a]">
        {props.label} {required && "*"}
      </label>}
      <div className="relative">
        <textarea
          className={`w-full p-2.5 text-sm text-[#14141a] bg-white border ${props.hasError ? "border-error-border" : "border-gray-300 focus:border-brand"} rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20`}
          name={props.name}
          rows={3}
          value={props.value}
          onChange={props.onChange}
          required
        ></textarea>
        {props.hasError && (
          <div className="absolute top-3 right-0 pr-3 flex items-center pointer-events-none text-red-500">
            <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

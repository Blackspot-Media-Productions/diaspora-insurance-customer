"use client";

import type { ChangeEvent } from "react";

type Props = {
  hasError: boolean;
  label?: string;
  required?: boolean;
  value: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export default function ShortText({ required = false, ...props }: Props) {
  return (
    <div className={`${props.className} mb-4`}>
      {props.label && (
        <label className="block mb-2 text-sm font-medium text-[#14141a]">
          {props.label} {required && "*"}
        </label>
      )}
      <div className="relative">
        <input
          type="tel"
          className={`w-full p-2.5 text-sm text-[#14141a] bg-white border ${props.hasError ? "border-error-border" : "border-gray-300 focus:border-brand"} rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/20`}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          required
        />
        {props.hasError && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-red-600">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
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
  )
}

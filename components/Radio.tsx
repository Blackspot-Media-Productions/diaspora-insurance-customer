"use client";

import { useState, type ChangeEvent } from "react";

type Props = {
  hasError: boolean;
  label?: string;
  required?: boolean;
  items: string[];
  name: string;
  idPrefix: string;
  selected: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  hasOtherInput?: {
    status: boolean;
    onChange: (value: string) => void;
  };
};

export default function Radio({ required = false, ...props }: Props) {
  const [otherOptionValue, setOtherOptionValue] = useState("");
  const [showOtherInput, setShowOtherInput] = useState(false);

  return (
    <div className="mb-3">
      {props.label && (
        <label className="block mb-2 text-sm font-medium text-[#14141a]">
          {props.label} {required && "*"}
        </label>
      )}
      <div
        className={`border ${props.hasError ? "border-error-border" : "border-[#eee]"} rounded-[10px] p-[0.9rem_1rem] bg-[#fffaf2]`}
      >
        {props.items.map((val, idx) => {
          const isOther = ["other", "others"].includes(val.toLowerCase());
          const itemSet = new Set(props.items);
          const hasInvalidSelection =
            !itemSet.has(props.selected) && props.selected !== "";

          const isChecked =
            props.selected === val
              ? true
              : isOther
                ? hasInvalidSelection
                  ? true
                  : false
                : false;

          return (
            <div key={val} className="flex items-center mb-[0.4rem]">
              <input
                type="radio"
                id={`${props.idPrefix}-${idx}`}
                name={props.name}
                value={val}
                checked={isChecked}
                onChange={(e) => {
                  props.onChange(e);
                  setOtherOptionValue("");
                }}
                required={idx === 0}
                className="w-4 h-4 text-brand bg-white border-gray-300 focus:ring-brand focus:ring-2 accent-brand"
              />
              <label
                htmlFor={`b-${idx}`}
                className="ms-2 text-sm font-medium text-[#14141a] cursor-pointer"
              >
                {val}
              </label>
            </div>
          );
        })}
      </div>

      {props.hasOtherInput?.status && (
        <div className="flex gap-x-2 mt-1">
          <input
            type="text"
            className="w-full px-1.5 py-3 text-xs text-[#14141a] bg-white border border-gray-300 rounded focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20"
            placeholder="Please specify"
            name="business_purpose_other"
            value={otherOptionValue}
            onChange={(e) => setOtherOptionValue(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              props.hasOtherInput?.onChange(otherOptionValue)
              setShowOtherInput(false);
            }}
            className="text-xs bg-brand px-6 rounded cursor-pointer"
          >
            <span>Done</span>
          </button>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, type ChangeEvent } from "react";

type Props = {
  hasError: boolean;
  label?: string;
  required?: boolean;
  items: string[];
  name: string;
  idPrefix: string;
  selected: string[];
  onChange: (value: string) => void;
  hasDescription?: {
    placeholder: string;
    value: string;
    name: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  };
  triggerOtherToggle: (name: string, value?: string) => void;
  hasOtherInput?: {
    status: boolean;
    onChange: (value: string) => void;
  };
};

export default function Checkbox({ required = false, ...props }: Props) {
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
        {props.items.map((item) => {
          const isOther = ["other", "others"].includes(item.toLowerCase());
          const itemSet = new Set(props.items);
          const hasInvalidSelection = props.selected.some(
            (s) => !itemSet.has(s),
          );

          const isChecked =
            props.selected.includes(item)
              ? true
              : isOther
                ? hasInvalidSelection
                  ? true
                  : false
                : false;

          return (
            <div key={item} className="flex items-center mb-[0.4rem]">
              <input
                type="checkbox"
                id={`${props.idPrefix}-${item}`}
                name={props.name}
                value={item}
                checked={isChecked}
                onChange={(e) => {
                  props.onChange(item);
                  if (isOther && hasInvalidSelection && !e.target.checked) {
                    setOtherOptionValue("");
                  }
                }}
                className="w-4 h-4 text-brand bg-white border-gray-300 rounded focus:ring-brand focus:ring-2 accent-brand"
              />
              <label
                htmlFor={`ic-${item}`}
                className="ms-2 text-sm font-medium text-[#14141a] cursor-pointer"
              >
                {item}
              </label>
            </div>
          );
        })}
      </div>

      {props.hasDescription && (
        <textarea
          className="mt-2 w-full p-2.5 text-sm text-[#14141a] bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          name={props.hasDescription.name}
          rows={2}
          placeholder={props.hasDescription.placeholder}
          value={props.hasDescription.value}
          onChange={props.hasDescription.onChange}
        ></textarea>
      )}

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
              props.hasOtherInput?.onChange(otherOptionValue);
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

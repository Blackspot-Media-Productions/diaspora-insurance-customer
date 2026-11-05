"use client";

import { type ChangeEvent } from "react";

type Props = {
  hasError: boolean;
  label?: string;
  required?: boolean;
  items: string[];
  name: string;
  idPrefix: string;
  selected: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Radio({ required = false, ...props }: Props) {
  return (
    <div className="mb-3">
      {props.label && <label className="block mb-2 text-sm font-medium text-[#14141a]">
        {props.label} {required && "*"}
      </label>}
      <div className={`border ${props.hasError ? "border-error-border" : "border-[#eee]"} rounded-[10px] p-[0.9rem_1rem] bg-[#fffaf2]`}>
        {props.items.map((val, idx) => {
          const isOther = ["other", "others"].includes(val.toLowerCase());
          const itemSet = new Set(props.items);
          const hasInvalidSelection = !itemSet.has(props.selected);

          return (
            <div key={val} className="flex items-center mb-[0.4rem]">
              <input
                type="radio"
                id={`${props.idPrefix}-${idx}`}
                name={props.name}
                value={val}
                checked={
                  props.selected === val && !isOther
                    ? true
                    : isOther && hasInvalidSelection
                      ? true
                      : false
                }
                onChange={props.onChange}
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
    </div>
  );
}

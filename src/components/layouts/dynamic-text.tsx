import React from "react";
import { DynamicTextProps } from "../../../typing";

export default function DynamicText({ subheading, heading }: DynamicTextProps) {
  return (
    <div>
      <p className="font-bold text-primary">{subheading}</p>
      <h1 className="mt-2 font-extrabold leading-none">{heading}</h1>
    </div>
  );
}

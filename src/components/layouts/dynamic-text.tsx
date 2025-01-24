import React from "react";
import { DynamicTextProps } from "../../../typing";

export default function DynamicText({ subheading, heading }: DynamicTextProps) {
  return (
    <div>
      <p className="font-bold text-primary">{subheading}</p>
      <h1 className="font-extrabold leading-tight">{heading}</h1>
    </div>
  );
}

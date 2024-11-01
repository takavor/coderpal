"use client";

import React from "react";

interface SubmitButtonProps {
  text: string;
}

export default function SubmitButton({ text }: SubmitButtonProps) {
  return (
    <div className="bg-primary text-center p-2 text-white rounded-sm w-32 transition hover:bg-primary/80">
      <button type="submit">{text}</button>
    </div>
  );
}

"use client";

import React from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  text: string;
}

export default function SubmitButton({ text }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <div className="bg-primary text-center p-2 text-white rounded-sm w-32 transition hover:bg-primary/80">
      <button disabled={pending} type="submit">
        {pending ? "Creating..." : text}
      </button>
    </div>
  );
}

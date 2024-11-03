"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface FormSubmitButtonProps {
  text: string;
}

export default function FormSubmitButton({ text }: FormSubmitButtonProps) {
  const router = useRouter();
  return (
    <div className="bg-primary text-center p-2 text-white rounded-sm w-32 transition hover:bg-primary/80">
      <button type="submit">{text}</button>
    </div>
  );
}

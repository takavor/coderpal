"use client";

import Link from "next/link";
import React from "react";

interface LinkButtonProps {
  text: string;
  href: string;
}

export default function LinkButton({ text, href }: LinkButtonProps) {
  return (
    <Link href={href} className="w-fit">
      <div className="bg-primary text-center p-2 text-white rounded-sm transition hover:bg-primary/80">
        {text}
      </div>
    </Link>
  );
}

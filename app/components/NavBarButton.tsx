import { Session } from "next-auth";
import React from "react";

interface NavBarButtonProps {
  text: string;
}

export default function NavBarButton({ text }: NavBarButtonProps) {
  return (
    <div className="bg-primary text-center p-2 text-white rounded-sm transition hover:bg-primary/80">
      {text}
    </div>
  );
}

import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { Session } from "next-auth";
import React, { ReactNode } from "react";

interface NavBarButtonProps {
  text: string;
  icon?: ReactNode;
}

export default function NavBarButton({ text, icon }: NavBarButtonProps) {
  return (
    <div className="flex gap-2 bg-primary text-center px-2 py-1 text-white rounded-sm transition hover:bg-primary/80">
      {icon}
      <p>{text}</p>
    </div>
  );
}

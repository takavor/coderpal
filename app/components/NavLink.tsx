"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavLinkProps {
  text: string;
  href: string;
}

export default function NavLink({ text, href }: NavLinkProps) {
  const pathname = usePathname();
  let highlighted = pathname === href;
  return (
    <Link
      href={href}
      className={`hover:text-primary ${highlighted && "text-primary"}`}
    >
      {text}
    </Link>
  );
}

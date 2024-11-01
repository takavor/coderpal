"use client";

import Link from "next/link";
import React from "react";

interface NavLinkProps {
  text: string;
  href: string;
}

export default function NavLink({ text, href }: NavLinkProps) {
  return (
    <Link href={href} className="hover:text-primary">
      {text}
    </Link>
  );
}

import React from "react";

// data
import { navLinks } from "../data/navLinks";

// components
import NavLink from "./NavLink";
import Link from "next/link";
import NavBarButton from "./NavBarButton";
import Image from "next/image";

import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="text-md gap-4 border-b border-b-border py-8 mx-auto flex items-center max-w-5xl mb-16 justify-between">
      <Link href={"/"}>
        <h1 className="text-lg">
          <span className="text-primary font-extrabold">devvy</span>.dev
        </h1>
      </Link>

      {/* nav links */}
      {navLinks.map((link) => (
        <NavLink text={link.text} href={link.href} key={link.href} />
      ))}

      {!session ? (
        <Link href={"/api/auth/signin"}>
          <NavBarButton text={"sign in with github"} />
        </Link>
      ) : (
        <div className="flex items-center gap-4 ">
          <p className="">{session.user.username}</p>
          <Link href={"/account"}>
            <Image
              src={`${session.user.image}`}
              alt="profile picture"
              width={48}
              height={48}
              className="rounded-full"
            />
          </Link>
        </div>
      )}
    </nav>
  );
}

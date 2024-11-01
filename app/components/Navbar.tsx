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
import LinkButton from "./LinkButton";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex text-md gap-4 border-b border-b-border py-8 mx-auto items-center max-w-5xl mb-16 justify-between">
      <Link href={"/"}>
        <h1 className="text-lg">
          <span className="text-primary font-extrabold">devvy</span>.dev
        </h1>
      </Link>

      {/* div for right side of navbar */}

      {/* nav links */}
      {navLinks.map((link) => (
        <NavLink text={link.text} href={link.href} key={link.href} />
      ))}

      {!session ? (
        <Link href={"/api/auth/signin"}>
          <NavBarButton text={"github sign in"} />
        </Link>
      ) : (
        <div className="flex items-center gap-2 ">
          {/* <LinkButton hrf="create-project" text="create project" /> */}

          <Link href={"/create-project"}>
            <div className="hidden sm:block bg-primary text-center p-1 text-white rounded-sm w-32 m-2 transition hover:bg-primary/80">
              create project
            </div>
          </Link>

          <p className="hidden sm:block">{session.user.username}</p>
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

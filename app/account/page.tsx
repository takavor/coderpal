import React from "react";
import Button from "../components/LinkButton";
import LinkButton from "../components/LinkButton";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

export default async function Account() {
  return (
    <main>
      <LinkButton href={"/create-post"} text="create post" />
      <LinkButton href={"/api/auth/signout"} text="sign out" />
    </main>
  );
}

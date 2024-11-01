// components
import LinkButton from "./components/LinkButton";

// next auth
import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="">
      <h1 className="header">devvy.dev</h1>
      <p className="paragraph">
        A website to find collaborators for your programming project.
      </p>

      {!session && (
        <div className="flex items-center gap-2">
          <LinkButton href="/api/auth/signin" text="Sign in" /> to create a
          posting for your project.
        </div>
      )}

      <div className="flex justify-center mt-8">
        <LinkButton text={"Browse projects"} href="/projects" />
      </div>
    </main>
  );
}

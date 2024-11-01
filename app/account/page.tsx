import React from "react";
import LinkButton from "../components/LinkButton";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";

export default async function Account() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  async function getProjects() {
    await dbConnect();

    if (!session) {
      console.log("Session is null, can't find posts");
      return;
    }

    const projects = Post.find({
      authorId: session!.user.id,
    });

    return projects;
  }

  const projects = await getProjects();

  return (
    <main className="flex flex-col gap-4">
      <h1>
        Logged in as <span className="font-bold">{session.user.username}</span>{" "}
      </h1>

      <div>
        <p className="header">My projects</p>
        {projects?.map((project, index) => (
          <div key={index}>{project.title}</div>
        ))}
      </div>

      <LinkButton href={"/create-project"} text="create project" />
      <LinkButton href={"/api/auth/signout"} text="sign out" />
    </main>
  );
}

import React from "react";
import LinkButton from "../components/LinkButton";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
import ProjectXButton from "../components/ProjectXButton";

export default async function Account() {
  const session = await getServerSession(authOptions);
  await dbConnect();

  if (!session) {
    redirect("/api/auth/signin");
  }

  async function getProjects() {
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

      <p className="header">My projects</p>
      <div className="grid grid-cols-1 gap-4 divide-y">
        {projects?.map((project, index) => (
          <div
            key={index}
            className="flex justify-between max-w-sm bg-card rounded-md p-2"
          >
            <div>{project.title}</div>
            <div className="flex items-center gap-2">
              <ProjectXButton id={project.id} />
            </div>
          </div>
        ))}
      </div>

      <LinkButton href={"/create-project"} text="create new project" />
      <LinkButton href={"/api/auth/signout"} text="sign out" />
    </main>
  );
}

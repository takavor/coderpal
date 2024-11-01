import React from "react";
import { redirect } from "next/navigation";

// mongo
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
import { Error } from "mongoose";

// auth
import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";

// data
import { programmingLanguages } from "../data/programmingLanguages";

// components
import SubmitButton from "../components/SubmitButton";

export default function CreatePost() {
  async function createPost(formData: FormData) {
    "use server";

    await dbConnect();

    const title = formData.get("title");
    const description = formData.get("description");
    const languages = formData.getAll("languages");

    // get user id
    const session = await getServerSession(authOptions);

    if (!session) {
      return;
    }

    const authorId = session.user.id;
    const authorUsername = session.user.username;

    const post = new Post({
      title: title,
      description: description,
      authorId: authorId,
      authorUsername: authorUsername,
      programmingLanguages: languages,
    });

    let success = true;
    let id = "";
    try {
      let data = await post.save();
      id = data.id;
    } catch (error) {
      success = false;
    }

    if (success) {
      redirect(`/post/${id}`);
    }
  }

  return (
    <main>
      <p className="header">Create post</p>
      <form action={createPost} className="flex flex-col">
        <div className="my-4 flex flex-col">
          <label htmlFor="title">Project Title</label>
          <input id="title" name="title" />
        </div>

        <div className="my-4 flex flex-col">
          <label htmlFor="description">Project Description</label>
          <textarea
            id="description"
            name="description"
            className="h-full"
          ></textarea>
        </div>

        <div className="my-4 flex">
          <label>Programming language(s)</label>
          <div className="gap-4">
            {programmingLanguages.map((language, index) => {
              return (
                <div key={index} className="">
                  <input
                    name="languages"
                    id={`languages-${index}`}
                    value={language.name}
                    type="checkbox"
                    className="mx-2"
                  />
                  <label htmlFor={`languages-${index}`}>{language.name}</label>
                </div>
              );
            })}
          </div>
        </div>

        <div className="my-8 flex justify-center">
          <SubmitButton text="create post" />
        </div>
      </form>
    </main>
  );
}

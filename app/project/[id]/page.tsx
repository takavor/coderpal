import React from "react";

import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Comment from "@/models/Comment";
import SubmitButton from "@/app/components/SubmitButton";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

// TODO: update comment section in realtime

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await dbConnect();
  async function getPost() {
    "use server";
    const id = (await params).id;
    let post = Post.findById(id);
    return post;
  }

  async function createComment(formData: FormData) {
    "use server";

    const commentText = formData.get("comment");

    // get info of user posting the comment
    const session = await getServerSession(authOptions);
    if (!session) return;

    const authorUsername = session.user.username;
    const authorId = session.user.id;

    const comment = new Comment({
      authorId: authorId,
      authorUsername: authorUsername,
      text: commentText,
    });

    let data = await comment.save();

    // add comment id to post
    let post = await getPost();
    post.commentIds.push(data._id);

    // save post
    await post.save();
  }

  async function getComment(id: string) {
    "use server";

    let comment = await Comment.findById({
      _id: id,
    });

    return comment;
  }

  // get post
  let post = null;
  try {
    post = await getPost();
  } catch (err) {}

  if (!post) {
    notFound();
  }

  return (
    <main>
      <div className="flex items-center gap-2 my-2">
        <h2>
          Posted by <span className="font-bold">{post.authorUsername}</span>
        </h2>
        <Link
          href={post.githubLink}
          passHref
          rel="noopener noreferrer"
          target="_blank"
        >
          <Image
            src={post.authorImage}
            width={32}
            height={32}
            alt="profile picture"
            className="rounded-full"
          />
        </Link>
      </div>
      <div className="flex flex-col gap-4 bg-white p-4 rounded-sm">
        <div className="gap-4">
          <h1 className="header">project title</h1>
          <h2>{post.title}</h2>
        </div>

        <div>
          <h1 className="header">project description</h1>
          <h2>{post.description}</h2>
        </div>
      </div>

      {post.commentIds.length === 0 && <p>This post has no comments.</p>}

      {post.commentIds.map(async (commentId: string, index: number) => {
        let comment = await getComment(commentId);

        return <div key={index}>{comment.text}</div>;
      })}

      <form action={createComment} className="flex flex-col">
        <label htmlFor="comment">Post a comment</label>
        <textarea
          className="resize-none p-2 rounded-sm"
          rows={3}
          id="comment"
          name="comment"
          required
        ></textarea>
        <div className="my-2">
          <SubmitButton text="post comment" />
        </div>
      </form>
    </main>
  );
}

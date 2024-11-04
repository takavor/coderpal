import React from "react";

import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Comment from "@/models/Comment";
import User from "@/models/User";
import SubmitButton from "@/app/components/SubmitButton";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import FormSubmitButton from "@/app/components/FormSubmitButton";
import { revalidatePath } from "next/cache";
import LinkButton from "@/app/components/LinkButton";
import moment from "moment";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
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
    if (!session) {
      // login page
      redirect("/api/auth/signin");
    }

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

    // revalidate current path for comment to appear automatically
    revalidatePath("");
  }

  async function getComment(id: string) {
    "use server";

    let comment = await Comment.findById({
      _id: id,
    });

    // get poster
    const authorId = comment.authorId;
    let commentAuthor = await User.findById({
      _id: authorId,
    });

    return {
      comment: comment.toObject(),
      commentAuthor: commentAuthor.toObject(),
    };
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
      <div className="flex max-[600px]:flex-col flex-row gap-2 my-2 justify-between">
        <div className="flex gap-2 items-center">
          <h2>Posted by</h2>
          <Link
            href={post.githubLink}
            passHref
            rel="noopener noreferrer"
            target="_blank"
            className="flex items-center gap-2"
          >
            <span className="font-bold  hover:underline">
              {post.authorUsername}
            </span>

            <Image
              src={post.authorImage}
              width={32}
              height={32}
              alt="profile picture"
              className="rounded-full"
            />
          </Link>
        </div>
        <div>
          <p>{moment(post.createdAt).format("LLL")}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 bg-white p-4 rounded-sm">
        <div className="gap-4">
          {/* <h1 className="header">project title</h1> */}
          <h1 className="header">{post.title}</h1>
        </div>
        <hr />
        <div className="flex flex-col lg:flex-row gap-4">
          <p>Languages:</p>
          {post.programmingLanguages.map((language: string, index: number) => {
            return (
              <li className="list-none" key={index}>
                {language}
              </li>
            );
          })}
        </div>
        <hr />
        <div>
          <h1 className="header">Description</h1>
          <h2>{post.description}</h2>
        </div>
      </div>

      <div className="my-4">
        <h1 className="header">Comments</h1>
        {post.commentIds.length === 0 && <p>This post has no comments.</p>}

        {post.commentIds.map(async (commentId: string, index: number) => {
          let { comment, commentAuthor } = await getComment(commentId);

          return (
            <div className="flex flex-col" key={index}>
              <div className="bg-white p-4 my-2 rounded-sm">
                <div className="flex max-[600px]:flex-col flex-row gap-2 mb-4 justify-between ">
                  <div className="flex items-center gap-2">
                    <Link
                      href={commentAuthor.githubLink}
                      passHref
                      rel="noopener noreferrer"
                      target="_blank"
                      className="flex items-center gap-2"
                    >
                      <p className="hover:underline">
                        <span className="font-bold ">
                          {commentAuthor.username}
                        </span>
                      </p>
                      <Image
                        src={commentAuthor.image}
                        width={32}
                        height={32}
                        alt="commenter profile picture"
                        className="rounded-full"
                      />
                    </Link>
                  </div>
                  {/* render comment date based on screen size */}
                  <div>
                    <p className="hidden sm:block">
                      {moment(comment.createdAt).format("LLL")}
                    </p>
                    <p className="sm:hidden">
                      {moment(comment.createdAt).format("lll")}
                    </p>
                  </div>
                </div>
                <hr className="my-2" />
                {comment.text}
              </div>
            </div>
          );
        })}
      </div>

      {session ? (
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
            <FormSubmitButton text="post comment" />
          </div>
        </form>
      ) : (
        <div className="flex items-center gap-2">
          <LinkButton text="Sign in" href="/api/auth/signin" />
          to post a comment.
        </div>
      )}
    </main>
  );
}

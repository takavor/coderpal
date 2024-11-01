import React from "react";

import Link from "next/link";

// components
import PostCard from "../components/PostCard";

import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";

export default async function Posts() {
  async function getPosts() {
    "use server";

    await dbConnect();

    const posts = Post.find();
    return posts;
  }

  const posts = await getPosts();

  return (
    <div className="">
      {posts.map((post, index) => {
        return (
          <Link key={index} href={`/post/${post.id}`}>
            <PostCard key={index} post={post} />
          </Link>
        );
      })}
    </div>
  );
}

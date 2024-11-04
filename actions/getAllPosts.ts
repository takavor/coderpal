"use server";

import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";

export async function getAllPosts() {
  await dbConnect();

  const posts = Post.find().sort({ createdAt: "descending" });
  return posts;
}

"use server";

import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";

export async function getPostsByFilter(filter: string) {
  await dbConnect();

  let posts = Post.find({
    programmingLanguages: decodeURIComponent(filter),
  }).sort({ createdAt: "descending" });

  return posts;
}

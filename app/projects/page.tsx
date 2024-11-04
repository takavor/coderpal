import React from "react";

import Link from "next/link";

// components
import PostCard from "../components/PostCard";

import { programmingLanguages } from "../data/programmingLanguages";

// actions
import { getPostsByFilter } from "@/actions/getPostsByFilter";
import { getAllPosts } from "@/actions/getAllPosts";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Posts(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const language = searchParams.language as string;

  let posts;
  if (!language) {
    posts = await getAllPosts();
  } else {
    posts = await getPostsByFilter(language);
  }

  return (
    <div className="">
      <p className="my-2">Filter by language:</p>
      <div className="flex flex-wrap gap-4 cursor-pointer items-center my-2">
        {/* option for All languages */}
        <Link href="/projects">
          <div
            className={` ${
              !language ? "bg-primary text-white" : "bg-background text-primary"
            } border border-primary rounded-sm px-1 sm:px-2 sm:py-1`}
          >
            All
          </div>
        </Link>
        {programmingLanguages.map((languageItem, index) => {
          const languageIsSelected = languageItem.name === language;
          const languageDivStyle = languageIsSelected
            ? "bg-primary text-white"
            : "bg-background text-primary";
          return (
            <Link
              key={index}
              href={`/projects?language=${encodeURIComponent(
                languageItem.name
              )}`}
            >
              <div
                className={`${languageDivStyle} border border-primary rounded-sm px-1 sm:px-2 sm:py-1`}
              >
                {languageItem.name}
              </div>
            </Link>
          );
        })}
      </div>
      <h1 className="header my-8">Projects</h1>
      {posts.map((post, index) => {
        return (
          <Link key={index} href={`/project/${post.id}`}>
            <PostCard key={index} post={post} />
          </Link>
        );
      })}
    </div>
  );
}

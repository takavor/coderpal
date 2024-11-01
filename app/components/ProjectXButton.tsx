"use client";

import React from "react";

import { deletePost } from "@/actions/deletePost";
import { useRouter } from "next/navigation";

interface ProjectXButtonProps {
  id: string;
}

export default function ProjectXButton({ id }: ProjectXButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        deletePost(id);
        router.refresh();
      }}
      className="bg-red-400 px-2 rounded-sm text-white"
    >
      X
    </button>
  );
}

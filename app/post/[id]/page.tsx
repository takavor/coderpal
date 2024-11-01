import React from "react";

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return <main>Post {id}</main>;
}

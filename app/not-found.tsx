import React from "react";
import LinkButton from "./components/LinkButton";

export default function NotFound() {
  return (
    <main className="">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl">404: The page could not be found.</h1>

        <LinkButton href="/" text="return home" />
      </div>
    </main>
  );
}

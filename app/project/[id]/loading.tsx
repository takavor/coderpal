import React from "react";
import Spinner from "../../components/Spinner";

export default function loading() {
  return (
    <main className="flex flex-col justify-center items-center">
      Loading...
      <Spinner />
    </main>
  );
}

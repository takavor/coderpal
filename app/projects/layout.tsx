import React from "react";

export default function Posts({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <h1 className="header">Projects</h1>
      {children}
    </main>
  );
}

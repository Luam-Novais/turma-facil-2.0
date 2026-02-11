import React from "react";

export default function Layout({children} : {children: React.ReactNode}) {
  return (
   <main className="min-h-250dvh">
    {children}
   </main>
  );
}

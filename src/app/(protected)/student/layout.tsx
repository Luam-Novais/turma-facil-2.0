import Link from "next/link";
import React from "react";


export default function Layout({children} : {children: React.ReactNode}) {
  return (
    <main className="min-h-250dvh md:p-4">
      {children}
    </main>
  );
}

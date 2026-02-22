import React from "react";

export default function Layout({children}: {children: React.ReactNode}){
    return (
      <main className="p-8 bg-gray-200 w-full max-w-full min-h-screen h-full">
        <div className="bg-gray-50 p-2 shadow-xl rounded-xl">{children}</div>
      </main>
    );
}
import React from "react";

export function PageContainer({children}:{children: React.ReactNode}){
    return <section className="flex flex-col gap-4 p-4 min-h-screen h-full bg-gray-100">{children}</section>;
}
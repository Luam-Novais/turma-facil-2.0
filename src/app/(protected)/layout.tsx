'use client'
import { HeaderMobile } from "@/src/components/header";
import { usePathname } from "next/navigation";
import React from "react";

export default function Layout({children}: {children : React.ReactNode}){
      const pathname = usePathname()
    return(
        <main className="max-w-full relative">
            {children}
            <HeaderMobile isActive={pathname}/>
        </main>
    )
}
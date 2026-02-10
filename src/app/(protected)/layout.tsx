import { HeaderMobile } from "@/src/components/header";
import React from "react";

export default function Layout({children}: {children : React.ReactNode}){
    return(
        <main className="max-w-full relative">
            {children}
            <HeaderMobile/>
        </main>
    )
}
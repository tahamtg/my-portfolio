import type { Metadata } from "next"
import React from "react";
import Header from "@/app/camponents/header";
import Footer from "@/app/camponents/footer"
import "@/app/global.css"
import "@fontsource/estedad/400.css";
import "@fontsource/estedad/500.css";
import "@fontsource/estedad/600.css";
import "@fontsource/estedad/700.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


interface children{
    children : React.ReactNode,
}

export const metadata: Metadata = {
    title: "Nebiral | tahagharaei",
    description: "سلام! من طاها قرایی هستم. این سایت با Next.js طراحی شده تا پروژه‌های برنامه‌نویسی و هوش مصنوعی من رو نمایش بده.",
}

const Layout = ({children}:children)=>{
    return(

        <html lang="fa" dir="rtl" className={cn("font-sans", geist.variable)}>

            <body>
                
            
                <Header/>
            
                    <main>{children}</main>

                <Footer/>
                
    
             </body>
            
        </html>

    )
}
 
export default Layout;
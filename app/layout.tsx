"use client"
import type { Metadata } from "next";
import  localFont from 'next/font/local'
import "./globals.css";
import Header from "./header";
import useGamburgerStore from "@/store/gamburger";
import Side_bar from "./side-bar";
import {  usePathname } from "next/navigation";





const poppins=localFont({
  weight:"400",
  src: "/local_font.ttf",
  display:"swap"
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


const {open,setOpen}=useGamburgerStore()
const pathname=usePathname()

const blockedPages=["/user-malumot"]




  return (
    <html lang="en">
      <body
        style={{ backgroundImage: "url('/banner1.svg')" }}
        className={`${poppins.className}   antialiased bg-cover`}
      >
        <div className="container max-w-full w-full  bg-[#1A1A1A]">
          {!blockedPages.includes(pathname) ? <Header /> : ""}
        </div>
        <div
          style={{ backgroundImage: "url('/body.svg')" }}
          className="flex container max-w-[1240px] w-full mx-auto min-h-screen"
        >
          {!blockedPages.includes(pathname) ?          
          <div
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            className={`
             transition-all duration-200 ease-in-out
            min-h-screen
             bg-[#1B1B1B]
          ${
          open
            ? "translate-x-0 opacity-100 w-[288px]"
            : "-translate-x-[300px] opacity-0 w-[164px]"
           }
          overflow-hidden
          `}
          >
            <Side_bar />
          </div> : ""}

          <div className="max-w-[952px] container w-full  flex  justify-center">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

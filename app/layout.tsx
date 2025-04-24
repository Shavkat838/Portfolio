"use client"

import  localFont from 'next/font/local'
import "./globals.css";
import Header from "./header";
import useGamburgerStore from "@/store/gamburger";
import Side_bar from "./side-bar";
import {  usePathname, useRouter } from "next/navigation";
import { useEffect } from 'react';








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


  useEffect(()=>{
    chekUser()
  },[])

const {open,setOpen}=useGamburgerStore()
const pathname=usePathname()
const router=useRouter()
const blockedPages=["/user-malumot"]



function chekUser(){
  if(blockedPages.includes(pathname)){
     router.push('/admin-login')
  }
}


  return (
    <html lang="en">
      <body
        style={{ backgroundImage: "url('/banner1.svg')" }}
        className={`${poppins.className}   antialiased bg-cover`}
      >
        <div className="container max-w-full w-full z-50 fixed bg-[#1A1A1A]">
          {!blockedPages.includes(pathname) ? <Header /> : ""}
        </div>
        <div
          style={{ backgroundImage: "url('/body.svg')" }}
          className="flex container max-w-[1240px]  w-full mx-auto pt-[48px]   min-h-screen "
        >
          {!blockedPages.includes(pathname) ? (
            <div
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
              className={`
             transition-all duration-200 ease-in-out 
               bg-[#1B1B1B] z-10 fixed  left-0  top-0  h-screen
             lg:relative lg:h-auto lg:min-h-screen
          ${
            open
              ? "translate-x-0 opacity-100 w-[288px]"
              : "-translate-x-[320px] opacity-0 w-[164px]"
          }
          overflow-hidden
          `}
            >
              <Side_bar />
            </div>
          ) : (
            ""
          )}
          <div className="lg:max-w-[952px] container w-full z-0  min-h-screen   flex  justify-center">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

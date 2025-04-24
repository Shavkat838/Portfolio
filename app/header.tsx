"use client"
import useGamburgerStore from "@/store/gamburger";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { TbLayoutNavbarCollapse } from "react-icons/tb";




export default function Header() {
 const pathname=usePathname()
 const [visible,setVisible]=useState(false)


 const {setOpen}=useGamburgerStore()

 const navbar_arr=[{key:"Bosh Sahifa",value:"/"},{key:"Haqida",value:"/malumot"},{key:"Loyiha",value:"/loyiha"},{key:"Bog`lanish",value:"/contact"}]

  return (
    <div className="lg:max-w-[1240px]   mx-auto w-[100%]   h-[48px]  flex justify-between items-center  border-b-1 border-[#FFFFFF40] rounded-t-[13px] bg-[#1A1A1A] border-2 px-1">
      <div className="max-w-[182px] w-full  h-[32px] flex items-center justify-start gap-1 lg:justify-between ">
        <button
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="cursor-pointer"
        >
          <Image
            src={"/hamburger.svg"}
            alt="hamburger"
            width={32}
            height={32}
          />
        </button>
        <Link href={"/"}>
          <p className="w-[136px] h-[28px] text-[22px] font-medium text-white leading-[28px]">
            SHAVKATJON
            <span className="text-green-800 text-[22px] font-medium ">.UZ</span>
          </p>
        </Link>
      </div>
      <div className="max-w-[419px] h-[32px] w-[100%] flex   items-center justify-end gap-2 sm:justify-between">
        <div className="hidden sm:flex gap-6">
          {navbar_arr &&
            navbar_arr.map((item, index) => (
              <Link key={index} href={item.value}>
                <p
                  className={`font-normal text-white ${
                    pathname === item.value
                      ? "underline decoration-green-700 underline-offset-8 decoration-[3px] "
                      : "no-underline"
                  }    text-[16px] leading-[100%]`}
                >
                  {item.key}
                </p>
              </Link>
            ))}
        </div>
        <button
          onClick={() => setVisible(!visible)}
          className="sm:hidden cursor-pointer "
        >
          <TbLayoutNavbarCollapse color="white" size={26} />
        </button>

        {visible && (
          <div className="absolute top-[60px] left-1 right-1  bg-[#2A2A2A] rounded-md p-1 flex flex-col gap-1 sm:hidden z-50">
            {navbar_arr.map((item, index) => (
              <a
                className={` ${
                  pathname === item.value ? "text-green-600" : " text-white"
                } `}
                key={index}
                href={item.value}
              >
                {item.key}
              </a>
            ))}
          </div>
        )}

        <div>
          <Link href={"https://github.com/Shavkat838"}>
            <Image
              src={"/github.svg"}
              alt="github-img"
              width={32}
              height={32}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client"
import useGamburgerStore from "@/store/gamburger";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";




export default function Header() {
 const pathname=usePathname()


 const {setOpen}=useGamburgerStore()

  return (
    <div className="max-w-[1240px] mx-auto w-[100%]  h-[48px]  flex justify-between items-center  border-b-1 border-[#FFFFFF40] rounded-t-[13px] bg-[#1A1A1A] border-2 px-1">
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="w-[182px] h-[32px] flex items-center justify-between"
      >
        <button className="cursor-pointer">
          <Image
            src={"/hamburger.svg"}
            alt="hamburger"
            width={32}
            height={32}
          />
        </button>
         <p className="w-[136px] h-[28px] text-[22px] font-medium text-white leading-[28px]"> SHAVKATJON<span className="text-green-800 text-[22px] font-medium ">.UZ</span>   </p>
      </div>
      <div className="max-w-[419px] h-[32px] w-[100%] flex  items-center justify-between">
        <div className="max-w-[373px] w-[100%] h-[24px] flex items-center justify-between">
          <Link href={"/"}>
            <p
              className={`font-normal text-white ${
                pathname === "/"
                  ? "underline decoration-green-700 underline-offset-8 decoration-[3px] "
                  : "no-underline"
              }    text-[16px] leading-[100%]`}
            >
              Bosh sahifa
            </p>
          </Link>
          <Link href={"/malumot"}>
            <p
              className={`font-normal text-white  ${
                pathname === "/malumot"
                  ? "underline decoration-green-700 underline-offset-8   decoration-[3px] "
                  : "no-underline"
              }   text-[16px] leading-[100%]`}
            >
              Haqida
            </p>
          </Link>
          <Link href={"/loyiha"}>
            <p
              className={`font-normal text-white  ${
                pathname === "/loyiha"
                  ? "underline decoration-green-700  underline-offset-8 decoration-[3px]   "
                  : "no-underline"
              } text-[16px] leading-[100%]`}
            >
              Loyihalar
            </p>
          </Link>
          <Link href={"/contact"}>
            <p
              className={`font-normal text-white ${
                pathname === "/contact"
                  ? "underline decoration-green-700 underline-offset-8  decoration-[3px]  "
                  : "no-underline"
              }    text-[16px] leading-[100%]`}
            >
              Bog`lanish
            </p>
          </Link>
        </div>
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

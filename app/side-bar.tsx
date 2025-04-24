"use client"
import { Users } from "@/helpers/types";
import { createClient } from "@/utils/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";



export default  function Side_bar() {
const supabase=createClient()
const [users,setUsers]=useState<Users[]>([])


useEffect(()=>{
  getUser()
},[])

async function getUser(){
  try {
    const { data: usersdata } = await supabase
      .from("usersdata")
      .select("*");
      console.log(usersdata![0].imageUrl)
      setUsers(usersdata as Users[])
  } catch (error) {
    console.log(error)
  }
}


  
  return (
    <div className="bg-[#1B1B1B]  ">
      <div className="max-w-[287px]  border-b-1 border-[#FFFFFF40] mb-[14px] h-[40px] w-[100%] flex items-center gap-[14px] pl-[14px] ">
        <Image className="w-[24px] h-[24px] " src={"/chapImg.svg"} alt="Image" width={24} height={24} />
        <Image className="w-[24px] h-[24px] " src={"/ongImg.svg"} alt="Image" width={24} height={24} />
        <Image className="w-[24px] h-[24px] " src={"/refresh.svg"} alt="Image" width={24} height={24} />
      </div>
      <div className="max-[287px] w-[100%] h-[376px] border-b-1 pl-[14px] border-[#FFFFFF40]">
        {users[0]?.imageUrl && (
          <Image
            className="rounded-[10px]"
            src={users[0]?.imageUrl}
            alt="person"
            width={259}
            height={260}
            style={{
              height: "260px",
              width: "259px",
              backgroundSize: "100% 100%",
            }}
          />
        )}
        <div>
          <p className="font-medium  text-[18px] leading-1 text-white mt-[14px]">
            {users[0]?.name}
          </p>
        </div>
        <div className="max-[259px] w-[100%]  mt-[20px] h-[62px] flex flex-wrap gap-[10px]">
          {users[0]?.fields.map((item, index) => (
            <div
              key={index}
              className="px-2 h-[26px] rounded-[8px] bg-[#d0cccc40] text-white font-medium text-[12px] leading-[14px] flex items-center justify-center"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-[288px] h-[244px]   mt-[14px]  flex flex-col items-start pl-[5px]  gap-[14px]">
        <div className="w-[260px] h-[47px] flex gap-[10px]">
          <Image className="w-[44px] h-[44px] " src={"/gmail.svg"} alt="gmail" width={44} height={44} />
          <div className="width-[171px] h-[47px]  flex flex-col gap-[15px] ">
            <h5 className="font-medium  text-white text-[16px] mt-[10px] leading-1">
              E-pochta
            </h5>
            <p className="font-normal text-[14px] leading-1 text-gray-400   ">
              {users[0]?.email}
            </p>
          </div>
        </div>
        <div className="w-[260px] h-[47px] flex gap-[10px]">
          <Image className="w-[44px] h-[44px] " src={"/git.svg"} alt="git" width={44} height={44} />
          <div className="width-[171px] h-[47px]  flex flex-col gap-[15px] ">
            <h5 className="font-medium  text-white text-[16px] mt-[10px] leading-1">
              Github
            </h5>
            <Link href={"https://github.com/Shavkat838"}>
              <p className="font-normal text-[14px] leading-1 text-gray-400   ">
                {users[0]?.github}
              </p>
            </Link>
          </div>
        </div>
        <div className="w-[260px] h-[47px] flex gap-[10px]">
          <Image className="w-[44px] h-[44px]  " src={"/telegram.svg"} alt="telegram" width={44} height={44} />
          <div className="width-[171px] h-[47px]  flex flex-col gap-[15px] ">
            <h5 className="font-medium  text-white text-[16px] mt-[10px] leading-1">
              Telegram
            </h5>
            <Link href={"https://t.me/shb_1_4"}>
              <p className="font-normal text-[14px] leading-1 text-gray-400   ">
                {users[0]?.telegram}
              </p>
            </Link>
          </div>
        </div>
        <div className="w-[260px] h-[47px] flex gap-[10px]">
          <Image className="w-[44px] h-[44px] " src={"/contact.svg"} alt="gmail" width={44} height={44} />
          <div className="width-[171px] h-[47px]  flex flex-col gap-[15px] ">
            <h5 className="font-medium  text-white text-[16px] mt-[10px] leading-1">
              Telefon raqam
            </h5>
            <p className="font-normal text-[14px] leading-1 text-gray-400   ">
              {users[0]?.raqam}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

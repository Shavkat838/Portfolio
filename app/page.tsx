"use client"

import { Users } from "@/helpers/types";
import { createClient } from "@/utils/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {


  const supabase=createClient()
  const [users,setUsers]=useState<Users[]>([])
  
  
  useEffect(()=>{
    getUser()
  },[])
  
  async function getUser(){
    try {
      const { data: usersdata,} = await supabase
        .from("usersdata")
        .select("*");
        console.log(usersdata![0].imageUrl)
        setUsers(usersdata as Users[])
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="max-w-[633px]  px-[5px] sm:px-0 h-[265px] w-[100%]  mt-[227px] flex items-center  flex-col">
      <h1 className="font-bold  text-[36px] text-center text-white">
        Assalomu alaykum, Men
        <span className="text-green-700"> {users[0]?.name}</span>
      </h1>
      <p className="text-[18px] text-center  text-gray-500  font-medium   ">
        {users[0]?.malumot}
      </p>
      <Link href={"/loyiha"}>
        <button className="w-[169px]  cursor-pointer mt-[16px] h-[43px] bg-[#39965F] rounded-[8px]  text-white font-medium text-[18px] leading-1  ">
            Loyihalar
        </button>
      </Link>
    </div>
  );
}

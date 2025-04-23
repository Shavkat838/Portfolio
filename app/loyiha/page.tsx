"use client"
import { createClient } from "@/utils/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


type Role="YUQORI"|"ORTA"|"PAST"|"";

type Project={
  projectRole:Role;
  projectName:string;
  projectImage:string;
  projectFields:string[]
}


export default function LoyihaPage() {
  const supabase=createClient()
  const [projects,setProjects]=useState<Project[]>([])

  useEffect(()=>{
    getProjects()
  },[])

  async function getProjects() {
    try {
     const {data:projects }=await supabase.from("projects").select("*");
     setProjects(projects!)
    } catch (error) {
      console.log(error);
    }
  }


  function capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  return (
    <div className="mt-[32px]">
      <div className="max-w-[912px] w-[100%]  h-[840px] ">
        <div className="w-[154px] h-[64px] flex  flex-col gap-[8px]">
          <h1 className="text-white font-bold text-[32px]">Loyihalar</h1>
          <Image src={"/border.svg"} alt="photo" width={112} height={8} />
        </div>
        <div className="w-[912px] h-[44px]  mt-[24px] flex justify-between ">
          <div className="w-[140px] rounded-[6px] border-1 border-[#FFFFFF40] h-[44px] bg-[#1B1B1B] flex items-center justify-center gap-[10px]">
            <p className="text-[16px] font-medium text-white  ">Filtrlash</p>
            <Image src={"/filter.svg"} alt="photo" width={20} height={20} />
          </div>
          <div className="w-[484px] h-[44px] flex justify-end">
            <div className="w-[148px] rounded-[6px] border-1 border-[#FFFFFF40] h-[44px] bg-[#1B1B1B] flex items-center justify-center gap-[10px]">
              <p className="text-[16px] font-medium text-white  ">Barchasi</p>
              <Image src={"/chevron.svg"} alt="photo" width={20} height={20} />
            </div>
          </div>
        </div>
        <div className="max-w-[912px] w-full  flex flex-wrap   mt-[25px] gap-y-[60px] gap-x-[20px]  ">
          {projects &&
            projects.map((item, index) => (
              <div key={index} className="w-[444px] ">
                <Image
                  className="rounded-[8px] "
                  src={item.projectImage}
                  alt="photo"
                  width={444}
                  style={{ height: "220px",width:"444px",backgroundSize:"100% 100%" }}
                  height={220}
                />
                <div className="mt-[12px] w-[444px] flex justify-between  ">
                  <h1 className="text-white text-[20px] font-medium  ">
                    {item.projectName}
                  </h1>
                  <div className="flex gap-[6px] items-center w-[73px] h-[24px]">
                    <p className="text-white text-[16px] font-medium ">
                      {capitalizeFirstLetter(item.projectRole)}
                    </p>
                    <div
                      className={`w-[10px] h-[10px] rounded-full ${
                        item.projectRole === "YUQORI"
                          ? "bg-red-900"
                          : item.projectRole === "ORTA"
                          ? "bg-yellow-300"
                          : "bg-green-800"
                      } `}
                    ></div>
                  </div>
                </div>
                <div className="w-[444px]  mt-[12px] flex flex-wrap gap-[12px]">
                  {item.projectFields.map((it,index) => (
                    <p key={index} className="text-[#39965F] text-[16px] font-medium  ">
                      #{it}
                    </p>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="w-[912px] h-[208px] flex items-center mb-[26px]  mt-[64px] pl-[20px] rounded-[12px] bg-[#1B1B1B]  ">
        <Image src={"/tg_icon.svg"} alt="telegram" width={168} height={168} />
        <div className="ml-[20px] w-[406px] h-[160px]    flex flex-col gap-[12px] ">
          <h1 className="text-white text-[28px] font-bold ">Telegram kanal</h1>
          <p className="text-[18px] w-[406px]  font-normal text-[#FFFFFF40] ">
            Barcha loyihalarimni telegram kanalimda <br /> ham kuzatib
            borishingiz mumkin!
          </p>
          <Link href={"https://t.me/shavkat1_4"}>
            <button className="w-[178px] h-[40px] cursor-pointer bg-[#39965F] rounded-[8px]  text-white text-[16px]  font-normal  flex items-center justify-center  ">
              Tashrif buyurish
            </button>
          </Link>
        </div>
        <div className="relative  max-w-[280px] w-full ">
          <div className="">
            <Image src={"/qiyalik1.svg"} alt="photo" width={144} height={144} />
          </div>
          <div className="absolute top-[-10px] right-[-10px]">
            <Image src={"/qiyalik2.svg"} alt="photo" width={206} height={192} />
          </div>
        </div>
      </div>
    </div>
  );
}

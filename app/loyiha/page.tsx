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
    <div className="mt-[32px] max-w-[912px] w-[100%] px-[10px] sm:px-0 ">
      <div className="max-w-[912px] w-[100%]   ">
        <div className="max-w-[154px] w-full h-[64px] flex  flex-col gap-[8px]">
          <h1 className="text-white font-bold text-[32px]">Loyihalar</h1>
          <Image src={"/border.svg"} alt="photo" width={112} height={8} />
        </div>
        <div className="max-w-[912px] w-full h-[44px]  mt-[24px] flex justify-between ">
          <div className="max-w-[130px] w-full rounded-[6px] border-1 border-[#FFFFFF40] h-[44px] bg-[#1B1B1B] flex items-center justify-center gap-[10px]">
            <p className="text-[16px] font-medium text-white  ">Filtrlash</p>
            <Image src={"/filter.svg"} alt="photo" width={20} height={20} />
          </div>
          <div className="max-w-[484px]  w-full h-[44px] flex justify-end">
            <div className="max-w-[148px] w-full rounded-[6px] border-1 border-[#FFFFFF40] h-[44px] bg-[#1B1B1B] flex items-center justify-center gap-[10px]">
              <p className="text-[16px] font-medium text-white  ">Barchasi</p>
              <Image src={"/chevron.svg"} alt="photo" width={20} height={20} />
            </div>
          </div>
        </div>
        <div className="max-w-[912px] w-full  grid grid-cols-1 sm:grid-cols-2  mt-[25px] gap-y-[60px] gap-x-[20px]  ">
          {projects &&
            projects.map((item, index) => (
              <div key={index} className="max-w-[444px] w-full ">
                <Image
                  className="rounded-[8px] "
                  src={item.projectImage}
                  alt="photo"
                  width={444}
                  style={{
                    height: "220px",
                    width: "444px",
                    backgroundSize: "100% 100%",
                  }}
                  height={220}
                />
                <div className="mt-[12px] max-w-[444px] w-full flex justify-between">
                  <h1 className="text-white text-[20px] font-medium  ">
                    {item.projectName}
                  </h1>
                  <div className="flex gap-[6px] items-center max-w-[73px] w-full h-[24px]">
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
                <div className="max-w-[444px] w-full  mt-[12px] flex flex-wrap gap-[12px]">
                  {item.projectFields.map((it, index) => (
                    <p
                      key={index}
                      className="text-[#39965F] text-[16px] font-medium  "
                    >
                      #{it}
                    </p>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="w-full max-w-[500px] sm:max-w-[912px]  h-[600px] sm:h-[208px] mx-auto sm:mx-0 flex flex-col sm:flex-row items-center mb-[26px]  mt-[64px]   sm:pl-[20px] rounded-[12px] bg-[#1B1B1B]  ">
        <Image
          className="mt-[20px] sm:mt-0"
          src={"/tg_icon.svg"}
          alt="telegram"
          width={168}
          height={168}
        />
        <div className="sm:ml-[20px] max-w-[406px] w-full flex flex-col items-center sm:items-start gap-[20px] sm:gap-[12px] ">
          <h1 className="text-white text-[28px] mt-[10px] sm:mt-0 font-bold ">
            Telegram kanal
          </h1>
          <p className="text-[18px] max-w-[406px] text-center sm:text-start  w-full  font-normal text-[#FFFFFF40] ">
            Barcha loyihalarimni telegram kanalimda{" "}
            <br className="hidden sm:block" /> ham kuzatib borishingiz mumkin!
          </p>
          <Link href={"https://t.me/shavkat1_4"}>
            <button className="w-[178px]   h-[40px] cursor-pointer bg-[#39965F] rounded-[8px]  text-white text-[16px]  font-normal  flex items-center justify-center  ">
              Tashrif buyurish
            </button>
          </Link>
        </div>
        <div className="relative  max-w-[280px] mt-[30px]  sm:mt-0  w-full ">
          <div className=" ">
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

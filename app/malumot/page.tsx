"use client"
import { createClient } from "@/utils/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";



type Imag = {
  texname: string;
  texImage: string;
};

type UserTex = {
  description: string;
  images: Imag[];
  id: string;
};


export default function MalumotPage() {


  useEffect(()=>{
    getusertex()
  },[])

  const supabase=createClient()
  const [hover,setHover]=useState("")

 const [usersTex,setUsersTex]=useState<UserTex[]>([])



  async function getusertex() {
    try {
      const { data: userstex } = await supabase.from("userstex").select("*");
      if (userstex && userstex.length > 0) {
        setUsersTex(userstex)
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div>
      <div className="max-w-[912px] w-[100%]  mt-[22px]">
        <div className="flex flex-col gap-[8px] ">
          <h1 className="text-white font-bold  text-[32px] ">Men haqimda</h1>
          <Image src={"/border.svg"} alt="border" width={112} height={8} />
        </div>
        <div className="max-w-[912px] w-[100%]  flex flex-col mt-[20px] gap-[10px]">
          <p className="font-medium  text-[18px] text-gray-300  ">
            {usersTex[0] && usersTex[0].description}
          </p>
        </div>
        <Link href={"/contact"}>
          <button className="bg-[#39965F] cursor-pointer w-[181px] h-[43px] mt-[32px] rounded-[8px]  text-white flex items-center  justify-center   ">
            Bog`lanish
          </button>
        </Link>
      </div>
      <div className="w-[912px] mt-[44px] flex flex-col gap-[24px] ">
        <div className="flex flex-col gap-[8px] ">
          <h1 className="text-white font-bold  text-[32px] ">
            Asbob-uskunalar
          </h1>
          <Image src={"/border.svg"} alt="border" width={112} height={8} />
        </div>
        <div className="max-w-[912px] w-[100%] flex flex-wrap gap-[20px] ">
          {usersTex[0] &&
            usersTex[0].images.map((imag, index) => (
              <div
                onMouseEnter={() => setHover("PLUS")}
                onMouseLeave={() => setHover("MINUS")}
                key={index}
                className="w-[209px] h-[124px] relative rounded-[12px] bg-[#1B1B1B] border border-gray-100 flex items-center justify-center"
              >
                {hover === "PLUS" ? (
                  <p className="text-[20px] font-semibold text-white">{imag.texname}</p>
                ) : (
                  <Image
                    unoptimized
                    src={imag.texImage}
                    alt="photo"
                    width={64}
                    height={64}
                  />
                )}
              </div>
            ))}
        </div>
      </div>
      <div className="max-w-[912px] h-[350px] mt-[64px]  w-[100%] flex flex-col gap-[24px] ">
        <div className="flex flex-col gap-[8px] ">
          <h1 className="text-white font-bold  text-[32px] ">
            Men nimalar qila olaman
          </h1>
          <Image src={"/border.svg"} alt="border" width={112} height={8} />
        </div>
        <div className="w-[912px] h-[268px] flex flex-wrap gap-[20px]">
          <div className="w-[444px] h-[124px] rounded-[12px]   bg-[#1A1A1A] flex items-center justify-center">
            <div className="w-[404px] h-[84px]  flex gap-[10px]  items-start ">
              <Image src={"/b1.svg"} alt="photo" width={64} height={64} />
              <div className="w-[326px]  h-[84px]  flex flex-col gap-[7px]">
                <h1 className="text-white  font-semibold text-[20px] leading-[100%] ">
                  Seo
                </h1>
                <p className="font-medium text-[16px] text-gray-300 ">
                  Qidiruv tizimining natijalarida sayt <br /> reytingini
                  yaxshilash
                </p>
              </div>
            </div>
          </div>
          <div className="w-[444px] h-[124px] rounded-[12px]  bg-[#1A1A1A] flex items-center justify-center">
            <div className="w-[404px] h-[84px]  flex gap-[10px]  items-start ">
              <Image src={"/b3.svg"} alt="photo" width={64} height={64} />
              <div className="w-[326px]  h-[84px]  flex flex-col gap-[7px]">
                <h1 className="text-white  font-semibold text-[20px] leading-[100%] ">
                  Dizayn
                </h1>
                <p className="font-medium text-[16px] text-gray-300 ">
                  Kuchli dizayn va kichik detallargacha <br /> e`tibor berish
                </p>
              </div>
            </div>
          </div>
          <div className="w-[444px] h-[124px] rounded-[12px]  bg-[#1A1A1A] flex items-center justify-center">
            <div className="w-[404px] h-[84px]  flex gap-[10px]  items-start ">
              <Image src={"/b2.svg"} alt="photo" width={64} height={64} />
              <div className="w-[326px]  h-[84px]  flex flex-col gap-[7px]">
                <h1 className="text-white  font-semibold text-[20px] leading-[100%] ">
                  Sifat
                </h1>
                <p className="font-medium text-[16px] text-gray-300 ">
                  Yuqori darajada saytlarni sifatli ishlab <br /> chiqish
                </p>
              </div>
            </div>
          </div>
          <div className="w-[444px] h-[124px] rounded-[12px]  bg-[#1A1A1A] flex items-center justify-center">
            <div className="w-[404px] h-[84px]  flex gap-[10px]  items-start ">
              <Image src={"/b4.svg"} alt="photo" width={64} height={64} />
              <div className="w-[326px]  h-[84px]  flex flex-col gap-[7px]">
                <h1 className="text-white  font-semibold text-[20px] leading-[100%] ">
                  Tezkorlik
                </h1>
                <p className="font-medium text-[16px] text-gray-300 ">
                  Qisqa muddat ichida tezkor sayt ishlab <br /> chiqish
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[912px] h-[206px] flex flex-col mt-[64px] mb-[32px]  gap-[24px]">
        <div className="flex flex-col gap-[8px] ">
          <h1 className="text-white font-bold  text-[32px] ">Mijozlar</h1>
          <Image src={"/border.svg"} alt="border" width={112} height={8} />
        </div>
        <div className="w-[912px] h-[124px] flex gap-[20px] justify-between ">
          <div className="w-[213px] h-[124px]  bg-[#1A1A1A] rounded-[12px] flex items-center justify-center">
            <Image src={"/webking.svg"} alt="photo" width={114} height={66} />
          </div>
          <div className="w-[213px] h-[124px]  bg-[#1A1A1A] rounded-[12px] flex items-center justify-center">
            <Image src={"/market.svg"} alt="photo" width={114} height={66} />
          </div>
          <div className="w-[213px] h-[124px]  bg-[#1A1A1A] rounded-[12px] flex items-center justify-center"></div>
          <div className="w-[213px] h-[124px]  bg-[#1A1A1A] rounded-[12px] flex items-center justify-center"></div>
        </div>
      </div>
    </div>
  );
}

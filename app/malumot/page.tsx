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
  const [hoverindex,setHoverIndex]=useState<number|null>(null)

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
    <div className="max-w-[912px] w-[100%]  mt-[22px]">
      <div className="max-w-[912px] w-[100%]  px-[10px] sm:px-0  mt-[22px]">
        <div className="flex max-w-[230px] w-full   flex-col  gap-[8px] ">
          <h1 className="text-white font-bold  text-[32px] ">Men haqimda</h1>
          <Image src={"/border.svg"} alt="border" width={112} height={8} />
        </div>
        <div className="max-w-[912px]   flex flex-col mt-[20px] gap-[10px]">
          <p className="font-medium  max-w-[912px] w-  text-[18px] text-gray-300  ">
            {usersTex[0] && usersTex[0].description}
          </p>
        </div>
        <Link href={"/contact"}>
          <button className="bg-[#39965F] cursor-pointer w-[181px] h-[43px] mt-[32px] rounded-[8px]  text-white flex items-center  justify-center   ">
            Bog`lanish
          </button>
        </Link>
      </div>
      <div className="max-w-[912px] w-[100%]  mt-[44px] flex flex-col gap-[24px] ">
        <div className="flex flex-col gap-[8px] pl-[10px] sm:pl-0 ">
          <h1 className="text-white font-bold  text-[32px] ">
            Asbob-uskunalar
          </h1>
          <Image src={"/border.svg"} alt="border" width={112} height={8} />
        </div>
        <div className="max-w-[912px] w-[100%] grid grid-cols-2 lg:grid-cols-4 px-[10px] sm:px-0  gap-[20px] ">
          {usersTex[0] &&
            usersTex[0].images.map((imag, index) => (
              <div
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                key={index}
                className="max-w-[209px] cursor-pointer w-full h-[124px] mx-auto sm:mx-0  relative rounded-[12px] bg-[#1B1B1B] border border-gray-50 flex items-center justify-center"
              >
                {hoverindex === index ? (
                  <p className="text-[20px] font-semibold text-white">
                    {imag.texname}
                  </p>
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
      <div className="max-w-[912px] mt-[64px]  w-[100%] flex flex-col gap-[24px] ">
        <div className="flex flex-col gap-[8px] pl-[10px] sm:pl-0 ">
          <h1 className="text-white font-bold  text-[32px] ">
            Men nimalar qila olaman
          </h1>
          <Image src={"/border.svg"} alt="border" width={112} height={8} />
        </div>
        <div className="max-w-[912px] w-full px-2 sm:px-0 sm:h-[268px] grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
          <div className="max-w-[444px] min-h-[124px] rounded-[12px] px-[10px] sm:px-0   bg-[#1A1A1A] flex items-center border border-gray-100 justify-center">
            <div className="max-w-[404px] w-full h-[84px]  flex gap-[10px]  items-start ">
              <Image
                className="sm:w-[64px] sm:h-[64px] "
                src={"/b1.svg"}
                alt="photo"
                width={54}
                height={54}
              />
              <div className="w-[326px]  h-[84px]  flex flex-col gap-[7px]">
                <h1 className="text-white  font-semibold text-[20px] leading-[100%] ">
                  Seo
                </h1>
                <p className="font-medium text-[16px] text-gray-300 ">
                  Qidiruv tizimining natijalarida sayt{" "}
                  <br className="hidden sm:block" /> reytingini yaxshilash
                </p>
              </div>
            </div>
          </div>
          <div className="max-w-[444px] w-[100%] min-h-[124px] rounded-[12px]    bg-[#1A1A1A] flex border border-gray-100 items-center justify-center">
            <div className="max-w-[404px] w-[100%]   h-[84px] px-[10px] sm:px-0  flex  gap-[10px]    items-start ">
              <Image
                className="sm:w-[64px]  sm:h-[64px] "
                src={"/b3.svg"}
                alt="photo"
                width={54}
                height={54}
              />
              <div className="w-[326px]  h-[84px]  flex flex-col gap-[7px]">
                <h1 className="text-white  font-semibold text-[20px] leading-[100%] ">
                  Dizayn
                </h1>
                <p className="font-medium text-[16px] text-gray-300 ">
                  Kuchli dizayn va kichik detallargacha{" "}
                  <br className="hidden sm:block" /> e`tibor berish
                </p>
              </div>
            </div>
          </div>
          <div className="max-w-[444px] w-full h-[124px] rounded-[12px]  bg-[#1A1A1A] flex items-center border border-gray-100 justify-center">
            <div className="max-w-[404px] w-[100%] h-[84px] px-[10px] sm:px-0  flex gap-[10px]  items-start ">
              <Image
                className="sm:w-[64px] sm:h-[64px] "
                src={"/b2.svg"}
                alt="photo"
                width={54}
                height={54}
              />
              <div className="w-[326px]  h-[84px]  flex flex-col gap-[7px]">
                <h1 className="text-white  font-semibold text-[20px] leading-[100%] ">
                  Sifat
                </h1>
                <p className="font-medium text-[16px] text-gray-300 ">
                  Yuqori darajada saytlarni sifatli ishlab{" "}
                  <br className="hidden sm:block" /> chiqish
                </p>
              </div>
            </div>
          </div>
          <div className="max-w-[444px] w-full h-[124px] rounded-[12px]  bg-[#1A1A1A] flex items-center border border-gray-100 justify-center">
            <div className="max-w-[404px] w-[100%] h-[84px] px-[10px] sm:px-0 flex gap-[10px]  items-start ">
              <Image
                className="sm:w-[64px] sm:h-[64px] "
                src={"/b4.svg"}
                alt="photo"
                width={54}
                height={54}
              />
              <div className="w-[326px]  h-[84px]  flex flex-col gap-[7px]">
                <h1 className="text-white  font-semibold text-[20px] leading-[100%] ">
                  Tezkorlik
                </h1>
                <p className="font-medium text-[16px] text-gray-300 ">
                  Qisqa muddat ichida tezkor sayt ishlab{" "}
                  <br className="hidden sm:block" /> chiqish
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[912px]  w-full px-[10px] sm:px-0 flex flex-col mt-[64px] mb-[32px]  gap-[24px]">
        <div className="flex flex-col gap-[8px] ">
          <h1 className="text-white font-bold  text-[32px] ">Mijozlar</h1>
          <Image src={"/border.svg"} alt="border" width={112} height={8} />
        </div>
        <div className="max-w-[912px] w-full  grid grid-cols-1 gap-2 items-center sm:grid-cols-4  ">
          <div className="max-w-[440px] min-h-[124px]  bg-[#1A1A1A] rounded-[12px]  border border-gray-100 flex items-center justify-center">
            <Image src={"/webking.svg"} alt="photo" width={114} height={66} />
          </div>
          <div className="max-w-[440px] w-full min-h-[124px]  bg-[#1A1A1A] rounded-[12px] border border-gray-100 flex items-center justify-center">
            <Image src={"/market.svg"} alt="photo" width={114} height={66} />
          </div>
        </div>
      </div>
    </div>
  );
}

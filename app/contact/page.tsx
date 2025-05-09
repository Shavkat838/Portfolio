"use client"
import { Users } from "@/helpers/types";
import { createClient } from "@/utils/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


// type Murojat={
//   fullname:string;
//   izoh:string;
//   email:string;
// }



export default function ContactPage() {
  const supabase=createClient()
  const [users, setUsers] = useState<Users[]>([]);  
  const [fullname, setFullname] = useState("");  
  const [email, setEmail] = useState("");  
  const [izoh, setIzoh] = useState("");  

 useEffect(()=>{
  getUser()
 },[])


  async function getUser() {
    try {
      const { data: usersdata } = await supabase
        .from("usersdata")
        .select("*");
      setUsers(usersdata as Users[]);
    } catch (error) {
      console.log(error);
    }
  }


  async function handleSave(){
    try {
      if(fullname===""&&izoh===""&&email===""){
        alert("malumotlarni toliq kiriting")
        return
      }

      const obj={
        fullname,
        email,
        izoh,
      }
      await supabase
        .from("murojatlar")
        .insert([obj])
        .select();
        setEmail("")
        setFullname("")
        setIzoh("")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="max-w-[912px]  w-[100%] px-[10px] sm:px-0">
      {users.length > 0 ? (
        <div className="mt-[32px] mb-[32px]">
          <div className="max-w-[912px]  w-[100%] flex flex-col   gap-[24px] ">
            <div className="max-w-[175px] w-full  h-[65px]  flex flex-col gap-[8px]">
              <h1 className="text-white  font-bold text-[32px]">Bog`lanish</h1>
              <Image src={"/border.svg"} alt="photo" width={112} height={8} />
            </div>
            <div className="max-w-[912px]  grid grid-cols-1 sm:grid-cols-3  space-y-3 ">
              <div className="max-w-[5000px] sm:max-w-[290px] w-full h-[190px] flex items-center justify-center bg-[#1B1B1B]  rounded-[12px] border-1 border-[#FFFFFF40]    ">
                <div className="w-[100%] h-[134px] flex flex-col items-center gap-[8px]">
                  <Image
                    src={"/gmail.svg"}
                    alt="photo"
                    width={64}
                    height={64}
                  />
                  <h1 className="text-[20px] font-semibold text-white ">
                    E-pochta
                  </h1>
                  <p className="text-[16px] font-normal text-gray-500 ">
                    {users[0].email}
                  </p>
                </div>
              </div>
              <div className="max-w-[500px] sm:max-w-[290px] w-full h-[190px] flex items-center justify-center bg-[#1B1B1B]  rounded-[12px] border-1 border-[#FFFFFF40]    ">
                <div className="w-[100%] h-[134px] flex flex-col items-center gap-[8px]">
                  <Image
                    src={"/telegram.svg"}
                    alt="photo"
                    width={64}
                    height={64}
                  />
                  <h1 className="text-[20px] font-semibold text-white ">
                    Telegram
                  </h1>
                  <Link href={"https://t.me/shb_1_4"}>
                    <p className="text-[16px] font-normal text-gray-500 ">
                      {users[0].telegram}
                    </p>
                  </Link>
                </div>
              </div>
              <div className="max-w-[500px] sm:max-w-[290px] w-full h-[190px] flex items-center justify-center bg-[#1B1B1B]  rounded-[12px] border-1 border-[#FFFFFF40]    ">
                <div className="w-[100%] h-[134px] flex flex-col items-center gap-[8px]">
                  <Image
                    src={"/contact.svg"}
                    alt="photo"
                    width={64}
                    height={64}
                  />
                  <h1 className="text-[20px] font-semibold text-white ">
                    Telefon raqam
                  </h1>
                  <p className="text-[16px] font-normal text-gray-500 ">
                    {users[0].raqam}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-[912px]  flex flex-col mt-[64px] gap-[24px]">
            <div className="max-w-[226px] w-full  h-[65px]  flex flex-col gap-[8px]  ">
              <h1 className="text-white  font-bold text-[28px]">
                So`rov yuborish
              </h1>
              <Image src={"/border.svg"} alt="photo" width={112} height={8} />
            </div>
            <div className="max-w-[912px] w-[100%]  bg-[#1B1B1B] rounded-[12px] p-[20px]">
              <div className="max-w-[872px] w-[100%] flex flex-col gap-[12px] sm:gap-0 sm:flex-row items-center justify-between  ">
                <div className="max-w-[420px] w-[100%]  flex flex-col gap-[4px] justify-between  ">
                  <p className="text-white  font-normal text-[16px]">
                    Ismingiz*
                  </p>
                  <input
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="border-1 border-[#FFFFFF40] pl-[20px] max-w-[100%] text-gray-300 h-[44px] rounded-[8px] "
                    type="text"
                    placeholder="Ism"
                  />
                </div>
                <div className="max-w-[420px] w-[100%]  flex flex-col gap-[4px] justify-between">
                  <p className="text-white  font-normal text-[16px]">
                    Manzilingiz*
                  </p>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-1 border-[#FFFFFF40] pl-[20px] max-w-[420px] w-[100%] text-gray-300 h-[44px] rounded-[8px] "
                    type="email"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="max-w-[872px] w-full flex flex-col gap-[8px] mt-[20px]">
                <p className="text-white  font-normal text-[16px]">
                  Izohingiz*
                </p>
                <textarea
                  value={izoh}
                  onChange={(e) => setIzoh(e.target.value)}
                  placeholder="Izohingizni kiriting"
                  className="max-w-[872px] w-full h-[160px]  sm:h-[192px] p-[10px] rounded-[8px] border-1 border-[#FFFFFF40] text-gray-300  font-normal text-[16px]  "
                ></textarea>
              </div>
              <button
                onClick={handleSave}
                className="w-[178px] h-[40px] bg-[#39965F] rounded-[8px]  mt-[10px] text-white text-[16px]  font-normal  flex items-center justify-center  "
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

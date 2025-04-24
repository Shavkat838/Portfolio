"use client"
import { createClient } from '@/utils/client'
import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react'



type Malumot={
  login:string;
  password:string;
}

export default function Login() {

  useEffect(()=>{
    getAdmin()
  },[])
const supabase=createClient()
const router=useRouter()

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [malumotlar,setMalumotlar]=useState<Malumot[]>([])

async function getAdmin(){
  try {
           let { data: malumotlar } = await supabase
             .from("malumotlar")
             .select("*");
             console.log(malumotlar)
             setMalumotlar(malumotlar!)
  } catch (error) {
    console.log(error)
  }
}


async function handleLogin() {
  if (!malumotlar || malumotlar.length === 0) {
    alert("Ma'lumotlar topilmadi");
    return;
  }

  const admin = malumotlar[0]; 

  if (admin.login !== email || admin.password !== password) {
    alert("Login yoki parol notogri");
    return;
  }

  router.push("/user-malumot");
}




  return (
    <div className="max-w-[952px] w-full flex items-center justify-center">
      <div className="max-w-[370px] w-full shadow-xl rounded-md h-[150px] dark:bg-white ">
        <div className="w-full h-[45px]  bg-sky-950 rounded-t-md  dark:bg-sky-900  flex items-center justify-center">
          <h1 className="text-white text-[20px] dark:text-white">Sign In</h1>
        </div>
        <div className="w-full bg-gray-300 flex flex-col items-center  min-h-[140px]">
          <input
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
            type="email"
            placeholder="email..."
            className="mt-3 pl-2 focus:border-blue-500 min-h-[45px] border-2 w-[95%] rounded-md border-gray-300 hover:border-blue-600 "
          />
          <div className="relative h-[45px] w-[95%] ">
            <input
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
              placeholder="password..."
              className="mt-3 pl-2 focus:border-blue-500 min-h-[45px] border-2 w-full rounded-md border-gray-300 hover:border-blue-600 "
            />
          </div>
        </div>
        <div className="h-[50px] w-full px-2  flex items-center rounded-b-md justify-center bg-gray-500  ">
          <button
          onClick={handleLogin}
            className="text-white w-full rounded-md h-[80%] text-[20px] bg-sky-900 "
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

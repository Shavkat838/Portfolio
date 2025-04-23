"use client"

import { BASE_IMAGE_URL, BASE_IMAGEE_URL, Users } from "@/helpers/types";
import { createClient } from "@/utils/client";

import Image from "next/image";
import { describe } from "node:test";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Loyiha from "./Loyiha";


type Imag={
  texname:string;
  texImage:string;
}

type UserTex={
  description:string;
  images:Imag[];
  id:string;
}

export default function UserPage() {


  useEffect(() => {
    getUser();
    getusertex()
  }, []);


  


const supabase = createClient()


const [name,setName]=useState("")

const [email,setEmail]=useState("")
const [github,setGithub]=useState("")
const [raqam,setRaqam]=useState("")
const [telegram,setTelegram]=useState("")
const [malumot,setMalumot]=useState("")
const [fields,setFields]=useState<string[]>([])
const [imageUrl,setImageUrl]=useState("")
const [currentEditId, setCurrentEditId] = useState("");
const [fieldsText, setFieldsText] = useState("");



const [description,setDescription]=useState("")
const [texImage,setTexImage]=useState("")
const [texname,setTexname]=useState("")
const [images,setImages]=useState<Imag[]>([])
const [userTexID,setUserTexID]=useState("")







async function handleImage(file:File){
try {
    const { data } = await supabase.storage
       .from("products")
       .upload(`image_${Date.now()}`, file);
        setImageUrl(BASE_IMAGE_URL+data?.path)
} catch (error) {
  console.log(error)
}
}

function handleText(e: React.ChangeEvent<HTMLInputElement>) {
  const value = e.target.value;
  setFieldsText(value); 

  const array = value
    .split(",")
    .map((str) => str.trim())
    .filter((str) => str);
  setFields(array); 
}

async function handleSave(){
try {
    const obj = {
      name,
      email,
      raqam,
      github,
      telegram,
      imageUrl,
      fields,
      malumot,
    };
    const { data, error } = await supabase
      .from("usersdata")
      .insert([obj])
      .select("*");
      getUser()
} catch (error) {
  console.log(error)
}
}

async function getUser(){
  try {
    const { data: usersdata } = await supabase
      .from("usersdata")
      .select("*");
        if (usersdata && usersdata.length > 0) {
          setCurrentEditId(usersdata[0].id)
          const user = usersdata[0];
          setName(user.name || "");
          setEmail(user.email || "");
          setGithub(user.github || "");
          setRaqam(user.raqam || "");
          setTelegram(user.telegram || "");
          setImageUrl(user.imageUrl || "");
          setFields(user.fields || []);
          setFieldsText((user.fields || "").join(", "));
          setMalumot(user.malumot || "");
        }
  } catch (error) {
    console.log(error)
  }
}



async function handleUpdate(){
      const obj = {
        name,
        email,
        raqam,
        github,
        telegram,
        imageUrl,
        fields,
        malumot,
      };
  try {
    const { data, error } = await supabase
      .from("usersdata")
      .update(obj)
      .eq("id",currentEditId )
      .select();
  } catch (error) {
    console.log(error)
  }
}

function deleteOneImage(){
  setImageUrl("")
}



async function handleTexImage(file:File){
try {
  const { data } = await supabase.storage
    .from("texuser")
    .upload(`image_${Date.now()}`, file);
    setTexImage(BASE_IMAGEE_URL + data?.path);
} catch (error) {
  console.log(error);
}
}

function handleSaveTexnologiya(){ 
 images.push({texname,texImage})
 setImages([...images])
  setTexname("");
  
}





function deleteTexImage(index:number){
 images.splice(index,1);
  setImages([...images])
}


async function handleTexSave(){
  const obj={
    description,
    images,
  }
   try {
    const { data } = await supabase
    .from("userstex")
    .insert([obj])
    .select();
    getusertex()
   } catch (error) {
    console.log(error);
    }
}


async function getusertex(){
  try {
    let { data: userstex } = await supabase.from("userstex").select("*");
    if(userstex&&userstex.length>0){
       setUserTexID(userstex[0].id)
       setDescription(userstex[0].description||"");
       setImages(userstex[0].images||[])
    }
  } catch (error) {
    console.log(error)
  }
}



async function handleTexUpdate(){
      const obj = {
         description,
         images,
      };
      try {
        const { data } = await supabase
          .from("userstex")
          .update(obj)
          .eq("id", userTexID)
          .select();
      } catch (error) {
        console.log(error);
      }
}









  return (
    <div className="text-white pt-[32px] min-h-screen ml-[280px] ">
      {/* malumot shahsiy */}
      <div className="max-w-[912px] w-full h-[610px] flex flex-col gap-[24px]">
        <div className=" h-[65px]  flex flex-col  gap-[8px]  ">
          <h1 className="text-white  font-bold text-[28px]">Shahsiy malumot</h1>
          <Image src={"/border.svg"} alt="photo" width={112} height={8} />
        </div>
        <div className="max-w-[912px]  w-full h-[570px] bg-[#1B1B1B] flex flex-col gap-[210px]  rounded-[12px] p-[20px]">
          <div className="w-[872px] h-[76px] flex flex-wrap items-center justify-between gap-y-[20px]  ">
            {/* ism */}
            <div className="w-[280px] h-[76px] flex flex-col justify-between  ">
              <p className="text-white  font-normal text-[16px]">Ism*</p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-1 border-[#FFFFFF40] pl-[20px] w-[100%] text-gray-300 h-[44px] rounded-[8px] "
                type="text"
                placeholder="Ismingizni kiriting"
              />
            </div>
            {/* email */}
            <div className="w-[280px] h-[76px] flex flex-col justify-between  ">
              <p className="text-white  font-normal text-[16px]">Email*</p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-1 border-[#FFFFFF40] pl-[20px] w-[100%] text-gray-300 h-[44px] rounded-[8px] "
                type="text"
                placeholder="Emailingizni kiriting"
              />
            </div>
            {/* telegram */}
            <div className="w-[280px] h-[76px] flex flex-col justify-between  ">
              <p className="text-white  font-normal text-[16px]">Telegram*</p>
              <input
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                className="border-1 border-[#FFFFFF40] pl-[20px] w-[100%] text-gray-300 h-[44px] rounded-[8px] "
                type="text"
                placeholder="Telegram manzilni kiriting"
              />
            </div>
            {/* github */}
            <div className="w-[280px] h-[76px] flex flex-col justify-between  ">
              <p className="text-white  font-normal text-[16px]">Github*</p>
              <input
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                className="border-1 border-[#FFFFFF40] pl-[20px] w-[100%] text-gray-300 h-[44px] rounded-[8px] "
                type="text"
                placeholder="Github manzilni kiriting"
              />
            </div>
            {/* Telefon raqam */}
            <div className="w-[280px] h-[76px] flex flex-col justify-between  ">
              <p className="text-white  font-normal text-[16px]">
                Telefon raqam*
              </p>
              <input
                value={raqam}
                onChange={(e) => setRaqam(e.target.value)}
                className="border-1 border-[#FFFFFF40] pl-[20px] w-[100%] text-gray-300 h-[44px] rounded-[8px] "
                type="text"
                placeholder="Telefon raqamni kiriting"
              />
            </div>
            {/* Rasm */}
            {imageUrl ? (
              <div className="w-[280px] h-[80px] flex items-end gap-[20px]  ">
                <Image
                  className="rounded-md"
                  src={imageUrl}
                  alt="photo"
                  width={70}
                  height={70}
                />
                <button
                  onClick={deleteOneImage}
                  className="w-[200px] h-[30px]  bg-red-600 rounded-md "
                >
                  Delete
                </button>
              </div>
            ) : (
              <div className="w-[280px] h-[76px] flex flex-col justify-between ">
                <p className="text-white  font-normal text-[16px]">Surat*</p>
                <label
                  htmlFor="image"
                  className="flex  bg-[#1B1B1B]  text-white border-1 border-[#FFFFFF40] rounded-[8px] text-base font-medium px-22 py-2.5 outline-none w-max cursor-pointer mx-auto"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 mr-2 fill-white inline"
                    viewBox="0 0 32 32"
                  >
                    <path
                      d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                      data-original="#000000"
                    />
                    <path
                      d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                      data-original="#000000"
                    />
                  </svg>
                  Yuklang
                  <input
                    onChange={(e) => handleImage(e.target.files![0])}
                    type="file"
                    id="image"
                    className="hidden"
                  />
                </label>
              </div>
            )}

            {/* bitta sozli malumotlar */}
            <div className="w-full h-[76px] flex flex-col justify-between  ">
              <p className="text-white  font-normal text-[16px]">
                Sozli tanishtiruv*
              </p>
              <input
                value={fieldsText}
                onChange={handleText}
                className="border-1 border-[#FFFFFF40] pl-[20px] w-[100%] text-gray-300 h-[44px] rounded-[8px] "
                type="text"
                placeholder="O`zingiz haqida tarif kiriting"
              />
            </div>
          </div>
          {/* umumiy description */}
          <div className="w-full h-[230px]  flex flex-col justify-between  ">
            <p className="text-white  font-normal text-[16px]">Malumot*</p>
            <textarea
              value={malumot}
              onChange={(e) => setMalumot(e.target.value)}
              placeholder="O`zingiz haqida qisqa malumot kiriting"
              className="border-1 border-[#FFFFFF40] pl-[20px] pt-[10px] w-[100%] text-gray-300 h-[160px] rounded-[8px]"
            ></textarea>
            {currentEditId === "" ? (
              <button
                onClick={handleSave}
                className="w-[178px] h-[40px] bg-[#39965F] rounded-[8px]  mt-[10px] text-white text-[16px]  font-normal  flex items-center justify-center  "
              >
                Saqlash
              </button>
            ) : (
              <button
                onClick={handleUpdate}
                className="w-[178px] h-[40px] bg-[#39965F] rounded-[8px]  mt-[10px] text-white text-[16px]  font-normal  flex items-center justify-center  "
              >
                O`zgartirish
              </button>
            )}
          </div>
        </div>
      </div>





      {/* haqida */}
      <div className="max-w-[912px] flex flex-col  gap-[24px] mt-[64px]">
        <div className="flex flex-col gap-[8px] ">
          <h1 className="text-white font-bold  text-[32px] ">Men haqimda</h1>
          <Image src={"/border.svg"} alt="border" width={112} height={8} />
        </div>
        <div className="max-w-[912px] w-full  bg-[#1B1B1B] flex flex-col rounded-[12px] p-[20px]">
          <div className="w-full h-[230px]  flex flex-col  gap-[8px] ">
            <p className="text-white  font-normal text-[16px]">Malumot*</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="O`zingiz haqida to`liq malumot kiriting"
              className="border-1 border-[#FFFFFF40] pl-[20px] pt-[10px] w-[100%] text-gray-300 h-[220px] rounded-[8px]"
            ></textarea>
          </div>
          <div className="w-full  flex flex-col mt-[10px] gap-[8px] ">
            <p className="text-white  font-normal text-[16px]">
              Texnologiyalar nomi*
            </p>
            <div className="flex gap-[10px]">
              <label
                htmlFor="image"
                className="flex  bg-[#1B1B1B]  text-white border-1 border-[#FFFFFF40] rounded-[8px] text-base font-medium px-48 py-2.5 outline-none w-max cursor-pointer mx-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 mr-2 fill-white inline"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                    data-original="#000000"
                  />
                  <path
                    d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                    data-original="#000000"
                  />
                </svg>
               Yuklang
                <input
                  onChange={(e) => handleTexImage(e.target.files![0])}
                  type="file"
                  id="image"
                  className="hidden"
                />
              </label>
              <input
                value={texname}
                onChange={(e) => setTexname(e.target.value)}
                className="border border-[#FFFFFF40] pl-[20px] w-[100%] text-gray-300 h-[44px] rounded-[8px] "
                type="text"
                placeholder="Texnologiya nomini kiriting!"
              />
              <button
                onClick={handleSaveTexnologiya}
                className="w-[200px] h-[44px]  bg-green-800 rounded-md text-white text-center "
              >
                Add
              </button>
            </div>
            <div className="max-w-[912px] w-[100%]  mt-[10px]  flex flex-wrap  gap-[10px]">
              {images &&
                images.map((imag, index) => (
                  <div
                    key={index}
                    className="w-[209px] h-[124px] relative rounded-[12px] bg-[#1B1B1B] border border-gray-100 flex items-center justify-center"
                  >
                    <Image
                      unoptimized
                      src={imag.texImage}
                      alt="photo"
                      width={64}
                      height={64}
                    />
                    <button
                      onClick={() => deleteTexImage(index)}
                      className="absolute cursor-pointer top-0 right-0 text-red-700"
                    >
                      <IoMdClose size={24} />
                    </button>
                  </div>
                ))}
            </div>
            <div>
              {userTexID === "" ? (
                <button
                  onClick={handleTexSave}
                  className="w-[178px] h-[40px] bg-[#39965F] rounded-[8px]  mt-[10px] text-white text-[16px]  font-normal  flex items-center justify-center  "
                >
                  Saqlash
                </button>
              ) : (
                <button
                  onClick={handleTexUpdate}
                  className="w-[178px] h-[40px] bg-[#39965F] rounded-[8px]  mt-[10px] text-white text-[16px]  font-normal  flex items-center justify-center  "
                >
                  Ozgartirish
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

  
           { /* loyiha */}
           <div className="max-w-[912px] mt-[64px]">
            < Loyiha />
           </div>
    </div>
  );
}





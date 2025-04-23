"use client"
import { BASE_IMAGE_URL } from '@/helpers/types'
import { createClient } from '@/utils/client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

type Role="YUQORI"|"ORTA"|"PAST"|""

export default function Loyiha() {

    useEffect(()=>{
        getProjects()
    },[])


    const [projectName,setProjectName]=useState("")
    const [projectRole,setProjectRole]=useState<Role>("")
    const [projectImage,setProjectImage]=useState("")
    const [projectFields,setProjectFields]=useState<string[]>([])
    const [fieldText,setFieldText]=useState("")
     const supabase=createClient()


async function handleProjectImage(file: File) {
  try {
    const { data } = await supabase.storage
      .from("products")
      .upload(`image_${Date.now()}`, file);
    setProjectImage(BASE_IMAGE_URL + data?.path);
  } catch (error) {
    console.log(error);
  }
}


function handleText(e: React.ChangeEvent<HTMLInputElement>) {
  const value = e.target.value;
  setFieldText(value);

  const array = value
    .split(",")
    .map((str) => str.trim())
    .filter((str) => str);
  setProjectFields(array);
}


async function handleSaveProject(){
try {
    if(projectImage===""||projectName===""||projectRole===""||fieldText===""){
        alert("Forma elementlarini toliq kiriting")
        return
    }
    const obj={
        projectName,
        projectRole,
        projectFields,
        projectImage
    }
   await supabase
  .from("projects")
  .insert([obj])
  .select();
  getProjects()
          
} catch (error) {
    console.log(error)
}
}


async function getProjects(){
    try {
         await supabase
          .from("projects")
          .select("*");
          setProjectFields([])
          setFieldText("")
        setProjectName("")
        setProjectImage("")
       setProjectRole("")
    } catch (error) {
        console.log(error)
    }
}



function deleteOneImage(){
    setProjectImage("")
}



  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex flex-col gap-[8px] ">
        <h1 className="text-white font-bold  text-[32px] ">Loyihalarim</h1>
        <Image src={"/border.svg"} alt="border" width={112} height={8} />
      </div>
      <div className="max-w-[912px] w-full  bg-[#1B1B1B] flex flex-col rounded-[12px] p-[20px]">
        <div className="max-w-full flex flex-wrap justify-between items-center">
          {/* project name */}
          <div className="w-[280px] h-[76px] flex flex-col justify-between  ">
            <p className="text-white  font-normal text-[16px]">Nomi*</p>
            <input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="border-1 border-[#FFFFFF40] pl-[20px] w-[100%] text-gray-300 h-[44px] rounded-[8px] "
              type="text"
              placeholder="Loyihani nomini kiriting"
            />
          </div>
          {/* role */}
          <div className="w-[280px] h-[76px] flex flex-col justify-between  ">
            <p className="text-white  font-normal text-[16px]">Sifati*</p>
            <select
              value={projectRole}
              onChange={(e) => setProjectRole(e.target.value as Role)}
              className="border-1 border-[#FFFFFF40] pl-[20px] w-[100%] text-gray-300 h-[44px] rounded-[8px] "
            >
              <option value="" disabled>
                Levelni tanlang
              </option>
              <option value="YUQORI">Yuqori</option>
              <option value="ORTA">O`rta</option>
              <option value="PAST">Past</option>
            </select>
          </div>
          {/* Project image */}
          <div className="w-[280px] h-[76px] flex flex-col justify-between ">
            <p className="text-white  font-normal text-[16px]">Surat*</p>
            {projectImage ? (
              <div className="w-[280px] h-[80px] flex items-end gap-[20px]  ">
                <Image
                  className="rounded-md"
                  src={projectImage}
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
              <input
                type="file"
                onChange={(e) => handleProjectImage(e.target.files![0])}
                className="border-1 border-[#FFFFFF40] pl-[20px] w-[100%] text-gray-300 h-[44px] rounded-[8px] "
                placeholder="rasm yuklang"
              />
            )}
          </div>
          {/* Qaysi texnologiyalardan foydalangansiz */}
          <div className="w-full h-[76px] flex flex-col justify-between mt-2  ">
            <p className="text-white  font-normal text-[16px]">
              Texnologiyalar*
            </p>
            <input
              value={fieldText}
              onChange={handleText}
              className="border-1 border-[#FFFFFF40] pl-[20px] w-[100%] text-gray-300 h-[44px] rounded-[8px] "
              type="text"
              placeholder="Loyihani qaysi texnologiyalar bilan qilgansiz"
            />
          </div>
          <button
            onClick={handleSaveProject}
            className="w-[178px] h-[40px] bg-[#39965F] rounded-[8px]  mt-[10px] text-white text-[16px]  font-normal  flex items-center justify-center  "
          >
            Saqlash
          </button>
        </div>
      </div>
    </div>
  );
}

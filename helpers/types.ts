export const BASE_IMAGE_URL =
  "https://ebgpvcbyhdxdhjeknkpg.supabase.co/storage/v1/object/public/products//"


  export const BASE_IMAGEE_URL =
    "https://ebgpvcbyhdxdhjeknkpg.supabase.co/storage/v1/object/public/texuser//";



  export type Users = {
    id:number;
    name:string;
    email:string;
    raqam:string;
    github:string;
    telegram:string;
    imageUrl:string;
    fields:string[];
    malumot:string;
  };


  export type UserTex={
    images:[{texname:string,image:string}],
    description:string;
  }
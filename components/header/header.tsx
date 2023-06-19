"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { AvatarFallback, Avatar } from "../ui/avatar";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import { ClipboardCheck, PowerIcon } from "lucide-react";

function Header() {
  useEffect(() => {
    getUser();
  }, []);

 
  const cookies = new Cookies();
  const [initials, setInitials] = useState("");
  const router = useRouter();

  const logout= async()=>{
    cookies.remove("viconet-user", { path: '/' });
    router.replace("/auth/login");
  }


  const getUser = async () => {
    //We'll replace this with an API call, also need to make this a SSR component
    const data = await localStorage.getItem("user");

    if (data) {
      const user = JSON.parse(data);
      const ini = user.firstName.substring(0, 1) + user.surname.substring(0, 1);
      setInitials(ini);
    }
  };
  return (
    <div className="w-full h-24 shadow-black/5 shadow-sm flex  justify-between items-center px-10">
      <Image height={150} width={150} alt="Logo" src={"/logo.svg"} />
      <div style={{width:"7%"}}>
      <button onClick={()=>logout()} style={{float:"right", marginTop:"8px"}}>
        <PowerIcon />
      </button>
      <Avatar>
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
     
      </div>
    </div>
    
  );
}

export default Header;

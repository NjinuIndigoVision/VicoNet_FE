"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { AvatarFallback, Avatar } from "../ui/avatar";

function Header() {
  useEffect(() => {
    getUser();
  }, []);

  const [initials, setInitials] = useState("");
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
    <div className="w-full h-24 shadow-black/5 shadow-sm flex flex-row justify-between items-center px-10">
      <Image height={150} width={150} alt="Logo" src={"/logo.svg"} />
      <Avatar>
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </div>
  );
}

export default Header;

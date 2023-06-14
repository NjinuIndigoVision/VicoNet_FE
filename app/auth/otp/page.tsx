"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { INVALID_EMAIL_MESSAGE } from "@/constants";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getPersonnel, setPersonnel } from "../../../lib/personnelSlice";
import { Api } from "@/lib/api/endpoints";
import { IActivateAccount, IUserRegisterModel } from "@/lib/interfaces/user";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { BasicOTPComponent } from "./basic-otp";



const formSchema = z.object({
  email: z.string().email({
    message: INVALID_EMAIL_MESSAGE,
  }),
  password: z.string(),
  names: z.string(),
  surname: z.string(),
  confirmpassword: z.string(),
  mobileNumber: z.string(),
});

export default function Register() {
  const [mobile, setMobile] = useState("");

  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const email = window.location.search.replace("?email=","");

  async function onSubmit(values: z.infer<typeof formSchema>) {

    console.log("Ref", values);
    const _id = toast.loading("Registering user..", {
      position: "top-center",
      autoClose: 100,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      });

    const payload = {
      title: "Mr",
      firstName: values.names,
      surname: values.surname,
      email: values.email,
      mobileNumber: mobile,
      password: values.password,
      type: 1,
    } as IUserRegisterModel;
    
   
    
    const response = await Api.POST_Register(payload);
    if (response?.error) {
      toast.update(_id, {
        render: "An error occured when registering user, please try again",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    } else {
      toast.update(_id, {
        render: `Registered ${response.data?.firstName} successfully, you may now login`,
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      router.push("/auth/login");
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function ActivateUser(){
    const _id = toast.loading("Verifying..", {
      position: "top-center",
      autoClose: 100,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });


  const payload ={
    otp:value,
    email:email
  } as IActivateAccount;
    const response = await Api.POST_ActivateOTP(payload) as any;
    console.log("RERER", response)
    if(response?.data?.code !=400){
       
      toast.update(_id, {
        render: "Your profile has been activated",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      }); 
      router.push("/auth/login");
    }else{
      toast.update(_id, {
        render: "Incorrect OTP",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      
      //faile
    }
  }

  return (
    <div className="w-96 h-screen">
      <ToastContainer />
      <div className="w-96 text-sm flex flex-row justify-between my-16">
        <div className="flex flex-row justify-around items-center">
          <ArrowLeft />
          <Link href={"/auth/login"}>Back</Link>
        </div>
      </div>
      <div className="m-14">
        <p className="text-center font-bold text-2xl">Enter OTP</p>
        {/* <>
      <h2>
        PersonnelFromStore 
       Id: {_personnelFromState?._id}<br/>
        Info: {_personnelFromState?.information}<br/>
        Work Exp: {_personnelFromState.previousWorkExperience?.length}
      </h2>
      <button value="Add" type="button" onClick={addToWorkExperience}>
        Add
      </button>
    </> */}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid ">
            <FormField
              control={form.control}
              name="names"
              render={({ field }) => (
                <BasicOTPComponent
                onChange={(value: any) => {
                  console.log(value);
                  setValue(value);
                }}
              />
              )}
            />
        </div>

          <Button onClick={()=>{ActivateUser()}} type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

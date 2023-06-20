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
import { Label } from "@/components/ui/label";

import { useDispatch, useSelector } from "react-redux";
import { getPersonnel, setPersonnel } from "../../../lib/personnelSlice";
import { IPersonnel } from "@/lib/interfaces/personnel";
import { Api } from "@/lib/api/endpoints";
import { ICompanyRegisterModel, IUserRegisterModel } from "@/lib/interfaces/user";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useState } from "react";



const formSchema = z.object({
  email: z.string().email({
    message: INVALID_EMAIL_MESSAGE,
  }),
  password: z.string(),
  userName: z.string(),
  userSurname: z.string(),
  confirmpassword: z.string(),
  // mobileNumber: z.string(),  
  userNumber: z.string(),
  companyNumber: z.string(),
  companyReg: z.string(),
  companyName:z.string(),
  companyAdrress: z.string(),
  position:z.string(),
  userEmail:z.string(),
  
  confirmEmail:z.string(),
});

export default function Register() {
  const [mobile, setMobile] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  //BEGIN STORE

  //END STORE

  async function onSubmit(values: z.infer<typeof formSchema>) {

    console.log("Registering");
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
      email: values.email,
      password: values.password,
      userName:values.userName,
      userSurname: values.userSurname,
      userNumber: values.userNumber,
      companyNumber: values.companyNumber,
      companyReg: values.companyReg,
      companyName:values.companyName,
      companyAdrress: values.companyAdrress,
      position:values.position,
      userEmail:values.userEmail
    } as ICompanyRegisterModel;
    
   
    
    const response = await Api.POST_RegisterCompany(payload);
    console.log("Ref", response);
    if (response?.error) {
      toast.update(_id, {
        render: "An error occured when registering company, please try again",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    } else {
      toast.update(_id, {
        render: `Registered ${response.data?.companyName} successfully, an OTP has been sent to: ${response.data?.userEmail}`,
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      router.push(`/auth/otp?email=${response.data?.email}`);
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
        <p className="text-center font-bold text-2xl">Create an account</p>
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
          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyReg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Register</FormLabel>
                  <FormControl>
                    <Input placeholder="Surname" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <FormField
              control={form.control}
              name="companyAdrress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Physical Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <div className="grid grid-cols-2 gap-6">
        
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="Mobile Number" {...field} />
                    {/* <PhoneInput
                    inputStyle={{backgroundColor:"transparent",width:"100%", borderColor: "#e5e7eb"}}
                    inputClass="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      country={'za'}
                      value={mobile}
                      onChange={phone => { setMobile(phone)}}
                      placeholder="+27 123-4567"
                    /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="userSurname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surname</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter surname"
                      type={"text"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Mobile Nr.</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+27"
                      type={"text"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
               <FormField
              control={form.control}
              name="userNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Mobile Nr.</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+27"
                      type={"text"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
              control={form.control}
              name="companyAdrress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter position" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
     <div className="grid grid-cols-2 gap-6">
        
        <FormField
          control={form.control}
          name="userEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
                {/* <PhoneInput
                inputStyle={{backgroundColor:"transparent",width:"100%", borderColor: "#e5e7eb"}}
                inputClass="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  country={'za'}
                  value={mobile}
                  onChange={phone => { setMobile(phone)}}
                  placeholder="+27 123-4567"
                /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm email surname"
                  type={"text"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm password"
                  type={"password"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
           <FormField
          control={form.control}
          name="userNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password.</FormLabel>
              <FormControl>
                <Input
                  placeholder="+Confirm password"
                  type={"password"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

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
import { useState } from "react";
import { Api } from "@/lib/api/endpoints";
import { IUserLoginModel } from "@/lib/interfaces/user";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { _addPersonnel } from "@/lib/personnelService";
import { IPersonnel, IPersonnelRequestModel } from "@/lib/interfaces/personnel";

const formSchema = z.object({
  email: z.string().email({
    message: INVALID_EMAIL_MESSAGE,
  }),
  password: z.string(),
});

export default function Login() {
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const _id = toast.loading("Logging in..", {
      position: "top-center",
      autoClose: 100,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log("val ", values);
    const response = await Api.POST_Login({
      email: values.email,
      password: values.password,
    } as IUserLoginModel);
    console.log("response", response);
    if (response.error) {
      toast.update(_id, {
        render: "Cannot log user in with supplied credentials",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      //failed
    } else {
      router.replace("/protected/createProfile/about");
      toast.update(_id, {
        render: "Logged in successfully",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    }
  }

  const saveCV = (e: any) => {
    setCV(e.target.files[0]);
    console.log(cv);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //forms
  const [cv, setCV] = useState<Blob|undefined>();

  async function addPersonnel(){
    
   const personnel = {
      _id: "12345",
      searchKeys: "developer",
      information: "Lorem ipsum dolor sit amet",
      currentJob: {
        employer: "ABC Company",
        jobTitle: "Software Engineer",
        startDate: "2022-01-01",
        endDate: "2022-12-31"
      },
      previousWorkExperience: [
        {
          employer: "XYZ Company",
          jobTitle: "Web Developer",
          startDate: "2020-01-01",
          endDate: "2021-12-31"
        }
      ],
      yearsOfExperience: "3",
      education: {
        instituteName: "University of ABC",
        qualification: "Bachelor of Science",
        dateCompleted: "2019-12-31"
      },
      keySkills: "C#, JavaScript, HTML, CSS",
      keyCourses: "Introduction to Machine Learning",
      cvUrl: "https://example.com/cv",
      personalInformation: {
        profile: "https://example.com/profile",
        name: "John",
        surname: "Doe",
        dateOfBirth: "1990-01-01",
        cellPhone: "1234567890",
        address: "123 Main Street",
        country: "USA",
        province: "California"
      },
      _user: "user123",
      cv:cv
    } as IPersonnelRequestModel;
    
    _addPersonnel(personnel)

  }



  return (
    <div className="w-auto h-screen">
      <ToastContainer />
      <div className="w-96 text-sm flex flex-row justify-between my-16">
        <div className="flex flex-row justify-around items-center">
          <ArrowLeft />
          <Link href="https://www.viconetgroup.com/" passHref={true}>
            Back
          </Link>
        </div>
        <div>
          <Link className="text-teal-700" href="/auth/register">
            Create an account.
          </Link>
        </div>
      </div>
      <div className="m-14">
        <p className="text-center font-bold text-2xl">Talent Login</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
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
                  <Input placeholder="Password" type={"password"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Login</Button>
        </form>
      </Form>
      <form>
      <input style={{marginBottom:"2%"}} className="form-control" type="file" id="cv" name="cv" onChange={saveCV} />
      </form>
      <input type="submit" onClick={()=>{addPersonnel()}}/>
    </div>
  );
}

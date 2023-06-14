"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@radix-ui/react-switch";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import React, { useState, useEffect } from "react";
import {
  IJobInformation,
  IJobResponsibilities,
} from "@/lib/interfaces/personnel";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/loginCheck";
import { ToastContainer, toast } from "react-toastify";

function About() {
  const [about, setAbout] = useState("");
  const [isWorking, setIsWorking] = useState(false);
  const [companyName, setCompanyName] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [currentJobResponsibilities, setCurrentJobResponsibilities] = useState<
    IJobResponsibilities[]
  >([]);
  const [responsibility, setResponsibility] = useState("");
  const router = useRouter();

  useEffect(() => {
    loadData();
  }, []);

  const addResponsibility = () => {
    if (responsibility != "") {
      let tempResp = currentJobResponsibilities;
      tempResp.push({
        content: responsibility,
      });
      setCurrentJobResponsibilities(tempResp);
      setResponsibility("");
    }
  };

  const removeResponsibility = (idx: number) => {
    console.log("remove", idx);
    let tempResp = currentJobResponsibilities;
    tempResp = tempResp.splice(idx, 1);
    setCurrentJobResponsibilities(tempResp);
  };

  const save = async () => {
    const jobInformation: IJobInformation = {
      employer: companyName,
      about,
      jobTitle,
      startDate: date?.toString(),
      responsibilities: currentJobResponsibilities,
    };

    //API must match this 👇
    console.log(jobInformation);

    await localStorage.setItem(
      "jobInformation",
      JSON.stringify(jobInformation)
    );
    router.push("/protected/createProfile/education");
  };

  const loadData = async () => {
    const data = await localStorage.getItem("jobInformation");

    if (data) {
      const jobInformation: IJobInformation = JSON.parse(data);

      setAbout(jobInformation.about!);

      if (jobInformation.employer != "") {
        setIsWorking(true);
        setCompanyName(jobInformation.employer!);
        setCurrentJobResponsibilities(jobInformation.responsibilities!);
        setJobTitle(jobInformation.jobTitle!);
      }
    }
  };

  if(!isLoggedIn()){
    router.push("/auth/login");
  }
  
  return (
    <>    
    {isLoggedIn() && <>
      <p className="text-lg font-bold">About Yourself</p>
      <p className="text-xs text-gray-500 mb-5">Maximun characters is 700</p>
      <Textarea
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        placeholder="Tell us a little bit about your work experience"
        className="resize-none"
      />

      <div className="flex items-center space-x-2 my-5">
        <Checkbox
          checked={isWorking}
          onCheckedChange={(e) => setIsWorking((prev) => !prev)}
          id="works"
        />
        <label
          htmlFor="works"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I am currently working
        </label>
      </div>

      {isWorking && (
        <>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name">Company Name</Label>
            <Input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              type="text"
              id="name"
              placeholder="Company Name"
            />
          </div>

          <div className="grid w-full max-w-sm items-center mt-5 gap-1.5">
            <Label>Start Date</Label>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid w-full max-w-sm items-center mt-5 gap-1.5">
            <Label htmlFor="name">Job Title</Label>
            <Input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              type="text"
              id="name"
              placeholder="Job Title"
            />
          </div>

          <div className="grid w-full max-w-sm items-center mt-5 gap-1.5">
            <Label htmlFor="name">Role and Responsibility</Label>
            <div className="flex flex-row justify-center space-x-2">
              <div className="flex-1">
                <Input
                  value={responsibility}
                  onChange={(e) => setResponsibility(e.target.value)}
                  type="text"
                  id="name"
                  placeholder="Role and Responsibility"
                />
              </div>
              <div className="">
                <Button onClick={addResponsibility}>Add</Button>
              </div>
            </div>
          </div>

          {currentJobResponsibilities.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-row justify-between my-5 w-full max-w-sm "
            >
              <p>{item.content}</p>
              <Button onClick={() => removeResponsibility(idx)}>Remove</Button>
            </div>
          ))}
        </>
      )}

      <Button className="mt-5" onClick={save}>
        Save & Continue
      </Button>
    </>
    }
    </>

  );
}

export default About;

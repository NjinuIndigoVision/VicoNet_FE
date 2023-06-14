"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState, useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { IJobInformation, IPersonnel } from "@/lib/interfaces/personnel";
import { useRouter } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import { getPersonnel, setPersonnel } from "@/lib/personnelSlice";

function Experience() {
  const [isWorking, setIsWorking] = useState(false);
  const [companyName, setCompanyName] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [prevJobs, setPrevJobs] = useState<IJobInformation[]>([]);
  const router = useRouter();
  const dispatch = useDispatch();
  
  useEffect(() => {
    _loadData();
  }, []);

  const _personnelFromState: any = useSelector(getPersonnel).personnel;

  const add = () => {
    const job: IJobInformation = {
      employer: companyName,
      jobTitle,
      startDate: startDate?.toString(),
      endDate: endDate?.toString(),
    };

    // let prev: IJobInformation[] = prevJobs;
    // prev.push(job);
    const _jobs = [...prevJobs, job]
    setPrevJobs(_jobs);
  };

  const remove = (idx: number) => {
    let prev: IJobInformation[] = prevJobs;
    prev = prev.splice(idx, 1);

    setPrevJobs(prev);
  };

  // const save = async () => {
  //   await localStorage.setItem("previousJobs", JSON.stringify(prevJobs));
  //   router.push("/protected/createProfile/skills");
  // };

  // const loadData = async () => {
  //   const data = await localStorage.getItem("previousJobs");

  //   if (data) {
  //     const jobs: IJobInformation[] = JSON.parse(data);
  //     setPrevJobs(jobs);
  //   }
  // };

   const _loadData = async () => {
    const data = await localStorage.getItem("currentPersonnel");

    if (data) {
      
      const _personnel: IPersonnel = JSON.parse(data);

      const jobs: IJobInformation[] = _personnel.previousWorkExperience??[];
      jobs.length>1? setIsWorking(true):setIsWorking(false);
  
      setPrevJobs(jobs);
    }
  };
  console.log("RWRE", _personnelFromState)

  const addPageDetailsToState = async () => {
    const payload = 
    {
      ..._personnelFromState,
      previousWorkExperience:prevJobs
     } as IPersonnel

    dispatch(
      setPersonnel(payload)
    );
    await localStorage.setItem(
      "currentPersonnel",
      JSON.stringify(payload)
    );
    router.push("/protected/createProfile/skills");
  };


  return (
    <>
      <p className="text-lg font-bold">Do you have previous work experience?</p>
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
          Yes, I do
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
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? (
                    format(startDate, "PPP")
                  ) : (
                    <span>Start date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid w-full max-w-sm items-center mt-5 gap-1.5">
            <Label>End Date</Label>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : <span>End date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
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

          <div className="">
            <Button onClick={add}>Add</Button>
          </div>

          {prevJobs.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-row justify-between my-5 w-full max-w-sm "
            >
              <div>
                <p className="font-bold">
                  {item.employer} {"("}
                  {item.startDate} - {item.endDate}
                  {")"}
                </p>
                <p className="text-sm">{item.jobTitle}</p>
              </div>
              <Button onClick={() => remove(idx)}>Remove</Button>
            </div>
          ))}

          <div className="flex flex-row space-x-4">
            <Button className="mt-5" onClick={() => router.back()}>
              Back
            </Button>
            <Button className="mt-5" onClick={addPageDetailsToState}>
              Save & Continue
            </Button>
          </div>
        </>
      )}
    </>
  );
}

export default Experience;

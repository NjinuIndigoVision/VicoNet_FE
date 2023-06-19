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
  IPersonalInformation,
  IPersonnel,
} from "@/lib/interfaces/personnel";
// import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import  { IsActive, isLoggedIn } from "@/lib/loginCheck";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getPersonnel, setPersonnel } from "@/lib/personnelSlice";
import Cookies from "universal-cookie";
import Select from "react-select";
import { IOption, getOptionFromValue, provinces } from "@/lib/data";
function About() {
  const [about, setAbout] = useState("");
  const [country, setCountry] = useState("South Africa");
  const [province, setProvince] = useState("");
  const [isWorking, setIsWorking] = useState(false);
  const [companyName, setCompanyName] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [currentJobResponsibilities, setCurrentJobResponsibilities] = useState<
    IJobResponsibilities[]
  >([]);
  const [responsibility, setResponsibility] = useState("");
  const router = useRouter();

  const dispatch = useDispatch();
  const cookies = new Cookies();

  useEffect(() => {
    _loadData();
  }, []);

  const addResponsibility = () => {
    if (responsibility != "") {
      setCurrentJobResponsibilities((current) => [
        ...current,
        { content: responsibility },
      ]);
      setResponsibility("");
    }
  };

  const removeResponsibility = (idx: number) => {
    setCurrentJobResponsibilities((current) =>
      current.filter((_, i) => i !== idx)
    );
  };

 
  const _personnelFromState: any = useSelector(getPersonnel).personnel;
  const loggedInUser = cookies.get("viconet-user");
 
  const _loadData = async () => {
    const data = await localStorage.getItem("currentPersonnel");

    if (data != undefined) {
      const personnel: IPersonnel = JSON.parse(data);

      setAbout(personnel?.personalInformation?.about!);

      if (personnel.currentJob?.employer != undefined) {
        setIsWorking(true);
        setCompanyName(personnel.currentJob.employer!);
        setCurrentJobResponsibilities(personnel.currentJob.responsibilities!);
        setJobTitle(personnel.currentJob.jobTitle!);
        // setDate(Date(personnel.currentJob.startDate!))//TODO: NK fix this
      }
    }
  };


  //STORE

  const addPageDetailsToState = async () => {
    const payload = {
      ..._personnelFromState,
      personalInformation: {
        name: loggedInUser?.name,
        about: about,
        surname: loggedInUser?.surname,
        dateOfBirth: "", //TODO: set this
        address: "", //TODO: set this
        country: country,
        province: province,
      } as IPersonalInformation,
      currentJob: {
        employer: companyName,
        jobTitle,
        startDate: date?.toString(),
        responsibilities: currentJobResponsibilities,
      } as IJobInformation,
    } as IPersonnel;

    dispatch(setPersonnel(payload));
    await localStorage.setItem("currentPersonnel", JSON.stringify(payload));
    router.push("/protected/createProfile/education");
  };

  console.log("rerere",_personnelFromState)

  //STORE

  return (
    <>
   
        {IsActive() &&<>
          <p className="text-lg font-bold">About Yourself</p>
          <p className="text-xs text-gray-500 mb-5">
            Maximun characters is 700
          </p>
          <Textarea
            value={about??_personnelFromState.about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Tell us a little bit about your work experience"
            className="resize-none"
          />

          <div className="grid w-full max-w-sm items-center mt-5 gap-1.5">
            <Label htmlFor="name">Country</Label>
            <Input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              type="text"
              id="name"
              placeholder="Country"
            />
          </div>

          <div className="grid w-full max-w-sm items-center mt-5 gap-1.5">
            <Label htmlFor="name">Province</Label>
            {/* <Input
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              type="select"
              id="name"
              placeholder="Province"
            /> */}
             <Select
                          options={provinces as any}
                          placeholder="Search province"
                          value={getOptionFromValue([province],provinces)[0]}
                          onChange={()=>{setProvince}}
                          isSearchable={true}
                          
                        />
          </div>

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
                  <Button onClick={() => removeResponsibility(idx)}>
                    Remove
                  </Button>
                </div>
              ))}
            </>
          )}

          <Button className="mt-5" onClick={addPageDetailsToState}>
            Save & Continue
          </Button>
        </>
      }
    </>
  );
}

export default About;

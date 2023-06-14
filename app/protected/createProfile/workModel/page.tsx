"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  IEducationInformation,
  IJobInformation,
  IPersonalInformation,
  IPersonnel,
} from "@/lib/interfaces/personnel";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function WorkModel() {
  const [fullTime, setFullTime] = useState(false);
  const [partTime, setPartTime] = useState(false);
  const [remote, setRemote] = useState(false);
  const router = useRouter();

  const save = async () => {
    let personel: IPersonnel = {};
    let jobInfoData = await localStorage.getItem("jobInformation");
    let educationData = await localStorage.getItem("education");
    let previousJobsData = await localStorage.getItem("previousJobs");
    let skillsData = await localStorage.getItem("skills");
    let coursesData = await localStorage.getItem("courses");
    let userData = await localStorage.getItem("user");

    if (userData) {
      const user = JSON.parse(userData);

      let info: IPersonalInformation = {
        name: user.firstName,
        surname: user.surname,
        _id: user._id,
        cellPhone: user.cellPhone,
      };

      personel.personalInformation = info;
    }

    if (jobInfoData) {
      const jobInfo: IJobInformation = JSON.parse(jobInfoData);
      personel.currentJob = jobInfo;
    }

    if (educationData) {
      const educationInfo: IEducationInformation[] = JSON.parse(educationData);
      personel.education = educationInfo;
    }

    if (previousJobsData) {
      const prevJobs: IJobInformation[] = JSON.parse(previousJobsData);
      personel.previousWorkExperience = prevJobs;
    }

    if (coursesData) {
      const courses: string[] = JSON.parse(coursesData);
      personel.keyCourses = courses;
    }

    if (skillsData) {
      const skills: string[] = JSON.parse(skillsData);
      personel.keySkills = skills;
    }

    await localStorage.setItem("profile", JSON.stringify(personel));

    router.push("/protected/profile");
  };
  return (
    <>
      <p className="text-lg font-bold">Preferred Working Method</p>
      <div className="flex items-center space-x-2 my-5">
        <Checkbox
          checked={fullTime}
          onCheckedChange={(e) => setFullTime((prev) => !prev)}
          id="works"
        />
        <label
          htmlFor="works"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Full Time
        </label>
      </div>

      <div className="flex items-center space-x-2 my-5">
        <Checkbox
          checked={partTime}
          onCheckedChange={(e) => setPartTime((prev) => !prev)}
          id="works"
        />
        <label
          htmlFor="works"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Part Time
        </label>
      </div>

      <div className="flex items-center space-x-2 my-5">
        <Checkbox
          checked={remote}
          onCheckedChange={(e) => setRemote((prev) => !prev)}
          id="works"
        />
        <label
          htmlFor="works"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Remote
        </label>
      </div>

      <div className="flex flex-row space-x-4">
        <Button className="mt-5" onClick={() => router.back()}>
          Back
        </Button>
        <Button className="mt-5" onClick={save}>
          Done
        </Button>
      </div>
    </>
  );
}

export default WorkModel;

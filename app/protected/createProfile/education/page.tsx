"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IEducationInformation } from "@/lib/interfaces/personnel";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export type EducationItemProp = {
  id: number;
  education: IEducationInformation;
};

function Educastion() {
  const [institution, setInstitution] = useState("");
  const [qualification, setQualification] = useState("");
  const [yearCompleted, setYearCompleted] = useState("");
  const [education, setEducation] = useState<IEducationInformation[]>([]);
  const router = useRouter();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await localStorage.getItem("education");

    if (data) {
      const ed: IEducationInformation[] = JSON.parse(data);
      setEducation(ed);
    }
  };

  const save = async () => {
    //API must match this 👇
    console.log(education);

    await localStorage.setItem("education", JSON.stringify(education));
    router.push("/protected/createProfile/experience");
  };

  const add = () => {
    let temp: IEducationInformation[] = education;
    temp.push({
      dateCompleted: yearCompleted,
      instituteName: institution,
      qualification,
    });
    setEducation(temp);
  };

  const remove = (idx: number) => {
    let temp = education;
    temp = temp.splice(idx, 1);
    setEducation(temp);
  };

  const EducationItem = (ed: EducationItemProp) => {
    return (
      <div className="flex flex-row justify-between my-5 w-full max-w-sm">
        <div>
          <p className="font-bold">{ed.education.instituteName}</p>
          <p className="text-sm">{ed.education.qualification}</p>
          <p className="text-sm">{ed.education.dateCompleted}</p>
        </div>
        <Button className="mt-5" onClick={() => remove(ed.id)}>
          Remove
        </Button>
      </div>
    );
  };

  return (
    <>
      <p className="text-lg font-bold">Education</p>
      <div className="grid w-full max-w-sm items-center mt-5 gap-1.5">
        <Label htmlFor="name">Institution</Label>
        <Input
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
          type="text"
          id="name"
          placeholder="Institution"
        />
      </div>

      <div className="grid w-full max-w-sm items-center mt-5 gap-1.5">
        <Label htmlFor="name">Qualification</Label>
        <Input
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
          type="text"
          id="name"
          placeholder="Qualification"
        />
      </div>

      <div className="grid w-full max-w-sm items-center mt-5 gap-1.5">
        <Label htmlFor="name">Year Completed</Label>
        <Input
          value={yearCompleted}
          onChange={(e) => setYearCompleted(e.target.value)}
          type="text"
          id="name"
          placeholder="Year Completed"
        />
      </div>
      <Button className="mt-5" onClick={add}>
        Add Education
      </Button>

      {education.map((item, idx) => (
        <div
          key={item.dateCompleted}
          className="flex flex-row justify-between my-5 w-full max-w-sm"
        >
          <div>
            <p className="font-bold">{item.instituteName}</p>
            <p className="text-sm">{item.qualification}</p>
            <p className="text-sm">{item.dateCompleted}</p>
          </div>
          <Button className="mt-5" onClick={() => remove(idx)}>
            Remove
          </Button>
        </div>
      ))}

      <div className="flex flex-row space-x-4">
        <Button className="mt-5" onClick={() => router.back()}>
          Back
        </Button>
        <Button className="mt-5" onClick={save}>
          Save & Continue
        </Button>
      </div>
    </>
  );
}

export default Educastion;

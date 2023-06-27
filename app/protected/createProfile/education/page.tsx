"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IEducationInformation, IPersonnel } from "@/lib/interfaces/personnel";
import { getPersonnel, setPersonnel } from "@/lib/personnelSlice";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { IOption, degrees, getOptionFromValue } from "@/lib/data";

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
  const dispatch = useDispatch();

  useEffect(() => {
    _loadData();
  }, []);

  // const loadData = async () => {
  //   const data = await localStorage.getItem("education");

  //   if (data) {
  //     const ed: IEducationInformation[] = JSON.parse(data);
  //     setEducation(ed);
  //   }
  // };
  const _personnelFromState: any = useSelector(getPersonnel).personnel;

  const _loadData = async () => {
    const data = await localStorage.getItem("currentPersonnel");

    if (data != undefined) {
      const personnel: IPersonnel = JSON.parse(data);

      const savedEducation = personnel.education ?? [];
      const _education = savedEducation as IEducationInformation[];
      setEducation(_education);
    }
  };

  const addPageDetailsToState = async () => {
    const payload = {
      ..._personnelFromState,
      education: education,
    } as IPersonnel;

    dispatch(setPersonnel(payload));

    await localStorage.setItem("currentPersonnel", JSON.stringify(payload));
    router.push("/protected/createProfile/experience");
  };

  const add = () => {
    
    setEducation((current) => [
      ...current,
      {
        dateCompleted: yearCompleted,
        instituteName: institution,
        qualification: qualification
      },
    ]);

    setYearCompleted("");
    setInstitution("");
    setQualification("");
  };

  const remove = (idx: number) => {
    setEducation((current) => current.filter((_, i) => i !== idx));
  };

  
  function handleSelectQualification(data:any) {

    const _data = data as IOption;
    setQualification(_data.value);
  }


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
        {/* <Input
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
          type="text"
          id="name"
          placeholder="Qualification"
        /> */}

          <Select
                options={degrees as any}
                placeholder="Search Degree / Diploma"
                value={getOptionFromValue(qualification==""?[]:[qualification],degrees)[0]}
                onChange={handleSelectQualification}
                isSearchable={true}
                
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
      <Button className="mt-5" onClick={add} disabled={yearCompleted=="" ||  institution=="" || qualification==""}>
        Add Education
      </Button>

      {education &&
        education.map((item, idx) => (
          <div
            key={item.dateCompleted}
            className="flex flex-row justify-between my-5 w-full max-w-sm"
          >
            <div>
              <p className="font-bold">{item.instituteName}</p>
              <p className="text-sm">{getOptionFromValue([item.qualification],degrees)[0].label}</p>
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
        <Button className="mt-5" onClick={addPageDetailsToState}>
          Save & Continue
        </Button>
      </div>
    </>
  );
}

export default Educastion;

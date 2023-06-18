"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IPersonnel } from "@/lib/interfaces/personnel";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { getPersonnel, setPersonnel } from "@/lib/personnelSlice";
  import { IOption, courses, getOptionFromValue, roles, skills } from "@/lib/data";
import Select from "react-select";
function Skills() {
  const [skill, setSkill] = useState("");
  const [course, setCourse] = useState("");
  const [_courses, setCourses] = useState<string[]>([]);
  const [_skills, setSkills] = useState<string[]>([]);
  const dispatch = useDispatch();
  const router = useRouter();
  
  const [selectedOptions, setSelectedOptions] = useState();

  useEffect(() => {
    _loadData();
  }, []);

  // const save = async () => {
  //   await localStorage.setItem("skills", JSON.stringify(skills));
  //   await localStorage.setItem("courses", JSON.stringify(courses));
  //   router.push("/protected/createProfile/workModel");
  // };

  // const loadData = async () => {
  //   const skls = await localStorage.getItem("skills");
  //   const crs = await localStorage.getItem("courses");

  //   if (skls) {
  //     const s: string[] = JSON.parse(skls);
  //     setSkills(s);
  //   }

  //   if (crs) {
  //     const c: string[] = JSON.parse(crs);
  //     setCourses(c);
  //   }
  // };
  const _personnelFromState: any = useSelector(getPersonnel).personnel;
  
  function handleSelectCourses(data:any) {
    const _data = data as IOption[];
    setCourses(_data.map(x=>x.value));
  }



  function handleSelectSkills(data:any) {
    console.log("dara",data)
    const _data = data as IOption[];
    setSkills(_data.map(x=>x.value));
  }

  const _loadData = async () => {
    const data = await localStorage.getItem("currentPersonnel");

    if (data != undefined) {
      const personnel: IPersonnel = JSON.parse(data);
      console.log("erson", personnel);
       setSkills(personnel.keySkills ?? []);
       setCourses(personnel.keyCourses ?? []);
    }
  };

  const addPageDetailsToState = async () => {
    const payload = {
      ..._personnelFromState,
      keySkills: _skills,
      keyCourses: _courses,
    } as IPersonnel;

    dispatch(setPersonnel(payload));
    await localStorage.setItem("currentPersonnel", JSON.stringify(payload));
    router.push("/protected/createProfile/workModel");
  };

  return (
    <>
      <div className="grid w-full max-w-sm items-center mt-5 gap-1.5">
        <Label htmlFor="name">Skill</Label>
          <Select
              options={skills}
              placeholder="Search skills"
              value={getOptionFromValue(_skills, skills)}
              onChange={handleSelectSkills}
              isSearchable={true}
              isMulti
            />
      </div>
      <div className="grid w-full max-w-sm items-center mt-5 gap-1.5">
        <Label htmlFor="name">Course</Label>
          <Select
            options={courses as IOption[]}
            placeholder="Search courses"
            value={getOptionFromValue(_courses, courses)}
            onChange={handleSelectCourses}
            isSearchable={true}
            isMulti
          />
      </div>

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

export default Skills;

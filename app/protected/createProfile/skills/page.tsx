"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IPersonnel } from "@/lib/interfaces/personnel";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { getPersonnel, setPersonnel } from "@/lib/personnelSlice";

function Skills() {
  const [skill, setSkill] = useState("");
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const dispatch = useDispatch();
  const router = useRouter();

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

  const _loadData = async () => {
    
    const data = await localStorage.getItem("currentPersonnel");

    if (data!=undefined) {
      const personnel: IPersonnel = JSON.parse(data);
      console.log("erson", personnel)
      setSkills(personnel.keySkills??[]);
      setCourses(personnel.keyCourses??[])
    
    }
  };

  const addPageDetailsToState = async () => {
    const payload = 
    {
      ..._personnelFromState,
      keySkills:skills,
      keyCourses: courses     

     } as IPersonnel

    dispatch(
      setPersonnel(payload)
    );
    await localStorage.setItem(
      "currentPersonnel",
      JSON.stringify(payload)
    );
    router.push("/protected/createProfile/workModel");
  };

  

  const addSkill = () => {
    setSkills([...skills, skill]);
    setSkill("");
  };

  const addCourse = () => {
    setCourses([...courses, course])
    setCourse("");
  };

  const removeSkill = (idx: number) => {
    const temp = skills;
    temp.splice(idx, 1);
    setSkills(temp);
  };

  const removeCourse = (idx: number) => {
    let temp = courses;
    temp.splice(idx, 1);
    setCourses(temp);
  };
  return (
    <>
      <div className="grid w-full max-w-sm items-center mt-5 gap-1.5">
        <Label htmlFor="name">Skill</Label>
        <Input
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          type="text"
          id="name"
          placeholder="Skill"
        />
      </div>

      {skills.map((item, idx) => (
        <div
          key={idx}
          className="flex flex-row justify-between my-5 w-full max-w-sm "
        >
          <div>
            <p className="font-bold">{item}</p>
          </div>
          <Button onClick={() => removeSkill(idx)}>Remove</Button>
        </div>
      ))}

      <Button className="mt-5" onClick={addSkill}>
        Add Skill
      </Button>

      <div className="grid w-full max-w-sm items-center mt-5 gap-1.5">
        <Label htmlFor="name">Course</Label>
        <Input
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          type="text"
          id="name"
          placeholder="Course"
        />
      </div>

      {courses.map((item, idx) => (
        <div
          key={idx}
          className="flex flex-row justify-between my-5 w-full max-w-sm "
        >
          <div>
            <p className="font-bold">{item}</p>
          </div>
          <Button onClick={() => removeCourse(idx)}>Remove</Button>
        </div>
      ))}

      <Button className="mt-5" onClick={addCourse}>
        Add Course
      </Button>

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

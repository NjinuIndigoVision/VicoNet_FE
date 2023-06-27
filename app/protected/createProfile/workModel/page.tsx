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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPersonnel, setPersonnel } from "@/lib/personnelSlice";

function WorkModel() {
  const [workType, setWorkType] = useState(0);
  const router = useRouter();

  
  const _personnelFromState: any = useSelector(getPersonnel).personnel;
  const dispatch = useDispatch();

  useEffect(() => {
    _loadData();
  }, []);

  const save = async () => {
   await addPageDetailsToState();
    router.push("/protected/profile");
  };

  const _loadData = async () => {


    const data = await localStorage.getItem("currentPersonnel");

    if (data!=undefined) {
      const personnel: IPersonnel = JSON.parse(data);
      console.log("DSAADA", personnel)
      setWorkType(personnel.preferedWorkMethod??0);
    }
  };

  const addPageDetailsToState = async () => {
    const payload = 
    {
      ..._personnelFromState,
      preferedWorkMethod: workType

     } as IPersonnel

    dispatch(
      setPersonnel(payload)
    );
   
    await localStorage.setItem(
      "currentPersonnel",
      JSON.stringify(payload)
    );
    //router.push("/protected/createProfile/education");
  };

  return (
    <>
      <p className="text-lg font-bold">Preferred Working Method</p>
      <div className="flex items-center space-x-2 my-5">
        <input type="checkbox"
          checked={workType==0}
          onChange={(e) => setWorkType(0)}
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
      <input type="checkbox"
          checked={workType ==1}
          onChange={(e) => setWorkType(1)}
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
      <input type="checkbox"
          checked={workType==2}
          onChange={(e) => setWorkType(2)}
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

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IEducationInformation, IJobInformation, IPersonnel } from "@/lib/interfaces/personnel";
import { Briefcase, PenToolIcon } from "lucide-react";
import React from "react";

function TalentComponent({ props }: any) {
  const personnel = props as IPersonnel;
  return (
   
      <div className="bg-white rounded-md w-96 h-80">
        <div className="p-5">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center space-x-2">
              <Avatar>
                <AvatarFallback className="text-lg font-bold">
                  {personnel?.personalInformation?.name?.substring(0, 1)}
                  {personnel?.personalInformation?.surname?.substring(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold text-lg">  {personnel?.personalInformation?.name}
                  {personnel?.personalInformation?.surname}</p>
                <p className="text-gray[300] text-sm">{props.position}</p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row justify-between">
                <div></div>
                <div
                  style={{ float: "right" }}
                  className="px-2 flex items-center border-x-2 rounded-sm border-y-2 border-gray-500 w-16"
                >
                  <p style={{ fontSize: 10 }}>Shorlist</p>
                </div>
              </div>

              <div className="flex flex-row">
                {props.previousWorkExperience?.map((w:IJobInformation) => (
                  <div className="px-2 m-1 flex items-center bg-gray-500 rounded-lg">
                    <p style={{ fontSize: 10 }} className="text-white">
                      {w.employer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-row mt-5 space-x-3">
            <PenToolIcon />
            <div className="flex flex-col">
              <p className="font-bold mb-2">Skills</p>
              <div className="flex flex-row">
                {props.skills?.map((w:string) => (
                  <div className="px-2 m-1 flex items-center bg-gray-500 rounded-lg">
                    <p style={{ fontSize: 10 }} className="text-white">
                      {w}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <hr className="my-2" />
          <div className="flex flex-row mt-5 space-x-3">
            <Briefcase />
            <div className="flex flex-col">
              <p className="font-bold mb-2">Roles</p>
              <div className="flex flex-row">
                {props.roles?.map((w:string) => (
                  <div className="m-1">
                    <p style={{ fontSize: 10 }}>{w}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <hr className="my-2" />
          <div className="flex flex-row mt-5 space-x-3">
            <Briefcase />
            <div className="flex flex-col">
              <p className="font-bold mb-2">Qualifications</p>
              <div className="flex flex-row">
                {props.qualifications?.map((w:IEducationInformation) => (
                  <div className="m-1">
                    <p style={{ fontSize: 10 }}>{w.qualification}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default TalentComponent;

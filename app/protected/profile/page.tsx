"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { IPersonnel } from "@/lib/interfaces/personnel";
import { BriefcaseIcon, Calendar, Edit, NetworkIcon, User } from "lucide-react";
import React, { useEffect, useState } from "react";

function page() {
  useEffect(() => {
    getUser();
  }, []);

  const [initials, setInitials] = useState("");
  const [user, setUser] = useState<IPersonnel>();
  const getUser = async () => {
    //We'll replace this with an API call, also need to make this a SSR component
    const data = await localStorage.getItem("profile");

    if (data) {
      const usr: IPersonnel = JSON.parse(data);
      setUser(usr);
      const ini =
        usr.personalInformation?.name.substring(0, 1) +
        usr.personalInformation?.surname.substring(0, 1)!;
      setInitials(ini);
    }
  };
  return (
    <div className="m-10 flex flex-row space-x-5">
      <div className="p-10 border-gray-100 max-h-80 rounded-lg shadow-sm shadow-gray-300 flex flex-col items-center">
        <Avatar className="w-32 h-32">
          <AvatarFallback className="text-lg font-bold">
            {initials}
          </AvatarFallback>
        </Avatar>
        {user && (
          <>
            <div className="flex flex-row mt-2">
              <p className="text-lg font-bold">
                {user.personalInformation?.name}{" "}
                {user.personalInformation?.surname}
              </p>
            </div>
          </>
        )}
      </div>

      <div className="p-10 border-gray-100 rounded-lg shadow-sm shadow-gray-300 flex flex-col flex-1">
        {user && (
          <>
            <div className="flex flex-row mt-2 justify-between">
              <div>
                <p className="text-lg font-bold">About</p>
                <p className="mt-2 text-gray-700 text-sm">
                  {user.currentJob?.about}
                </p>
              </div>
              <Edit className="cursor-pointer" />
            </div>

            <div className="flex flex-row mt-10 justify-between">
              <div>
                <p className="text-lg font-bold">
                  Current Role and Responsibilities
                </p>
                <div className="flex flex-row mt-2 items-center">
                  <BriefcaseIcon />
                  <p className="mt-2 mx-5 text-gray-700 text-sm">
                    {user.currentJob?.employer}
                  </p>
                </div>
                <div className="flex flex-row mt-2 items-center">
                  <NetworkIcon />
                  <p className="mt-2 mx-5 text-gray-700 text-sm">
                    {user.currentJob?.jobTitle}
                  </p>
                </div>
                <div className="flex flex-row mt-2 items-center">
                  <Calendar />
                  <p className="mt-2 mx-5 text-gray-700 text-sm">
                    {user.currentJob?.startDate}
                  </p>
                </div>
                <div className="flex flex-row mt-2 items-center">
                  <div></div>
                  <p className="mt-2 mx-5 text-gray-700 text-sm">
                    {user.currentJob?.responsibilities?.map((item, i) => (
                      <p key={i} className="mt-2 mx-5 text-gray-700 text-sm">
                        {"- "}
                        {item.content}
                      </p>
                    ))}
                  </p>
                </div>
              </div>
              <Edit className="cursor-pointer" />
            </div>

            <div className="flex flex-row mt-10 justify-between">
              <div>
                <p className="text-lg font-bold">Previous Work Experience</p>
                {user.previousWorkExperience?.map((item, i) => (
                  <div className="flex flex-row mt-2 items-center">
                    <BriefcaseIcon />
                    <div>
                      <p className="mt-2 mx-5 text-gray-700 font-boild text-sm">
                        {item.employer} {"("} {item.startDate?.split(" ")[3]}{" "}
                        {"-"} {item.endDate?.split(" ")[3]} {")"}
                      </p>
                      <p className="mx-5 text-gray-700 text-xs">
                        {item.jobTitle}
                      </p>
                      {item.responsibilities?.map((r, idx) => (
                        <p className="mx-5 text-gray-400 text-xs">
                          {"- "}
                          {r.content}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <Edit className="cursor-pointer" />
            </div>

            <div className="flex flex-row mt-2 justify-between">
              <div>
                <p className="text-lg font-bold">Skills</p>
                <p className="mt-2 text-gray-700 text-sm">
                  {user.keySkills?.map((item, idx) => (
                    <p className="mt-2 mx-5 text-gray-700 font-boild text-sm">
                      {"- "} {item}
                    </p>
                  ))}
                </p>
              </div>
              <Edit className="cursor-pointer" />
            </div>

            <div className="flex flex-row mt-2 justify-between">
              <div>
                <p className="text-lg font-bold">Courses</p>
                <p className="mt-2 text-gray-700 text-sm">
                  {user.keyCourses?.map((item, idx) => (
                    <p className="mt-2 mx-5 text-gray-700 font-boild text-sm">
                      {"- "} {item}
                    </p>
                  ))}
                </p>
              </div>
              <Edit className="cursor-pointer" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default page;

"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Api } from "@/lib/api/endpoints";
import { IPersonnel } from "@/lib/interfaces/personnel";
import { IUserResponseModel } from "@/lib/interfaces/user";
import { BriefcaseIcon, Calendar, Edit, NetworkIcon, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

function page() {
  useEffect(() => {
    getUser();
  }, []);

  const [cv, setCV] = useState<Blob | undefined>();
  const [initials, setInitials] = useState("");
  const [user, setUser] = useState<IPersonnel>();

  const saveCV = (e: any) => {
    setCV(e.target.files[0]);
    console.log(cv);
  };

  const cookies = new Cookies();
  const moment = require('moment');
  const loggedInUser = cookies.get('viconet-user') as IUserResponseModel ;
  const addPersonnel = async function(){
    
    const payload = {...user, _user:loggedInUser._id } as IPersonnel;
    const response = await Api.POST_AddPersonnel(payload);

    console.log("fullpay",payload);

  }
  const getPersonnel = async function(){
    console.log("USER", loggedInUser)
      const response = await Api.GET_Personnel(loggedInUser._id??"");
      console.log("DSSDS", response)
      return response as IPersonnel;
  }


  const getUser = async () => {
    //We'll replace this with an API call, also need to make this a SSR component
    const data = await localStorage.getItem("currentPersonnel");

    if (data) {
      const usr: IPersonnel = JSON.parse(data);
      setUser(usr);
      const ini =
      loggedInUser?.firstName?.substring(0, 1)??"" +
      loggedInUser.surname?.substring(0, 1)!;
      setInitials(ini);
    }else{
      var savedUser = await  getPersonnel();
      console.log("saved.", savedUser);
      setUser(savedUser);
    }
    
  };

  return (
    <div className="m-10 flex flex-row space-x-5">
      <div className="p-10 border-gray-100 max-h-80 rounded-lg shadow-sm shadow-gray-300 flex flex-col items-center">
        <Avatar className="w-32 h-32">
          <AvatarFallback className="text-lg font-bold">
            {loggedInUser?.firstName?.substring(0, 1) +
      loggedInUser.surname?.substring(0, 1)!}
          </AvatarFallback>
        </Avatar>
        {user && (
          <>
            <div className="flex flex-row mt-2">
              <p className="text-lg font-bold">
                {loggedInUser?.firstName}{" "}
                {loggedInUser?.surname}
              </p><br/>
            
            </div>
            <p>{loggedInUser.email}</p><br/>
            <p> address..</p><br/>
            <p>{user.personalInformation.province}, 
            {user.personalInformation.country}</p>
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
                  {user.personalInformation?.about}
                </p>
              </div>
              <Edit className="cursor-pointer" />
            </div>

            <div className="flex flex-row mt-10 justify-between">
              <div>
                <p className="text-lg font-bold">
                <BriefcaseIcon /> Current Role and Responsibilities
                </p>
                <div className="flex flex-row mt-2 items-center">
                  
                  <p className="mt-2 mx-5 text-gray-700 text-sm">
                    Company name: {user.currentJob?.employer}
                  </p>
              
                 
                </div>
                <div className="flex flex-row mt-2 items-center">
                
                  <p className="mt-2 mx-5 text-gray-700 text-sm">
                    Job title: {user.currentJob?.jobTitle}
                  </p>
                </div>
                <div className="flex flex-row mt-2 items-center">
                
                  <p className="mt-2 mx-5 text-gray-700 text-sm">
                    Starting Date: {moment(user?.currentJob?.startDate).format('MMMM d, YYYY')} 
                  </p>
                </div>
                <div className="flex flex-row mt-2 items-center">
                
                </div>
              </div>
              <Edit className="cursor-pointer" />
            </div>

            <div className="flex flex-row mt-10 justify-between">
              <div>
                <p className="text-lg font-bold">
                <BriefcaseIcon /> Key Roles
                </p>
               
                <div className="flex flex-row mt-2 items-center">
             
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
                <p className="text-lg font-bold">    <BriefcaseIcon /> Previous Work Experience</p>
                {user.previousWorkExperience?.map((item, i) => (
                  <div className="flex flex-row mt-2 items-center">
                 
                    <div>
                      <p className="mt-2 mx-5 text-gray-700 font-boild text-sm">
                        {item.employer} - {item.jobTitle} {"("} {moment(item.startDate).format('MMMM d, YYYY') }{" "}
                        {"-"} {moment(item.endDate).format('MMMM d, YYYY')} {")"}
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
                <p className="text-lg font-bold">  <BriefcaseIcon /> Skills</p>
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
                <p className="text-lg font-bold">  <BriefcaseIcon /> Courses</p>
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
            <div className="flex flex-row mt-5 justify-between">
              <div>
                <p className="text-lg font-bold">CV</p>
                <p className="mt-2 text-gray-700 text-sm">
                <button>Download CV</button>
                <button style={{float:"right"}}>Upload Video CV</button>
                </p>
              </div>
              {/* <form>
                <input
                  style={{ marginBottom: "2%" }}
                  className="form-control"
                  type="file"
                  id="cv"
                  name="cv"
                  onChange={saveCV}
                />
                <input
                type="submit"
                // onClick={() => {
                //   addPersonnel();
                // }}
              />
            </form> */}
             <input
                type="submit"
                onClick={() => {
                  addPersonnel();
                }}
                />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default page;

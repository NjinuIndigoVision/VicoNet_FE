"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Api } from "@/lib/api/endpoints";
import { IJobInformation, IPersonnel } from "@/lib/interfaces/personnel";
import { IDeleteUserModel, IUserResponseModel } from "@/lib/interfaces/user";
import { uploadCV } from "@/lib/personnelService";
import { useRouter } from "next/navigation";
import CreatableSelect from 'react-select/creatable';
import { setPersonnel } from "@/lib/personnelSlice";
import {
  BookOpenCheck,
  BriefcaseIcon,
  Calendar,
  CalendarIcon,
  ClipboardCheck,
  DownloadCloud,
  Edit,
  NetworkIcon,
  User,
  UserCheck,
  UserCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Select from "react-select";
import { courses, getOptionFromValue, roles, skills } from "@/lib/data";
import { useDispatch, useSelector } from "react-redux";

function page() {
  useEffect(() => {
    getUser();
  }, []);

  const [cv, setCV] = useState<Blob | undefined>();
  const [initials, setInitials] = useState("");
  const [user, setUser] = useState<IPersonnel>();
  const [selectedOptions, setSelectedOptions] = useState();
  const dispatch = useDispatch();

  const router = useRouter();
  const [about, setAbout] = useState("");
  const [currentJob, setCurrentJob] = useState<IJobInformation>();
  

  const saveCV = (e: any) => {
    setCV(e.target.files[0]);
  };

  const cookies = new Cookies();
  const moment = require("moment");
  const loggedInUser = cookies.get("viconet-user") as IUserResponseModel;
  const addPersonnel = async function () {
    const cvPayload = new FormData();
    // cvPayload.append("cv", cv);
    if (cv) {
      cvPayload.append("cv", cv as Blob);
      const cvDoc = await uploadCV(cvPayload);
      const path = cvDoc.data.data.Location;

      const payload = {
        ...user,
        _user: loggedInUser._id,
        cvUrl: path,
      } as IPersonnel;
      console.log("cvassaa", payload);
      const response = await Api.POST_AddPersonnel(payload);
      setPersonnel(response);
    } else {
      const payload = { ...user, _user: loggedInUser._id } as IPersonnel;
      console.log("cvassaa", payload);
      const response = await Api.POST_AddPersonnel(payload);
    }
  };
  const getPersonnel = async function () {
    console.log("USER", loggedInUser);
    const response = await Api.GET_Personnel(loggedInUser._id ?? "");
    console.log("DSSDS", response);
    return response as IPersonnel;
  };


  const getUser = async () => {
    //We'll replace this with an API call, also need to make this a SSR component
    const data = await localStorage.getItem("currentPersonnel");

    if (data) {
      const usr: IPersonnel = JSON.parse(data);
      setUser(usr);
      const ini =
        loggedInUser?.firstName?.substring(0, 1) ??
        "" + loggedInUser.surname?.substring(0, 1)!;
      setInitials(ini);
    } else {
      
      var savedUser = await getPersonnel();
      console.log("saved.", savedUser);
      setUser(savedUser);
      dispatch(setPersonnel(savedUser));
      await localStorage.setItem("currentPersonnel", JSON.stringify(savedUser));
    }
  };


  function handleSelectCourses(data:any) {
    const payload = {...user, courses:data.map((x:any)=>x.value)}
    dispatch(setPersonnel(payload));
  }


  function handleSelectSkills(data:any) {
    const payload = {...user, keySkills:data.map((x:any)=>x.value)} as IPersonnel;
    setUser(payload);
  }
  
  function updateBio(){
    const _user = {...user,personalInformation:{...user?.personalInformation, about:about}} as IPersonnel;
    console.log("YSEE", user)
    setUser(_user);
  }

  function updateCurrentJob(){
    const _user = {...user,currentJob: currentJob} as IPersonnel;
    setUser(_user);
  }

  const deleteUser = async()=>{

    const response = Api.POST_DeleteUser({email:loggedInUser.email} as IDeleteUserModel);
    router.replace("/auth/login");
    
  }



  return (
    <div className="m-10 flex flex-row space-x-5">
      <div className="p-10 border-gray-100 h-fit rounded-lg shadow-sm shadow-gray-300 flex flex-col items-center">
        <Avatar className="w-32 h-32">
          <AvatarFallback className="text-lg font-bold">
            {loggedInUser?.firstName?.substring(0, 1) +
              loggedInUser?.surname?.substring(0, 1)!}
          </AvatarFallback>
        </Avatar>
        {user && (
          <>
            <div className="flex flex-row mt-2">
              <p className="text-lg font-bold">
                {loggedInUser?.firstName} {loggedInUser?.surname}
              </p>
              <br />
            </div>
            <p>{loggedInUser.email}</p>
            <br />
            <p> address..</p>
            <br />
            <p>
              {user.personalInformation.province},
              {user.personalInformation.country}
            </p>
        
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
              <AlertDialog>
                <AlertDialogTrigger>
                  <Edit className="cursor-pointer" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Edit Bio</AlertDialogTitle>
                    <AlertDialogDescription>
                      <Textarea
                        placeholder="Tell us a little bit about your work experience"
                        className="resize-none"
                        defaultValue={user?.personalInformation?.about}
                        onChange={(e)=>setAbout(e.target.value)}
                      />
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={updateBio}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div className="flex flex-row mt-10 justify-between">
              <div style={{width: "100%"}}>
                <p className="text-lg font-bold">
                  <ClipboardCheck style={{float:"left",marginRight:"2%"}} /> Current Role and Responsibilities
                </p>
                <br/>
                <div className="flex flex-row mt-2 ml-5 items-center">
                  <p className="mt-2  mx-5 text-gray-700 text-sm">
                    Company name: {user.currentJob?.employer}
                  </p>
                </div>
                <div className="flex flex-row mt-2  ml-5 items-center">
                  <p className="mt-2 mx-5 text-gray-700 text-sm">
                    Job title: {user.currentJob?.jobTitle}
                  </p>
                </div>
                <div className="flex flex-row mt-2  ml-5 items-center">
                  <p className="mt-2 mx-5 text-gray-700 text-sm">
                    Starting Date:{" "}
                    {moment(user?.currentJob?.startDate).format("MMMM d, YYYY")}
                  </p>
                </div>
                <div className="flex flex-row mt-2 items-center"></div>
                <br/>
              </div>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Edit className="cursor-pointer" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Edit Current Company</AlertDialogTitle>
                    <AlertDialogDescription>
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="name">Company Name</Label>
                        <Input
                          type="text"
                          id="name"
                          placeholder="Company Name"
                          defaultValue={user.currentJob?.employer}
                          onChange={(e)=>{
                            const currentJob = {
                              ...user.currentJob,
                              employer: e.target.value
                            }
                            setCurrentJob(currentJob);
                          }}
                        />
                      </div>

                      <div className="grid w-full items-center mt-5 gap-1.5">
                        <Label htmlFor="name">Start Date</Label>
                        <Input type="date" 
                          onChange={(e)=>{
                            const currentJob = {
                              ...user.currentJob,
                              startDate: e.target.value
                            }
                            setCurrentJob(currentJob);
                          }}

                          defaultValue={user.currentJob?.startDate} 
                          id="name" placeholder="Start Date" />
                      </div>

                      <div className="grid w-full items-center mt-5 gap-1.5">
                        <Label htmlFor="name">Job Title</Label>
                        <Input type="text"
                          onChange={(e)=>{
                            const currentJob = {
                              ...user.currentJob,
                              jobTitle: e.target.value
                            }
                            setCurrentJob(currentJob);
                          }}
                           defaultValue={user.currentJob?.jobTitle} id="name" placeholder="Job Title" />
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={updateCurrentJob}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <hr/>

            <div className="flex flex-row mt-10 justify-between">
              <div style={{width: "100%"}}>
                  <p className="text-lg font-bold">
                    <UserCircle style={{float:"left",marginRight:"2%"}} />  Key Roles
                  </p>

                <div className="flex flex-row mt-2  ml-5 items-center">
                  <p className="mt-2 mx-5 text-gray-700 text-sm">
                    {user.currentJob?.responsibilities?.map((item, i) => (
                      <p key={i} className="mt-2 mx-5 text-gray-700 text-sm">
                        {"- "}
                        {item.content}
                      </p>
                    ))}
                  </p>
                </div>
                <br/>
              </div>
              {/* <Edit className="cursor-pointer" /> */}
              <AlertDialog>
                <AlertDialogTrigger>
                  <Edit className="cursor-pointer" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Edit Roles & Responsibilities</AlertDialogTitle>
                    <AlertDialogDescription>
                      <div className="grid w-full items-center mt-5 gap-1.5">
                        <Label htmlFor="name">Roles</Label>
                        <CreatableSelect isMulti options={roles} />
                      </div>
                      <div className="grid w-full items-center mt-5 gap-1.5">
                        <Label htmlFor="name">Responsibilities</Label>
                        <CreatableSelect isMulti options={[]} />
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <hr/>
            <div className="flex flex-row mt-10 justify-between">
              <div style={{width: "100%"}}>
                  <p className="text-lg font-bold">
                    <BriefcaseIcon style={{float:"left",marginRight:"2%"}} />  Previous Work Experience
                </p>
                <br/>
                {user.previousWorkExperience?.map((item, i) => (
                  <div className="flex flex-row mt-2  ml-5 items-center">
                    <div>
                      <p className="mt-2 mx-5 text-gray-700 font-boild text-sm">
                        {item.employer} - {item.jobTitle} {"("}{" "}
                        {moment(item.startDate).format("MMMM d, YYYY")} {"-"}{" "}
                        {moment(item.endDate).format("MMMM d, YYYY")} {")"}
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
                <br/>
              </div>
              <Edit className="cursor-pointer" />
             
            </div>
            <hr/>
            <div className="flex flex-row mt-2 justify-between">
            <div style={{width: "100%"}}>
                <p className="text-lg font-bold">
                  <UserCheck style={{float:"left",marginRight:"2%"}} /> Skills
                </p>
                <br/>
                <p className="mt-2 text-gray-700  ml-5 text-sm">
                  {getOptionFromValue(user.keySkills??[], skills)?.map((item, idx) => (
                    <p className="mt-2 mx-5 text-gray-700 font-boild text-sm">
                      {"- "} {item.label}
                    </p>
                  ))}
                </p>
                <br/>
              </div>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Edit className="cursor-pointer" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Edit skills</AlertDialogTitle>
                    <AlertDialogDescription>
                      <div className="grid w-full items-center mt-5 gap-1.5">
                        <Label htmlFor="name">Skills</Label>
                        <Select
                          options={skills}
                          placeholder="Search skills"
                          value={getOptionFromValue(user.keySkills??[], skills)}
                          onChange={handleSelectSkills}
                          isSearchable={true}
                          isMulti
                        />
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <hr/>
            <div className="flex flex-row mt-2 justify-between">
              <div style={{width: "100%"}}>
                <p className="text-lg font-bold">
                  <BookOpenCheck style={{float:"left",marginRight:"2%"}} />  Courses
             
                </p>
                <br/>
                <p className="mt-2 text-gray-700 text-sm ml-5">
                  {getOptionFromValue(user.keyCourses??[], courses)?.map((item, idx) => (
                    <p className="mt-2 mx-5 text-gray-700 font-boild text-sm">
                      {"- "} {item.label}
                    </p>
                  ))}
                </p>
                <br/>
              </div>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Edit className="cursor-pointer" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Edit courses</AlertDialogTitle>
                    <AlertDialogDescription>
                      <div className="grid w-full items-center mt-5 gap-1.5">
                        <Label htmlFor="name">Courses</Label>
                        <Select
                          options={courses}
                          placeholder="Search courses"
                          value={getOptionFromValue(user.keyCourses??[], courses)}
                          onChange={handleSelectCourses}
                          isSearchable={true}
                          isMulti
                        />
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <hr/>
            <div className="flex flex-row mt-5 justify-between">
              <div>
                <p className="text-lg font-bold">  <DownloadCloud style={{float:"left",marginRight:"2%"}} /> CV</p>
                <p className="mt-2 text-gray-700 text-sm ml-5">
                  <br/>
                  <input
                    style={{ marginBottom: "2%" }}
                    className="form-control inputfile ml-5"
                    type="file"
                    id="cv"
                    name="cv"
                    onChange={saveCV}
                  />
                  <br />
                  {user.cvUrl != "" && (
                    <a href={user.cvUrl} target="_blank">
                      Download CV
                    </a>
                  )}
                  {/* <button >Download CV</button> */}
                  {/* <button style={{float:"right"}}>Upload Video CV</button> */}
                </p>
              </div>
             
            </div>
            <div className="flex flex-row mt-5 justify-between">
                <div style={{textAlign:"right", width:"100%"}}>
              <input
                type="submit"
               
                onClick={() => {
                  addPersonnel();
                }}
              /></div>
              </div>
          </>
        )}
      </div>
    </div>
  );
}

export default page;

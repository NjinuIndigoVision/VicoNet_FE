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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Api } from "@/lib/api/endpoints";
import {
  IJobInformation,
  IJobResponsibilities,
  IPersonnel,
} from "@/lib/interfaces/personnel";
import { IDeleteUserModel, IUserResponseModel } from "@/lib/interfaces/user";
import { uploadCV } from "@/lib/personnelService";
import { useRouter } from "next/navigation";
import CreatableSelect from "react-select/creatable";
import { setPersonnel } from "@/lib/personnelSlice";
import { current } from "@reduxjs/toolkit";
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
import { courses, getOptionFromValue, provinces, roles, skills } from "@/lib/data";
import { useDispatch, useSelector } from "react-redux";
import { INotification } from "@/lib/interfaces/notification";

function page() {
  useEffect(() => {
    getUser();

  }, []);

  const [cv, setCV] = useState<Blob | undefined>();
  const [initials, setInitials] = useState("");
  const [user, setUser] = useState<IPersonnel>();
  const [notifications, setNotifications] = useState<INotification[]>();
  const [currentJobResponsibilities, setCurrentJobResponsibilities] = useState<
    IJobResponsibilities[]
  >([]);
  const [responsibility, setResponsibility] = useState("");
  const [selectedOptions, setSelectedOptions] = useState();
  const dispatch = useDispatch();

  const router = useRouter();
  const [about, setAbout] = useState("");
  const [currentJob, setCurrentJob] = useState<IJobInformation>();

  const isUpdate =  user!=undefined && user?._id!=""
  const cookies = new Cookies();
  const moment = require("moment");
  const loggedInUser = cookies.get("viconet-user") as IUserResponseModel;


  const saveCV = (e: any) => {
    setCV(e.target.files[0]);
  };

  const addResponsibility = () => {
    if (responsibility != "") {
      setCurrentJobResponsibilities((current) => [
        ...current,
        { content: responsibility },
      ]);
      setResponsibility("");
    }
  };

  const removeResponsibility = (idx: number) => {
    setCurrentJobResponsibilities((current) =>
      current.filter((_, i) => i !== idx)
    );
  };

  const addPersonnel = async function () {
    const cvPayload = new FormData();
  
    if(user?._id==undefined || user?._id==""){
       if (cv) {
      cvPayload.append("cv", cv as Blob);
      const cvDoc = await uploadCV(cvPayload);
      const path = cvDoc.data.data.Location;

      const payload = {
        ...user,
        _user: loggedInUser._id,
        cvUrl: path,
      } as IPersonnel;
      console.log("payload", payload);  
      const response = await Api.POST_AddPersonnel(payload);

      setUser(response.data);
    } else {
      const payload = { ...user, _user: loggedInUser._id } as IPersonnel;
      console.log("payload", payload);
      const response = await Api.POST_AddPersonnel(payload);
      await localStorage.removeItem("currentPersonnel");
      setUser(response.data);
    }
    }else{
      if (cv) {
        cvPayload.append("cv", cv as Blob);
        const cvDoc = await uploadCV(cvPayload);
        const path = cvDoc.data.data.Location;
  
        const payload = {
          ...user,
          _user: loggedInUser._id,
          cvUrl: path,
        } as IPersonnel;
        console.log("payload", payload);  
        const response = await Api.POST_UpdatePersonnel(payload, user?._id??"");
  
        setUser(response.data);
      } else {
        const payload = { ...user, _user: loggedInUser._id } as IPersonnel;
        console.log("payload", payload);
        const response = await Api.POST_UpdatePersonnel(payload,user?._id??"");
     
        setUser(response.data);
      }
    }
   
  };

  const getPersonnel = async function () {
    const response = await Api.GET_PersonnelByUserId(loggedInUser._id??"");
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
      await localStorage.removeItem("currentPersonnel")
      await GetUserNotifications(savedUser._id);
    }
  };

  function handleSelectCourses(data: any) {
    const payload = { ...user, courses: data.map((x: any) => x.value) };
    dispatch(setPersonnel(payload));
  }

  function handleSelectSkills(data: any) {
    const payload = {
      ...user,
      keySkills: data.map((x: any) => x.value),
    } as IPersonnel;
    setUser(payload);
  }

  function updateBio() {
    const _user = {
      ...user,
      personalInformation: { ...user?.personalInformation, about: about },
    } as IPersonnel;
    console.log("YSEE", user);
    setUser(_user);
  }

  function updateCurrentJob() {
    const _user = { ...user, currentJob: currentJob } as IPersonnel;
    setUser(_user);
  }

  async function GetUserNotifications(personnelId:string){
    const notifications = await Api.GET_NotificationByPersonnelId(personnelId);
    setNotifications(notifications)
  }

  function notificationReditect(){
    router.push(`/protected/profile/notifications?id=${user?._id}`)
  }
  const deleteUser = async () => {
    const response = Api.POST_DeleteUser({
      email: loggedInUser.email,
    } as IDeleteUserModel);
    router.replace("/auth/login");
  };

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
            {/* <p> address..</p> */}
            <br />
            <p>
              {getOptionFromValue([user?.personalInformation?.province??""], provinces)[0]?.label} {" , "}
               {user?.personalInformation?.country}
            </p>
          </>
        )}
      <div>
      <div className="flex flex-row mt-2">

          <div className="d-flex flex-row ">
            <label className="l-14 mr-2">Notifications</label>
           
          </div>
       </div>
       
       <button onClick={notificationReditect} className="bton btn2" style={{width:"100%"}}>View notifications  <label className="p-14-n comp-status" id="numCand" style={{background: "rgb(255, 142, 189)", marginBottom: "0"}}>{notifications?.length}</label></button>

      </div>
    </div>
 

      <div className="p-10 border-gray-100 rounded-lg shadow-sm shadow-gray-300 flex flex-col flex-1">
        {user && (
          <>
            <div className="flex flex-row mt-2 justify-between">
              <div>
                <p className="text-lg font-bold">About</p>
                <p className="mt-2 text-gray-700 text-sm">
                  {user?.personalInformation?.about}
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
                        value={user.personalInformation?.about}
                        onChange={(e) => {
                          setUser((prev: any) => {
                            const usr = { ...prev };
                            usr.personalInformation!.about = e.target.value;
                            return usr;
                          });
                        }}
                        placeholder="Tell us a little bit about your work experience"
                        className="resize-none"
                      />
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={updateBio}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div className="flex flex-row mt-10 justify-between">
              <div style={{ width: "100%" }}>
                <p className="text-lg font-bold">
                  <ClipboardCheck
                    style={{ float: "left", marginRight: "2%" }}
                  />{" "}
                  Current Role and Responsibilities
                </p>
                <br />
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
                <br />
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
                          onChange={(e) => {
                            const currentJob = {
                              ...user.currentJob,
                              employer: e.target.value,
                            };
                            setCurrentJob(currentJob);
                          }}
                        />
                      </div>

                      <div className="grid w-full items-center mt-5 gap-1.5">
                        <Label htmlFor="name">Start Date</Label>
                        <Input
                          type="date"
                          onChange={(e) => {
                            const currentJob = {
                              ...user.currentJob,
                              startDate: e.target.value,
                            };
                            setCurrentJob(currentJob);
                          }}
                          defaultValue={user.currentJob?.startDate}
                          id="name"
                          placeholder="Start Date"
                        />
                      </div>

                      <div className="grid w-full items-center mt-5 gap-1.5">
                        <Label htmlFor="name">Job Title</Label>
                        <Input
                          type="text"
                          onChange={(e) => {
                            const currentJob = {
                              ...user.currentJob,
                              jobTitle: e.target.value,
                            };
                            setCurrentJob(currentJob);
                          }}
                          defaultValue={user.currentJob?.jobTitle}
                          id="name"
                          placeholder="Job Title"
                        />
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={updateCurrentJob}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <hr />

            <div className="flex flex-row mt-10 justify-between">
              <div style={{ width: "100%" }}>
                <p className="text-lg font-bold">
                  <UserCircle style={{ float: "left", marginRight: "2%" }} />{" "}
                  Key Roles
                </p>

                <div className="flex flex-row mt-2  ml-5 items-center">
                  <p className="mt-2 mx-5 text-gray-700 text-sm">
                    {getOptionFromValue(user.currentJob?.responsibilities==undefined? [] : user.currentJob?.responsibilities, roles)?.map((item, i) => (
                      <p key={i} className="mt-2 mx-5 text-gray-700 text-sm">
                        {"- "}
                        {item.label}
                      </p>
                    ))}
                  </p>
                </div>
                <br />
              </div>
              {/* <Edit className="cursor-pointer" /> */}
              <AlertDialog>
                <AlertDialogTrigger>
                  <Edit className="cursor-pointer" />
                </AlertDialogTrigger>
                <AlertDialogContent className="search-modal">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Edit Roles & Responsibilities
                    </AlertDialogTitle>
                    <hr/>
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
                    <AlertDialogAction>Save</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <hr />
  
            <div className="flex flex-row mt-10 justify-between">
              <div>
                <p className="text-lg font-bold">
                  {" "}
                  <BriefcaseIcon /> Previous Work Experience
                </p>
                <br />
                {user.previousWorkExperience?.map((item, i) => (
                  <div className="flex flex-row mt-2  ml-5 items-center">
                    <div>
                      <p className="mt-2 mx-5 text-gray-700 font-boild text-sm">
                        {item.employer} - {item.jobTitle} {"("}{" "}
                        {moment(item.startDate).format("MMMM d, YYYY")} {"-"}{" "}
                        {moment(item.endDate).format("MMMM d, YYYY")} {")"}
                      </p>

                      {getOptionFromValue(item.responsibilities==undefined?[]:item.responsibilities, roles).map((r, idx) => (
                        <p className="mx-5 text-gray-400 text-xs">
                          {"- "}
                          {r.label}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
                <br />
              </div>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Edit className="cursor-pointer" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Roles and Responsibilities
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <div className="flex flex-row justify-center space-x-2">
                        <div className="flex-1">
                          <Input
                            value={responsibility}
                            onChange={(e) => setResponsibility(e.target.value)}
                            type="text"
                            id="name"
                            placeholder="Role and Responsibility"
                          />
                        </div>
                        <div className="">
                          <Button onClick={addResponsibility}>Add</Button>
                        </div>

                        {currentJobResponsibilities.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex flex-row justify-between my-5 w-full max-w-sm "
                          >
                            <p>{item.content}</p>
                            <Button onClick={() => removeResponsibility(idx)}>
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => console.log("MUST SEND USER TO API", user)}
                    >
                      Save
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <hr />
            <div className="flex flex-row mt-2 justify-between">
              <div style={{ width: "100%" }}>
                <p className="text-lg font-bold">
                  <UserCheck style={{ float: "left", marginRight: "2%" }} />{" "}
                  Skills
                </p>
                <br />
                <p className="mt-2 text-gray-700  ml-5 text-sm">
                  {getOptionFromValue(user.keySkills ?? [], skills)?.map(
                    (item, idx) => (
                      <p className="mt-2 mx-5 text-gray-700 font-boild text-sm">
                        {"- "} {item.label}
                      </p>
                    )
                  )}
                </p>
                <br />
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
                          value={getOptionFromValue(
                            user.keySkills ?? [],
                            skills
                          )}
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
            <hr />
            <div className="flex flex-row mt-2 justify-between">
              <div style={{ width: "100%" }}>
                <p className="text-lg font-bold">
                  <BookOpenCheck style={{ float: "left", marginRight: "2%" }} />{" "}
                  Courses
                </p>
                <br />
                <p className="mt-2 text-gray-700 text-sm ml-5">
                  {getOptionFromValue(user.keyCourses ?? [], courses)?.map(
                    (item, idx) => (
                      <p className="mt-2 mx-5 text-gray-700 font-boild text-sm">
                        {"- "} {item.label}
                      </p>
                    )
                  )}
                </p>
                <br />
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
                          value={getOptionFromValue(
                            user.keyCourses ?? [],
                            courses
                          )}
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
            <hr />
            <div className="flex flex-row mt-5 justify-between">
              <div>
                <p className="text-lg font-bold">
                  {" "}
                  <DownloadCloud
                    style={{ float: "left", marginRight: "2%" }}
                  />{" "}
                  CV
                </p>
                <p className="mt-2 text-gray-700 text-sm ml-5">
                  <br />
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
              <div style={{ textAlign: "right", width: "100%" }}>
                <input
                  type="submit"
                  onClick={() => {
                    addPersonnel();
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default page;

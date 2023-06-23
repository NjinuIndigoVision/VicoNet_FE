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
  PaperclipIcon,
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
  const [currentJobResponsibilities, setCurrentJobResponsibilities] = useState<
    IJobResponsibilities[]
  >([]);
  const [responsibility, setResponsibility] = useState("");
  const [selectedOptions, setSelectedOptions] = useState();
  const dispatch = useDispatch();

  const router = useRouter();
  const [about, setAbout] = useState("");
  const [currentJob, setCurrentJob] = useState<IJobInformation>();

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

  const deleteUser = async () => {
    const response = Api.POST_DeleteUser({
      email: loggedInUser.email,
    } as IDeleteUserModel);
    router.replace("/auth/login");
  };

  return (
    <div className="m-10 flex flex-row space-x-5">
      <div className=" border-gray-100 h-fit rounded-lg shadow-sm shadow-gray-300 flex flex-col">
        <div className="p-1 bg-pink-600 w-8 mt-4 rounded-r-md flex items-center">
          <p style={{ fontSize: 8 }} className="text-white">
            #1
          </p>
        </div>
        <div className="p-10 flex flex-col items-center">
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
              <p className="text-gray-600 text-sm">1998-09-21</p>
              <p className="text-gray-600 text-sm">+27670126726</p>
              <p className="text-gray-600 text-sm">{loggedInUser.email}</p>

              <br />
              <p className="text-gray-600 text-sm">21 Jump St</p>
              <p className="text-gray-600 text-sm">
                {user.personalInformation.province},
                {user.personalInformation.country}
              </p>

              <div className="flex flex-row">
                <div className="px-2 m-1 flex items-center bg-gray-500 rounded-lg">
                  <p style={{ fontSize: 10 }} className="text-white">
                    Full Time
                  </p>
                </div>
                <div className="px-2 m-1 flex items-center bg-gray-500 rounded-lg">
                  <p style={{ fontSize: 10 }} className="text-white">
                    Remote
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="mx-5 mt-2 bg-[#7878DA] p-3 cursor-pointer rounded-md flex flex-row space-x-2 text-white">
          <PaperclipIcon />
          <p>Download CV</p>
        </div>
        <div className="mx-5 mt-2 bg-[#27276C] p-3 cursor-pointer rounded-md flex flex-row justify-center space-x-2 text-white">
          <p>Add to Shortlist</p>
        </div>
      </div>

      <div className="p-10 border-gray-100 rounded-lg shadow-sm shadow-gray-300 flex flex-col flex-1">
        {user && (
          <>
            <div className="flex flex-row mt-2 justify-between">
              <div>
                <p className="text-lg font-bold">
                  About {loggedInUser?.firstName} {loggedInUser?.surname}
                </p>
                <p className="mt-2 text-gray-700 text-sm">
                  {user.personalInformation?.about}
                </p>
              </div>
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
            </div>
            <hr />

            <div className="flex flex-row mt-10 justify-between">
              <div style={{ width: "100%" }}>
                <p className="text-lg font-bold">
                  <BriefcaseIcon style={{ float: "left", marginRight: "2%" }} />{" "}
                  Previous Work Experience
                </p>
                {/* <p className="text-lg font-bold">
                  <BriefcaseIcon /> Previous Work Experience
                </p> */}
                <br />
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
                <br />
              </div>
            </div>
            <hr />
            <div className="flex flex-row mt-2 justify-between">
              <div style={{ width: "100%" }}>
                <p className="text-lg font-bold">
                  <UserCheck style={{ float: "left", marginRight: "2%" }} />{" "}
                  Skills
                </p>
                <br />

                {/* <p className="mt-2 text-gray-700  ml-5 text-sm">
                  {getOptionFromValue(user.keySkills ?? [], skills)?.map(
                    (item, idx) => (
                      <p className="mt-2 mx-5 text-gray-700 font-boild text-sm">
                        {"- "} {item.label}
                      </p>
                    )
                  )}
                </p> */}

                <div className="flex flex-row">
                  <div className="px-2 m-1 flex items-center bg-gray-500 rounded-lg">
                    <p style={{ fontSize: 10 }} className="text-white">
                      Java
                    </p>
                  </div>
                  <div className="px-2 m-1 flex items-center bg-gray-500 rounded-lg">
                    <p style={{ fontSize: 10 }} className="text-white">
                      C#
                    </p>
                  </div>
                  <div className="px-2 m-1 flex items-center bg-gray-500 rounded-lg">
                    <p style={{ fontSize: 10 }} className="text-white">
                      Information Technology
                    </p>
                  </div>
                  <div className="px-2 m-1 flex items-center bg-gray-500 rounded-lg">
                    <p style={{ fontSize: 10 }} className="text-white">
                      Amazon Web Services
                    </p>
                  </div>
                </div>
                <br />
              </div>
            </div>
            <hr />
            <div className="flex flex-row mt-2 justify-between">
              <div style={{ width: "100%" }}>
                <p className="text-lg font-bold">
                  <BookOpenCheck style={{ float: "left", marginRight: "2%" }} />{" "}
                  Key Courses
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
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default page;

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
import { IJobResponsibilities, IPersonnel } from "@/lib/interfaces/personnel";
import { IUserResponseModel } from "@/lib/interfaces/user";
import { uploadCV } from "@/lib/personnelService";
import { setPersonnel } from "@/lib/personnelSlice";
import { current } from "@reduxjs/toolkit";
import {
  BriefcaseIcon,
  Calendar,
  CalendarIcon,
  Edit,
  NetworkIcon,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

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

  const saveCV = (e: any) => {
    setCV(e.target.files[0]);
    console.log(cv);
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
    }
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
                        value={user.personalInformation.about}
                        onChange={(e) => {
                          setUser((prev) => {
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
                    <AlertDialogAction
                      onClick={() => console.log("MUST SEND USER TO API", user)}
                    >
                      Save
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
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
                    Starting Date:{" "}
                    {moment(user?.currentJob?.startDate).format("MMMM d, YYYY")}
                  </p>
                </div>
                <div className="flex flex-row mt-2 items-center"></div>
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
                          value={user.currentJob?.employer}
                          onChange={(e) => {
                            setUser((prev) => {
                              const usr = { ...prev };
                              usr.currentJob!.employer = e.target.value;
                              return usr;
                            });
                          }}
                        />
                      </div>

                      <div className="grid w-full items-center mt-5 gap-1.5">
                        <Label htmlFor="name">Start Date</Label>
                        <Input
                          type="text"
                          id="name"
                          placeholder="Start Date"
                          value={user.currentJob?.startDate}
                          onChange={(e) => {
                            setUser((prev) => {
                              const usr = { ...prev };
                              usr.currentJob!.startDate = e.target.value;
                              return usr;
                            });
                          }}
                        />
                      </div>

                      <div className="grid w-full items-center mt-5 gap-1.5">
                        <Label htmlFor="name">Job Title</Label>
                        <Input
                          type="text"
                          id="name"
                          placeholder="Job Title"
                          value={user.currentJob?.jobTitle}
                          onChange={(e) => {
                            setUser((prev) => {
                              const usr = { ...prev };
                              usr.currentJob!.jobTitle = e.target.value;
                              return usr;
                            });
                          }}
                        />
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
                      </div>
                      {user.currentJob?.responsibilities?.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex flex-row justify-between my-5 w-full"
                        >
                          <p>{item.content}</p>
                          <Button onClick={() => removeResponsibility(idx)}>
                            Remove
                          </Button>
                        </div>
                      ))}
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

            <div className="flex flex-row mt-10 justify-between">
              <div>
                <p className="text-lg font-bold">
                  {" "}
                  <BriefcaseIcon /> Previous Work Experience
                </p>
                {user.previousWorkExperience?.map((item, i) => (
                  <div className="flex flex-row mt-2 items-center">
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

            <div className="flex flex-row mt-2 justify-between">
              <div>
                <p className="text-lg font-bold">
                  {" "}
                  <BriefcaseIcon /> Skills
                </p>
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
                <p className="text-lg font-bold">
                  {" "}
                  <BriefcaseIcon /> Courses
                </p>
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
                  <input
                    style={{ marginBottom: "2%" }}
                    className="form-control"
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

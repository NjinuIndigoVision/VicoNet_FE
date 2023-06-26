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
    <div className="talent-blue-header">
      <div className="prof-container">
        <div className="row">
          <div className="col-lg-4">
            <div className="white-container">
              <div className="profile-info">
                <label
                  className="candnum"
                  style={{ marginLeft: "-15px", fontSize: "14px" }}
                >
                  #1
                </label>
                <div className="personal-info">
                  <div>
                    <label className="l-14 pp-ini">RM</label>
                  </div>
                  <p className="l-18">Rendani Murokolo</p>
                  <p className="p-14-n">1998-06-12</p>
                  <p className="p-14-n">rendaniconstatia@gmail.com</p>
                  <label className="l-14">Address</label>
                  <p className="p-14-n">6570/6 clayville 45</p>
                  <p className="p-14-n"></p>
                  <p className="p-14-n">Gauteng</p>
                  <p className="p-14-n">South Africa</p>
                </div>

                <div
                  className="d-row"
                  style={{ textAlign: "center", alignContent: "center" }}
                >
                  <label className="wtype">Remote</label>
                </div>

                <a
                  href="https://talent.viconetgroup.com/cv/1667407819.pdf"
                  target="_blank"
                  id="pdf_cv"
                >
                  <div
                    className="person-frame"
                    style={{ background: "#7878DA", display: "flex" }}
                  >
                    <div>
                      <img src="img/pdf2.svg" />
                    </div>
                    <div className="">
                      <label
                        className="l-18-n text-white"
                        for="pdf_cv"
                        style={{ margin: "10px 10px" }}
                      >
                        Download CV
                      </label>
                    </div>
                  </div>
                  <hr />
                  <form method="post" id="myForm">
                    <input
                      type="hidden"
                      name="c_email"
                      value="rendaniconstatia@gmail.com"
                    />
                    <input type="hidden" name="cand_num" value="1" />{" "}
                    <button
                      className="bton btn2"
                      type="button"
                      id="shortlist_cand"
                      style={{ width: "100%" }}
                    >
                      Add to shortlist
                    </button>
                  </form>
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="corp-edit">
              <div className="row">
                <div className="col-lg-12">
                  <div className="d-flex">
                    <div>
                      <label className="rounddiv">
                        <img src="img/about-icon.svg" />
                      </label>
                    </div>
                    <div className="d-block">
                      <label className="l-18-n">About Rendani Murokolo</label>
                      <p className="p-14-n">This is the about</p>
                    </div>
                  </div>
                  <hr />
                </div>

                <div className="col-lg-12">
                  <div className="d-flex">
                    <div>
                      <label className="rounddiv">
                        <img src="img/roles.svg" />
                      </label>
                    </div>
                    <div className="d-block">
                      <label className="l-18-n">
                        CURRENT ROLE & RESPONSIBITY
                      </label>
                      <p className="p-14-n">Company Name : duduza united </p>
                      <p className="p-14-n">Job Title : java dev </p>
                      <p className="p-14-n">Starting Date : 2022-10-30 </p>

                      <div className="d-flex flex-row justify-content-between">
                        <span>
                          <p>Key Roles :</p>
                        </span>
                      </div>
                      <p style={{ marginTop: "-20px" }}>
                        <div className="d-flex record user_roles">
                          <div>
                            <div
                              className="bullet"
                              style={{ marginTop: "10px" }}
                            ></div>
                          </div>
                          <label>testing</label>
                        </div>
                      </p>
                    </div>
                  </div>
                  <hr />
                </div>

                <div className="col-lg-12">
                  <div className="d-flex">
                    <div>
                      <label className="rounddiv">
                        <img src="img/p-w-e-b.svg" />
                      </label>
                    </div>
                    <div className="d-block">
                      <label className="l-18-n">PREVIOUS WORK EXPERIENCE</label>
                    </div>
                  </div>
                  <hr />
                </div>

                <div className="col-lg-12">
                  <div className="d-flex">
                    <div>
                      <label className="rounddiv">
                        <img src="img/exp-blue.svg" />
                      </label>
                    </div>
                    <div className="d-block">
                      <label className="l-18-n">YEARS OF EXPERIENCE</label>
                      <p className="p-14-n"></p>
                    </div>
                  </div>
                  <hr />
                </div>

                <div className="col-lg-12">
                  <div className="d-flex">
                    <div>
                      <label className="rounddiv">
                        <img src="img/edu-blue.svg" />
                      </label>
                    </div>
                    <div className="d-block">
                      <label className="l-18-n">EDUCATION</label>
                      <div>
                        <label className="p-14">bsc IT</label>
                        <div className="d-flex">
                          <div>
                            <div className="bullet mt-1"></div>
                          </div>
                          <p className="p-14-n">
                            <strong>Institute : </strong>richfield
                          </p>
                        </div>
                        <div className="d-flex">
                          <div>
                            <div className="bullet mt-1"></div>
                          </div>
                          <p className="p-14-n">
                            <strong>Year completed : </strong>2019
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
                <div className="col-lg-12">
                  <div className="d-flex">
                    <div>
                      <label className="rounddiv">
                        <img src="img/key-course-blue.svg" />
                      </label>
                    </div>
                    <div className="d-block">
                      <label className="l-18-n">KEY COURSES</label>

                      <div className="d-flex">
                        <div>
                          <div className="bullet"></div>
                        </div>
                        <div className="lft-text">
                          <p className="move-up p-14-n">software dev</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="d-flex">
                    <div>
                      <label className="rounddiv">
                        <img src="img/skills-blue.svg" />
                      </label>
                    </div>
                    <div className="d-block">
                      <label className="l-18-n">KEY SKILLS </label>
                      <div className="s-around">
                        <div className="row">
                          <p className="move-up p-14-n skillfrm">java</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;

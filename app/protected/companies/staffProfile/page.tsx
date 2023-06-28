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
import { courses, getOptionFromValue, roles, skills } from "@/lib/data";
import { useDispatch, useSelector } from "react-redux";

function page() {
  return (
    <div className="talent-blue-header add-h">
      <div className="my-container">
        <label
          className="l-36-n text-white mb-3"
          style={{ marginTop: "-55px" }}
        >
          User profile
        </label>
        <div className="row">
          <div className="col-lg-4">
            <div className="white-container">
              <div className="profile-info">
                <div className="personal-info">
                  <label className="profile-pic" for="p_pic">
                    <label
                      className="user-initials"
                      style={{ color: "#fff" }}
                      id="user_ini"
                    >
                      <label
                        className="user-initials"
                        for="p_pic"
                        style={{ color: "#fff" }}
                        id="user_ini"
                      >
                        {" "}
                        II
                      </label>
                    </label>
                    {/* <img
                      className=""
                      id="display_image"
                      src="img/1681479612.png"
                    /> */}
                  </label>
                  <hr />
                  <div className="other-info">
                    <p className="p-18">Inyambo Imenda</p>

                    <p className="p-14-n">+27820835677</p>

                    <p className="p-14-n">inyambo@viconet.co.za</p>
                    <hr />
                    <a
                      href="corporate-profile"
                      className="bton btn2"
                      type="button"
                      id=""
                      style={{ width: "100%" }}
                    >
                      company profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="corp-edit">
              <label className="l-18">Edit Information</label>
              <form method="post" id="myForm1" enctype="multipart/form-data">
                <div id="success_mes"></div>
                <div className="row">
                  <div className="col-lg-6 form-group">
                    <label for="userName" className="input-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="userName"
                      id="userName"
                      value="Inyambo"
                      className="cust-input "
                      placeholder="Enter Full Name"
                    />
                    <div className="error-message"></div>
                  </div>
                  <input
                    type="hidden"
                    name="id"
                    value="164"
                    className="cust-input "
                  />
                  <input
                    type="hidden"
                    name="idss"
                    value="updateUser"
                    className="cust-input "
                  ></input>

                  <div className="col-lg-6 form-group">
                    <label for="userSurname" className="input-label">
                      Surname
                    </label>
                    <input
                      type="text"
                      id="userSurname"
                      name="userSurname"
                      value="Imenda"
                      className="cust-input "
                      placeholder="Enter Surname"
                    />
                    <div className="error-message"></div>
                  </div>

                  <div className="col-lg-3 form-group">
                    <label for="position" className="input-label">
                      Position
                    </label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      className="cust-input"
                      value="Director"
                      disabled
                      placeholder="Enter Position"
                    />
                    <div className="error-message"></div>
                  </div>

                  <div className="col-lg-3 form-group">
                    <label for="userCell" className="input-label">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      id="userCell"
                      name="userCellphone"
                      value="+27820835677"
                      className="cust-input "
                      placeholder="Enter Mobile Number"
                    />
                    <div className="error-message"></div>
                  </div>

                  <div className="col-lg-6 form-group">
                    <label for="userEmail" className="input-label">
                      Email Address
                    </label>
                    <input
                      type="text"
                      name="userEmail"
                      id="userEmail"
                      value="inyambo@viconet.co.za"
                      disabled
                      className="cust-input "
                      placeholder="Enter Email Address"
                    />
                    <div className="error-message"></div>
                  </div>

                  <div className="col-lg-12 form-group">
                    <button
                      className="bton btn2"
                      style={{ float: "right", width: "108px" }}
                      id="update_corpu"
                      type="button"
                    >
                      SAVE
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="corp-edit">
              <label className="l-14 resetp" id="resetp">
                Reset Password
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;

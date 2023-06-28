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
                    <p className="p-18">Nodlela Innovations</p>

                    <p className="p-14-n">Information Technology</p>

                    <p className="p-14-n">inyambo@viconet.co.za</p>
                    <p className="p-14-n">+27670126726</p>
                    <hr />
                    <div className="flex flex-row justify-between">
                      <p>Status</p>
                      <label className="p-14-n comp-status">Approved</label>
                    </div>
                    <hr />
                    <div className="flex flex-row justify-between">
                      <p>Current Package</p>
                      <label
                        className="p-14-n comp-status"
                        style={{ background: "#FF7EB4" }}
                      >
                        Sprint
                      </label>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>Renewal Date</p>
                      <label className="p-14-n">2023-02-02</label>
                    </div>
                    <hr />
                    <div className="flex flex-row justify-between">
                      <p>Projects</p>
                      <label
                        className="p-14-n comp-status"
                        style={{ background: "#FF7EB4" }}
                      >
                        13
                      </label>
                    </div>

                    <div className="flex flex-row justify-between">
                      <p>Number of Users</p>
                      <label
                        className="p-14-n comp-status"
                        style={{ background: "#FF7EB4" }}
                      >
                        2
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="corp-edit">
              <div className="flex flex-row justify-between">
                <label className="l-18">Users</label>
                <button
                  className="adduserbtn mb-3 modal-open"
                  data-modal="modal3"
                >
                  Add Staff
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;

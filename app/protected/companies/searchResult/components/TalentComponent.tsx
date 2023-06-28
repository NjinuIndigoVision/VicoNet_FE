import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  IEducationInformation,
  IJobInformation,
  IPersonnel,
} from "@/lib/interfaces/personnel";
import { Briefcase, PenToolIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function TalentComponent({ props, idx }: any) {
  const personnel = props as IPersonnel;
  const rank = idx + 1;
  const router = useRouter();

  const goToProfile = () => {
    router.push(`/protected/companies/candidate/${personnel._user}`);
  };
  return (
    <div className="col-lg-6 box hide show">
      <div className="person-frame2">
        <div className="rw1">
          <div className="d-flex justify-content-between">
            <label className="candnum">#{rank}</label>
            <button className="bton btn4 addcand">Shortlist</button>
          </div>
          <div className="toprow">
            <div className="prof-img">
              <img src="/user.svg" />
            </div>

            <div
              onClick={goToProfile}
              className="prof-det pers-det cursor-pointer"
            >
              <label className="l-14 text-black">
                {personnel.personalInformation.name}{" "}
                {personnel.personalInformation.surname}
              </label>
              <p
                className="text-sm text-gray-500"
                style={{ marginTop: "-7px" }}
              >
                {personnel.currentJob?.jobTitle}
              </p>

              <div className="flex flex-row justify-between">
                <p
                  className="text-sm text-gray-500"
                  style={{ marginTop: "-17px" }}
                >
                  {personnel.personalInformation.country}
                </p>
                <div style={{ marginTop: "-17px" }}>
                  {/* TODO: Add Work Methods */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="abtcand">
          <div className="blog-flex">
            <div>
              <label className="roundfrm">
                <img src="/skills-blue.svg" />
              </label>
            </div>

            <div className="ml-2">
              <label className="l-12">Skills</label>

              <div style={{ marginLeft: "13px", marginRight: "13px" }}>
                <div className="row">
                  {personnel.keySkills?.map((s) => (
                    <p className="skillfrm text-sm text-gray-500">{s}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <hr />

          <div className="blog-flex">
            <div>
              <label className="roundfrm">
                <img src="/roles.svg" />
              </label>
            </div>

            <div className="ml-2">
              <label className="l-12">Roles</label>

              <div style={{ marginLeft: "13px", marginRight: "13px" }}>
                <div className="row">
                  {personnel.currentJob?.responsibilities?.map((s) => (
                    <p className="text-sm">{s}, </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <hr />

          <div className="blog-flex">
            <div>
              <label className="roundfrm">
                <img src="/edu-blue.svg" />
              </label>
            </div>

            <div className="ml-2">
              <label className="l-12">Qualifications</label>

              <div style={{ marginLeft: "13px", marginRight: "13px" }}>
                <div className="row">
                  {personnel.education?.map((s) => (
                    <p className="text-sm">{s.instituteName}, </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TalentComponent;

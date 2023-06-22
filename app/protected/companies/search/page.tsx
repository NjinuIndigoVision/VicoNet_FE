"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Api } from "@/lib/api/endpoints";
import React, { useState } from "react";
import TalentComponent from "./components/TalentComponent";

function Search() {
  const fakeData = [
    {
      fullName: "Siviwe Xakaza",
      position: "Software Engineer",
      skills: ["Java", "C#"],
      roles: ["Programming", "Testing"],
      qualifications: ["NDip IT"],
      work: ["Full Time", "Remote"],
    },
    {
      fullName: "Shaka Zulu",
      position: "Software Designer",
      skills: ["Java", "Flutter"],
      roles: ["Programming", "Testing"],
      qualifications: ["BTech IT"],
      work: ["Full Time", "Remote"],
    },
    {
      fullName: "Sizwe Mpisane",
      position: "Software Engineer",
      skills: ["Java", "C#"],
      roles: ["Programming", "Testing"],
      qualifications: ["NDip IT"],
      work: ["Full Time", "Remote"],
    },
    {
      fullName: "Siviwe Xakaza",
      position: "Software Engineer",
      skills: ["Java", "C#"],
      roles: ["Programming", "Testing"],
      qualifications: ["NDip IT"],
      work: ["Full Time", "Remote"],
    },
    {
      fullName: "Andile Khumalo",
      position: "Software Engineer",
      skills: ["Java", "C#"],
      roles: ["Programming", "Testing", "Architect"],
      qualifications: ["NDip IT"],
      work: ["Full Time", "Remote", "Part Time"],
    },
    {
      fullName: "Zano Gwamanda",
      position: "Software Dev",
      skills: ["Java", "C#", "Python"],
      roles: ["Programming"],
      qualifications: ["NDip IT"],
      work: ["Full Time", "Remote"],
    },
  ];

  const [results, setResults] = useState(false);
  const search = async () => {
    setResults(true);
    try {
      const res = await Api.POST_Search({ searchKeys: "Java" });
      console.log(res.data);
    } catch (e: any) {
      console.log(e.message);
    }
  };
  return (
    <div className="w-full h-full bg-[#27276C]">
      <div className="px-10 py-32">
        <div className="flex flex-row space-x-1">
          <p className="text-3xl font-extrabold text-white">
            Search For Suitable{" "}
          </p>
          <p className="text-3xl font-bold text-[#E2186D]"> Talent</p>
        </div>

        <div className="flex flex-row space-x-2 mt-5 max-w-lg">
          <Input
            className="bg-white"
            placeholder="Job Title, Skills, Qualifications..."
          />
          <Button onClick={search} className="bg-[#E2186D]">
            Search
          </Button>
        </div>
        {results && (
          <div className="mt-20">
            <div className="grid grid-cols-2">
              <TalentComponent props={fakeData[0]} />
              <TalentComponent props={fakeData[1]} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;

"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Api } from "@/lib/api/endpoints";
import React, { useState } from "react";
import TalentComponent from "./components/TalentComponent";
import { setSearchQuery } from "../../../services/tempStore";
import { useRouter } from "next/navigation";

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
  const [query, setQuery] = useState("");
  const router = useRouter();
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
    <div className="blue-bg">
      <div className="prof-container vertical-center">
        <label className="mb-5 l-36-n text-white">
          Search For Suitable <label className="text-purple"> Talents</label>{" "}
        </label>

        <div className="talent-search">
          <div className="s_tal">
            <input
              type="text"
              name="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              id="searchInput"
              placeholder="Job Title, Qualifications, Skills, Location, Keywords..."
              className="s_input"
            />
          </div>
          <button
            onClick={() => {
              setSearchQuery(query);
              router.push("/protected/companies/searchResult");
            }}
            className="bton btn1 search-btn"
            id="talSearch"
          >
            search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;

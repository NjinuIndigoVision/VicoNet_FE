"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Api } from "@/lib/api/endpoints";
import React, { useState } from "react";
import TalentComponent from "./components/TalentComponent";
import { IPersonnel } from "@/lib/interfaces/personnel";
// import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

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

  const [results, setResults] = useState<IPersonnel[]>();

  const search = async () => {

    try {
      const res = await Api.POST_Search({ searchKeys: "" });
      setResults(res.data as IPersonnel[]??[])
    } catch (e: any) {
      console.log(e.message);
    }
  };
  
  return (
    <div className="w-full h-full ">
      <div className="">
        <div className="flex flex-row space-x-1 mt-2">
        <Input
            className="bg-white"
            placeholder="Job Title, Skills, Qualifications..."
          />
          <Button onClick={search} className="bg-[#E2186D]">
            Search
          </Button>
        </div>

        <div className="flex flex-row space-x-2 mt-5 max-w-lg">
        
        </div>
        {results && (
          <div className="mt-20">
            <div className="grid grid-cols-2"> 
            {/* <ResponsiveMasonry>
            <Masonry columnsCount={3}> */}
                {results.map(x=> {
                  return <>
                 {/* <XBlock> */}
                  <TalentComponent props={x} />
                  {/* </XBlock> */}
                  </>
                })}
              {/* </Masonry>
              </ResponsiveMasonry> */}
            </div>
          </div>
        )}  
      </div>
    </div>
  );
}

export default Search;

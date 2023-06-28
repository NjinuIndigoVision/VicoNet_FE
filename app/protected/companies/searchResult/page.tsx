"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Api } from "@/lib/api/endpoints";
import React, { useState, useEffect } from "react";
import TalentComponent from "./components/TalentComponent";
import { IPersonnel } from "@/lib/interfaces/personnel";
import { getSearchQuery } from "../../../services/tempStore";
// import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

function Search() {
  const [results, setResults] = useState<IPersonnel[]>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const q = getSearchQuery();
    if (q != "") {
      setQuery(q);
      search();
    }
  }, []);

  const search = async () => {
    try {
      const res = await Api.POST_Search({ searchKeys: query });
      console.log("RESULTS", res.data);
      setResults((res.data as IPersonnel[]) ?? []);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  return (
    // <div className="w-full h-full ">
    //   <div className="">
    //     <div className="flex flex-row space-x-1 mt-2">
    //       <Input
    //         className="bg-white"
    //         placeholder="Job Title, Skills, Qualifications..."
    //         value={query}
    //         onChange={(e) => setQuery(e.target.value)}
    //       />
    //       <Button onClick={search} className="bg-[#E2186D]">
    //         Search
    //       </Button>
    //     </div>

    //     <div className="flex flex-row space-x-2 mt-5 max-w-lg"></div>
    //     {results && (
    //       <div className="mt-20">
    //         <div className="grid grid-cols-2">
    //           {/* <ResponsiveMasonry>
    //         <Masonry columnsCount={3}> */}
    //           {results.map((x) => {
    //             return (
    //               <>
    //                 <TalentComponent props={x} />
    //               </>
    //             );
    //           })}
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>

    <div className="talent-blue-header add-h">
      <div className="prof-container ">
        <div className="talent-search">
          <div className="s_tal">
            <input
              type="text"
              name="search_field"
              id="inputBox"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Job Title, Qualifications, Skills, Location, Keywords..."
              className="s_input"
            />
          </div>
          <button
            type="button"
            onClick={search}
            className="bton btn1 search-btn"
            id="tal_search"
          >
            search
          </button>
        </div>

        <div id="search_return" className="mt-7">
          <div className="flex flex-row justify-between">
            <label></label>
            <label className="p-18">
              <label id="numRows">Search Results ({results.length})</label>
            </label>
          </div>

          <div className="row candidatess">
            {results.map((person, i) => (
              <TalentComponent key={i} props={person} idx={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;

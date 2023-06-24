"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Api } from "@/lib/api/endpoints";
import { IPersonnel } from "@/lib/interfaces/personnel";
import { IProjectView } from "@/lib/interfaces/project";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogContentFull,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogHeaderFull,
	AlertDialogTitle,
	AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";

import { Label } from "@radix-ui/react-label";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";

function page() {
	
const [pending, setPending] = useState<IPersonnel[]>();
const [accepted, setAccepted] = useState<IPersonnel[]>();
const [declined, setDeclined] = useState<IPersonnel[]>();

const [searchPersonnel, setSearchResults] = useState<IPersonnel[]>();
const [activeTab, setActiveTab] = useState<number>(0);

	
const getCompanies =async (projectId:string)=>{

	const response = await Api.GET_ProjectById(projectId);
	if(response.error){
		alert("err")
	}else{
		setPending(response.data?._pending);
		setAccepted(response.data?._accepted);
		setDeclined(response.data?._declined);
	}

	useEffect(() => {
		getCompanies("");
	  }, []);
	  
}

const search =async (key:string)=>{

	const response = await Api.POST_Search({searchKey:key});

	if(response.error){
		alert("err")
	}else{
		setSearchResults(response.data)
	}

	useEffect(() => {
		getCompanies("");
	  }, []);
	  
}

  return (

	
	<div className="talent-blue-header">
		<div className="prof-container">
			<div className="row">
				<div className="col-lg-3">
					<div className="white-container">
						<div className="profile-info">
						<div className="d-flex flex-row justify-content-between">
							<label className="l-14">Projects</label><label className="p-14-n comp-status" id="numProj" style={{background: "#FF8EBD"}}>12</label>

						</div>
							
						
							
						<hr/> 
						<a href="packages"><button className="bton btn1" style={{width:"100%"}}>New project</button></a>
					
						<button className="mt-2 modal-open bton btn2" data-modal= "addCandidates" style={{width:"100%"}}>Company projects</button>
						
						</div>
					</div>
				</div>
				<div className="col-lg-9">				
					<div className="corp-edit">	
						<div className="row">
							<div className="col-lg-4 projtabs">
									<a href="project?id=vico-inv32">
									<div className="white-container" style={{background: "#EEEEFA"}}>
										<div className="record">
											<div className="delproj" id="1vico-inv32"><img src="img/bin2.svg"/>
											</div>
											<div className="" style={{textAlign:"center"}}>
												<img src="img/corp img/project.svg" className="prof-pic prof-pic2"/>
											</div>
											
										
										<div className="text-black" style={{textAlign:"center"}}>
											<label className="p-18">1. What does TM mean? TM stands for trademark. The TM symbol (often seen in superscript like this: TM) is usually used in connection with an unregistered mark—a term, slogan, logo, or other indicator—to provide notice to potential infringers that common l</label>
											<div className="projdesc">
												<p className="p-14"></p>
											</div>
										</div>
										<hr/>
										<div className="d-flex flex-row justify-content-between">
											<label className="l-14">Talents</label><label className="p-14-n comp-status" id="numProj" style={{background: "#FF8EBD"}}>2</label>
										</div>
									</div>
								</div>
								</a>
							</div>
							<div className="col-lg-4 projtabs">
									<a href="project?id=vico-inv3">
									<div className="white-container" style={{background: "#EEEEFA"}}>
										<div className="record">
											<div className="delproj" id="1vico-inv3"><img src="img/bin2.svg"/>
											</div>
											<div className="" style={{textAlign:"center"}}>
												<img src="img/corp img/project.svg" className="prof-pic prof-pic2"/>
											</div>
											
										
										<div className="text-black" style={{textAlign:"center"}}>
											<label className="p-18">Promotional Video</label>
											<div className="projdesc">
												<p className="p-14">Promotional Video project for Viconet.</p>
											</div>
										</div>
										<hr/>
										<div className="d-flex flex-row justify-content-between">
											<label className="l-14">Talents</label><label className="p-14-n comp-status" id="numProj" style={{background: "#FF8EBD"}}>0</label>
										</div>
									</div>
								</div>
								</a>
							</div>
				
						</div>
					
					</div>
			
				</div>
			</div>
		</div>
	</div>

)
}

export default page;
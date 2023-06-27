"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Api } from "@/lib/api/endpoints";
import { IPersonnel } from "@/lib/interfaces/personnel";
import { ICreateProject, IProject, IProjectView } from "@/lib/interfaces/project";
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
import { IOrganisation, IOrganisationViewModel } from "@/lib/interfaces/company";
import Cookies from "universal-cookie";
import { IUserResponseModel } from "@/lib/interfaces/user";
import Link from "next/link";

function page() {
	
const [organisation, setOrganisation] = useState<IOrganisationViewModel>();


const [projectName, setProjectName] = useState<string>("");
const [projectDescription, setProjectDescription] = useState<string>("");

const cookies = new Cookies();
const isLoggedIn = cookies.get('viconet-user') ;
const loggedInObject = isLoggedIn as IUserResponseModel;
const staffDetails = cookies.get('viconet-staff') ;

const getOrg =async (organisation:string)=>{
	const response = await Api.GET_OrganisationById(organisation);
	setOrganisation(response)

}


useEffect(() => {
	
	getOrg(staffDetails.staff._organisation);

  }, []);
  

  const addProject = async()=>{
	const payload = {
		name:projectName,
		description:projectDescription,
		_organisation:staffDetails.staff._organisation,
		_creatingUser:staffDetails.staff._id

	} as ICreateProject;

	const response = (await Api.POST_Project(payload)).data as IProject;
	 console.log("ppppppp", response);
	const currentProjects = organisation?.projects??[];
	const newOrg = {
		...organisation,
		projects:[...currentProjects, payload]
	}as IOrganisationViewModel
	setOrganisation(newOrg); 

  }
  console.log("RENDER",organisation)

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
						<AlertDialog>
							<AlertDialogTrigger  style={{width:"100%"}}>
							<button className="bton btn1" style={{width:"100%"}}>New project</button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogTitle>
								Add new project
								</AlertDialogTitle>
								<hr/>
								<AlertDialogDescription>
								<div className="row" style={{width:"100%"}}>
									<div className="col-md-12">
									<Input
										className="bg-white"
										placeholder="Title"
										onChange={(e)=>{setProjectName(e.target.value)}}
									/>
									
									</div>
								
								</div>
								<div className="row"  style={{width:"100%"}}>
							
								<div className="col-md-12 mt-5" >
									<textarea rows={5} 
										onChange={(e)=>{setProjectDescription(e.target.value)}}
										 className="bg-white" placeholder="Project description"/>
									</div>

								</div>
								
								</AlertDialogDescription>
						
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction onClick={()=>{addProject()}}>Save</AlertDialogAction>
							</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
						

						
					
						<button className="mt-2 modal-open bton btn2" data-modal= "addCandidates" style={{width:"100%"}}>Company projects</button>
						
						</div>
					</div>
				</div>
				<div className="col-lg-9">				
					<div className="corp-edit">	
						<div className="row">
							{
								!(organisation?.projects!=undefined && organisation?.projects?.length>0)?
								<>
								<div className="col-lg-12 projtabs">
								<div className="white-container" style={{background: "#EEEEFA", textAlign:"center"}}> No Projects, Create a new one</div>
								<div style={{textAlign:"center"}}>
									<AlertDialog>
										<AlertDialogTrigger  style={{width:"100%"}}>
										<button className="bton btn1" style={{width:"50%"}}>New project</button>
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogTitle>
											Add new project
											</AlertDialogTitle>
											<hr/>
											<AlertDialogDescription>
											<div className="row" style={{width:"100%"}}>
												<div className="col-md-12">
												<Input
													className="bg-white"
													placeholder="Title"
													onChange={(e)=>{setProjectName(e.target.value)}}
												/>
												
												</div>
											
											</div>
											<div className="row"  style={{width:"100%"}}>
										
											<div className="col-md-12 mt-5" >
												<textarea rows={5} 
													onChange={(e)=>{setProjectDescription(e.target.value)}}
													className="bg-white" placeholder="Project description"/>
												</div>

											</div>
											
											</AlertDialogDescription>
									
										<AlertDialogFooter>
											<AlertDialogCancel>Cancel</AlertDialogCancel>
											<AlertDialogAction onClick={()=>{addProject()}}>Save</AlertDialogAction>
										</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								</div>
								</div>
								
								</>
								:
								organisation?.projects.map(x=>{
									
									return (<>
											<div className="col-lg-4 projtabs">
									<Link href={`/protected/companies/project?id=${x._id}`}>
									<div className="white-container" style={{background: "#EEEEFA"}}>
										<div className="record">
											<div className="delproj" id="1vico-inv3"><img src="img/bin2.svg"/>
											</div>
											<div className="" style={{textAlign:"center"}}>
												<img src="img/corp img/project.svg" className="prof-pic prof-pic2"/>
											</div>
											
												<div className="text-black" style={{textAlign:"center"}}>
													<label className="p-18">{x.name}</label>
													<div className="projdesc">
														<p className="p-14">{x.description}</p>
													</div>
												</div>
												<hr/>
												<div className="d-flex flex-row justify-content-between">
													<label className="l-14">Talents</label><label className="p-14-n comp-status" id="numProj" style={{background: "#FF8EBD"}}>0</label>
												</div>
											</div>
										</div>
										</Link>
									</div>
									</>)
								})
							}
						
						
				
						</div>
					
					</div>
			
				</div>
			</div>
		</div>
	</div>

)
}

export default page;
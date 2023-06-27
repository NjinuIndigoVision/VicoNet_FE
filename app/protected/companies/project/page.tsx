"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Api } from "@/lib/api/endpoints";
import { IPersonnel } from "@/lib/interfaces/personnel";
import { IProject, IProjectView, IUpdateProjectPersonnel } from "@/lib/interfaces/project";
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
import { IOption, courses, degrees, getOptionFromValue, provinces, roles, skills } from "@/lib/data";
import { IStaffViewModel } from "@/lib/interfaces/staff";
import Cookies from "universal-cookie";
import { IUserResponseModel } from "@/lib/interfaces/user";
import { rejects } from "assert";
import { useSearchParams } from "next/navigation";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import Link from "next/link";
function page() {

const [searchResult, setSearchResults] = useState<IPersonnel[]>();
const [pending, setPending] = useState<IPersonnel[]>();
const [accepted, setAccepted] = useState<IPersonnel[]>();
const [declined, setDeclined] = useState<IPersonnel[]>();
const [searchKeys, setSearchKeys] = useState<string[]>([]);

const [project, setProject] = useState<IProjectView>();
const [activeTab, setActiveTab] = useState<number>(0);
const [staffUser, setStaffUser] = useState<IStaffViewModel>();
const searchParams = useSearchParams()
const cookies = new Cookies();
const getProject =async (projectId:string)=>{

	const response = await Api.GET_ProjectById(projectId);
	console.log("PRODD", response)
	scaffold(response);
}


const scaffold=(response:IProjectView)=>{

	setPending(response?._pending?.filter(x=>x!=null));
	setAccepted(response?._accepted?.filter(x=>x!=null));
	setDeclined(response?._declined?.filter(x=>x!=null));
	setProject(response);

}

const getStaffUser =async (userId:string):Promise<IStaffViewModel>=>{

    const response = await Api.GET_StaffUserById(userId);
   return response;
  
}
  

useEffect(() => {

	const projectId = searchParams.get("id");
	getProject(projectId??"");

	const staffUser = cookies.get('viconet-user') as IUserResponseModel;
	getStaffUser(staffUser._id??"").then(x=>{
	setStaffUser(x);
	})

  }, []);
  
const search =async ()=>{
	const response = await Api.POST_Search(searchKeys.join(","));
	console.log("Res", response);
	setSearchResults(response.data);
}

const shortlist =async (personnelId:string)=>{
	const response = await Api.GET_ShortlistPersonnel( staffUser?.staff._id??"",personnelId);
	setStaffUser(response as IStaffViewModel)
	
}

const removeFromShortList =async (personnelId:string)=>{
	const response = await Api.GET_UnShortlistPersonnel(staffUser?.staff._id??"", personnelId);
	setStaffUser(response as IStaffViewModel)
}

function handleSelectSearch(data:any) {
    const _data = data as IOption[];
    setSearchKeys(_data.map(x=>x.value));
}


const addToProject = async (personnelId:string)=>{

	const request = {
			projectId:project?._id,
			personnelId:personnelId,
			status:"0",
			staffId:staffUser?.staff._id	
		} as IUpdateProjectPersonnel
		console.log("Res", request);
	//send array. instead of looping: NK 
	
	const projectView = await Api.POST_UpdateProjectPersonnel(request) ;
	console.log("pro", projectView);
	const _proj = projectView.data as IProjectView;	
	scaffold(_proj);
	//remove from shortlist
	
	const newShortlisted = staffUser?.shortlisted?.filter(x=>x._id.toString() != personnelId);
	const newStaff={...staffUser, shortlisted:newShortlisted} as IStaffViewModel;

	setStaffUser(newStaff);
}

const allSearchValues = [
	...skills,
	...courses,
	...provinces,
	...roles,
	...degrees
]

  return (

	project == undefined? 
		<>Loading..</>:
		<>
			<div className="talent-blue-header">
		<div className="prof-container">
			<div className="row">
				<div className="col-lg-3">
					<div className="white-container">
						<div className="profile-info">
						
								<div className="upgradediv">
								<label className="p-14 text-black">To view full talent profile, click here to upgrade your package.</label>
								<a href="packages"><button className="bton btn1" style={{width:"100%"}}>UPGRADE</button></a>
							</div>
							
						<div className="d-flex flex-row justify-content-between">
							<label className="l-14">Talents</label><label className="p-14-n comp-status" id="numCand" style={{background: "#FF8EBD"}}>0
							</label>
						</div>
						<hr/> 
						<AlertDialog>
							<AlertDialogTrigger style={{width:"100%"}}>
							<button className="modal-open bton btn2" data-modal= "addCandidates" style={{width:"100%"}}>Add Talent</button>
							</AlertDialogTrigger>
							<AlertDialogContentFull>
								<AlertDialogTitle>
								Search
								</AlertDialogTitle>
								<hr/>
								<AlertDialogDescription>
								<div className="row" style={{width:"100%"}}>
									<div className="col-md-8">
									{/* <Input
										className="bg-white"
										placeholder="Job Title, Skills, Qualifications..."
									/> */}

									<CreatableSelect 
										className="bg-white"
										options={allSearchValues}
										placeholder="Job Title, Skills, Qualifications..."
										// value={getOptionFromValue(_skills, skills)}
										onChange={handleSelectSearch}
										isSearchable={true}
										isMulti
									/>
									
									</div>
									<div className="col-md-2">
									<Button onClick={()=>{search()}} className="bg-[#E2186D]">
										Search
									</Button>
									</div>
								</div>
								<div className="row"  style={{width:"100%"}}>

								<div id="<?php echo 'form'.$x;?>" style={{width:"100%"}}>
									<input type="hidden" name="id" value="Invite"/>
									<input type="hidden" name="receiptId" value="<?php echo $row['receipt_id'] ?>"/>
								
									<div className="row mt-3">
									{ searchResult?.length==0?
									<>
									<div className="col-lg-12 box hide show">
												No search results..
									</div>
									</>:
									searchResult?.map(x=>{ return(
										<>
										<div className="col-lg-6 box hide show">
													
													<div className="person-frame2">
														<div className="rw1">
															<div className="d-flex justify-content-between">
																<label className="candnum">#1</label>
																	
																	{staffUser?.staff._shortlist.includes(x._id)?
																	
																		<button className="bton btn4 addcand" onClick={()=>{removeFromShortList(x._id)}} title="Click to shortlist" id="1300">
																		UN-shortlist
																	</button>
																	:
																	<button className="bton btn4 addcand" onClick={()=>{shortlist(x._id)}} title="Click to shortlist" id="1300">
																		Shortlist
																	</button>
																	}
																
																		
																
															</div>
															{/* <h1>Selected {selectedPersonnel.join(",")}</h1> */}
															<Link href="">
																{/* <button onClick={()=>{
																console.log("curr",selectedPersonnel)

															selectedPersonnel.includes(x._id)? 
															setSelectedPersonnel(selectedPersonnel.filter(sel=>sel!=x._id)): 
															setSelectedPersonnel([...selectedPersonnel, x._id])
															}}>Select</button> */}
															<div className="toprow">							
																<div className="prof-img">
																	<img src="img/user.svg"/>
																</div>	
																<div className="prof-det pers-det">
																	<label className="l-1)4 text-black">{x.personalInformation?.name} {x.personalInformation?.surname}</label>
																	<p className="p-2" style={{marginTop: "-7px"}}></p>
																	<div className="d-flex flex-row justify-content-between">
																		<p className="p-2" style={{marginTop: "-15px"}}>{getOptionFromValue([x.personalInformation?.province??""],provinces)[0].label }</p>
																		<div style={{marginTop: "-17px"}}>
																			{x.preferedWorkMethod==0 && <label className="wtype">Full time</label>}
																			{x.preferedWorkMethod==1 && <label className="wtype">Part time</label>}
																			{x.preferedWorkMethod==2 && <label className="wtype">Remote</label>}
																			</div>
																		</div>
																	</div>
																</div>
																</Link>
																
															</div>
															<Link href="">
															<div className="abtcand">
																<div className="blog-flex">
																	<div>
																		<label className="roundfrm"><img src="img/skills-blue.svg"/></label>
																	</div>
																	<div className="ml-2"><label className="l-12">Skills</label>
																		<div style={{marginLeft:"13px",marginRight:" 13px"}}>
																			<div className="row">
																				{getOptionFromValue(x.keySkills??[], skills).map(y=>
																				 <><p style={{width:"100%"}}>- {y.label}</p></>
																				)}
																			
																		</div>
																		</div>
																	</div>	
																</div>
																<hr/>
																<div className="blog-flex">
																	<div>
																		<label className="roundfrm"><img src="img/roles.svg"/></label>
																	</div>
																	<div className="ml-2"><label className="l-12">Roles</label>
																		<div className="blog-flex roleslim">		
																		{getOptionFromValue(x.currentJob?.responsibilities??[], roles).map(y=>
																										
																			<p className="">	
																			{y.label}						 		
																			</p>
																		)}
																										 	
																		</div>
																	</div>	
																</div>
																<hr/>
																<div className="blog-flex">
																	<div>
																		<label className="roundfrm"><img src="img/edu-blue.svg"/></label>
																	</div>
																	<div className="ml-2"><label className="l-12">Qualifications</label>
																		<div className="blog-flex mb-3">
																				<p >bsc information and knowledge systems  ,university of pretoria  </p>
																		</div>
																	</div>	
																</div>
															</div>
															</Link>
														</div>																							
												</div>
										</>
									)})}
									

																		
									</div>
									<hr/>
								</div>

								</div>
								
								</AlertDialogDescription>
						
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction>Save</AlertDialogAction>
							</AlertDialogFooter>
							</AlertDialogContentFull>
						</AlertDialog>
						
						</div>
					</div>
				</div>
				<div className="col-lg-9">
					<div id="<?php echo $ids ?>" className="corp-edit project-tab">				
						<div className="d-flex justify-content-between">
							<label className="l-18">Project Details</label>
							<a href="#" className="modal-open" data-modal = "modal7"><img src="img/edit-text.svg" className="edit-tab"/></a>
					</div>
					<hr/>
					<label className="l-14">Name</label>
					<p className="p-14-n">{project?.name}</p>
					<label className="l-14">Project Description</label>
					<p className="p-14-n">{project?.description}</p>
					
					<div className="ptabsbg">
						<button onClick={()=>{setActiveTab(0)}} className= {activeTab==0?"bton btn4 tab-btn active":"bton btn4 tab-btn "} id="defaultOpen">Shortlisted  <label className="comp-status mt-1" onClick={()=>{setActiveTab(0)}}  style={{background: "#FF8EBD"}}  id="del0">{staffUser?.shortlisted.length}</label>	</button>
						<button onClick={()=>{setActiveTab(1)}} className={activeTab==1?"bton btn4 tab-btn active" :"bton btn4 tab-btn "} >Pending   <label className="comp-status mt-1" style={{background: "#FF8EBD"}}  onClick={()=>{setActiveTab(1)}} id="del1">{pending?.length??"0"}</label>	</button> 
						<button onClick={()=>{setActiveTab(2)}} className={activeTab==2?"bton btn4 tab-btn active" :"bton btn4 tab-btn "} >Accepted   <label className="comp-status mt-1" style={{background: "#FF8EBD"}} onClick={()=>{setActiveTab(2)}} id="del2">{accepted?.length??"0"}</label>	</button>
						<button onClick={()=>{setActiveTab(3)}} className={activeTab==3?"bton btn4 tab-btn active" :"bton btn4 tab-btn "} >Declined <label className="comp-status mt-1" style={{background: "#FF8EBD"}} onClick={()=>{setActiveTab(3)}} id="del3">{declined?.length??"0"}</label>	</button>
					</div>
						<div id="<?php echo $value ?>" className="tab-content" style={{display: activeTab==0 ?"block":""}}>
							<div className="row">
									<div className="d-flex justify-content-between pdiv" style={{width:"100%", margin: "2%", background:"#DFDFDF", marginTop: "10px"}}>
										
										<div className="work-type" style={{marginTop:"5px"}}>
											<label className="wpl text-black" >
												<input type="checkbox" value="part" name="[]" className="wpc" id="<?php echo $selectId ?>" onClick={()=>{}}/>
												<div className="wpc-box">						
												</div>Select all 
				
											</label>
										</div>
									</div>
								</div>
								
								<form id="<?php echo 'form'.$x;?>" method="post">
									<input type="hidden" name="id" value="Invite"/>
									<input type="hidden" name="receiptId" value="<?php echo $row['receipt_id'] ?>"/>
								
									<div className="row mt-3">
									
									{
										staffUser?.shortlisted.map(x=><>
												<div className="col-lg-6 shortCand">						
											<div className="person-frame boarder-blue">
												<div className="d-flex justify-content-between">
													
													<div className="rem-cand1" id="<?php echo $row['id'].'-'.$delNum ?>">
														<img src="img/rounddel.svg"/>
													</div>							
												</div>
												<div className="d-flex flex-row justify-content-between">
													<div className="d-flex">
														<div className="prof-img">
															<img src="img/user.svg" alt="pp" id="cand_pp"/>									
														</div>	
														<div className="prof-det pers-det">
															<p className="p-2" > {x.personalInformation.name} {x.personalInformation.surname} 
															{x.preferedWorkMethod==0 && <label className="wtype">Full time</label>}
															{x.preferedWorkMethod==1 && <label className="wtype">Part time</label>}
															{x.preferedWorkMethod==2 && <label className="wtype">Remote</label>}
															</p>
															
														
															<p className="l-14 text-black p-2" style={{marginTop: "-15px"}}>{getOptionFromValue([x.personalInformation?.province??""],provinces)[0].label } </p>	
															<p className="l-14 text-black p-2" style={{marginTop: "-5px"}}>	{getOptionFromValue(x.keySkills??[], skills).map(y=>
																				 `${y.label} | `
																				)}
																			 </p>
															<div style={{marginTop:"-15px", marginLeft:"-7px"}}>
															
															</div>
														</div>
													</div>					
												</div>
												<button type="button" id="<?php echo 'form'.$x; ?>" onClick={()=>{addToProject(x._id.toString())}} className="bton btn1 mr-0 d-block ml-auto invite">Invite</button>
							
											</div>
										</div>
										</>)
									}
								
									</div>
									<hr/>
									<button type="button" id="<?php echo 'form'.$x; ?>" onClick={()=>{}} className="bton btn1 mr-0 d-block ml-auto invite">Invite</button>
								</form>
						</div> 
						<div id="<?php echo $value ?>" className="tab-content" style={{display: activeTab==1 ?"block":""}}>
							<div className="row">
									<div className="d-flex justify-content-between pdiv" style={{width:"100%", margin: "2%", background:"#DFDFDF", marginTop: "10px"}}>
										
										<div className="work-type" style={{marginTop:"5px;"}}>
											<label className="wpl text-black" >
												<input type="checkbox" value="part" name="[]" className="wpc" id="<?php echo $selectId ?>" onClick={()=>{}}/>
												<div className="wpc-box">						
												</div>Select all
											</label>
										</div>
									</div>
								</div>
								
								<form id="<?php echo 'form'.$x;?>" method="post">
									<input type="hidden" name="id" value="Invite"/>
									<input type="hidden" name="receiptId" value="<?php echo $row['receipt_id'] ?>"/>
								
									<div className="row mt-3">
										{pending?.map((x)=>{
											return (
												<div className="col-lg-6 shortCand">						
													<div className="person-frame boarder-blue">
														<div className="d-flex justify-content-between">
															
															<div className="rem-cand1" id="<?php echo $row['id'].'-'.$delNum ?>">
																<img src="img/rounddel.svg"/>
															</div>							
														</div>
														<div className="d-flex flex-row justify-content-between">
															<div className="d-flex">
																<div className="prof-img">
																	<img src="img/user.svg" alt="pp" id="cand_pp"/>									
																</div>	
																<div className="prof-det pers-det">
																	<label className="l-14 text-black">{x.personalInformation.name} {x.personalInformation.surname}</label>
																	<p className="p-2" style={{marginTop: "-5px"}}>{x.personalInformation.name} </p>
																	<p className="p-2" style={{marginTop: "-15px"}}>{x.personalInformation.country} </p>
																	<div style={{marginTop:"-15px", marginLeft:"-7px"}}>
																		<label className="wtype">Remote</label>
																	</div>
																</div>
															</div>					
														</div>
													</div>
												</div>
											)
										})}
									
									</div>
									<hr/>
									<button type="button" id="<?php echo 'form'.$x; ?>" onClick={()=>{}} className="bton btn1 mr-0 d-block ml-auto invite">Invite</button>
								</form>
						</div> 
						<div id="<?php echo $value ?>" className="tab-content" style={{display: activeTab==2 ?"block":""}}>
							<div className="row">
									<div className="d-flex justify-content-between pdiv" style={{width:"100%", margin: "2%", background:"#DFDFDF", marginTop: "10px"}}>
										
										<div className="work-type" style={{marginTop:"5px;"}}>
											<label className="wpl text-black" >
												<input type="checkbox" value="part" name="[]" className="wpc" id="<?php echo $selectId ?>" onClick={()=>{}}/>
												<div className="wpc-box">						
												</div>Select all
											</label>
										</div>
									</div>
								</div>
								
								<form id="<?php echo 'form'.$x;?>" method="post">
									<input type="hidden" name="id" value="Invite"/>
									<input type="hidden" name="receiptId" value="<?php echo $row['receipt_id'] ?>"/>
								
									<div className="row mt-3">
										{accepted?.map((x)=>{
											return (
												<div className="col-lg-6 shortCand">						
													<div className="person-frame boarder-blue">
														<div className="d-flex justify-content-between">
															
															<div className="rem-cand1" id="<?php echo $row['id'].'-'.$delNum ?>">
																<img src="img/rounddel.svg"/>
															</div>							
														</div>
														<div className="d-flex flex-row justify-content-between">
															<div className="d-flex">
																<div className="prof-img">
																	<img src="img/user.svg" alt="pp" id="cand_pp"/>									
																</div>	
																<div className="prof-det pers-det">
																	<label className="l-14 text-black">{x.personalInformation.name} {x.personalInformation.surname}</label>
																	<p className="p-2" style={{marginTop: "-5px"}}>{x.personalInformation.name} </p>
																	<p className="p-2" style={{marginTop: "-15px"}}>{x.personalInformation.country} </p>
																	<div style={{marginTop:"-15px", marginLeft:"-7px"}}>
																		<label className="wtype">Remote</label>
																	</div>
																</div>
															</div>					
														</div>
													</div>
												</div>
											)
										})}
									
									</div>
									<hr/>
									<button type="button" id="<?php echo 'form'.$x; ?>" onClick={()=>{}} className="bton btn1 mr-0 d-block ml-auto invite">Invite</button>
								</form>
						</div> 
						<div id="<?php echo $value ?>" className="tab-content" style={{display: activeTab==3 ?"block":""}}>
							<div className="row">
									<div className="d-flex justify-content-between pdiv" style={{width:"100%", margin: "2%", background:"#DFDFDF", marginTop: "10px"}}>
										
										<div className="work-type" style={{marginTop:"5px;"}}>
											<label className="wpl text-black" >
												<input type="checkbox" value="part" name="[]" className="wpc" id="<?php echo $selectId ?>" onClick={()=>{}}/>
												<div className="wpc-box">						
												</div>Select all
											</label>
										</div>
									</div>
								</div>
								
								<form id="<?php echo 'form'.$x;?>" method="post">
									<input type="hidden" name="id" value="Invite"/>
									<input type="hidden" name="receiptId" value="<?php echo $row['receipt_id'] ?>"/>
								
									<div className="row mt-3">
										{declined?.map((x)=>{
											return (
												<div className="col-lg-6 shortCand">						
													<div className="person-frame boarder-blue">
														<div className="d-flex justify-content-between">
															
															<div className="rem-cand1" id="<?php echo $row['id'].'-'.$delNum ?>">
																<img src="img/rounddel.svg"/>
															</div>							
														</div>
														<div className="d-flex flex-row justify-content-between">
															<div className="d-flex">
																<div className="prof-img">
																	<img src="img/user.svg" alt="pp" id="cand_pp"/>									
																</div>	
																<div className="prof-det pers-det">
																	<label className="l-14 text-black">{x.personalInformation.name} {x.personalInformation.surname}</label>
																	<p className="p-2" style={{marginTop: "-5px"}}>{x.personalInformation.name} </p>
																	<p className="p-2" style={{marginTop: "-15px"}}>{x.personalInformation.country} </p>
																	<div style={{marginTop:"-15px", marginLeft:"-7px"}}>
																		<label className="wtype">Remote</label>
																	</div>
																</div>
															</div>					
														</div>
													</div>
												</div>
											)
										})}
									
									</div>
									<hr/>
									<button type="button" id="<?php echo 'form'.$x; ?>" onClick={()=>{}} className="bton btn1 mr-0 d-block ml-auto invite">Invite</button>
								</form>
						</div> 
					</div>
				</div>
			</div>
		</div>
	</div>
		
		</>
	


)
}

export default page;
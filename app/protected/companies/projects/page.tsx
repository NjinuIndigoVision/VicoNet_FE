"use client";

import { Api } from "@/lib/api/endpoints";
import { IPersonnel } from "@/lib/interfaces/personnel";
import { IProjectView } from "@/lib/interfaces/project";
import { useEffect, useState } from "react";

function page() {
	
const [pending, setPending] = useState<IPersonnel[]>();
const [accepted, setAccepted] = useState<IPersonnel[]>();
const [declined, setDeclined] = useState<IPersonnel[]>();
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

  return (

	
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
						<button className="modal-open bton btn2" data-modal= "addCandidates" style={{width:"100%"}}>Add Talents</button>
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
					<label className="l-14">Project Name</label>
					<p className="p-14-n">Name</p>
					<label className="l-14">Project Description</label>
					<p className="p-14-n">Desc</p>
					
					<div className="ptabsbg">
						<button onClick={()=>{setActiveTab(0)}} className= {activeTab==0?"bton btn4 tab-btn active":"bton btn4 tab-btn "} id="defaultOpen">Shortlisted  <label className="comp-status mt-1" style={{background: "#FF8EBD"}}  id="del0">2</label>	</button>
						<button onClick={()=>{setActiveTab(1)}} className={activeTab==1?"bton btn4 tab-btn active" :"bton btn4 tab-btn "} >Pending   <label className="comp-status mt-1" style={{background: "#FF8EBD"}}  onClick={()=>{setActiveTab(0)}} id="del1">1</label>	</button> 
						<button onClick={()=>{setActiveTab(2)}} className={activeTab==2?"bton btn4 tab-btn active" :"bton btn4 tab-btn "} >Accepted   <label className="comp-status mt-1" style={{background: "#FF8EBD"}} onClick={()=>{setActiveTab(1)}} id="del2">1</label>	</button>
						<button onClick={()=>{setActiveTab(3)}} className={activeTab==3?"bton btn4 tab-btn active" :"bton btn4 tab-btn "} >Declined <label className="comp-status mt-1" style={{background: "#FF8EBD"}} onClick={()=>{setActiveTab(2)}} id="del3">2</label>	</button>
					</div>
						<div id="<?php echo $value ?>" className="tab-content" style={{display: activeTab==0 ?"block":""}}>
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
																	<p className="p-2" style={{marginTop: "-5px;"}}>{x.personalInformation.name} </p>
																	<p className="p-2" style={{marginTop: "-15px;"}}>{x.personalInformation.country} </p>
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
																	<p className="p-2" style={{marginTop: "-5px;"}}>{x.personalInformation.name} </p>
																	<p className="p-2" style={{marginTop: "-15px;"}}>{x.personalInformation.country} </p>
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
																	<p className="p-2" style={{marginTop: "-5px;"}}>{x.personalInformation.name} </p>
																	<p className="p-2" style={{marginTop: "-15px;"}}>{x.personalInformation.country} </p>
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
)
}

export default page;
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Api } from "@/lib/api/endpoints";
import { useRouter } from 'next/navigation';
import {usePathname, useSearchParams} from 'next/navigation'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogTitle,
	AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";

import { useEffect, useState } from "react";
import { IOrganisationViewModel } from "@/lib/interfaces/company";
import Cookies from "universal-cookie";
import { INotification } from "@/lib/interfaces/notification";

function page() {
const moment = require("moment");
const router = useRouter();
const [notifications, setNotifications] = useState<INotification[]>([]);
const [notificationHistory, setNotificationHistory] = useState<INotification[]>([]);
const cookies = new Cookies();
const searchParams = useSearchParams()

const [personnelId, setPersonnelId] = useState<string>("");

useEffect(() => {
	console.log(searchParams.get("personnelId"));
	const _personnelId = searchParams.get("personnelId");
	setPersonnelId(_personnelId??"");
	GetUserNotifications(_personnelId??"");
  }, []);
  


async function GetUserNotifications(personnelId:string){
    const notifications = await Api.GET_NotificationByPersonnelId(personnelId);
  
	const history = notifications.filter(x=>x.status=="1");
	const newNotifcations = notifications.filter(x=>x.status=="0");
	setNotifications(newNotifcations)
	setNotificationHistory(history);
}

async function AcceptInvite(projectId:string, notifcationId:string){
	await Api.GET_AcceptInvitation(personnelId, projectId);
	await Api.GET_CloseNotification(notifcationId);

}

async function DeclineInvite(projectId:string, notifcationId:string){
	await Api.GET_AcceptInvitation(personnelId, projectId);
	await Api.GET_CloseNotification(notifcationId);
}

  return (

	
	<div className="talent-blue-header">
		<div className="prof-container">
			<div className="row">
				<div className="col-lg-3">
					<div className="white-container">
						<div className="profile-info">
						<div className="d-flex flex-row justify-content-between">
							<label className="l-14">Notification History</label><label className="p-14-n comp-status" id="numProj" style={{background: "#FF8EBD"}}>{notificationHistory.length}</label>

						</div>
							
						<hr/> 
						
						{notificationHistory?.length>0? notificationHistory?.map(x=><>
							<div className="d-flex flex-row justify-content-between">
							<label className="l-14"> {moment(x.date).format("MMMM d, YYYY")} :  {x.message}</label>

							</div>
						</>
						):
							<div className="d-flex flex-row justify-content-between">
							<label className="l-14"> <small>No notifications to show</small></label>

							</div>
						}
					
						
						
						</div>
					</div>
				</div>
				<div className="col-lg-9">				
					<div className="corp-edit">	
						<div className="row">
							{/* {
								organisation?.projects.map(x=>{
									console.log("RENDER",x)
									return (<> */}
									{notifications?.map(x=><>
									<div className="col-lg-4 projtabs">
									<a>
									<div className="white-container" style={{background: "#EEEEFA"}}>
										<div className="record">
											<div className="delproj" id="1vico-inv3"><img src="img/bin2.svg"/>
											</div>
											<div className="" style={{textAlign:"center"}}>
												<img src="img/corp img/project.svg" className="prof-pic prof-pic2"/>
											</div>
												<label className="l-14 mt-5"> <div className="projdesc">{moment(x.date).fromNow()}</div></label>
												<div className="text-black" style={{textAlign:"center"}}>
											
													<label className="p-18"></label>
													<div className="projdesc">
														<p className="p-14">{x.message}</p>
													</div>
												</div>
												<hr/>
												<div className="d-flex flex-row justify-content-between">
												<AlertDialog>
													<AlertDialogTrigger  style={{width:"100%"}}>
													<button className="bton btn1" style={{width:"100%"}}>Accept invitation</button>
													</AlertDialogTrigger>
													<AlertDialogContent>
														<AlertDialogTitle>
															Accept Invitation
														</AlertDialogTitle>
														<hr/>
														<AlertDialogDescription>
														<div className="row" style={{width:"100%"}}>
															<div className="col-md-12">
															
															<p>By accepting the invitation you are authorizing the project owners to contact you outside of the Viconet platform</p>
															<br/>
															<p>Thank you for using the Viconet platform and all the best with your interview.</p>
															</div>
														
														</div>
													
														</AlertDialogDescription>
												
													<AlertDialogFooter>
														<AlertDialogCancel>Cancel</AlertDialogCancel>
														<AlertDialogAction onClick={()=>{AcceptInvite(x.reference, x._id??"")}}>Confirm</AlertDialogAction>
													</AlertDialogFooter>
													</AlertDialogContent>
												</AlertDialog>
						
												<AlertDialog>
													<AlertDialogTrigger  style={{width:"100%"}}>
													<button className="ml-2 modal-open bton btn2" data-modal= "addCandidates" style={{width:"100%"}}>Decline invitation</button>
													</AlertDialogTrigger>
													<AlertDialogContent>
														<AlertDialogTitle>
														Add new project
														</AlertDialogTitle>
														<hr/>
														<AlertDialogDescription>
														<div className="row" style={{width:"100%"}}>
															<div className="col-md-12">
																													
															</div>
														
														</div>
														<div className="row"  style={{width:"100%"}}>
													
														<div className="col-md-12 mt-5" >
																		
														<p>By declining the invitation, the project owner will be alerted that you do not wish to join the project.</p>
															<br/>
															<p>This action is not reversible.</p>
															</div>

														</div>
														
														</AlertDialogDescription>
												
													<AlertDialogFooter>
														<AlertDialogCancel>Cancel</AlertDialogCancel>
														<AlertDialogAction onClick={()=>{DeclineInvite(x.reference, x._id??"")}}>Confirm</AlertDialogAction>
													</AlertDialogFooter>
													</AlertDialogContent>
												</AlertDialog>
												</div>
											</div>
										</div>
										</a>
									</div>
									</>)}
								
									{/* </> */}
									{/* )
								})
							}
						 */}
						
				
						</div>
					
					</div>
			
				</div>
			</div>
		</div>
	</div>

)
}

export default page;
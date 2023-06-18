import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { IUserResponseModel } from "./interfaces/user";

export function isLoggedIn():boolean{
    const cookies = new Cookies();

const isLoggedIn = cookies.get('viconet-user') ;
return isLoggedIn?._id!=undefined;

}

export function IsActive():boolean{
    const cookies = new Cookies();

const isLoggedIn = cookies.get('viconet-user')as IUserResponseModel ;
return isLoggedIn?.status!=undefined;

}

export function LoginGuard(){
      const router = useRouter();
      if (!isLoggedIn()) {
    router.push("/auth/login");
    return (<></>)
  }

  
}

export function ActiveGuard(){
    const router = useRouter();
    if (!isLoggedIn()) {
  router.push("/auth/login");
  return (<></>)
}


}

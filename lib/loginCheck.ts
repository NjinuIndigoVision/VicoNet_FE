import Cookies from "universal-cookie";

export function isLoggedIn():boolean{
    const cookies = new Cookies();

const isLoggedIn = cookies.get('viconet-user') ;
return isLoggedIn?._id!=undefined;

}
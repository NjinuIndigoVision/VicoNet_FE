import { Diagnostic } from "../logger/logger";


const axios = require("axios").default;

const token = "";
console.log(token);
let header: any;
// if (!token) {
//   header = {

//     Authorization: `Anonymous`,
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Headers": "X-Requested-With",
//   };
// } else {
  header = {
    // Authorization: `Bearer ${token}`,
    // "Authorization":"Basic YWRtaW46cmpPdjJhU1omPXxuRDYpJQ==",
    "Access-Control-Allow-Origin": "*"
    // "Access-Control-Allow-Credentials": "true",
    // "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    // "Access-Control-Allow-Headers": "Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  // };
}

export async function GET(endPoint: string) {
  try {
    // const result = await axios.get(`${endPoint}`, {auth: {
    //   username: "admin",
    //   password: "rjOv2aSZ&=|nD6)%"
    // }} );
    const result =  fetch(endPoint, {
      method: 'get',
      headers: {
        "Authorization":"Basic YWRtaW46cmpPdjJhU1omPXxuRDYpJQ==",
        "Access-Control-Allow-Origin": "*"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // body: JSON.stringify(opts)
    }).then(function(response) {
      return response.json();
    })

    return result;
  } catch (error:any) {
    console.log(
      `[API ERROR  : Method: GET; Endpoint: ${endPoint}]`,
      error.toJSON()
    );
    return error.response;
  }
}

export async function POST(endPoint: string, payload: Object) {
  try {
  
    const result = await axios.post(`${endPoint}`, payload, {
      headers: header,
    });
    Diagnostic("SUCCESS ON POST, returning", result);
    return result.data;
  } catch (error:any) {
    console.log(`[API ERROR : Method: POST; Endpoint: ${endPoint}]`, error);
    Diagnostic("ERROR ON POST, returning", error);
    return error.response;
  }
}

export function DELETE(endPoint: string, params: Object) {
  axios
    .delete(`${endPoint}`, { headers: header, params: params })
    .then((result: any) => {
      return result;
    })
    .catch((error: any) => {
      return error;
    });
}

export function PUT(endPoint: string, params: Object) {
  let HEADER = {
    "Authorization":"Basic YWRtaW46cmpPdjJhU1omPXxuRDYpJQ==",
    "Access-Control-Allow-Origin": "*",
  };
  axios
    .put(`${endPoint}`, { headers: HEADER, params: params })
    .then((result: any) => {
      return result;
    })
    .catch((error: any) => {
      return error;
    });
}

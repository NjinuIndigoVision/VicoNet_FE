import axios from "axios";

export default axios.create({
  baseURL: "https://viconet-vercel-git-main-viconet.vercel.app/api/",
  headers: {
    "Content-type": "application/json",
  },
});

import axios from "axios";

export default axios.get("https://countriesnow.space/api/v0.1/countries/iso").then((res)=>
    res.data.data).catch((err)=>{
        console.log("State : "+err);
        return [];
    });
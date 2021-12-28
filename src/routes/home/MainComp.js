import {CasesCard , GetCountry} from "./Casecard";
import {Childcountry , Allcountrydiv , SelectCountry} from "./Countrycard";
import axios from "axios";
import React from "react";

let MainComp =()=>{
    let [country, getcountry] = React.useState(null);
    let [cases , setcases] = React.useState(null);
    let [name , getname] = React.useState(null);
    React.useEffect(()=>{
      if(country === null ) return ;
      axios.get("https://corona.lmao.ninja/v2/countries/"+country+"?yesterday=true&strict=true&query").then((resp)=>{
            setcases(resp.data);
            getname({ country_name : resp.data.country});
        }).catch((err)=>{
            console.log(err);
            setcases(null);
      });
    },[country]);
    return (
      <div>
           <GetCountry /> 
            <br />
            <SelectCountry country={(e)=>getcountry(e)} /> 
            <br />
            {(cases === null || name===null) ? (null) : <CasesCard country={name} casedetails={cases} />}
      </div>
    );
  }

export default MainComp;
import axios from "axios";
import React from "react";

let CasesCard = ({country,casedetails})=>{
    return (
      <div className='container mx-auto w-11/12 grid grid-cols-3'>
              <div>
                  <div className='flex justify-center'>
                    <img src={casedetails.countryInfo.flag}/>
                  </div>
                  <div className='flex justify-center'>
                    <div>{country.country_name}</div>  
                  </div>
              </div>
              <div>
                  <div>
                      <p className='flex justify-center'>Today's Cases :</p>
                      <p className='flex justify-center text-red-500 text-4xl'>{casedetails.todayCases}</p>
                  </div>
                  <div>
                      <p className='flex justify-center'>Today Recovered :</p>
                      <p className='flex justify-center text-green-500 text-4xl'>{casedetails.todayRecovered}</p>
                  </div>
                  <div  >
                      <p className='flex justify-center'>Today Deaths : </p>
                      <p className = 'flex justify-center text-red-500 text-4xl'>{casedetails.todayDeaths}</p>
                  </div>
              </div>
              <div>
                <div>
                  <p className='flex justify-center'>Total Cases :</p>
                   <div className='flex justify-center text-red-500 text-4xl'>
                    {casedetails.cases}
                  </div>
                </div>
                <div >
                  <p className='flex justify-center '>Total Recovered :</p>
                 <div className='flex justify-center text-green-500 text-4xl'> {casedetails.recovered}</div>
                </div>
                <div >
                <p className='flex justify-center'>Total Deaths :</p>
                 <div className='flex justify-center text-red-500 text-4xl'>{casedetails.deaths}</div> 
                </div>
 
              </div>
            </div>
    );
}

let GetCountry = ()=>{
  let [country,getcountry] = React.useState(null);
  let [casedetails , getcases] = React.useState(null);
  React.useEffect(()=>{
        axios.get("https://ipapi.co/json/").then((res)=>{
          if(res.data.country_code_iso3 != undefined){
            axios.get("https://corona.lmao.ninja/v2/countries/"+res.data.country_code_iso3+"?yesterday=true&strict=true&query").then((resp)=>{
                getcountry(res.data);  
                getcases(resp.data);
              }).catch(()=>{
                getcases(null);
              });
          }
        }).catch(()=>{
          getcountry(null);
          getcases(null);
          console.log("IPAPI fetch error (Maybe CORS error Same Origin Policy failure)");
        });
  },[]);
  return (country && casedetails) ? (<CasesCard country={country} casedetails={casedetails} />) : (null);
}

export {CasesCard , GetCountry};
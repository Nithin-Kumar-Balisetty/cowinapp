import "./index.css";
import React from "react";
import axios from "axios";
import countrydetails from "./Countryinfo"

function Header(){
  return (<div className='header-navbar'>
              <div>
                <img src="./images/logoimg.jpg" />
              </div>
              <div className='left-sidebar'>
                <p>Home</p>
                <p>Verify Certificate</p>
                <p>Worldwide Case Analysis</p>
              </div>
              <div className='right-sidebar'>
                <p>Login</p>
                <p>Signin</p>
              </div>
          </div>);
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
        });
  },[]);
  return (country && casedetails) ? (
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
                      <p className='flex justify-center text-4xl'>{casedetails.todayCases}</p>
                  </div>
                  <div>
                      <p className='flex justify-center'>Today Recovered :</p>
                      <p className='flex justify-center text-4xl'>{casedetails.todayRecovered}</p>
                  </div>
                  <div  >
                      <p className='flex justify-center'>Today Deaths : </p>
                      <p className = 'flex justify-center text-4xl'>{casedetails.todayDeaths}</p>
                  </div>
              </div>
              <div>
                <div>
                  <p className='flex justify-center'>Total Cases :</p>
                   <div className='flex justify-center text-4xl'>
                    {casedetails.cases}
                  </div>
                </div>
                <div >
                  <p className='flex justify-center '>Total Recovered :</p>
                 <div className='flex justify-center text-4xl'> {casedetails.recovered}</div>
                </div>
                <div >
                <p className='flex justify-center'>Total Deaths :</p>
                 <div className='flex justify-center text-4xl'>{casedetails.deaths}</div> 
                </div>
 
              </div>
            </div>) : (null);
}

let Searchbycountry = ()=>{
  let [selectedcountry, setcountry] = React.useState(null);
  let [details, getdetails] = React.useState(null);
  React.useEffect(()=>{
    if(selectedcountry === null) {
      axios.get("https://corona.lmao.ninja/v2/countries?yesterday&sort").then((res)=>{
        console.log(res.data);
      }).catch(()=>{
        console.log("Country List : Error");
      });
    }
    else{
      
    }
  },[selectedcountry]);
  return (selectedcountry) ? (
        <div>
            
        </div>
  ) : (null);
}

let Childcountry =(props)=>{
  
  if(props.classname === undefined) {
    return (
      <div className="w-full" onMouseEnter={(e)=>props.mousehovered({index : props.index,country_iso3 : props.iso3})}
        onClick={(e)=>props.clickedindex({index : props.index})}>
        {props.name}
      </div>
    );
  }
 return (
   <div className = {props.classname+" w-full"} onMouseEnter={(e)=>props.mousehovered({index : props.index,country_iso3 : props.iso3})}
   onClick={(e)=>props.clickedindex({index : props.index})}>
     {props.name}
   </div>
 );
}
 
var Allcountrydiv = (props)=>{
    if(props.array === []) return (null);
    function mousehovered(e){
        props.changeindex(e);
    }
    return (props.array).map((item,i)=>{
      if(i === props.selectedindex) {
        return (
          <Childcountry key={i} name={item.name} index={i} iso3={item.Iso3} classname="bg-sky-500" mousehovered={mousehovered} clickedindex={(e)=>props.clickedindex(e.index)}/>
        );
      }
      else{
        return (
          <Childcountry key={i} name={item.name} index={i} iso3={item.Iso3} mousehovered={mousehovered} clickedindex={(e)=>props.clickedindex(e.index)}/>
        );
      }
  });  
}

let countryinfo ;
countrydetails.then(data => {
  countryinfo = data;
});

let SelectCountry = ()=>{
    let [country , getcountry] = React.useState("");
    let [classname , setclassname]= React.useState("hidden");
    let [array, setfilterarray] = React.useState([]);
    let [Element , setelement] = React.useState((null));
    let [arrowindex, setarrowindex] = React.useState(0);
    let [arraylen , setarraylength] = React.useState((countryinfo === undefined) ? -1 : countryinfo.length);
    
    React.useEffect(()=>{
      console.log(arrowindex);
      setelement(<Allcountrydiv array = {array} selectedindex={arrowindex} changeindex={(e)=>setarrowindex(e.index)}
       clickedindex={(e)=>console.log(e)} />);
      console.log('effect');
      console.log(array);
    },[arrowindex]); 

    function onInput(e){
      if (e.keyCode === 38) {
        if(!(arrowindex ===0 || arrowindex === -1)){
          setarrowindex(arrowindex-1);
        }
        
      }
      else if (e.keyCode  === 40) {
          if(arrowindex+1 < arraylen && arraylen !== -1){
            setarrowindex(arrowindex+1);
          }
      }
      else if((e.keyCode>=65 && e.keyCode<=90) || e.keyCode === 8){
        console.log(e);
        console.log(e.key);
        getcountry(e.target.value);
        if(!(countryinfo === undefined) ){
            let filterarray = ((countryinfo === undefined) ? [] : countryinfo).filter((item)=> item.name.toLowerCase().includes(e.target.value.toLowerCase()));
            setarraylength(filterarray.length);
            setfilterarray(filterarray);
            setarrowindex(0);
            setelement(<Allcountrydiv array = {filterarray} selectedindex={arrowindex} changeindex={(e)=>setarrowindex(e.index)}  clickedindex={(e)=>console.log(e)}/>);
  
        } 
      }
    }
    
    function onFocus(){
      setclassname('absolute z-40');
      if(country === '' && !(countryinfo === undefined) ){
          setarraylength(countryinfo.length);
          setfilterarray(countryinfo);
          setelement(<Allcountrydiv array = {countryinfo} selectedindex={arrowindex} changeindex={(e)=>setarrowindex(e.index)}  clickedindex={(e)=>console.log(e)}/>);

      }
      
    }
    
    return (
      <div>
          <div className = "grid grid-cols-2 z-0 relative">
            <div className="flex justify-end">Search by : &nbsp;</div>
            <div tabIndex="0" onFocus={onFocus} onBlur= {()=>setclassname("hidden")}>
              <div>
                <input type="text" onKeyUp={onInput} />
              </div>
              <div className = {classname+" h-40 w-80 overflow-auto"}>
                {Element}
              </div>
            </div>
          </div>
          <div className='mx-auto w-11/12'>
          </div>
      </div>
      
      );
}

let MainComp =()=>{
  return (
    <div>
          { <GetCountry /> } 
          <br />
          <SelectCountry /> 
          
    </div>
  );
}

function App() {
  console.log('App started');
  return (
      <div>
          <Header />
          <br />
          <MainComp />
      </div>
    );
}

export default App;

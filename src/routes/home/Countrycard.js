import countrydetails from "./Countryinfo";
import React from "react";

let Childcountry =(props)=>{
  
    if(props.classname === undefined) {
      return (
        <div className="w-full" onMouseEnter={(e)=>props.mousehovered({index : props.index,country_iso3 : props.iso3})}
          onClick={(e)=>props.clickedindex({index : props.index,country_iso3 : props.iso3})}>
          {props.name}
        </div>
      );
    }
   return (
     <div className = {props.classname+" w-full"} onMouseEnter={(e)=>props.mousehovered({index : props.index,country_iso3 : props.iso3})}
     onClick={(e)=>props.clickedindex({index : props.index,country_iso3 : props.iso3})}>
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
            <Childcountry key={i} name={item.name} index={i} iso3={item.Iso3} classname="bg-sky-500" mousehovered={mousehovered} 
            clickedindex={(e)=>props.clickedindex(e)}/>
          );
        }
        else{
          return (
            <Childcountry key={i} name={item.name} index={i} iso3={item.Iso3} mousehovered={mousehovered} 
            clickedindex={(e)=>props.clickedindex(e)}/>
          );
        }
    });  
  }
  
  let countryinfo ;
  countrydetails.then(data => {
    countryinfo = data;
  });
  
  let SelectCountry = (props)=>{
      let [country , getcountry] = React.useState("");
      let [classname , setclassname]= React.useState("hidden");
      let [array, setfilterarray] = React.useState([]);
      let [Element , setelement] = React.useState((null));
      let [arrowindex, setarrowindex] = React.useState(0);
      let [arraylen , setarraylength] = React.useState((countryinfo === undefined) ? -1 : countryinfo.length);
      
      function clickedindex(event){
        props.country(event.country_iso3);
        setclassname("hidden");
        getcountry("");
      } 
  
      React.useEffect(()=>{
        //console.log(arrowindex);
        setelement(<Allcountrydiv array = {array} selectedindex={arrowindex} changeindex={(e)=>setarrowindex(e.index)}
        clickedindex={clickedindex} />);
        //console.log('effect');
        //console.log(array);
      },[arrowindex]); 
  
      function onKeyUp(e){
        setclassname('absolute z-40');
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
          //console.log(e);
          //console.log(e.key);
          //getcountry(e.target.value);
          if(!(countryinfo === undefined) ){
              let filterarray = ((countryinfo === undefined) ? [] : countryinfo).filter((item)=> item.name.toLowerCase().includes(e.target.value.toLowerCase()));
              setarraylength(filterarray.length);
              setfilterarray(filterarray);
              setarrowindex(0);
              setelement(<Allcountrydiv array = {filterarray} selectedindex={arrowindex} changeindex={(e)=>setarrowindex(e.index)}  
              clickedindex={clickedindex}/>);
    
          } 
        }
        else if(e.keyCode === 13){
            if(arraylen != 0){
              props.country(array[arrowindex].Iso3);
              setclassname("hidden");
              getcountry("");
            }
        }
      }
      
      function onFocus(){
        setclassname('absolute z-40');
        if(country === '' && !(countryinfo === undefined) ){
            setarraylength(countryinfo.length);
            setfilterarray(countryinfo);
            setelement(<Allcountrydiv array = {countryinfo} selectedindex={arrowindex} changeindex={(e)=>setarrowindex(e.index)}  
            clickedindex={clickedindex}/>);
          }
      }
      console.log(window);
      return (
        <div>
            <div className = "grid grid-cols-2 z-0 relative">
              <div className="flex justify-end">Search by : &nbsp;</div>
              <div tabIndex="0" onFocus={onFocus} onBlur= {()=>setclassname("hidden")}>
                <div>
                  <input className={'border border-[#243c5a]'} type="text" value={country} onKeyUp={onKeyUp} onChange={(e)=>getcountry(e.target.value)}/>
                </div>
                <div className = {classname+" h-40 w-80 overflow-auto bg-white"}>
                  {Element}
                </div>
              </div>
            </div>
            <div className='mx-auto w-11/12'>
            </div>
        </div>
        
        );
}
export {Childcountry , Allcountrydiv , SelectCountry};

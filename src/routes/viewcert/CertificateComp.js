import {useState , useEffect} from "react";
import axios from "axios";

function OTPcomp(){
    let [number, setnumber] = useState(null);
    let [element , setelement] = useState(null);
    const [ minutes, setMinutes ] = useState(0);
    const [seconds, setSeconds ] =  useState(10);
    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    console.log("Zero");
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            //console.log(seconds+"In Effect");
            clearInterval(myInterval);
          };
    });
    return (
        <div>
            <input type="tel" name='phone' id='phno' pattern="[0-9]{10}" className="bg-sky-500"/>
            <button >Gen OTP</button>
            {element}
            {seconds}
        </div>
    );
}
let config={
    headers : {
        'Content-Type' : 'application/json'
    }
}
let CertificateComp=()=>{
    let [number, setnumber]= useState(null);
    let [firstreq, setfirstreq] = useState(null);
    let [otp, setotp] = useState(null);
    let [element , setelement] = useState(false);
    let[otpmsg , otpmsgsent] = useState(false);
    let [flash , setflash] = useState(null);
    function onClick(){
        if(!element){
            let value=document.querySelector('input[type=text]').value
            setnumber(value);
            document.querySelector('input[type=text]').value ="";
        }
    }
    useEffect(()=>{
        if(number){
            axios.post("https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP",{
                mobile : number
            }).then((res)=>{
                if(res.status === 200 && number.length===10){
                    console.log(res);
                    setelement(true);
                }
                else{
                    console.log("Invalid");
                    setflash("Number invalid");
                }
            }).catch((err)=>{
                console.log(err);
            });
        }
    },[number]);
    if(!element){
        return (
            <div>
                <h1>{(setflash) ? flash : (null)}</h1>
                <input type='text' name="number"/>
                <button onClick={onClick}>Go</button>
            </div>
        );
    }
    else{
        return (
            <div>
                <input type="text" />
                <button>Submit</button>
            </div>
        );
    }
    
}

export default CertificateComp;
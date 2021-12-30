import "./index.css";
import React from "react";
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import MainComp from "./routes/home/MainComp";
import Header from "./routes/home/Header";
import CertificateComp from "./routes/viewcert/CertificateComp";

function HomeRoute(){
  return (
    <div>
        <Header />
        <br />
        <MainComp />
    </div>
  );
}

let Certficateroute= ()=>{
  //console.log(document);
  return (
    <div>
        <Header />
        <br />
        <CertificateComp />
    </div>
  );
}

function App() {
  console.log('App started');
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route path="/viewcertificate" element={ < Certficateroute />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;

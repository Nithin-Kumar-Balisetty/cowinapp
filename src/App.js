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

function HomeRoute(){
  return (
    <div>
        <Header />
        <br />
        <MainComp />
    </div>
  );
}
function App() {
  console.log('App started');
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route path="/viewcertificate" element={(<div>Hello</div>)} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;

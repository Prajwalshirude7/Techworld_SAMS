import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { Toaster } from "react-hot-toast";

import "./index.css";


ReactDOM.createRoot(
  document.getElementById("root")
)
.render(

<React.StrictMode>

<App />

<Toaster
position="top-right"
toastOptions={{
duration:3000,

style:{
background:"#102235",
color:"#fff",
border:"1px solid #14b8a6"
}

}}
/>

</React.StrictMode>

);
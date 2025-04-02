// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import EventOrganizer from './EventOrganizer';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import uploadEvents from './uploadEvents';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App/>
//     </BrowserRouter>
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App_dummy from "./App_dummy.js";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("root");


if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found. Make sure <div id='root'></div> exists in public/index.html.");
}



// If you want to start measuring performance in your app

reportWebVitals();
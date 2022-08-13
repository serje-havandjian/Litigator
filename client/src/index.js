import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "react-big-calendar/lib/css/react-big-calendar.css"
import actionCable from "actioncable"

const CableApp = {}
CableApp.cable = actionCable.createConsumer("ws://localhost:3000/cable")

ReactDOM.render(
  <BrowserRouter>
    <App cable={CableApp.cable} />
  </BrowserRouter>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

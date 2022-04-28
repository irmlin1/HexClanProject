import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthContext from "./Contexts/AuthContext";

import './Styles/index.css';
import './Styles/colors.css';
import './Styles/global.css';

import Login from "./Pages/Login";
import Register from './Pages/Register'
import App from './Pages/App';
import Dashboard from './Pages/Dashboard';
import Theory from './Pages/Theory';
import Tasks from './Pages/Tasks';
import Rules from './Pages/Rules';
import About from './Pages/About';

const routes = {
	'/': { Page: Dashboard, name: "Dashboard" },
	'/theory': { Page: Theory, name: "Theory" },
	'/tasks': { Page: Tasks, name: "Tasks" },
	'/rules': { Page: Rules, name: "Rules" },
	'/about': { Page: About, name: "About" }
}

ReactDOM.render(
    <React.StrictMode>
        <AuthContext>
            <Router>
                <Routes>
										{
											Object.entries(routes).map(m =>
												<Route path={m[0]} element={<App Page={m[1].Page}/>} />
											)
										}
										<Route path="/login" element={<Login/>} />
										<Route path="/register" element={<Register/>} />
                </Routes>
            </Router>
        </AuthContext>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export { routes }
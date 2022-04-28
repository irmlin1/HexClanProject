import React, { Profiler } from 'react';
import ReactDOM from 'react-dom';
import App from './Pages/App';
import Register from './Pages/Register'
import About from './Pages/About'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import AuthContext from "./Contexts/AuthContext";
import UserList from "./Pages/UserList"
import NavigationBar from './Components/NavigationBar';
import PlaceHolder from './Pages/PlaceHolder';
import BrowseTasks from './Pages/BrowseTasks';
import BrowseCampaigns from './Pages/BrowseCampaigns';
import SolveCampaign from './Pages/SolveCampaign';

import './Styles/index.css';
import './Styles/colors.css';
import './Styles/global.css';
import Campaigns from "./Pages/Campaigns";
import Profile from './Pages/Profile';

ReactDOM.render(
    <React.StrictMode>
        <AuthContext>
            <Router>
                <Routes>
                    <Route path="n" element={<NavigationBar />}>
                        <Route path="about" element={<About />} />
                        <Route path="theory" element={<PlaceHolder />} />
                        <Route path="rules" element={<PlaceHolder />} />
                        <Route path="campaigns" element={<Campaigns />} />
                        <Route path="browsecampaigns" element={<BrowseCampaigns />} />
                        <Route path="solvecampaign" element={<SolveCampaign />} />
                    </Route>
                    <Route path="/tasks" element={<BrowseTasks />} />
                    <Route path="/" element={<App />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
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

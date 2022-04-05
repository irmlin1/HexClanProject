import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import App from './Pages/App';
import Register from './Pages/Register'
import About from './Pages/About'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import AuthContext from "./Contexts/AuthContext";

ReactDOM.render(
    <React.StrictMode>
        <AuthContext>
            <Router>
                <Routes>
                    <Route path="/" element={<App/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/about" element={<About/>} />
                    <Route path="/login" element={<Login/>} />
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
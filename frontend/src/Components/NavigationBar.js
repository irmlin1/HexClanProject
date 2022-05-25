import React, {useContext, useEffect, useState} from 'react'
import {CircularProgress, Link} from "@mui/material";
import '../Styles/NavigationBar.css';
import styled from 'styled-components';
import {Outlet, useNavigate} from 'react-router-dom';
import {AuthContext} from "../Contexts/AuthContext";

const NavigationBar = () => {

    const { userDetails, setUserDetails, isAuthenticated } = useContext(AuthContext)
    const [welcomeString, setWelcomeString] = useState("")
    const [rolesString, setRolesString] = useState("")

    useEffect(() => {
        if(userDetails !== null) {
            setWelcomeString("Welcome, " + userDetails.userName + "!")
            let text = "Roles: "
            if(!Array.isArray(userDetails.roles)) {
                text += userDetails.roles
                setRolesString(text)
            }
            else {
                for(let i = 0; i < userDetails.roles.length; i++)
                    text += userDetails.roles[i] + ", "
                setRolesString(text.substr(0, text.length - 2))
            }
        }
    }, [userDetails])


    const navigate = useNavigate();
    const redirect = () => {
        navigate("/login");
    };

    const logout = (event) => {
        localStorage.removeItem('JWT_ACCESS_TOKEN_HEX_CLAN')
        setUserDetails(null)
        redirect()
    }

    return !isAuthenticated ? <CircularProgress/> : (
        <NavBarDiv>
            <div className="nav-content">
                <div className="icon-box">
                    <Link href="/">
                        <img alt="" src="/img/HexClanProject_icon.png" />
                    </Link>
                </div>
                <div className="nav-button">
                    <Link href="/n/theory">
                        Theory
                    </Link>
                </div>
                <div className="nav-button">
                    <Link href="/n/campaigns">
                        Campaigns
                    </Link>
                </div>
                <div className="nav-button">
                    <Link href="/tasks">
                        Tasks
                    </Link>
                </div>
                <div className="nav-button">
                    <Link href="/n/rules">
                        Rules
                    </Link>
                </div>
                <div className="nav-button">
                    <Link href="/n/about">
                        About
                    </Link>
                </div>
                <div className="nav-button">
                    <Link href="/n/profile">
                        Profile
                    </Link>
                </div>
                <div className="nav-button">
                    <Link href="/n/users">
                        Users
                    </Link>
                </div>
                <div className="nav-button">
                    <Link href="/n/tutorial">
                        Tutorial
                    </Link>
                </div>
                <div style={{marginLeft:"auto", display:"flex"}}>
                    <div>
                        <div>
                            {welcomeString}
                        </div>
                        <div>
                            {rolesString}
                        </div>
                    </div>
                    <button onClick={e => logout(e)} className="logout-button">
                        Logout
                    </button>
                </div>
            </div>
            <Outlet />
        </NavBarDiv>
    )
}

export default NavigationBar;

const NavBarDiv = styled.div`
    z-index: 999;
    height: 80px;
    left: 0;
    right: 0;
    background-color: var(--red);
    position: fixed;
    background-color: var(--white-1);
    .nav-content {
        width: var(--nav-width);
        margin-left: auto;
        margin-right: auto;
        height: 100%;
        display: flex;
        align-items: center;
        padding-top: 5px;
        padding-bottom: 5px;
        .icon-box {
            height: 100%;
            margin-right: 20px;
            img {
                height: 100%;
            }
        }
        .nav-button {
            display: flex;
            align-items: center;
            height: 50%;
            padding: 0 20px;
            // :nth-last-child(2) {
            //     margin-left: auto;
            // }
            a {
                text-decoration: none;
                color: var(--black-1);
            }
        }
        .logout-button {
            border:none;
            background-color:white;
            cursor:pointer;
            padding: 0 20px;
            font-size:16px
        }
    }
`;

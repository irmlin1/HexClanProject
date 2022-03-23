import React from 'react'
import { Link } from "@mui/material";
import '../Styles/NavigationBar.css';
import styled from 'styled-components';

const NavigationBar = () => {
    return (
        <NavBarDiv>
            <div className="nav-content">
                <div className="icon-box">
                    <Link href="/">
                        <img alt="" src="/img/HexClanProject_icon.png" />
                    </Link>
                </div>
                <div className="nav-button">
                    <Link href="/theory">
                        Theory
                    </Link>
                </div>
                <div className="nav-button">
                    <Link href="/tasks">
                        Tasks
                    </Link>
                </div>
                <div className="nav-button">
                    <Link href="/rules">
                        Rules
                    </Link>
                </div>
                <div className="nav-button">
                    <Link href="/about">
                        About
                    </Link>
                </div>
                <div className="nav-button">
                    <Link href="/register">
                        Register
                    </Link>
                </div>
                <div className="nav-button">
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            </div>
        </NavBarDiv>
    )
}

export default NavigationBar;

const NavBarDiv = styled.div`
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
            :nth-last-child(2) {
                margin-left: auto;
            }
            a {
                text-decoration: none;
                color: var(--black-1);
            }
        }
    }
`;

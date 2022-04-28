import React, { useContext } from 'react'
import { Link } from "@mui/material";
import '../Styles/NavigationBar.css';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
<<<<<<< Updated upstream
import { routes } from '../index';

const NavigationBar = (props) => {
		const { AuthContext } = props;
		const headerRef = React.useRef(null);
		const location = useLocation();
		const { isAuthenticated } = useContext(AuthContext);

		React.useEffect(() => {
			const scrollEvent = (event) => {
				if(!headerRef?.current) return;
				if(window.scrollY < 50) {
					headerRef.current.style.opacity = `${1 - 1 / 500 * window.scrollY}`;
				};
			};

			window.addEventListener('scroll', scrollEvent);
			return () => {
				window.removeEventListener('scroll', scrollEvent);
			}
		}, [])

=======
import {AuthContext} from "../Contexts/AuthContext";
import { routes } from '../index';

const NavigationBar = () => {
		const headerRef = React.useRef(null);
		const location = useLocation();
		const { isAuthenticated } = useContext(AuthContext);

		React.useEffect(() => {
			const scrollEvent = (event) => {
				if(!headerRef?.current) return;
				if(window.scrollY < 50) {
					headerRef.current.style.opacity = `${1 - 1 / 500 * window.scrollY}`;
				};
			};

			window.addEventListener('scroll', scrollEvent);
			return () => {
				window.removeEventListener('scroll', scrollEvent);
			}
		}, [])

>>>>>>> Stashed changes
    return (
        <NavBarDiv ref={headerRef}>
            <div className="nav-content">
                <div className="icon-box">
                    <Link href="/">
                        <img alt="" src="/img/HexClanProject_icon.png" />
                    </Link>
                </div>
								{
									Object.entries(routes).map(m =>
										<div className="nav-button">
											<Link href={m[0]}>
													{m[1].name}
											</Link>
										</div>
									)
								}
                {
									!isAuthenticated ?
										<>
											<div className="nav-button not-logged-in">
													<Link href="/register">
															Register
													</Link>
											</div>
											<div className="nav-button not-logged-in">
													<Link href="/login">
															Login
													</Link>
											</div>
										</>
									: null
								}
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
            &.not-logged-in {
                margin-left: auto;
            }
            a {
                text-decoration: none;
                color: var(--black-1);
            }
        }
    }
`;

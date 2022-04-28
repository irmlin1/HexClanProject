import React, {useEffect, useState} from "react";
import {Alert, Box, Button, Container, CssBaseline, Snackbar, TextField} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {registerNewUser} from "../Services/UserService";
import {useNavigate, Link} from "react-router-dom";
import styled from "styled-components";

const theme = createTheme();

export default function Register() {

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
		const [userName, setUserName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [passwordHelperText, setPasswordHelperText] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackText, setSnackText] = useState("");
		const [snackColor, setSnackColor] = useState("");
		const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

		const handleUserNameChange = (event) => {
			setUserName(event.target.value);
		};

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handlePasswordConfirmChange = (event) => {
        setPasswordConfirm(event.target.value);
    };

    const snackOnClose = () => {
        setSnackOpen(false);
    };

    // When fields are updates, verify them:
    // passwords must match,
    // required fields cannot be empty
    useEffect(() => {

        setButtonDisabled(!password ||
            !passwordConfirm ||
            !email ||
            !firstName ||
            !lastName ||
            password !== passwordConfirm
        )

        if (password !== passwordConfirm) {
            setPasswordHelperText("Passwords do not match");
            setPasswordError(true);
        } else {
            setPasswordHelperText("");
            setPasswordError(false);
        }

    }, [password, passwordConfirm, firstName, lastName, email])

    const handleSubmit = async (event) => {
        //const values = {
        //    firstName: firstName,
        //    lastName: lastName,
        //    email: email,
        //    password: password
        //};
        //event.preventDefault();

        //// Later, implement this logic:
        //// sent register details to the server.
        //// If user exists, show error message,
        //// otherwise, send confirmation email.
        //// In the email, the user will find confirmation link
        //// or verification code. Once verified, redirect user to
        //// login page.
        //setSnackOpen(true);
        //console.log(response)
        //if(response) {
        //    if(response.data.Success) {
        //        setSnackText(response.data.Message)
        //        setSnackColor("success");

				//				navigate("/login");
        //    } else {
        //        setSnackColor("error");

        //        if(response.data.Message) {
        //            setSnackText(response.data.Message);
        //        } else if (response.data.Content) {
        //            setSnackText(response.data.Content[0].Description);
        //        }
        //    }
        //} else {
        //    setSnackColor("error");
        //    setSnackText("A server error has occurred.");
        //}
    };

    return (
        <ThemeProvider theme={theme}>
            <RegisterStyle>
							<Container component="main" maxWidth="xs">
									<CssBaseline />
									<Box
											sx={{
													marginTop: 8,
													display: "flex",
													flexDirection: "column",
													alignItems: "center",
											}}
									>
											<Snackbar
													anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
													open={snackOpen}
													autoHideDuration={4000}
													onClose={snackOnClose}
											>
													<Alert
															onClose={snackOnClose}
															severity={snackColor}
															sx={{ width: "100%" }}
													>
															{snackText}
													</Alert>
											</Snackbar>

											<Box
													component="form"
													onSubmit={handleSubmit}
													noValidate
													sx={{ mt: 0 }}
											>
													<TextField
															margin="normal"
															required
															fullWidth
															name="email"
															label="E-Mail"
															type="email"
															id="email"
															onChange={handleEmailChange}
															value={email}
													/>
													<TextField
															margin="normal"
															required
															fullWidth
															name="firstName"
															label="First Name"
															id="firstName"
															onChange={handleFirstNameChange}
															value={firstName}
													/>
													<TextField
															margin="normal"
															required
															fullWidth
															name="lastName"
															label="Last Name"
															type="lastName"
															id="lastName"
															onChange={handleLastNameChange}
															value={lastName}
													/>
													<TextField
															margin="normal"
															required
															fullWidth
															name="userName"
															label="User Name"
															id="userName"
															onChange={handleUserNameChange}
															value={userName}
													/>
													<TextField
															margin="normal"
															required
															fullWidth
															name="password"
															label="Password"
															id="password"
															onChange={handlePasswordChange}
															value={password}
													/>
													<TextField
															margin="normal"
															required
															fullWidth
															error={passwordError}
															helperText={passwordHelperText}
															name="password"
															label="Confirm Password"
															type="password"
															id="password-confirm"
															onChange={handlePasswordConfirmChange}
															value={passwordConfirm}
													/>
													<Button
															type="submit"
															fullWidth
															variant="contained"
															sx={{ mt: 3, mb: 2 }}
															disabled={buttonDisabled}
													>
															Register
													</Button>
											</Box>
											<div className="no-acc-btn">
												<Link to="/login">
													Have an account already?
												</Link>
											</div>
									</Box>
							</Container>
						</RegisterStyle>
        </ThemeProvider>
    )
}

const RegisterStyle = styled.div`
	.no-acc-btn a {
		color: var(--blue-1);
		text-decoration: none;
		:hover {
			text-decoration: underline;
		}
	}
`;
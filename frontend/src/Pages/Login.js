import React, {useContext, useEffect, useState} from "react";
import {login} from "../Services/UserService";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Alert, Box, Button, Container, CssBaseline, Link, Snackbar, TextField} from "@mui/material";

import {AuthContext} from "../Contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import jwt from "jwt-decode";

const theme = createTheme();

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackColor, setSnackColor] = useState("success");
    const [snackText, setSnackText] = useState("");

    const navigate = useNavigate();
    const { setIsAuthenticated, userDetails, setUserDetails } = useContext(AuthContext);

    const redirect = () => {
        navigate("/");
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const snackOnClose = () => {
        setSnackOpen(false);
    };

    // When fields are updates, required fields cannot be empty
    useEffect(() => {
        setButtonDisabled(!password || !email)
    }, [password, email])

    const handleSubmit = async (event) => {
        const details = {
            email: email,
            password: password
        };

        event.preventDefault();

        const response = await login(details);

        if (response) {
            if(response.data.IsAuthenticated) {
                // save access token and role to local storage
                localStorage.setItem('JWT_ACCESS_TOKEN_HEX_CLAN', response.data.Token)
                setIsAuthenticated(true);      

                const user = jwt(response.data.Token);
                setUserDetails({
                    email: user.email,
                    userName: user.sub,
                    roles: user.roles
                })

                //redirect to homepage
                redirect()
            } else {
                setSnackOpen(true);
                setSnackColor("error")
                setSnackText(response.data.Message);
            }
        } else {
            setSnackOpen(true);
            setSnackColor("error");
            setSnackText("A server error has occurred (are you offline?)");
        }
    };

    return (
        <ThemeProvider theme={theme}>
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
                            name="password"
                            type={"password"}
                            label="Password"
                            id="password"
                            onChange={handlePasswordChange}
                            value={password}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={buttonDisabled}
                        >
                            Login
                        </Button>
                        <div style={{textAlign:"center"}}>
                            {"Create an account "}
                            <Link href="/register">
                                here
                            </Link>
                        </div>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}
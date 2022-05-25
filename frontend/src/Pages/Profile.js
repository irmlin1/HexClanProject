import React, {useContext, useEffect, useState} from "react";
import DefaultUserPic from "../Images/default.jpg";
import {AuthContext} from "../Contexts/AuthContext";
import {getUser} from "../Services/UserService";
import ProfileStyle from "../Styles/ProfileStyle/ProfileStyle";
import styled from "styled-components";
import Footer from "../Components/Footer";
import {CircularProgress} from "@mui/material";


export default function Profile()
{  
    const { userDetails, isAuthenticated } = useContext(AuthContext);
    const [getUserName, setUserName] = useState("");
    const [getEmail, setEmail] = useState("");
    const [getFullName, setFullanme] = useState("");
    var ProfilePic = DefaultUserPic;
    
    const fetchContent = async () => {

        if(userDetails !== null) {
            const response = await getUser(userDetails.email);
            const content = response.data;
            setUserName(content.UserName);
            setEmail(content.Email)
            setFullanme(content.firstName+" "+content.lastName);
        }
    }

    useEffect(() => {
        fetchContent();
    }, [userDetails])

    const ProfileDiv = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Tapestry&display=swap');
    font-family: 'Tapestry', cursive;
    background: #110ab9; /* fallback for old browsers */
    background: linear-gradient(
      to right,
      #111536,
      #161a3f
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    background-image: url("https://wallpaperboat.com/wp-content/uploads/2020/04/minimalist-aesthetic-wallpaper-12.jpg");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover`


    return !isAuthenticated ? <CircularProgress/> : (
        <div>         
        <ProfileDiv>
          <ProfileStyle
            fullName={getFullName}
            userName={getUserName}
            email={getEmail}
          >
        <img
          alt="alt"
          src={ProfilePic}
          style={{
            height: "250px",
            width: "250px",
            border: "5px solid rgba( 0, 0, 0, 1 )",
            borderRadius: "30%",
            objectFit: "cover",
            objectPosition: "100% 40%",
          }}
        /></ProfileStyle> 
        </ProfileDiv>
        <Footer/>
        </div>
      );


}
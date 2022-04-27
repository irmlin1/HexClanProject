import React, {useContext, useEffect, useState} from "react";
import DefaultUserPic from "../Images/default.jpg";
import {AuthContext} from "../Contexts/AuthContext";
const axios = require('axios');



export default function Profile()
{  
    const { userDetails } = useContext(AuthContext);
    console.log(userDetails.userName, userDetails.email);
    var ProfilePic = DefaultUserPic;
    const userName = userDetails.userName;
    const email = userDetails.email;
     
}
import {Box, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import React, {useEffect, useState} from "react";
import NavigationBar from "../Components/NavigationBar";
import {getUsers} from '../Services/UserService';
import styled from 'styled-components';


export default function UserList() {

    const [allUsers, setUsers] = useState([]);

    const fetchUsers = async () => {
        const response = await getUsers();
        if(response.status === 200) {
            setUsers(response.data.Content)
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return(
        <div>
        <NavigationBar/>

        <List sx={{width: '30%', maxWidth: 360, bgcolor: 'background.paper', margin: 'auto'}}>

        {allUsers.map((user, i) =>
            <ListItem key={i} disablePadding>
                <ListItemButton>
                    <ListItemText primary={user.UserName} />
                </ListItemButton>
            </ListItem>
        )} 
            
        </List> 

        </div>
    )
}
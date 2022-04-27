import {Box, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import React, {useEffect, useState} from "react";
import NavigationBar from "../Components/NavigationBar";
import {getUsers} from '../Services/UserService';


export default function UserList() {

    const [allUsers, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then(res => setUsers(res.data));
    }, [])

    return(
        <div>
        <NavigationBar/>

        <Box sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}>
            <List>

            {this.state.Content.map((user) =>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText primary={user.UserName} />
                    </ListItemButton>
                </ListItem>
            )} 
             
            </List> 
        </Box>
        </div>
    )
}
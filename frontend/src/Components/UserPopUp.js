import { useEffect, useState } from 'react';
import {
    Box,
    Dialog, DialogActions,
    DialogContent,
} from "@mui/material";
import {getUserRoles} from "../Services/UserService";

export default function UserPopUpDialog(props) {
    const {dialogOpen, handleClose, user} = props;
    const [roles, setRoles] = useState([]);

    const fetchUserRoles = async () => {
        const response = await getUserRoles(user.Email);
        if(response.data.Success === true) {
            setRoles(response.data.Content.map(role => role.RoleName))
        }
    }

    useEffect(() => {
        if(user !== null) {
            fetchUserRoles();
        }
    }, [user])

    return( 
        <>
        <Dialog 
            fullWidth
            maxWidth="sm"
            open={dialogOpen}
            onClose={handleClose}>
                <DialogContent>
                    <Box>
                        <h1>Username: {user.UserName}</h1> 
                        <h1>Email: {user.Email}</h1> 
                        <h1>Username: {user.UserName}</h1>
                        <h1>First Name: {user.firstName}</h1> 
                        <h1>Last Name: {user.lastName}</h1> 
                        <h1>Roles:{roles.toString}</h1>
                    </Box>
                </DialogContent>
        </Dialog>
        </>
    )
}
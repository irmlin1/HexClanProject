import { useEffect, useState } from 'react';
import {
    Box,
    Dialog,
    DialogContent,
} from "@mui/material";
import {getUserRoles} from "../Services/UserService";

export default function UserPopUpDialog(props) {
    const {dialogOpen, handleClose, user} = props;
    const [roles, setRoles] = useState([]);
    const [roleString, setRoleString] = useState("");

    const fetchUserRoles = async () => {
        const response = await getUserRoles(user.Email);
        if(response.data.Success === true) {
            const newRoles = response.data.Content.map(role => role.RoleName)
            setRoles(newRoles)
            setRoleString(newRoles.toString());
        }
    }

    useEffect(() => {
        if(user !== null) {
            fetchUserRoles();
        }
    }, [user])

    return( 
        <>
            {
                user !== null &&
                <Dialog
                    fullWidth
                    maxWidth="sm"
                    open={dialogOpen}
                    onClose={handleClose}>
                    <DialogContent>
                        <Box>
                            <h1>Username:    {user.UserName}</h1>
                            <h1>First Name:  {user.firstName}</h1>
                            <h1>Last Name:   {user.lastName}</h1>
                            <h1>Email:       {user.Email}</h1>
                            <h1>Roles:       {roleString}</h1>
                        </Box>
                    </DialogContent>
                </Dialog>
            }
        </>
    )
}
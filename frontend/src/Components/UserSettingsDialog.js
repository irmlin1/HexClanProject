import React, {useContext, useEffect, useState} from "react";
import {
    Alert,
    Button,
    Checkbox, Chip, Dialog, DialogActions,
    DialogContent,
    FormControl, IconButton,
    InputLabel, ListItemText,
    MenuItem,
    OutlinedInput, Paper,
    Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField
} from "@mui/material";
import Divider from "@mui/material/Divider";
import {Roles} from "../Enums/RoleEnums";
import {Topics} from "../Enums/CampaignEnums";
import {getUserRoles, getUsers, updateUserRoles} from "../Services/UserService";
import {AuthContext} from "../Contexts/AuthContext";


export default function UserSettingsDialog(props) {

    const {dialogOpen, handleClose, user} = props;
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackColor, setSnackColor] = useState("success");
    const [snackText, setSnackText] = useState("");

    const {userDetails, setUserDetails} = useContext(AuthContext)

    const fetchUserRoles = async () => {
        const response = await getUserRoles(user.Email);
        if(response.data.Success === true) {
            setSelectedRoles(response.data.Content.map(role => role.RoleName))
        }
    }

    useEffect(() => {
        if(user !== null) {
            fetchUserRoles();
        }
    }, [user])

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedRoles(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        if(!selectedRoles.length) {
            setSnackText("Select at least 1 role!")
            setSnackColor("error")
            setSnackOpen(true)
            return
        }

        const response = await updateUserRoles(user.Email, selectedRoles);
        setSnackOpen(true)
        if(response) {
            if(response.data.Success) {
                setSnackColor("success")

            }
            else {
                setSnackColor("error")
            }
            setSnackText(response.data.Message)
        }
        else {
            setSnackText("A server error has occurred.")
            setSnackColor("error")
        }
    };


    return (
        <>
            <Dialog
                fullWidth
                maxWidth="sm"
                open={dialogOpen}
                onClose={handleClose}
            >
                <DialogContent>
                    <Snackbar
                        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
                        open={snackOpen}
                        autoHideDuration={4000}
                        onClose={() => setSnackOpen(false)}
                    >
                        <Alert
                            onClose={() => setSnackOpen(false)}
                            severity={snackColor}
                            sx={{ width: "100%" }}
                        >
                            {snackText}
                        </Alert>
                    </Snackbar>

                    <Divider sx={{mb:2}}>Change User's Role</Divider>
                    <FormControl fullWidth>
                        <Select
                            multiple
                            fullWidth
                            value={selectedRoles}
                            onChange={handleChange}
                            input={<OutlinedInput/>}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {
                                Object.entries(Roles).map(([key, value]) =>
                                    <MenuItem key={value} value={value}>
                                        <Checkbox checked={selectedRoles.indexOf(value) > -1} />
                                        <ListItemText primary={value} />
                                    </MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        style={{width:"100%"}}
                    >
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
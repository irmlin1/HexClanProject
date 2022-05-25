import {
    CircularProgress,
    IconButton,
    Paper,
    Table, TableBody, TableCell, tableCellClasses,
    TableContainer,
    TableHead, TableRow
} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import {getUsers} from '../Services/UserService';
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import {AuthContext} from "../Contexts/AuthContext";
import {Roles} from "../Enums/RoleEnums";
import UserSettingsDialog from "../Components/UserSettingsDialog";
import UserPopUp from "../Components/UserPopUp";


export default function UserList() {

    const [allUsers, setUsers] = useState([]);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [UserOpen, setUserOpen] = useState(false);

    const handleOpen = (user) => {
        setSelectedUser(user)
        setSettingsOpen(true);
    }

    const handleOpen2 = (user) => {
        setSelectedUser(user)
        setUserOpen(true);
    }
    const handleClose = () => setSettingsOpen(false);
    const handleClose2 = () => setUserOpen(false);

    const { userDetails, isAuthenticated } = useContext(AuthContext);
    const isAdmin = userDetails === null ? false : userDetails.roles.includes(Roles.ADMIN);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
            width:"100%"
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const tableStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const fetchUsers = async () => {
        const response = await getUsers();
        if(response.data.Success === true) {
            setUsers(response.data.Content)
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return !isAuthenticated ? <CircularProgress/> : (
        <>
            <TableContainer  style={tableStyle}>
                <Table sx={{ width: "50%"}}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell colSpan={isAdmin? 3 : 2}>Username</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <div style={{maxHeight:500}}>
                        <TableBody>
                            {allUsers.map((user, i) =>
                                <StyledTableRow
                                    key={i}
                                >
                                    <StyledTableCell>
                                        {user.UserName}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <IconButton onClick={e => handleOpen2(user)}>
                                            <InfoIcon/>
                                        </IconButton>
                                    </StyledTableCell>
                                    {
                                        isAdmin &&
                                        <StyledTableCell>
                                            <IconButton onClick={e => handleOpen(user)}>
                                                <SettingsIcon/>
                                            </IconButton>
                                        </StyledTableCell>
                                    }
                                </StyledTableRow>
                            )}
                        </TableBody>
                    </div>
                </Table>
            </TableContainer>

            <UserSettingsDialog
                dialogOpen={settingsOpen}
                handleClose={handleClose}
                user={selectedUser}
            />
            <UserPopUp
                dialogOpen={UserOpen}
                handleClose={handleClose2}
                user={selectedUser}
            />
        </>
    )
}
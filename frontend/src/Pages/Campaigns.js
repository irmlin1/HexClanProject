import {useContext} from "react";
import {AuthContext} from "../Contexts/AuthContext";
import {CircularProgress} from "@mui/material";
import * as React from 'react';
import CreateCampaignDialog from "../Components/CreateCampaignDialog";
import NavigationBar from "../Components/NavigationBar";


export default function Campaigns()  {

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const handleOpen = () => setDialogOpen(true);
    const handleClose = () => setDialogOpen(false);


    const { isAuthenticated } = useContext(AuthContext);
    return !isAuthenticated ? (
        // wait until response comes back from the server
        // if user is authenticated, the dashboard will load
        <CircularProgress />
    ) : (
        <div>
            <NavigationBar/>
            <CreateCampaignDialog
                dialogOpen={dialogOpen}
                handleOpen={handleOpen}
                handleClose={handleClose}
            />
        </div>
    );
}
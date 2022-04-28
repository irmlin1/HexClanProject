import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { CircularProgress } from "@mui/material";
import * as React from 'react';
import CreateCampaignDialog from "../Components/CreateCampaignDialog";
import {Button} from '@mui/material';
import { useNavigate  } from "react-router-dom";

export default function Campaigns() {
    const navigate = useNavigate();
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
            <div style={{paddingTop:"6%", paddingLeft:"40%"}}>
            <CreateCampaignDialog
                dialogOpen={dialogOpen}
                handleOpen={handleOpen}
                handleClose={handleClose}
            />
            <Button onClick={() => navigate("/n/browsecampaigns")} variant="contained" style={{marginTop:"1%"}}>Browse Campaigns</Button>
            </div>
            
        </div>
    );
}
//
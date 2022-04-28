import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { getCampaigns } from '../Services/CampaignService';
import { useNavigate } from "react-router-dom";

export default function BrowseCampaigns() {
    const [campaigns, setCampaigns] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        getCampaigns().then(res => setCampaigns(res.data.Content));
    }, [])

    const handleClick = (campaign) => {
        sessionStorage.setItem("campaign", JSON.stringify(campaign));
        navigate("/n/solvecampaign");
    }

    return (
        <div>
            <List sx={style} component="nav" aria-label="mailbox folders">
                {
                    campaigns.length > 0 &&
                    campaigns.map((camp, ind) => {
                        return <>
                            <ListItem key={ind+"a"} button onClick={() => { handleClick(camp) }}>
                                <ListItemText key={ind+"b"}  primary={camp.Title} secondary={camp.Description} />
                                <p key={ind+"c"}>Topics: {camp.Topics.join(", ")} | Task count: {camp.Tasks.length} | Tags: {camp.Tags.length > 0 ? camp.Tags.join(", ") : "-"}</p>
                            </ListItem>
                            <Divider key={ind+"c"}/>
                        </>
                    })
                }
            </List>
        </div>
    );
}

const style = {
    width: '60%',
    maxWidth: "360",
    bgcolor: 'background.paper',
    marginTop: '7%',
    marginLeft: '18%'
};


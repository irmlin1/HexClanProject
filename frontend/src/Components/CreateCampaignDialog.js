import * as React from 'react';
import {
    Box,
    Button,
    Checkbox, FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    Modal,
    OutlinedInput, Select,
    TextField
} from "@mui/material";
import {useState} from "react";
import {Topics} from "../Enums/Topics";

export default function CreateCampaignDialog(props) {

    const {dialogOpen, handleOpen, handleClose} = props;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedTopics, setSelectedTopics] = useState([]);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleTopicChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedTopics(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

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

    return (
        <div>
            <Button onClick={handleOpen} variant="contained">Add Campaign</Button>
            <Modal
                open={dialogOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField
                        margin="normal"
                        required
                        name="title"
                        label="Title"
                        id="title"
                        onChange={handleTitleChange}
                        value={title}
                    />
                    <TextField
                        margin="normal"
                        required
                        name="description"
                        label="Description"
                        id="description"
                        onChange={handleDescriptionChange}
                        value={description}
                    />
                    <h3>Topics</h3>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="multiple-checkbox-label">Tag</InputLabel>
                        <Select
                            labelId="multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={selectedTopics}
                            onChange={handleTopicChange}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {
                                Object.entries(Topics).map(([key, value]) =>
                                    <MenuItem key={value} value={value}>
                                        <Checkbox checked={selectedTopics.indexOf(value) > -1} />
                                        <ListItemText primary={value} />
                                    </MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                </Box>
            </Modal>
        </div>
    );
}
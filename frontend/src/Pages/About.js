import {Alert, Box, Button, Divider, Snackbar} from "@mui/material";
import React, {useState, useEffect, useCallback} from "react";
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';
import RichTextEditor from "../Components/RichTextEditor";
import '../Styles/About.css';
import {getAboutContent, updateAboutContent} from "../Services/AboutService";
import NavigationBar from "../Components/NavigationBar";

export default function About() {

    const [content, setContent] = useState(EditorState.createEmpty());
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackText, setSnackText] = useState("");
    const [snackColor, setSnackColor] = useState("success");
    const [editingMode, setEditingMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Allow to edit text only for admins/mods, for users - readonly mode
    const isAdmin = true;

    const snackOnClose = () => {
        setSnackOpen(false);
    };

    // method for retrieving initial content from database
    const fetchContent = async () => {
        const response = await getAboutContent();
        if(response.status === 200) {   //&& response.data.success
            const content = convertFromRaw(JSON.parse(response.data.content))
            setContent(EditorState.createWithContent(content))
            setIsLoading(false);
        }
        else {
            setContent(EditorState.createEmpty);
            setIsLoading(true);
            console.error("Could not fetch about page content from the server")
        }
    }

    // on page reload, retrieve 'about' info from database
    useEffect(() => {
        fetchContent();
    }, [])

    const handleButtonClick = async (event)  => {

        // prevent page reload
        event.preventDefault();

        // send updated content to the server
        const response = await updateAboutContent(convertToRaw(content.getCurrentContent()))

        if (response) {
            if (response.status === 200) {
                setSnackText("Updated successfully!");
                setSnackColor("success");
                setSnackOpen(true);
                setEditingMode(false);
            } else {
                setSnackColor("error");
                setSnackText("Update failed")
                console.log(response)
            }
        } else {
            setSnackColor("error");
            setSnackText("A server error has occurred.");
        }
    };

    return (
        <Box>
            <NavigationBar/>
            <Snackbar
                anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
                open={snackOpen}
                autoHideDuration={4000}
                onClose={snackOnClose}
            >
                <Alert
                    onClose={snackOnClose}
                    severity={snackColor}
                    sx={{ width: "100%" }}
                >
                    {snackText}
                </Alert>
            </Snackbar>

            <div className={"header-style"}>
                <h1>About us</h1>
            </div>

            <RichTextEditor
                isLoading={isLoading}
                readOnly={!isAdmin}
                content={content}
                setContent={setContent}
                editingMode={editingMode}
                setEditingMode={setEditingMode}
                handleButtonClick={handleButtonClick}
            />
        </Box>
    )
}
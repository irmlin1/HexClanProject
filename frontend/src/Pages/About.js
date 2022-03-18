import {Box, Divider} from "@mui/material";
import React, {useState, useEffect} from "react";
import {Editor, EditorState, RichUtils} from 'draft-js';
import RichTextEditor from "../Components/RichTextEditor";
import '../Styles/About.css';

export default function About() {

    const [text, setText] = useState("Lorem ipsum");

    // Allow to edit text only for admins/mods, for users - readonly mode
    const isAdmin = true;

    return (
        <Box>
            <RichTextEditor
                readOnly={!isAdmin}
                text={text}
                setText={setText}
            />
        </Box>
    )
}
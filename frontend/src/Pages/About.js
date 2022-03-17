import {Box, Divider} from "@mui/material";
import React, {useState, useEffect} from "react";
import {Editor, EditorState, RichUtils} from 'draft-js';
import '../Styles/About.css';
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';

export default function About() {

    const isAdmin = true;
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const editor = React.useRef(null);

    function focusEditor() {
        editor.current.focus();
    }

    const handleChange = (newState) => {
        setEditorState(newState);
    }

    const onUnderlineClick = () => {
        const a = RichUtils.toggleInlineStyle(editorState, 'underline')
        console.log(a)
        handleChange(a);
    }

    const onBoldClick = () => {
        handleChange(RichUtils.toggleInlineStyle(editorState, 'bold'))
    }

    const onItalicClick = () => {
        handleChange(RichUtils.toggleInlineStyle(editorState, 'italic'))
    }

    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command)
        if (newState) {
            handleChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    return (
        <Box className={"main-box"}>
            <div
                style={{ border: "1px solid black", minHeight: "6em", cursor: "text" }}
                onClick={focusEditor}
            >
                <button onClick={onUnderlineClick}>U</button>
                <button onClick={onBoldClick}><b>B</b></button>
                <button onClick={onItalicClick}><em>I</em></button>
                <Editor
                    ref={editor}
                    editorState={editorState}
                    handleKeyCommand={command => handleKeyCommand(command)}
                    onChange={newState => handleChange(newState)}
                    placeholder="Write something!"
                />
            </div>
        </Box>
    );
}
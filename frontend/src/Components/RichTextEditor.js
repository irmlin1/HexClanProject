import React, {useEffect, useState} from "react";
import SelectionState, {Editor, EditorState, RichUtils} from "draft-js";
import {Box, Button, CircularProgress} from "@mui/material"
import "../Styles/About.css"
import EditIcon from "@mui/icons-material/Edit";


export default function RichTextEditor(props) {
    const { readOnly, content, setContent, editingMode, setEditingMode, handleButtonClick, isLoading } = props;
    const editor = React.useRef(null);

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    useEffect(() => {
        setEditorState(content);
    }, [content])

    function focusEditor() {
        const state = EditorState.moveSelectionToEnd(editorState);
        const newState = EditorState.forceSelection(state, state.getSelection());
        setEditorState(newState);
    }

    const handleChange = (newState) => {
        setEditorState(newState); //update editor's state
        setContent(newState);     //save state (for sending to database)
    }

    const onUnderlineClick = () => {
        handleChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'))
    }

    const onBoldClick = () => {
        handleChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
    }

    const onItalicClick = () => {
        handleChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'))
    }

    // handles ctrl + b/i/u for text styling
    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command)
        if (newState) {
            handleChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    const handleModeButtonClick = () => {
        setEditingMode(true);
        focusEditor();
    }

    return (
        <div>
            <div className={"toolbar"}>
                <div hidden={readOnly} className={"div-flex"}>
                    <div className={`${!editingMode ? "div-display-left" : ""}`}>
                        <Button variant={"contained"} sx={{mr:0.3}} onMouseDown={onBoldClick}><b>BOLD</b></Button>
                        <Button variant={"contained"} sx={{mr:0.3}} onMouseDown={onItalicClick}><em>ITALIC</em></Button>
                        <Button variant={"contained"} sx={{mr:0.3}} onMouseDown={onUnderlineClick}><u>UNDERLINE</u></Button>
                        <Button variant={"contained"} onClick={handleButtonClick}>SAVE</Button>
                    </div>
                    <div className={"div-display-right"}>
                        <Button disabled={editingMode} startIcon={<EditIcon/>} variant={"contained"} onClick={handleModeButtonClick}/>
                    </div>
                </div>
            </div>
            <div>
                {
                    isLoading ?
                        <CircularProgress/> :
                        <Editor
                            ref={editor}
                            editorState={editorState}
                            handleKeyCommand={command => handleKeyCommand(command)}
                            onChange={newState => handleChange(newState)}
                            readOnly={!editingMode}
                        />
                }
            </div>
        </div>
    );
}
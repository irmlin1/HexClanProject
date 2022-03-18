import React, {useEffect, useState} from "react";
import {Editor, EditorState, RichUtils} from "draft-js";
import {Box, Button} from "@mui/material"
import "../Styles/About.css"
import EditIcon from "@mui/icons-material/Edit";


export default function RichTextEditor(props) {
    const { readOnly, content, setContent, editingMode, setEditingMode, handleButtonClick } = props;
    const editor = React.useRef(null);

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    useEffect(() => {
        setEditorState(content);
    }, [content])

    function focusEditor() {
        editor.current.focus();
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
    }

    return (
        <div>
            <div className={"toolbar"}>
                <div hidden={readOnly}>
                    <div hidden={!editingMode}>
                        <Button variant={"contained"} sx={{mr:0.3}} onMouseDown={onBoldClick}><b>BOLD</b></Button>
                        <Button variant={"contained"} sx={{mr:0.3}} onMouseDown={onItalicClick}><em>ITALIC</em></Button>
                        <Button variant={"contained"} sx={{mr:0.3}} onMouseDown={onUnderlineClick}><u>UNDERLINE</u></Button>
                        <Button variant={"contained"} onClick={handleButtonClick}>SAVE</Button>
                    </div>
                    <div hidden={editingMode}>
                        <Button startIcon={<EditIcon/>} variant={"contained"} onClick={handleModeButtonClick}/>
                    </div>
                </div>
            </div>
            <div
                className={"About"}
                onClick={focusEditor}
            >
                <Editor
                    ref={editor}
                    editorState={editorState}
                    handleKeyCommand={command => handleKeyCommand(command)}
                    onChange={newState => handleChange(newState)}
                    readOnly={!editingMode}
                />
            </div>
        </div>
    );
}
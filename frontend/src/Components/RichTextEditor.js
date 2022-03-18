import React, {useEffect, useState} from "react";
import {Editor, EditorState, RichUtils} from "draft-js";
import {Box} from "@mui/material";


export default function RichTextEditor(props) {
    const { readOnly, text, setText } = props;
    const editor = React.useRef(null);

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    // later the whole state will be changed, because the state object will be retrieved from database
    useEffect(() => {
        //handleChange(text); text is the state retrieved from db
    }, [])

    function focusEditor() {
        editor.current.focus();
    }

    const handleChange = (newState) => {
        setEditorState(newState);
        setText(newState.getCurrentContent().getPlainText('\u0001'));
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

    return (
        <Box className={"main-box"}>
            <div
                style={{ border: "1px solid black", minHeight: "6em", cursor: "text" }}
                onClick={focusEditor}
            >
                <button onMouseDown={onUnderlineClick}>U</button>
                <button onMouseDown={onBoldClick}><b>B</b></button>
                <button onMouseDown={onItalicClick}><em>I</em></button>
                <Editor
                    ref={editor}
                    editorState={editorState}
                    handleKeyCommand={command => handleKeyCommand(command)}
                    onChange={newState => handleChange(newState)}
                    placeholder="Write something!"
                    readOnly={readOnly}
                />
            </div>
        </Box>
    );
}
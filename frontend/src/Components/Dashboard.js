import React, { useState } from "react";
import { Button, Box, TextField } from "@mui/material";

export default function Dashboard (){
    
    const [ textValue, setTextValue ] = useState("");
    const [ clickCount, setClickCount ] = useState(0);

    const onInputChange = (event) => {
        setTextValue(event.target.value);
    }

    const onButtonClick = (event) => {
        setClickCount(clickCount + 1);
    }

    return (
        <Box sx={{mt:10}}>
            <Button
                variant="contained"
                onClick={onButtonClick}
                sx={{mr:20}}
            >
                Click me
            </Button>

            <TextField
                id="outlined-name"
                label="Enter something"
                value={textValue}
                onChange={onInputChange}
            />

            <div>Your entered: {textValue}</div>
            <div>Clicked {clickCount} times</div>
        </Box>
    );
}
import React from 'react';
import { Autocomplete, TextField, Button } from '@mui/material';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';

export default function Filter({difficultyOpts, topicOpts}) {
    return <FilterDiv>
        <div style={{ float: "left", width: "33%" }}>
            <Autocomplete
                multiple
                options={difficultyOpts}
                sx={{ width: 450 }}
                renderInput={(params) => <TextField {...params} label="Difficulty" />}
            />
        </div>
        <div style={{ float: "left", width: "33%" }}>
            <Autocomplete
                multiple
                options={topicOpts}
                sx={{ width: 450 }}
                renderInput={(params) => <TextField {...params} label="Topic" />}
            />
        </div>
        <div style={{ float: "left", width: "33%" }}>
            <Button variant="contained" endIcon={<SearchIcon />} size="large" style={{width:"130px", height:"55px"}}>
                Search
            </Button>
        </div>
    </FilterDiv>
}

const FilterDiv = styled.div`
    padding-left: 20%;
    padding-top: 5%;
    width: 70%;
    height: 130px;
`;



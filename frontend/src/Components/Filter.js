import React, {useState} from 'react';
import { Autocomplete, TextField, Button } from '@mui/material';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';

export default function Filter({difficultyOpts, topicOpts, tasks, filterSetter}) {
    const [diffChoices, setDiffChoices] = useState([]);
    const [topicChoices, setTopicChoices] = useState([]);

    const handleSearch = () => { //After search button is clicked
        const filtered = [];
        for (let task of tasks){ //filtering starts
            let difPass = diffChoices.length == 0 ? true: false; // if no choice is present, pass all difficulties
            let topicPass = topicChoices.length == 0 ? true: false; // same logic here
            for (let difChoice of diffChoices){
                if (task.Difficulty == difChoice){ //filtering by difficulty
                    difPass = true;
                }
            }
            for (let topChoice of topicChoices){
                for (let topic of task.Topics){
                    if (topChoice == topic){ //filtering by topic
                        topicPass = true;
                    }
                }
            }
            if (difPass && topicPass){ //requirements met => to the list
                filtered.push(task);
            }
        }
        filterSetter(filtered); // Sets the filtered list for the parent(browseTasks)
    }

    return <FilterDiv>
        <div style={{ float: "left", width: "33%" }}>
            <Autocomplete //<= for difficulties
                multiple
                options={difficultyOpts}
                sx={{ width: 450 }}
                renderInput={(params) => <TextField {...params} label="Difficulty" />}
                onChange={
                    (event, value) => {
                        setDiffChoices(value);
                    }
                }
            />
        </div>
        <div style={{ float: "left", width: "33%" }}>
            <Autocomplete //<= for topics
                multiple
                options={topicOpts}
                sx={{ width: 450 }}
                renderInput={(params) => <TextField {...params} label="Topic" />}
                onChange={
                    (event, value) => {
                        setTopicChoices(value);
                    }
                }
            />
        </div>
        <div style={{ float: "left", width: "33%" }}>
            <Button onClick={handleSearch} variant="contained" endIcon={<SearchIcon />} size="large" style={{width:"130px", height:"55px"}}>
                Search
            </Button>
        </div>
    </FilterDiv>
}

const FilterDiv = styled.div`
    padding-left: 24%;
    padding-top: 5%;
    width: 70%;
    height: 130px;
`;



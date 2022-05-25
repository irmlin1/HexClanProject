import React, {useState} from 'react';
import {Alert, Autocomplete, Button, Snackbar, TextField} from '@mui/material';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import CreateSingleTaskDialog from "./CreateSingleTaskDialog";
import {addTask} from "../Services/TasksService";

export default function Filter({difficultyOpts, topicOpts, tasks, filterSetter}) {
    const [diffChoices, setDiffChoices] = useState([]);
    const [topicChoices, setTopicChoices] = useState([]);
    const [createTaskOpen, setCreateTaskOpen] = useState(false);
    const [createdTask, setCreatedTask] = useState({
        question: "",
        difficulty: "",
        topics: [],
        answers: []
    });

    const [snackOpen, setSnackOpen] = useState(false);
    const [snackColor, setSnackColor] = useState("success");
    const [snackText, setSnackText] = useState("");

    const handleTopicChange = (event) => {
        const copy = {...createdTask};
        const {
            target: { value },
        } = event;

        copy.topics = (typeof value === 'string' ? value.split(',') : value);
        setCreatedTask(copy);
    };

    const handleTaskQuestionChange = (event) => {
        setCreatedTask({
            ...createdTask,
            question: event.target.value
        })
    }

    const handleTaskDifficultyChange = (event) => {
        setCreatedTask({
            ...createdTask,
            difficulty: event.target.value
        })
    }

    const handleTaskAddAnswer = (event) => {
        const copy = {...createdTask};
        copy.answers = [...copy.answers, {
            content: "",
            isCorrect: false
        }];
        setCreatedTask(copy);
    }

    const handleTaskDeleteAnswer = (answerIndex) => {
        const copy = {...createdTask};
        const answers = [...copy.answers];

        answers.splice(answerIndex, 1);
        copy.answers = answers;

        setCreatedTask(copy);
    }

    const handleTaskAnswerChange = (event, answerIndex) => {
        const copy = {...createdTask};
        const answers = [...copy.answers];
        answers[answerIndex].content = event.target.value;
        copy.answers = answers;

        setCreatedTask(copy);
    }

    const handleTaskIsCorrectChange = (event, answerIndex) => {
        const copy = {...createdTask};
        const answers = [...copy.answers];
        answers[answerIndex].isCorrect = event.target.checked;
        copy.answers = answers;

        setCreatedTask(copy);
    }

    const handleSearch = () => { //After search button is clicked
        const filtered = [];
        for (let task of tasks){ //filtering starts
            let difPass = diffChoices.length === 0 ? true: false; // if no choice is present, pass all difficulties
            let topicPass = topicChoices.length === 0 ? true: false; // same logic here
            for (let difChoice of diffChoices){
                if (task.Difficulty === difChoice){ //filtering by difficulty
                    difPass = true;
                }
            }
            for (let topChoice of topicChoices){
                for (let topic of task.Topics){
                    if (topChoice === topic){ //filtering by topic
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

    function validate() {
        if (
            !createdTask.question ||
            !createdTask.difficulty
        )
            return {validated: false, message: "Some fields were left empty!"};

        if (!createdTask.topics.length)
            return {validated: false, message: "No topics selected!"};

        if (!createdTask.answers.length|| createdTask.answers.length < 2)
            return {validated: false, message: "Each task should have at least 2 answers!"};

        if (createdTask.answers.length) {
            for (const answer of createdTask.answers) {
                if (!answer.content)
                    return {validated: false, message: "Some answers were left empty!"};
            }
        }

        return {validated: true, message: ""};
    }

    function closeDialog() {
        handleCreateTaskClose()
        setCreatedTask({
            question: "",
            difficulty: "",
            topics: [],
            answers: []})
    }

    const handleCreateTaskSubmit = async (event) => {
        event.preventDefault();

        const valid = validate();
        if(!valid.validated){
            setSnackOpen(true);
            setSnackColor("error")
            setSnackText(valid.message);
            return;
        }

        const response = await addTask(createdTask);
        setSnackOpen(true)
        if(response) {
            if(response.data.Success) {
                setSnackColor("success")
                setSnackText(response.data.Message)
                closeDialog()
            }
            else {
                setSnackColor("error")
            }
        }
        else {
            setSnackText("A server error has occurred.")
            setSnackColor("error")
        }
    }

    const handleCreateButtonClick = () => {
        setCreateTaskOpen(true);
    }

    const handleCreateTaskClose = () => {
        setCreateTaskOpen(false);
    }

    return <FilterDiv>
        <Snackbar
            anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
            open={snackOpen}
            autoHideDuration={4000}
            onClose={() => setSnackOpen(false)}
        >
            <Alert
                onClose={() => setSnackOpen(false)}
                severity={snackColor}
                sx={{ width: "100%" }}
            >
                {snackText}
            </Alert>
        </Snackbar>
        <div style={{ float: "left", width: "33%" }}>
            <Autocomplete //<= for difficulties
                multiple
                options={difficultyOpts}
                sx={{ width: 300 }}
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
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Topic" />}
                onChange={
                    (event, value) => {
                        setTopicChoices(value);
                    }
                }
            />
        </div>
        <div style={{ float: "left", width: "33%", display: "flex" }}>
            <Button onClick={handleSearch} variant="contained" endIcon={<SearchIcon />} size="large" style={{width:"130px", height:"55px"}}>
                Search
            </Button>
            <Button sx={{ml:3}} variant="contained" onClick={handleCreateButtonClick}>Create Task</Button>
        </div>
        <CreateSingleTaskDialog
            dialogOpen={createTaskOpen}
            onClose={handleCreateTaskClose}
            createdTask={createdTask}
            handleTaskQuestionChange={handleTaskQuestionChange}
            handleTaskDifficultyChange={handleTaskDifficultyChange}
            handleAddAnswer={handleTaskAddAnswer}
            handleTaskAnswerChange={handleTaskAnswerChange}
            handleDeleteAnswer={handleTaskDeleteAnswer}
            handleIsCorrectAnswerChange={handleTaskIsCorrectChange}
            handleTopicChange={handleTopicChange}
            handleCreateTaskSubmit={handleCreateTaskSubmit}
        />
    </FilterDiv>
}

const FilterDiv = styled.div`
    padding-left: 24%;
    padding-top: 7%;
    width: 70%;
    height: 130px;
`;



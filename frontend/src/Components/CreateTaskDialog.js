import * as React from 'react';
import {
    Box,
    Button, Checkbox,
    FormControl, FormControlLabel, FormGroup, IconButton, InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import {Difficulties} from "../Enums/CampaignEnums";
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';

export default function CreateTaskDialog(props) {

    const {
        addedTasks,
        handleAddTask,
        handleDeleteTask,
        handleTaskQuestionChange,
        handleTaskDifficultyChange,
        handleAddAnswer,
        handleTaskAnswerChange,
        handleDeleteAnswer,
        handleIsCorrectAnswerChange
    } = props;

    return (
        <>
            {
                addedTasks.map((task, i) => (
                    <Box key={i} sx={{my:3}}>
                        <div style={{display: "flex"}}>
                            <h4>
                                Task {i+1}
                            </h4>
                            <IconButton onClick={(e) => handleDeleteTask(e, i)}>
                                <CancelIcon color={"error"}/>
                            </IconButton>
                        </div>
                        <TextField
                            sx={{mb:2}}
                            required
                            fullWidth
                            multiline
                            name={"question" + i}
                            label="Question"
                            id={"question" + i}
                            onChange={(e) => handleTaskQuestionChange(e, i)}
                            value={addedTasks[i].question}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="difficulty-label">Difficulty</InputLabel>
                            <Select
                                labelId="difficulty-label"
                                label="Difficulty"
                                fullWidth
                                sx={{mb:1}}
                                id="difficulty_select"
                                value={addedTasks[i].difficulty}
                                onChange={(e) => handleTaskDifficultyChange(e, i)}
                            >
                                {
                                    Object.entries(Difficulties).map(([key, value]) =>
                                        <MenuItem key={value} value={value}>
                                            {value}
                                        </MenuItem>
                                    )
                                }
                            </Select>
                        </FormControl>
                        {
                            task.answers.map((answer, j) => (
                                <div key={j} style={{display: "flex", alignItems:"center", justifyContent: "space-between"}}>
                                    <TextField
                                        margin="normal"
                                        required
                                        multiline
                                        sx={{width:"60%"}}
                                        name={"answer" + j}
                                        label={"Answer" + (j+1)}
                                        id={"Answer" + j}
                                        onChange={(e) => handleTaskAnswerChange(e, i, j)}
                                        value={addedTasks[i].answers[j].content}
                                    />
                                    <FormGroup>
                                        <FormControlLabel control={
                                            <Checkbox
                                            checked={addedTasks[i].answers[j].isCorrect}
                                            onChange={(e) => handleIsCorrectAnswerChange(e, i, j)}
                                        />
                                        } label="Is Correct" />
                                    </FormGroup>
                                    <IconButton onClick={() => handleDeleteAnswer(i, j)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </div>
                            ))
                        }
                        <Button onClick={() => handleAddAnswer(i)} variant="contained" fullWidth>Add Answer</Button>
                    </Box>
                ))
            }
            <Button sx={{mt:2}} onClick={handleAddTask} variant="contained" fullWidth>Add Task</Button>
        </>
    );
}
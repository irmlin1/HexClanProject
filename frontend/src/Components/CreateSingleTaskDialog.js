import * as React from 'react';
import {
    Box,
    Button, Checkbox, Dialog, DialogActions, DialogContent,
    FormControl, FormControlLabel, FormGroup, IconButton, InputLabel, ListItemText,
    MenuItem, OutlinedInput,
    Select,
    TextField
} from "@mui/material";
import {Difficulties, Topics} from "../Enums/CampaignEnums";
import DeleteIcon from '@mui/icons-material/Delete';
import FormSection from "./FormSection";

export default function CreateSingleTaskDialog(props) {

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const {
        dialogOpen,
        onClose,
        createdTask,
        handleTaskQuestionChange,
        handleTaskDifficultyChange,
        handleAddAnswer,
        handleTaskAnswerChange,
        handleDeleteAnswer,
        handleIsCorrectAnswerChange,
        handleTopicChange,
        handleCreateTaskSubmit
    } = props;

    return (
        <Dialog
            open={dialogOpen}
            onClose={onClose}
            fullWidth
        >
            <DialogContent>
                <Box sx={{my: 3}}>
                    <div style={{display: "flex"}}>
                        <h4>
                            New Task
                        </h4>
                    </div>
                    <TextField
                        sx={{mb: 2}}
                        required
                        fullWidth
                        multiline
                        name={"question"}
                        label="Question"
                        id={"question"}
                        onChange={(e) => handleTaskQuestionChange(e)}
                        value={createdTask.question}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="difficulty-label">Difficulty</InputLabel>
                        <Select
                            labelId="difficulty-label"
                            label="Difficulty"
                            fullWidth
                            sx={{mb: 1}}
                            id="difficulty_select"
                            value={createdTask.difficulty}
                            onChange={(e) => handleTaskDifficultyChange(e)}
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
                    <FormSection title={"Topics"}>
                        <FormControl fullWidth>
                            <InputLabel id="multiple-checkbox-label">Topics</InputLabel>
                            <Select
                                labelId="multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                fullWidth
                                value={createdTask.topics}
                                onChange={handleTopicChange}
                                input={<OutlinedInput label="Topics" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {
                                    Object.entries(Topics).map(([key, value]) =>
                                        <MenuItem key={value} value={value}>
                                            <Checkbox checked={createdTask.topics.indexOf(value) > -1} />
                                            <ListItemText primary={value} />
                                        </MenuItem>
                                    )
                                }
                            </Select>
                        </FormControl>
                    </FormSection>
                    {
                        createdTask.answers.map((answer, j) => (
                            <div key={j} style={{width:500, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                <TextField
                                    margin="normal"
                                    required
                                    multiline
                                    sx={{width: "60%"}}
                                    name={"answer" + j}
                                    label={"Answer" + (j + 1)}
                                    id={"Answer" + j}
                                    onChange={(e) => handleTaskAnswerChange(e, j)}
                                    value={createdTask.answers[j].content}
                                />
                                <FormGroup>
                                    <FormControlLabel control={
                                        <Checkbox
                                            checked={createdTask.answers[j].isCorrect}
                                            onChange={(e) => handleIsCorrectAnswerChange(e, j)}
                                        />
                                    } label="Is Correct"/>
                                </FormGroup>
                                <IconButton onClick={() => handleDeleteAnswer(j)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </div>
                        ))
                    }
                    <Button onClick={() => handleAddAnswer()} sx={{mt:2}} variant="contained" fullWidth>Add Answer</Button>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={(e) => handleCreateTaskSubmit(e)} variant="contained" fullWidth color={"success"}>Create</Button>
            </DialogActions>
        </Dialog>

    );
}
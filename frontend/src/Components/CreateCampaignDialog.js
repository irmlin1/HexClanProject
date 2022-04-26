import * as React from 'react';
import {useState} from 'react';
import {
    Alert,
    Button,
    Checkbox,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    Snackbar,
    TextField
} from "@mui/material";
import {Topics} from "../Enums/CampaignEnums";
import CreateTaskDialog from "./CreateTaskDialog";
import FormSection from "./FormSection";
import {createNewCampaign} from "../Services/CampaignService";

export default function CreateCampaignDialog(props) {

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

    const {dialogOpen, handleOpen, handleClose} = props;

    const [tag, setTag] = useState("");
    const [campaign, setCampaign] = useState({
        title: "",
        description: "",
        topics: [],
        tags: [],
        tasks: []
    })
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackColor, setSnackColor] = useState("success");
    const [snackText, setSnackText] = useState("");

    const handleTitleChange = (event) => {
        const copy = {...campaign};
        copy.title = event.target.value;
        setCampaign(copy);
    };

    const handleDescriptionChange = (event) => {
        const copy = {...campaign};
        copy.description = event.target.value;
        setCampaign(copy);
    };

    const handleTopicChange = (event) => {
        const copy = {...campaign};
        const {
            target: { value },
        } = event;

        copy.topics = (typeof value === 'string' ? value.split(',') : value);
        if(copy.tasks.length) {
            copy.tasks = copy.tasks.map(task => ({...task, topics: copy.topics}));
        }
        setCampaign(copy);
    };

    const handleTagChange = (event) => {
        setTag(event.target.value);
    };

    const handleAddTag = () => {
        if(tag) {
            if(!campaign.tags.includes(tag) && tag.trim().length !== 0){
                const copy = {...campaign};
                copy.tags = [...copy.tags, tag];
                setCampaign(copy);
            }
            setTag("");
        }
    };

    const handleDeleteTag = (tagToDelete) => {
        const copy = {...campaign};
        const array = [...copy.tags];
        const index = array.indexOf(tagToDelete);
        if (index !== -1) {
            array.splice(index, 1);
            copy.tags = array;
            setCampaign(copy);
        }
    };

    const handleAddTask = () => {
        const copy = {...campaign};
        const task = {
            question: "",
            difficulty: "",
            topics: campaign.topics,
            answers: []
        }
        copy.tasks = [...copy.tasks, task];
        setCampaign(copy);
    }

    const handleTaskQuestionChange = (event, index) => {
        const copy = {...campaign};
        const array = [...copy.tasks];
        array[index] = {
            ...array[index],
            question: event.target.value
        };
        copy.tasks = array;
        setCampaign(copy);
    }

    const handleTaskDifficultyChange = (event, index) => {
        const copy = {...campaign};
        const array = [...copy.tasks];
        array[index] = {
            ...array[index],
            difficulty: event.target.value
        };
        copy.tasks = array;
        setCampaign(copy);
    }

    const handleDeleteTask = (event, index) => {
        const copy = {...campaign};
        const array = [...copy.tasks];

        array.splice(index, 1);
        copy.tasks = array;
        setCampaign(copy);
    }

    const handleAddAnswer = (index) => {
        const copy = {...campaign};
        const array = [...copy.tasks];
        array[index] = {
            ...array[index],
            answers: [...array[index].answers, {
                content: "",
                isCorrect: false
            }]
        }

        copy.tasks = array;
        setCampaign(copy);
    }

    const handleTaskAnswerChange = (event, taskIndex, answerIndex) => {
        const copy = {...campaign};
        const array = [...copy.tasks];

        const answers = [...array[taskIndex].answers];
        answers[answerIndex].content = event.target.value;
        array[taskIndex].answers = answers;

        copy.tasks = array;
        setCampaign(copy);
    }

    const handleDeleteAnswer = (taskIndex, answerIndex) => {
        const copy = {...campaign};
        const array = [...copy.tasks];

        const answers = [...array[taskIndex].answers];
        answers.splice(answerIndex, 1);
        array[taskIndex].answers = answers;

        copy.tasks = array;
        setCampaign(copy);
    }

    const handleIsCorrectAnswerChange = (event, taskIndex, answerIndex) => {
        const copy = {...campaign};
        const array = [...copy.tasks];

        const answers = [...array[taskIndex].answers];
        answers[answerIndex].isCorrect = event.target.checked;
        array[taskIndex].answers = answers;

        copy.tasks = array;
        setCampaign(copy);
    }

    function validate() {
        if (
            !campaign.title ||
            !campaign.description
        )
            return {validated: false, message: "Some fields were left empty!"};

        if (!campaign.topics.length)
            return {validated: false, message: "No topics selected!"};

        if (!campaign.tasks.length)
            return {validated: false, message: "No tasks added!"};

        if (campaign.tasks.length) {
            for (const task of campaign.tasks) {
                if (!task.question || !task.difficulty) {
                    return {validated: false, message: "Some task fields were left empty!"};
                }
                if (!task.answers.length || task.answers.length < 2)
                    return {validated: false, message: "Each task should have at least 2 answers!"};
                if (task.answers.length) {
                    for (const answer of task.answers) {
                        if (!answer)
                            return {validated: false, message: "Some answers were left empty!"};
                    }
                }
            }

            return {validated: true, message: ""};
        }
    }

    const handleCreateCampaign = async (event) => {
        event.preventDefault();

        const valid = validate();
        if(!valid.validated){
            setSnackOpen(true);
            setSnackColor("error")
            setSnackText(valid.message);
            return;
        }

        const response = await createNewCampaign(campaign);

        setSnackOpen(true);
        console.log(response)
        if(response) {
            if(response.data.Success) {
                setSnackText(response.data.Message)
                setSnackColor("success")
                handleClose();
            } else {
                setSnackColor("error")
                if(response.data.Message) {
                    setSnackText(response.data.Message);
                }
            }
        } else {
            setSnackColor("error");
            setSnackText("A server error has occurred.");
        }
    }

    return (
        <div>
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
            <Button onClick={handleOpen} variant="contained">Add Campaign</Button>
            <Dialog
                fullWidth
                maxWidth="sm"
                open={dialogOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <DialogContent style={{ overflowY: "scroll" }}>
                    <FormSection title={"General"}>
                        <TextField
                            margin="normal"
                            required
                            name="title"
                            label="Title"
                            id="title"
                            fullWidth
                            onChange={handleTitleChange}
                            value={campaign.title}
                        />
                        <TextField
                            margin="normal"
                            required
                            multiline
                            fullWidth
                            name="description"
                            label="Description"
                            id="description"
                            onChange={handleDescriptionChange}
                            value={campaign.description}
                        />
                    </FormSection>

                    <FormSection title={"Topics"}>
                        <FormControl fullWidth>
                            <InputLabel id="multiple-checkbox-label">Topics</InputLabel>
                            <Select
                                labelId="multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                fullWidth
                                value={campaign.topics}
                                onChange={handleTopicChange}
                                input={<OutlinedInput label="Topics" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {
                                    Object.entries(Topics).map(([key, value]) =>
                                        <MenuItem key={value} value={value}>
                                            <Checkbox checked={campaign.topics.indexOf(value) > -1} />
                                            <ListItemText primary={value} />
                                        </MenuItem>
                                    )
                                }
                            </Select>
                        </FormControl>
                    </FormSection>

                    <FormSection title={"Tags"}>
                        <FormControl fullWidth>
                            <TextField
                                margin="normal"
                                fullWidth
                                name="tags"
                                label="Tags"
                                id="tags"
                                onChange={handleTagChange}
                                value={tag}
                            />
                            <Button onClick={handleAddTag} variant="contained">Add Tag</Button>
                            <div style={{display:"inline"}}>
                                {
                                    campaign.tags.map(tag =>
                                        <Chip key={tag} label={tag} sx={{my:1}} onDelete={() => handleDeleteTag(tag)} />
                                    )
                                }
                            </div>
                        </FormControl>
                    </FormSection>

                    <FormSection title={"Tasks"}>
                        <CreateTaskDialog
                            addedTasks={campaign.tasks}
                            handleAddTask={handleAddTask}
                            handleDeleteTask={handleDeleteTask}
                            handleTaskQuestionChange={handleTaskQuestionChange}
                            handleTaskDifficultyChange={handleTaskDifficultyChange}
                            handleAddAnswer={handleAddAnswer}
                            handleTaskAnswerChange={handleTaskAnswerChange}
                            handleDeleteAnswer={handleDeleteAnswer}
                            handleIsCorrectAnswerChange={handleIsCorrectAnswerChange}
                        />
                    </FormSection>

                </DialogContent>

                <DialogActions>
                        <Button
                            color={"success"}
                            onClick={handleCreateCampaign}
                            variant="contained"
                            style={{width:"100%"}}
                        >
                            Create
                        </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
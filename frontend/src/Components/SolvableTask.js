import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';


export default function SolvableTask(props) {
    const { question, options, correct } = props;

    const [checks, setChecks] = useState(new Array(options.length).fill(false));


    useEffect(() => {
        setChecks(new Array(options.length).fill(false));
    }, [options])

    const handleClick = () => {
        let wrongs = 0;
        let corr = 0;
        let allCor = 0;
        correct.map(cr => { if (cr) {allCor += 1}}); // counts how much should be checked
        
        checks.map((c, ind) => { 
            if (c && correct[ind]){ // chose correctly
                corr += 1;
            }
            else if (!correct[ind] && c){ // chose wrongly
                wrongs += 1;
            }
        } );

        if (wrongs === 0 && allCor === corr){ // didn't choose wrong and chose everything right
            alert("correct");
        }
        else if (corr !== 0){ // otherwise if chose at least one correctly
            alert("partly correct");
        }
        else{ // chose all wrong/didn't chose at all when correct answer was present
            alert("wrong");
        }
    }

    const handleCheck = (i) => {
        const copy = [...checks];
        copy[i] = !copy[i];
        setChecks(copy);
    }

    return <TaskDiv>
        <h3>{question}</h3>
        <FormGroup>
            {
                options.map((opt, ind) =>
                    <FormControlLabel key={opt}
                                      control={
                                          <Checkbox color="success" onChange={() => handleCheck(ind)}/>
                                      }
                                      label={opt}
                                      style={{float:"left"}}/>
                )
            }
        </FormGroup>
        <Button variant="contained" color="success" onClick={handleClick} style={{marginTop:"3%"}}>
            Submit
        </Button>
    </TaskDiv>
}


export function formTaskOptions(task){ //Just because it was more convenient(did it before knew structure), spliting answers into two arrays
    let options = []
    let correct = []
    task.Answers.map(ans => {options.push(ans.Content); correct.push(ans.IsCorrect)});
    return {options, correct};
}


const TaskDiv = styled.div`
    border-style: solid;
    border-radius: 35px;
    width: 500px;
    padding: 25px;
    margin-top: 1%;
    margin-left: 37.5%;
    display: inline-block;
`;
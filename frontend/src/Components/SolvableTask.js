import React from 'react';
import styled from 'styled-components';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';


export default function SolvableTask(props) {
    const { question, options, correct } = props;
    const checks = [];
    options.map(e => checks.push(false));
    const handleClick = () => {
        let wrongs = 0;
        let corr = 0;
        let allCor = 0;
        correct.map(cr => { if (cr) {allCor += 1}});
        
        checks.map((c, ind) => { 
            if (c && correct[ind]){ // kiek pazymeta teisingai
                corr += 1;
            }
            else if (!correct[ind] && c){ // kiek pasyemetu neteisingai
                wrongs += 1;
            }
        } );
        //console.log(allCor);
        //console.log(corr);
        //console.log(wrongs);

        if (wrongs == 0 && allCor == corr){ // jei nei vienas nesuklystas ir visi pazymeti teisingai
            alert("correct");
        }
        else if (corr != 0){ // Jei bent vienas pazymetas teisingai
            alert("partly correct");
        }
        else{
            alert("wrong");
        }
    }

    const handleCheck = (i) => {
        checks[i] = !checks[i];
    }

    return <TaskDiv>
        <h3>{question}</h3>
        <FormGroup>
            {
                options.map((opt, ind) =>  <FormControlLabel key={ind} control={<Checkbox color="success" onChange={() => handleCheck(ind)}/>} label={opt} style={{float:"left"}}/>                 )
            }
        </FormGroup>
        <Button variant="contained" color="success" onClick={handleClick} style={{marginTop:"3%"}}>
            Submit
        </Button>
    </TaskDiv>
}

const TaskDiv = styled.div`
    border-style: solid;
    border-radius: 35px;
    width: 500px;
    padding: 25px;
    margin-top: 1%;
    margin-left: 35%;
    display: inline-block;
`;
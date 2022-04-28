import React, { useEffect, useState } from 'react';
import SolvableTask from '../Components/SolvableTask.js'
import Fab from '@mui/material/Fab';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';


export default function SolveCampaign() {
    const [camp, setCamp] = useState(null);
    const [currTask, setCurrTask] = useState(null);
    const [currInd, setCurrInd] = useState(0);
    const [leftDisabled, setLeftDisabled] = useState(true);
    const [rightDisabled, setRightDisabled] = useState(false);
    //const []

    useEffect(() => {
        setCamp(JSON.parse(sessionStorage.getItem("campaign")));
        setCurrTask(JSON.parse(sessionStorage.getItem("campaign")).Tasks[0]);
        setCurrInd(0);
    }, [])
    useEffect(() => {
        if (camp != null){
            if (camp.Tasks.length === 1){
                setRightDisabled(true);
            }
        }
    }, [camp])
    useEffect(() => {
        if (currInd === 0){
            setLeftDisabled(true);
        }
        else{
            setLeftDisabled(false);
        }
        if (camp != null && currInd === camp.Tasks.length-1){
            setRightDisabled(true);
        }
        else{
            setRightDisabled(false);
        }
    }, [currInd])
    const handleLeft = () => {
        setCurrTask(camp.Tasks[currInd-1]);
        setCurrInd(currInd-1);
    }
    const handleRight = () => {
        setCurrTask(camp.Tasks[currInd+1]);
        setCurrInd(currInd+1);
    }
    //console.log(currTask == null);
    return <div style={style}>
        {
            currTask != null && <>
                <SolvableTask question={currTask.Question} options={getOpts(currTask)} correct={getCorr(currTask)} />
                <div style={butDiv}>
                    <Fab key={1} color="secondary" style={{ marginLeft: "110px", float: "left" }} onClick={handleLeft} disabled={leftDisabled}>
                        <ArrowBackOutlinedIcon />
                    </Fab>
                    <p style={{ float: "left", marginLeft: "100px" }}>
                        {currInd + 1}/{camp.Tasks.length}
                    </p>
                    <Fab key={2} color="secondary" style={{ marginLeft: "100px", float: "left" }} onClick={handleRight} disabled={rightDisabled}>
                        <ArrowForwardOutlinedIcon />
                    </Fab>
                </div>
            </>
        }

    </div>
}

function getOpts(task) {
    let options = []
    task.Answers.map(ans => { options.push(ans.Content) });
    return options;
}
function getCorr(task) {
    let correct = []
    task.Answers.map(ans => { correct.push(ans.IsCorrect) });
    return correct;
}

const style = {
    paddingTop: "6%",
}
const butDiv = {
    display: "table",
    margin: "0 auto",
    paddingTop: "2%",
    width: "500px"
}
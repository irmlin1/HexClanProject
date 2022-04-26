import React, {useState, useEffect} from 'react';
import Filter from '../Components/Filter';
import SolvableTask from '../Components/SolvableTask';
import '../Styles/global.css';
import NavigationBar from '../Components/NavigationBar';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const task={
    question:"Būti ar nebūti",
    options: ["Yeah", "No", "Maybe", "Who knows"],
    correct: [false, false, true, true]
};
const allTask = [task, task, task, task, task, task, task];
const difficultyOpts = ["Easy", "Medium", "Hard"];
const topicOpts = ["algebra", "calculus", "imaginary numbers", "geometry"];

export default function BrowseTasks(){
    const [page, setPage] = useState(1);
    const [pageTasks, setPageTasks] = useState([]);
    const sliced = sliceArr(allTask);

    useEffect(() => {
        setPageTasks(sliced[0]);
    }, [])
    

    const handlePageChange = (event, value) => {
        setPage(value);
        setPageTasks(sliced[value-1]);
    }

    return <div>
    <NavigationBar/>
    <Filter difficultyOpts={difficultyOpts} topicOpts={topicOpts}/>
    {
        pageTasks.length > 0 && pageTasks.map((t, ind) => <SolvableTask key={ind} question={t.question} options={t.options} correct={t.correct}/>)
    }
    <Stack spacing={2} style={pageStyle}>
      <Pagination count={sliced.length} shape="rounded" onChange={handlePageChange} />
    </Stack>
    </div>
}

function sliceArr(arr){
    const sliced = [];
    let slInd = -1;
    arr.map((el, ind) => {
        if (ind % 5 == 0){
            sliced.push([]);
            slInd += 1;
        }
        sliced[slInd].push(el);
    })
    return sliced;
}


const pageStyle = {
    marginLeft:"39%",
    marginTop:"30px",
    marginBottom:"30px"
}
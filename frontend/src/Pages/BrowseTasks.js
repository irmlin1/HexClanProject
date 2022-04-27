import React, {useState, useEffect} from 'react';
import Filter from '../Components/Filter';
import SolvableTask from '../Components/SolvableTask';
import '../Styles/global.css';
import NavigationBar from '../Components/NavigationBar';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {getTasks} from '../Services/TasksService';

const difficultyOpts = ["Easy", "Medium", "Hard"]; 
const topicOpts = ["Biology", "Physics", "Mathematics", "Science", "Programming", "Algorithms", "Chemistry", "Politics"]; //Maciau sitiem enumai yra, dabar neisikeliau ju, paskui i juos pakeisiu
const perPage = 5;

export default function BrowseTasks(){
    const [page, setPage] = useState(1);
    const [pageTasks, setPageTasks] = useState([]);
    const [allTasks, setTasks] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [pageAmount, setPageAmount] = useState(0);

    useEffect(() => {
        getTasks().then(res => setTasks(res.data)); //Retrieves all tasks from database
    }, [])
    useEffect(() => {
        setPageTasks(getPageTasks(filtered, page, perPage)); //From filtered tasks get section of a page
        setPageAmount(getPageAmount(filtered, perPage)); //Sets page count
    }, [filtered]); //call whenever filtered is changed

    const handlePageChange = (event, value) => {
        setPage(value);
        setPageTasks(getPageTasks(allTasks, value, perPage)); //Changes section of a page
    }

    const filterTasks = (filteredTasks) => { //Method required to the filter
        setFiltered(filteredTasks);
        setPage(1);
    }

    return <div>
    <NavigationBar/>
    <Filter difficultyOpts={difficultyOpts} topicOpts={topicOpts} tasks={allTasks} filterSetter={filterTasks}/>
    {
        pageTasks.length > 0 && pageTasks.map((t, ind) => {const {options, correct} = formTaskOptions(t) ;
        return <SolvableTask key={ind} question={t.Question} options={options} correct={correct} />})
    }
    <Stack spacing={2} style={{...horizontalCenter, marginTop:"50px", marginBottom:"30px"}}>
      <Pagination count={pageAmount} shape="rounded" onChange={handlePageChange} />
    </Stack>
    </div>
}

function formTaskOptions(task){ //Just because it was more convenient(did it before knew structure), spliting answers into two arrays
    let options = []
    let correct = []
    task.Answers.map(ans => {options.push(ans.Content); correct.push(ans.IsCorrect)});
    return {options, correct};
}

function getPageTasks(tasks, page, perPage){ //Gives page section from all the tasks
    const sInd = (page-1)*perPage;
    const eInd = sInd+perPage;

    return tasks.slice(sInd, eInd);
}

function getPageAmount(allTasks, perPage){ //Calculates page count
    let amount = Math.floor(allTasks.length/perPage)
    if (allTasks.length % perPage != 0){
        amount = amount+1;
    }
    return amount;
}


const horizontalCenter = {
    display: "table",
    margin: "0",
    margin: "auto"
}
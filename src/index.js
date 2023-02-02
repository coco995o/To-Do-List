import _ from 'lodash';
import './styles.css';

// Elements
const content=document.querySelector('#content');
const myform=document.querySelector('.form1');
const projectInput=document.querySelector('#project');
const projectDisplay=document.querySelector('.project_name');
//tasks input
const taskForm=document.querySelector('.taskForm');
const container=document.querySelector('.container');
const tName=document.querySelector('#task-name');
const tDate=document.querySelector('#task-date');
const tDescription=document.querySelector('#task-description');

let newTitle=document.querySelector('#new-task-name');
let newDescription=document.querySelector('#new-task-description');
let newDate=document.querySelector('#new-task-date');
//tasks display
const $title=document.querySelector('.title');
const $date=document.querySelector('.due-date');
const $desc=document.querySelector('.description');

let projectList=[];
let pSelected;
let selectedTask;
let remainingDays;

function createProject(){
    return {name: projectInput.value, id: projectList.length, taskList: []};
}

const createTask=(title, description, dueDate, priority, id)=>{
    return{title, description, dueDate, priority, id};
};

myform.addEventListener('submit', (e)=>{
    e.preventDefault();
    const projectInput=document.getElementById('project').value;
    if(projectInput===""){
        alert("Please fill the project field");
        return;
    }
    else{
        const newProject=createProject();
        projectList.push(newProject);
        displayProject(newProject);
        showProjectList();
        clearProjectForm();
    }
});

const displayProject=(project)=>{
    const sidebar=document.querySelector('.sidebar');
    const pList=document.querySelector('.projectList');
    const div=document.createElement('div');
    const option=document.createElement('li');
    option.classList.add('li-item');
    const select=document.querySelector('#select');
    option.innerHTML=project.name;
    pList.appendChild(option);
};

function showProjectList(){
    console.log(projectList);
};

function showForm(){
    document.querySelector('.taskForm').style.display="block";
};

taskForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(tName.value==="" || tDescription.value==="" || tDate.value===""){
        alert("Please fill the required fields.");
        return;
    }else{
        calculatePriority(tDate);
        let newTask=createTask(tName.value, tDescription.value, tDate.value, remainingDays, pSelected.taskList.length);
        pSelected.taskList.push(newTask);
        showTaskList(newTask);
        clearTaskForm();
    } 
});
function clearTaskForm(){
    document.querySelector('.taskForm').reset();
}
function clearProjectForm(){
    document.querySelector('.form1').reset();
}
function clearPopUpForm(){
    document.querySelector('.pop-up-form').reset();
}
function calculatePriority(date){
    let currentDate=new Date();
    console.log(new Date(date.value));
    let difference=new Date(date.value).getTime()-currentDate.getTime();
    remainingDays=Math.floor(difference/(1000*3600*24));
};

function showTaskList(task){
    const displayTasks=document.querySelector('.displayTasks');
    const table=document.createElement('table');
    table.classList.add('table');
    const row=document.createElement('tr');
    const complete=document.createElement('input');
    complete.classList.add('checkbox');
    complete.setAttribute('type', 'checkbox');
    complete.setAttribute('id', 'checkbox');
    const editButton=document.createElement('button');
    const priorityCell=document.createElement('td');
    const div=document.createElement('div');
    div.classList.add('priorityDiv');
    editButton.classList.add('editButton');
    editButton.innerHTML='Edit';
    editButton.id=task.id;

    editButton.addEventListener('click', function(event){
        editTask(event);
    });
   
    complete.addEventListener('change', ()=>{
        table.remove();
        const index=pSelected.taskList.indexOf(task.id);
        pSelected.taskList.splice(index, 1);
    });

    const cell1=document.createElement('td');
    cell1.classList.add('first-cell');
    cell1.setAttribute('id', task.id);
    const cell2=document.createElement('td');
    cell1.innerHTML=task.title;
    cell2.innerHTML=task.dueDate;
    if(task.priority<=1){
        // div.style.backgroundColor='red';
        priorityCell.style.backgroundColor='red';
    }
    else if(task.priority<=3 && task.priority>1){
        // div.style.backgroundColor='orange';
        priorityCell.style.backgroundColor='orange';

    }
    else if(task.priority>3){
        // div.style.backgroundColor='green';
        priorityCell.style.backgroundColor='green';

    }
    priorityCell.appendChild(div);
    row.appendChild(complete);
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(editButton);
    row.appendChild(priorityCell);
    table.appendChild(row);
    displayTasks.appendChild(table);    
}

document.querySelector('.projectList').addEventListener('click', function (e) {
    let selected;
    if(e.target.tagName==='LI'){
        selected=document.querySelector('li.selected');
        if(selected) selected.className='';
        e.target.className='selected';
    }
});

document.querySelector('.projectList').addEventListener('click', function (e) {
    if(e.target.className='selected'){
        const displayProjectName=document.querySelector('.container-project-name');
        displayProjectName.textContent=e.target.textContent;
        showForm();
        pSelected=projectList.find((project) =>project.name==e.target.textContent);
        const displayTasks=document.querySelector('.displayTasks');
        displayTasks.innerHTML="";
        pSelected.taskList.forEach(element => {
            const table=document.createElement('table');
            table.classList.add('table');
            const row=document.createElement('tr');
            const complete=document.createElement('input');
            complete.classList.add('checkbox');
            complete.setAttribute('type', 'checkbox');
            complete.setAttribute('id', 'checkbox');
            const editButton=document.createElement('button');
            const priorityCell=document.createElement('td');
            const div=document.createElement('div');

            div.classList.add('priorityDiv');
            editButton.classList.add('editButton');
            editButton.innerHTML='Edit';
            editButton.id=element.id;

            editButton.addEventListener('click', function(event){
                editTask(event);
            });
           
            complete.addEventListener('change', ()=>{
                table.remove();
                const index=pSelected.taskList.indexOf(element.id);
                pSelected.taskList.splice(index, 1);
            });
        
            const cell1=document.createElement('td');
            cell1.classList.add('first-cell');
            cell1.setAttribute('id', element.id);
            const cell2=document.createElement('td');
            cell1.innerHTML=element.title;
            cell2.innerHTML=element.dueDate;

            if(element.priority<=1){
                // div.style.backgroundColor='red';
                priorityCell.style.backgroundColor='red';
            }
            else if(element.priority<=3 && element.priority>1){
                // div.style.backgroundColor='orange';
                priorityCell.style.backgroundColor='orange';
            }
            else if(element.priority>3){
                // div.style.backgroundColor='green';
                priorityCell.style.backgroundColor='green';

            }
            priorityCell.appendChild(div);
            row.appendChild(complete);
            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(editButton);
            row.appendChild(priorityCell);
            table.appendChild(row);
            displayTasks.appendChild(table); 
        });
    }
});

function editTask(event){
    openForm();
    const editForm=document.querySelector('.pop-up-form');
    const buttonId=event.target.id;
    console.log(event.target.id);
    console.log(pSelected.taskList[buttonId]);
    selectedTask=pSelected.taskList[buttonId];

    editForm.addEventListener('submit', (e)=>{
        e.preventDefault();

        newTitle=document.querySelector('#new-task-name');
        newDescription=document.querySelector('#new-task-description');
        newDate=document.querySelector('#new-task-date');
        calculatePriority(newDate);

        selectedTask.title=newTitle.value;
        selectedTask.description=newDescription.value;
        selectedTask.dueDate=newDate.value;
        selectedTask.priority=remainingDays;

        console.log(projectList);
        const displayTasks=document.querySelector('.displayTasks');
        displayTasks.innerHTML='';
        
        closeForm();
        pSelected.taskList.forEach(element => {
            const table=document.createElement('table');
            table.classList.add('table');
            const row=document.createElement('tr');
            const complete=document.createElement('input');
            complete.classList.add('checkbox');
            complete.setAttribute('type', 'checkbox');
            complete.setAttribute('id', 'checkbox');
            const editButton=document.createElement('button');
            const priorityCell=document.createElement('td');
            const div=document.createElement('div');
            div.classList.add('priorityDiv');
            editButton.classList.add('editButton');
            editButton.innerHTML='Edit';
            editButton.id=element.id;
        
            editButton.addEventListener('click', function(event){
                editTask(event);
            });
           
            complete.addEventListener('change', ()=>{
                table.remove();
                const index=pSelected.taskList.indexOf(element.id);
                pSelected.taskList.splice(index, 1);
            });
        
            const cell1=document.createElement('td');
            cell1.classList.add('first-cell');
            cell1.setAttribute('id', element.id);
            const cell2=document.createElement('td');
            cell1.innerHTML=element.title;
            cell2.innerHTML=element.dueDate;
            if(element.priority<=1){
                // div.style.backgroundColor='red';
                priorityCell.style.backgroundColor='red';

            }
            else if(element.priority<=3 && element.priority>1){
                // div.style.backgroundColor='orange';
                priorityCell.style.backgroundColor='orange';

            }
            else if(element.priority>3){
                // div.style.backgroundColor='green';
                priorityCell.style.backgroundColor='green';

            }
            priorityCell.appendChild(div);
            row.appendChild(complete);
            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(editButton);
            row.appendChild(priorityCell);
            table.appendChild(row);
            displayTasks.appendChild(table); 
        });

    });
    clearPopUpForm()
}

function openForm() {
    document.querySelector('.formPopup').style.display="block";
}
const cancelBtn=document.querySelector('.pop-up-cancel');
cancelBtn.addEventListener('click', closeForm);
function closeForm() {
    document.querySelector('.formPopup').style.display="none";
}
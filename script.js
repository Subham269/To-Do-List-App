let tasks=JSON.parse(localStorage.getItem("taskHistory"))|| [];
function addTask()
{
    let taskInput = document.getElementById("task-input");
    let category = document.getElementById("category-select");
    let priority = document.getElementById("priority-select");
    
    if(taskInput.value==="")
        return;

    let taskinp =
    {
        id: Date.now(),
        text: taskInput.value,
        category: category.value,
        priority: priority.value,
        completed: false 
    }
    
    tasks.push(taskinp);
    taskInput.value="";
    console.log(tasks);
    localStorage.setItem("taskHistory",JSON.stringify(tasks));
    renderTask(tasks);
}
function renderTask(tasksRe)
{
    let taskText=document.getElementById("tasks");
    taskText.innerHTML="";
    for(let i=0;i<tasksRe.length;i++)
    {
        let taskCard=document.createElement("div");
        let taskInfo=document.createElement("span");
        taskCard.className="task-card";
        taskInfo.textContent=`${tasksRe[i].text} | ${tasksRe[i].category} | ${tasksRe[i].priority}`;
        taskText.appendChild(taskCard);
        taskCard.appendChild(taskInfo);
        
        let completeBtn=document.createElement("button");
        completeBtn.textContent="Yay!";
        taskCard.appendChild(completeBtn);

        let deleteBtn=document.createElement("button");
        deleteBtn.textContent="Noo!";
        taskCard.appendChild(deleteBtn);
        let taskId=tasksRe[i].id;
        deleteBtn.onclick=function() {deleteTask(taskId)};
        completeBtn.onclick=function() {completeTask(taskId)};
        let task_completion=tasksRe[i].completed;
        if(task_completion==true)
        {
            taskCard.style.textDecoration="line-through";
            taskCard.style.opacity="0.5";
        }
    }
}
function deleteTask(someId)
{
    tasks=tasks.filter(task => task.id!=someId);
    localStorage.setItem("taskHistory",JSON.stringify(tasks));
    renderTask(tasks);
}
function completeTask(someId)
{
    for(let i=0;i<tasks.length;i++)
    {
        if(tasks[i].id==someId)
            tasks[i].completed=true;
    }
    localStorage.setItem("taskHistory",JSON.stringify(tasks));
    renderTask(tasks);
}
window.onload = function() {
    document.getElementById("category-filter").onchange = filterTask;
    document.getElementById("priority-filter").onchange = filterTask;
    renderTask(tasks);
}
function filterTask()
{
    let filterCat=document.getElementById("category-filter");
    let filterPri=document.getElementById("priority-filter");
    let filteredTasks;
    if(filterCat.value=="All")
        filteredTasks=tasks;
    else
        filteredTasks=tasks.filter(task=> task.category === filterCat.value);

    if(filterPri.value!="All")
        filteredTasks=filteredTasks.filter(task=> task.priority === filterPri.value);

    renderTask(filteredTasks);
}
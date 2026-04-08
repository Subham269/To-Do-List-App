let tasks=[];
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
    renderTask();
}
function renderTask()
{
    let taskText=document.getElementById("tasks");
    taskText.innerHTML="";
    for(let i=0;i<tasks.length;i++)
    {
        let taskCard=document.createElement("div");
        let taskInfo=document.createElement("span");
        taskCard.className="task-card";
        taskInfo.textContent=`${tasks[i].text} | ${tasks[i].category} | ${tasks[i].priority}`;
        taskText.appendChild(taskCard);
        taskCard.appendChild(taskInfo);
        
        let completeBtn=document.createElement("button");
        completeBtn.textContent="Yay!";
        taskCard.appendChild(completeBtn);

        let deleteBtn=document.createElement("button");
        deleteBtn.textContent="Noo!";
        taskCard.appendChild(deleteBtn);
        let taskId=tasks[i].id;
        deleteBtn.onclick=function() {deleteTask(taskId)};
        completeBtn.onclick=function() {completeTask(taskId)};
        let task_completion=tasks[i].completed;
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
    renderTask();
}
function completeTask(someId)
{
    for(let i=0;i<tasks.length;i++)
    {
        if(tasks[i].id==someId)
            tasks[i].completed=true;
    }
    renderTask();
}
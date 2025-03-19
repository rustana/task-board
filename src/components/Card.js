import React from 'react';
import List from "./List";

const Card = ({list, setList, priorityList, selectedPriorityTemplate,priorityOptionTemplate}) => {
    const updateTask = (oldTask, newTask) => {
        console.log("oldTask", oldTask)
        console.log("newTask", newTask)
        const matchedPriority = priorityList.find(priority => priority.value === newTask.priority);
        const updatedTask =
            matchedPriority!==undefined
                ?{...newTask,color:matchedPriority.color}
                :{...newTask}

        setList(list.map(task => (task.name === oldTask.name ? updatedTask : task)));
    };
    const deleteTask = (taskToDelete) => {
        let updatedList = list.filter((task) => task.name !== taskToDelete.name)
        setList(updatedList)
    }


    return (

    <div  className="card" >

            <List
                list={list}
                updateTask={updateTask}
                deleteTask={deleteTask}
                priorityList={priorityList}
                selectedPriorityTemplate={selectedPriorityTemplate}
                priorityOptionTemplate={priorityOptionTemplate}
            />

        </div>
    );
};

export default Card;
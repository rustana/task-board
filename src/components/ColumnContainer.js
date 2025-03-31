import React from 'react';
import List from "./List";
import Card from "./Card";
import InfoCard from "./InfoCard";

const ColumnContainer = ({list, setList, priorityList, selectedPriorityTemplate, priorityOptionTemplate, setSelectedTask}) => {
    const updateTask = (oldTask, newTask) => {
        console.log("oldTask", oldTask)
        console.log("newTask", newTask)
        const matchedPriority = priorityList.find(priority => priority.value === newTask.priority);
        const updatedTask =
            matchedPriority !== undefined
                ? {...newTask, color: matchedPriority.color}
                : {...newTask}

        setList(list.map(task => (task.name === oldTask.name ? updatedTask : task)));
    };
    const deleteTask = (taskToDelete) => {
        let updatedList = list.filter((task) => task.name !== taskToDelete.name)
        setList(updatedList)
    }


    return (

        <div className="container">
            <div className="list-line">
                {list.map((item, ind) => (
                        <Card item={item}
                              ind={ind}
                              setSelectedTask={setSelectedTask}
                        />
                    )
                )}

                {
                    selectedTask && (
                        <InfoCard
                            item={selectedTask}
                            updateTask={updateTask}
                            selectedTask={selectedTask}
                            setSelectedTask={setSelectedTask}
                            priorityList={priorityList}
                            selectedPriorityTemplate={selectedPriorityTemplate}
                            priorityOptionTemplate={priorityOptionTemplate}
                            deleteTask={deleteTask}
                        />
                    )}


            </div>
        </div>
    );
};

export default  ColumnContainer;
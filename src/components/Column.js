import React, {useState} from 'react';
import Card from "./Card";
import InfoCard from "./InfoCard";
import {rectSortingStrategy, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {useDroppable} from "@dnd-kit/core";

const Column = ({
                    header,
                    id,
                    card,
                    list,
                    setList,
                    priorityList,
                    selectedPriorityTemplate,
                    priorityOptionTemplate,
                    statusId
                }) => {
    const [selectedTask, setSelectedTask] = useState(null)

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
        console.log(list)
        console.log(taskToDelete)
        let updatedList = list.filter((task) => task.id !== taskToDelete)
        console.log(updatedList)
        setList(updatedList)
    }
    const {setNodeRef} = useDroppable({
        id: statusId, // Use statusId here
    });
    return (
        <div className="column" ref={setNodeRef}>
            <h1>{header.toUpperCase()}</h1>
            <SortableContext items={list.map(task => task.id)} strategy={verticalListSortingStrategy}>
                <div className="container" >
                    <div className="list-line" >
                        {list.filter(item=>item.status===header).map(item => (
                                <Card item={item}
                                      id={item.id}
                                      setSelectedTask={setSelectedTask}
                                      key={item.id}
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
            </SortableContext>
        </div>
    );
};

export default Column;
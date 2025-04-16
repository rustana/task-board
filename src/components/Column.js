import React, {useState} from 'react';
import Card from "./Card";
import InfoCard from "./InfoCard";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
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
        let updatedList = list.filter((task) => task.id !== taskToDelete.id)
        setList(updatedList)
    }
    const {setNodeRef} = useDroppable({
        id: statusId,
    });
    return (
        <div className="column" ref={setNodeRef}>
            <h1>{header.toUpperCase()}</h1>
            <SortableContext items={list.filter(task => task.status === header).map(task => task.id)}
                             strategy={verticalListSortingStrategy} >
                {list.filter(item => item.status === header).map(item => (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px"
                        }}
                        key={item.id}
                    >
                        <Card
                            item={item}
                            key={item.id}
                            id={item.id}
                            setSelectedTask={setSelectedTask}
                            deleteTask={deleteTask}
                        />
                    </div>

                        ))}
                        {selectedTask && (
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
                    </SortableContext>
                    </div>
                    );
                };

                export default Column;
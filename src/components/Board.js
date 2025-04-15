import React, {useState} from 'react';
import Column from "./Column";
import Header from "./Header";
import {closestCenter, closestCorners, DndContext, rectIntersection, useDroppable} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";


const Board = () => {
    const initialColumns = [
        {id:1, name:"To Do"},
        {id:2, name:"Assigned"},
        {id:3,name: "In Progress"},
        {id:4,name: "Done"}]
    const [list, setList] = useState([])
    const [columns, setColumns] = useState(initialColumns)
    const [visibleCreateColumn, setVisibleCreateColumn] = useState(false);
    const [visibleDeleteColumn, setVisibleDeleteColumn] = useState(false);


    const priorityList = [
        {name: "Critical", value: "critical", color: "#e71d36"},
        {name: "High", value: "high", color: "#fc7a57"},
        {name: "Medium", value: "medium", color: "#eefc57"},
        {name: "Low", value: "low", color: "#0cce6b"},
        {name: "Optional", value: "optional", color: "#28affa"}
    ]
    const selectedPriorityTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div className="priority" style={{background: option.color}}>
                        <div style={{marginLeft: "30px"}}>{option.name}</div>
                    </div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };
    const priorityOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div className="priority" style={{background: option.color}}></div>
                <div>{option.name}</div>
            </div>
        );
    };
    const addColumn = (newColumn) => {
        const updatedColumnlist = [...columns, newColumn]
        setColumns(updatedColumnlist)
        setVisibleCreateColumn(false)

    }
    const getTaskPosition = (id) => list.findIndex(item => item.id === id)

    const handleDragEnd = (event, status) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const activeTask = list.find(task => task.id === active.id);
            const overTask = list.find(task => task.id === over.id);
            if (activeTask&&overTask) {
                if(activeTask.status!==overTask.status){
                    const overColumn = list.filter(task=>task.id===over.id)[0].status
                    const updatedTasks = list.map(task =>
                        task.id === active.id ? {...task, status: overColumn} : task
                    );
                    setList(updatedTasks);
                }
               else {
                    const oldIndex = list.findIndex((item) => item.id === active.id);
                    const newIndex = list.findIndex((item) => item.id === over.id);
                    setList((items) => arrayMove(items, oldIndex, newIndex));
                }
            }
            if (overTask===undefined){
                const updatedTasks = list.map(task =>
                    task.id === active.id ? {...task, status: over.id} : task)
                setList(updatedTasks)
            }
        }
    };

    return (
        <div>
            <Header list={list}
                    setList={setList}
                    columns={columns}
                    setColumns={setColumns}
                    addColumn={addColumn}
                    visibleCreateColumn={visibleCreateColumn}
                    setVisibleCreateColumn={setVisibleCreateColumn}
                    visibleDeleteColumn={visibleDeleteColumn}
                    setVisibleDeleteColumn={setVisibleDeleteColumn}
                    initialColumns={initialColumns}
                    priorityList={priorityList}
                    selectedPriorityTemplate={selectedPriorityTemplate}
                    priorityOptionTemplate={priorityOptionTemplate}
            />


                <div className="panel">
                    <DndContext collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}>
                    {columns.map(column =>
                        <Column
                            id={column.id}
                            key={column.id}
                            header={column.name}
                            status={column.name}
                            // card={column.name === "To Do"}
                            list={list}
                            statusId={column.name}
                            setList={setList}
                            columns={columns}
                            priorityList={priorityList}
                            selectedPriorityTemplate={selectedPriorityTemplate}
                            priorityOptionTemplate={priorityOptionTemplate}
                        />
                    )}
                    </DndContext>
                </div>

        </div>
    );
};

export default Board;
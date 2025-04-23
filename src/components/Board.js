import React, {useState} from 'react';
import Column from "./Column";
import Header from "./Header";
import {closestCenter,  DndContext, DragOverlay, useSensor, useSensors, MouseSensor} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";
import List from "./List";


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
    const [activeId, setActiveId] = useState(null);




    const priorityList = [
        // {name: "Critical", value: "critical", color: "#e71d36"},
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
    const handleDragEnd = (event) => {
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
    const activeTask = list.find(task => task.id === activeId);

    const handleDragStart = (event) => {
        setActiveId(event.active.id);

    };

    const handleDragCancel = () => {
        setActiveId(null);
    };

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        },
    });
    const sensors = useSensors(
        mouseSensor,
    );

    return (
        <div>
            <h1>TASK BOARD</h1>
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
                                sensors={sensors}
                                onDragEnd={handleDragEnd}
                                onDragStart={handleDragStart}
                                onDragCancel={handleDragCancel}
                    >
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
                        <DragOverlay style={{width:"auto"}}
                        dropAnimation={{
                                duration: 5,
                               }}>
                            {activeId ? (
                                <List  item={activeTask}/>
                            ): null}

                        </DragOverlay>
                    </DndContext>
                </div>

        </div>
    );
};

export default Board;
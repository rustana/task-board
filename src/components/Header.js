import React, {useState} from 'react';
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {Message} from 'primereact/message';

import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Calendar} from "primereact/calendar";
import {Dropdown} from "primereact/dropdown";
import {ChevronRightIcon} from "primereact/icons/chevronright";
import {ChevronDownIcon} from "primereact/icons/chevrondown";
import {v4 as uuidv4} from 'uuid';

const Header = ({
                    list,
                    setList,
                    addColumn,
                    visibleCreateColumn,
                    setVisibleCreateColumn,
                    visibleDeleteColumn,
                    setVisibleDeleteColumn,
                    columns,
                    setColumns,
                    priorityOptionTemplate,
                    priorityList,
                    selectedPriorityTemplate,
                }) => {
    const [columnName, setColumnName] = useState("")
    const [visibleCreateTask, setVisibleCreateTask] = useState(false);
    const [name, setName] = useState("")
    const [date, setDate] = useState(null)
    const [description, setDescription] = useState('')
    const [selectedColumnList, setSelectedColumnList] = useState([]);
    const [selectedPriority, setSelectedPriority] = useState(null)
    const addTask = (name, status, description, date, priority) => {
        const newTask = {
            id: uuidv4(),
            name: name,
            status: "To Do",
            description: description,
            date: date,
            priority: priority
        }
        const matchedPriority = priorityList.find(priority => priority.value === newTask.priority);
        const updatedTask =
            matchedPriority !== undefined
                ? {...newTask, color: matchedPriority.color}
                : {...newTask}
        setList([...list, updatedTask])
        setName("")
        setDate("")
        setDescription("")
        setSelectedPriority(null)
        setVisibleCreateTask(false)
        console.log(updatedTask)
    }
    const handleAddColumnSubmit = () => {
        addColumn({id: uuidv4, name: columnName})
        setVisibleCreateColumn(false)
        setColumnName("")
    }
    const getSelectedColumnsWithTasks=()=> {
        const newList = [...new Set(list.filter(task => task.status !== "To Do").map(item => item.status))];
        return  selectedColumnList.filter(el=>newList.includes(el))
    }


    const updateDeleteColumnList = (column) => {
//unselect
        if (selectedColumnList.includes(column)) {
            const updated = selectedColumnList.filter(col => col !== column)
            setSelectedColumnList(updated)
//select
        } else {
            const updated = [...selectedColumnList, column]
            setSelectedColumnList(updated)
        }
    }
    const deleteSelectedColumns = () => {
        const updated = columns.filter(column => selectedColumnList.includes(column.name) === false)
        setColumns(updated)
        setVisibleDeleteColumn(false)
        setSelectedColumnList([])
    }

    return (
        <div className="header">
            <Button onClick={() => setVisibleCreateTask(true)} label="Create Task" severity="help"/>
            <Dialog header="Create new task" visible={visibleCreateTask} style={{width: '30vw'}} onHide={() => {
                if (!visibleCreateTask) return;
                setVisibleCreateTask(false);
            }}>
                <div className="new-task-form">
                    <label htmlFor="task-name">Task name</label>
                    <InputText value={name} onChange={(e) => setName(e.target.value)}/>
                    <label htmlFor="task-description">Description</label>
                    <InputTextarea value={description} onChange={(e) => setDescription(e.target.value)}/>
                    <div className="card flex justify-content-center" style={{margin: "15px 0"}}>
                        <Dropdown style={{width: "100%"}} value={selectedPriority} onChange={(e) => {
                            setSelectedPriority(e.value);
                        }}
                                  options={priorityList} optionLabel="name" placeholder="Select a Priority"
                                  valueTemplate={selectedPriorityTemplate} itemTemplate={priorityOptionTemplate}
                                  dropdownIcon={(opts) => {
                                      return opts.iconProps['data-pr-overlay-visible']
                                          ? <ChevronRightIcon {...opts.iconProps} />
                                          : <ChevronDownIcon {...opts.iconProps} />;
                                  }}

                        />
                    </div>
                    <label htmlFor="task-due-date">Due Date</label>
                    <Calendar value={date} onChange={(e) => setDate(e.value)} showIcon/>
                </div>
                <div className="form-footer">
                    <Button disabled={name === ""}
                            onClick={() => addTask(name, "To Do", description, date, selectedPriority)}
                            label="Add"
                            severity="help" size="small"/>
                </div>
            </Dialog>
            <div className="column-buttons">
                <Button label="Create Column" onClick={() => {
                    setVisibleCreateColumn(true)
                }}
                        style={{marginRight: "10px"}}></Button>
                <Dialog header="Add Column" visible={visibleCreateColumn} onHide={() => {
                    if (!visibleCreateColumn) return;
                    setVisibleCreateColumn(false);
                }}>
                    <label>Name</label>
                    <InputText value={columnName} onChange={(e) => setColumnName(e.target.value)}
                               style={{margin: "0 10px"}}/>
                    <Button label="Add" disabled={columnName === ''} onClick={() => handleAddColumnSubmit()}></Button>
                </Dialog>
                <Button label="Delete Column" style={{background: "#e71d36"}} onClick={() =>
                    setVisibleDeleteColumn(true)}></Button>
            </div>

            <Dialog header="Delete Column" visible={visibleDeleteColumn} onHide={() => {
                if (!visibleDeleteColumn) return;
                setVisibleDeleteColumn(false)
                setSelectedColumnList([])
                ;
            }}>
                <div>
                    {columns.map((column) => {
                        return (
                            <>
                                <Button
                                    disabled={column.name === "To Do"}
                                    style={{
                                        margin: "0 10px",
                                        background: selectedColumnList.includes(column.name) ? "#4B0082" : "#865BA4"
                                    }}
                                    onClick={() => {
                                        updateDeleteColumnList(column.name);
                                    }}
                                >
                                    {column.name}
                                </Button>
                            </>
                    );
                    })}
                    {getSelectedColumnsWithTasks().length>0&&
                        <div style={{marginTop: "1rem"}}>
                                   <Message
                                            severity="warn"
                                            text={`Warning: There are tasks in the ${getSelectedColumnsWithTasks().join(", ")} column(s). Are you sure you want to delete them?` } />
                                    </div>
                    }
                </div>

                <div style={{display: "flex", justifyContent: "flex-end", marginTop: "10px"}}>
                    <Button
                        style={{background: "red", marginTop: "10px"}}
                        label="Delete"
                        disabled={selectedColumnList.length === 0}
                        onClick={() => deleteSelectedColumns()}
                    />
                </div>
            </Dialog>
        </div>
    );
};

export default Header;
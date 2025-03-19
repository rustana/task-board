import React, {useState} from 'react';
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {RadioButton} from "primereact/radiobutton";
import {Calendar} from "primereact/calendar";
import column from "./Column";
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
    const [description, setDescription] = useState(null)
    const [selectedColumnList, setSelectedColumnList] = useState([]);
    const [selectedPriority, setSelectedPriority] = useState(null)

    const addTask = (name, description, date, priority) => {
        const newTask = {id:uuidv4(), name: name, description: description, date: date, priority: priority}
        const matchedPriority = priorityList.find(priority => priority.value === newTask.priority);
        const updatedTask =
        matchedPriority!==undefined
            ?{...newTask,color:matchedPriority.color}
            :{...newTask}

        console.log(newTask)
        setList([...list, updatedTask])
        setName("")
        setDate("")
        setDescription("")
        setSelectedPriority(null)
        setVisibleCreateTask(false)
    }
    const handleAddColumnSubmit = () => {
        addColumn(columnName)
        setVisibleCreateColumn(false)
        setColumnName("")
    }

    const updateDeleteColumnList = (columnName) => {
        if (selectedColumnList.includes(columnName)) {
            const updated = selectedColumnList.filter(column => column !== columnName)
            setSelectedColumnList(updated)

        } else {
            const updated = [...selectedColumnList, columnName]
            setSelectedColumnList(updated)
        }
    }
    const deleteSelectedColumns = () => {
        const updated = columns.filter(column => selectedColumnList.includes(column) === false)
        setSelectedColumnList([])
        setColumns(updated)
        setVisibleDeleteColumn(false)
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
                    <div className="card flex justify-content-center">
                        <Dropdown value={selectedPriority} onChange={(e) => {
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
                    <Button disabled={name === ""} onClick={() => addTask(name, description, date, selectedPriority)}
                            label="Add"
                            severity="help" size="small"/>
                </div>
            </Dialog>
            <div className="column-buttons">
                <Button label="Create Column" onClick={() => setVisibleCreateColumn(true)}
                        style={{marginRight: "10px"}}></Button>
                <Dialog header="Add Column" visible={visibleCreateColumn} style={{width: '50vw'}} onHide={() => {
                    if (!visibleCreateColumn) return;
                    setVisibleCreateColumn(false);
                }}>
                    <label>Name</label>
                    <InputText value={columnName} onChange={(e) => setColumnName(e.target.value)}/>
                    <Button label="Add" disabled={columnName === ''} onClick={() => handleAddColumnSubmit()}></Button>
                </Dialog>
                <Button label="Delete Column" style={{background:"#e71d36"}} onClick={() => setVisibleDeleteColumn(true)}></Button>
            </div>

            <Dialog header="Delete Column" visible={visibleDeleteColumn} style={{width: '50vw'}} onHide={() => {
                if (!visibleDeleteColumn) return;
                setVisibleDeleteColumn(false);
            }}>
                {columns.map((column, index) => (
                    <Button
                        key={index}
                        disabled={column === "To Do"}
                        style={selectedColumnList.includes(column) ? {background: "red"} : {background: "purple"}}
                        onClick={() => updateDeleteColumnList(column)}
                    >{column}</Button>)
                )}
                <Button
                    label="Delete"
                    disabled={selectedColumnList.length === 0}
                    onClick={() => deleteSelectedColumns()}
                />
                {/*<Button label="Delete" disabled={columnName===''} onClick={()=>setVisibleDeleteColumn(false)}></Button>*/}
            </Dialog>
        </div>
    );
};

export default Header;
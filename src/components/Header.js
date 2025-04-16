import React, {useState} from 'react';
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
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
        const newTask = {id:uuidv4(), name: name, status:"To Do",description: description, date: date, priority: priority}
        const matchedPriority = priorityList.find(priority => priority.value === newTask.priority);
        const updatedTask =
        matchedPriority!==undefined
            ?{...newTask,color:matchedPriority.color}
            :{...newTask}
        setList([...list, updatedTask])
        setName("")
        setDate("")
        setDescription("")
        setSelectedPriority(null)
        setVisibleCreateTask(false)
        console.log(updatedTask)
    }
    const handleAddColumnSubmit = () => {
        addColumn({id:uuidv4,name:columnName})
        setVisibleCreateColumn(false)
        setColumnName("")
    }

    const updateDeleteColumnList = (columnName) => {
        console.log(columnName)
        console.log(selectedColumnList)
        if (selectedColumnList.some(col=>col.name===columnName.name)) {
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
                    <div className="card flex justify-content-center"  style={{margin:"15px 0"}}>
                        <Dropdown style={{width:"100%"}} value={selectedPriority} onChange={(e) => {
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
                    <Button disabled={name === ""} onClick={() => addTask(name, "To Do", description, date, selectedPriority)}
                            label="Add"
                            severity="help" size="small"/>
                </div>
            </Dialog>
            <div className="column-buttons">
                <Button label="Create Column" onClick={() => {
                    setVisibleCreateColumn(true)
                }}
                        style={{marginRight: "10px"}}></Button>
                <Dialog header="Add Column" visible={visibleCreateColumn}  onHide={() => {
                    if (!visibleCreateColumn) return;
                    setVisibleCreateColumn(false);
                }}>
                    <label>Name</label>
                    <InputText value={columnName} onChange={(e) => setColumnName(e.target.value)} style={{margin:"0 10px"}}/>
                    <Button label="Add" disabled={columnName === ''} onClick={() => handleAddColumnSubmit()}></Button>
                </Dialog>
                <Button label="Delete Column" style={{background:"#e71d36"}} onClick={() =>
                    setVisibleDeleteColumn(true)}></Button>
            </div>

            <Dialog header="Delete Column" visible={visibleDeleteColumn} onHide={() => {
                if (!visibleDeleteColumn) return;
                setVisibleDeleteColumn(false);
            }}>
                <div>
                    {columns.map((column) => (
                        <Button
                            key={column.id}
                            disabled={column.name === "To Do"}
                            style={{
                                margin: "0 10px",
                                background: selectedColumnList.includes(column) ? "green" : "purple"
                            }}
                            onClick={() => updateDeleteColumnList(column)}
                        >{column.name}</Button>)
                    )}
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                <Button
                    style={{background: "red", marginTop: "10px"}}
                    label="Delete"
                    disabled={selectedColumnList.length === 0}
                    onClick={() => deleteSelectedColumns()}
                />
                </div >
                {/*<Button label="Delete" disabled={columnName===''} onClick={()=>setVisibleDeleteColumn(false)}></Button>*/}
            </Dialog>
        </div>
    );
};

export default Header;
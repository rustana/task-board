import React, {useEffect, useState} from 'react';
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Calendar} from "primereact/calendar";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import {ChevronRightIcon} from "primereact/icons/chevronright";
import {ChevronDownIcon} from "primereact/icons/chevrondown";

const InfoCard = ({item, updateTask, selectedTask, setSelectedTask, priorityList, priorityOptionTemplate, selectedPriorityTemplate, deleteTask}) => {
    const [updatedTask, setUpdatedTask]=useState({...item})
    const [selectedPriority, setSelectedPriority] = useState(null)

    useEffect(() => {
        if (selectedTask) {
            setUpdatedTask({ ...selectedTask });
        }
    }, [selectedTask]);


    const handleSaveClicked=()=>{
        updateTask(selectedTask, updatedTask);
        setSelectedTask(null)
    }
    console.log(item)

    return (
        <>
            {/*<i className='pi pi-info' style={{color: 'white'}} onClick={() => setSelectedTask(item)}/>*/}
            <Dialog header="Task Info"
                    style={{width: '30vw'}}
                    visible={!!selectedTask}
                    onHide={() => setSelectedTask(null)}
            >
                {selectedTask && (
                    <div className="new-task-form">
                        <label htmlFor="task-name">Task name</label>
                        <InputText value={updatedTask.name}
                                   onChange={(e) => setUpdatedTask({...updatedTask, name: e.target.value})}/>
                        <label htmlFor="task-description">Description</label>
                        <InputTextarea value={updatedTask.description}
                                       onChange={(e) => setUpdatedTask({...updatedTask, description: e.target.value})}/>
                        <label htmlFor="task-due-date">Due Date</label>
                        <div className="card flex justify-content-center">
                            <Dropdown value={updatedTask.priority}  onChange={(e) => {
                                setSelectedPriority(e.value)
                                console.log("selectedPriority", e.value)
                                setUpdatedTask({...updatedTask, priority: e.value})
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
                        <Calendar value={updatedTask.date}
                                  onChange={(e) => setUpdatedTask({...updatedTask, date: e.value})} showIcon/>

                        <div style={{textAlign: "center"}}>

                            <Button label="Save Changes" onClick={() => handleSaveClicked()} style={{margin: "10px"}}></Button>
                            <Button label="Delete Task"  style={{margin: "10px", background:"#e71d36"}}
                               onClick={(e) => {deleteTask(item); setSelectedTask(false)}}/>
                        </div>
                    </div>)}
            </Dialog>

        </>
    );
};

export default InfoCard;
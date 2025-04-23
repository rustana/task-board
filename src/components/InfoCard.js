import React, {useEffect, useState} from 'react';
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Calendar} from "primereact/calendar";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import {ChevronRightIcon} from "primereact/icons/chevronright";
import {ChevronDownIcon} from "primereact/icons/chevrondown";

const InfoCard = ({
                      item,
                      updateTask,
                      selectedTask,
                      setSelectedTask,
                      priorityList,
                      priorityOptionTemplate,
                      selectedPriorityTemplate,
                      deleteTask
                  }) => {
    const [updatedTask, setUpdatedTask] = useState({...item})
    const [buttonEditClicked, setButtonEditClicked] = useState(false)
    const [selectedPriority, setSelectedPriority] = useState(null)

    useEffect(() => {
        if (selectedTask) {
            setUpdatedTask({...selectedTask});
        }
    }, [selectedTask]);


    const handleSaveClicked = () => {
        updateTask(selectedTask, updatedTask);
        setSelectedTask(null)
    }
    const editTask = () => {
        setButtonEditClicked(true)
        console.log(buttonEditClicked)
    }
    return (
        <>
            {/*<i className='pi pi-info' style={{color: 'white'}} onClick={() => setSelectedTask(item)}/>*/}
            <Dialog header="Task Info"
                    style={{width: '30vw'}}
                    visible={!!selectedTask}
                    onHide={() => {
                        setSelectedTask(null);
                        setButtonEditClicked(false)
                    }}
            >
                {selectedTask && (
                    <div className="new-task-form">
                        <label htmlFor="task-name">Task name</label>
                        <InputText value={updatedTask.name}
                                   disabled={!buttonEditClicked}
                                   onChange={(e) => setUpdatedTask({...updatedTask, name: e.target.value})}/>
                        <label htmlFor="task-description">Description</label>
                        <InputTextarea value={updatedTask.description}
                                       disabled={!buttonEditClicked}
                                       onChange={(e) => setUpdatedTask({...updatedTask, description: e.target.value})}/>

                        <div className="card flex justify-content-center" style={{margin: "15px 0"}}>

                            <Dropdown style={{width: "100%"}}
                                      value={updatedTask.priority}
                                      disabled={!buttonEditClicked}
                                      onChange={(e) => {
                                          setSelectedPriority(e.value)
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
                        <label htmlFor="task-due-date">Due Date</label>
                        <Calendar value={updatedTask.date}
                                  disabled={!buttonEditClicked}
                                  onChange={(e) => setUpdatedTask({...updatedTask, date: e.value})} showIcon/>

                        <div style={{textAlign: "center"}}>

                            <Button label={!buttonEditClicked ? "Edit Task" : "Save Changes"} style={{marginTop:"20px",background:buttonEditClicked? "#4B9A1B":"#bf00ff"}}
                                    onClick={() => {
                                        !buttonEditClicked ? editTask() : handleSaveClicked()
                                    }}
                            ></Button>
                        </div>
                    </div>)}
            </Dialog>

        </>
    );
};

export default InfoCard;
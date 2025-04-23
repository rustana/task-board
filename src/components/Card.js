import React, { useState } from 'react';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const Card = ({ item, setSelectedTask, id, deleteTask }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform
    } = useSortable({ id });
    const [deleteClicked, setDeleteClicked] = useState(false);


    const style = {
        transform: CSS.Transform.toString(transform),
        border: `1px solid ${item.color || "#ddd"}`,
        borderRadius: "5px",
    }

    return (
        <div className="list-line"     style={style}>
            <div className="list-item" ref={setNodeRef}
                 {...attributes}
                 {...listeners}>
               <span className="label">{item.name}</span>
                <i
                    className="pi pi-align-justify"
                    onClick={() => {
                        setSelectedTask(item);
                    }}
                    style={{cursor: "pointer"}}
                ></i>
                <i
                    className="pi pi-trash"
                    onClick={() => {
                        setDeleteClicked(true);
                    }}
                    style={{cursor: "pointer"}}
                ></i>

            </div>
            {deleteClicked && (
                <div  style={{ display: "flex", flexDirection: "column", justifyContent:"center", width: '30vw' }}>
                <Dialog
                    onHide={() => setDeleteClicked(false)}
                    header="Confirm"
                    visible={deleteClicked}

                >
                    <div >
                    <Button
                        label="Delete"
                        icon="pi pi-check"
                        style={{ background: "red" }}
                        onClick={() => {
                            deleteTask(item);
                            setDeleteClicked(false);
                        }}
                    />
                    <Button
                        label="Cancel"
                        icon="pi pi-times"
                        style={{ background: "green" }}
                        onClick={() =>
                            setDeleteClicked(false)
                        }
                    />
                    </div>
                </Dialog>
                </div>
            )}



        </div>
    );
};

export default Card;

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
                {item.name}
                <i
                    className="pi pi-align-justify"
                    onDoubleClick={() => {
                        setSelectedTask(item);
                    }}
                    style={{cursor: "pointer"}}
                ></i>
                <i
                    className="pi pi-trash"
                    onDoubleClick={() => {
                        setSelectedTask(item);
                    }}
                    style={{cursor: "pointer"}}
                ></i>

            </div>
            {deleteClicked && (
                <Dialog
                    onHide={() => setDeleteClicked(false)}
                    header="Confirm"
                    visible={deleteClicked}
                    style={{ width: '30vw' }}
                >
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
                </Dialog>
            )}



        </div>
    );
};

export default Card;

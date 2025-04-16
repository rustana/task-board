import React, { useState } from 'react';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import {useDroppable} from "@dnd-kit/core";

const List = ({ item, setSelectedTask, id, deleteTask }) => {

    const [deleteClicked, setDeleteClicked] = useState(false);


    const style = {

        border: `1px solid ${item.color || "#ddd"}`,
        borderRadius: "5px",
        width:"260px"

    }

    return (
        <div className="list-line" style={style}>
            <div className="list-item">
                {item.name}
                <i className="pi pi-align-justify"></i>
                <i className="pi pi-trash"></i>
            </div>
        </div>
    );
};

export default List;

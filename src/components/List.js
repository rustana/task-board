import React, { useState } from 'react';

const List = ({ item, setSelectedTask, id, deleteTask }) => {



    const style = {

        border: `1px solid ${item.color || "#ddd"}`,
        borderRadius: "5px",
        width:"260px"

    }

    return (
        <div className="list-line" style={style}>
            <div className="list-item">
                <span className="label">{item.name}</span>
                <i className="pi pi-align-justify"></i>
                <i className="pi pi-trash"></i>
            </div>
        </div>
    );
};

export default List;

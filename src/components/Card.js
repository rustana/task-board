import React from 'react';
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

const Card = ({item, key, setSelectedTask}) => {

    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
        id:item.id})
    const style = {transition, transform: CSS.Transform.toString(transform)}

    return (
        <div>
            < div
                ref={setNodeRef}
                  {...attributes}
                  {...listeners}
                  style={style}>
                <li key={key} className="list-item"
                    onDoubleClick={() =>
                    setSelectedTask(item)
                }>
                    {item.name}
                    <div className="priority" style={{background: item.color}}></div>
                </li>

            </div>
        </div>
    );
};

export default Card;
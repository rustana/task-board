import React from 'react';
             import { useSortable } from "@dnd-kit/sortable";
             import { CSS } from "@dnd-kit/utilities";
import {useDraggable} from "@dnd-kit/core";

             const Card = ({ item, setSelectedTask }) => {
                 const { attributes, listeners, setNodeRef, transform } = useDraggable({
                     id: item.id
                 });

                 const style = {
                     transform: CSS.Transform.toString(transform),
                     // transition: transition || "transform 0.25s ease",
                     border: `1px solid ${item.color ? item.color : "#ddd"}`,
                 };

                 return (
                     <div className="list-line" ref={setNodeRef} style={style} {...attributes} {...listeners}>
                         <div className="list-item">
                             {item.name}
                         </div>
                         <div className="icons-container">
                             <i className="pi pi-align-justify" onClick={() => setSelectedTask(item)}></i>
                             <i className="pi pi-trash"></i>
                         </div>
                     </div>
                 );
             };

             export default Card;
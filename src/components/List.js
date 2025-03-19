import React, {useEffect, useState} from 'react';
import InfoCard from "./InfoCard";

const List = ({list, updateTask, deleteTask, priorityList, selectedPriorityTemplate, priorityOptionTemplate}) => {
    const [selectedTask, setSelectedTask] = useState(null)
    console.log(list)


    // Effect to update colors whenever the list or priorityList changes
    // Dependency on list and priorityList
    return (
        <div className="list-line">
            {list.map((item, ind) => (
                    < div style={{display: "flex", alignItems: "center"}}>
                        <li key={ind} className="list-item" onClick={() => setSelectedTask(item)} dragdrop>
                            {item.name}
                            <div className="priority" style={{background: item.color}}></div>
                        </li>

                    </div>
                )
            )}

            {
                selectedTask && (
                    <InfoCard
                        item={selectedTask}
                        updateTask={updateTask}
                        selectedTask={selectedTask}
                        setSelectedTask={setSelectedTask}
                        priorityList={priorityList}
                        selectedPriorityTemplate={selectedPriorityTemplate}
                        priorityOptionTemplate={priorityOptionTemplate}
                        deleteTask={deleteTask}
                    />
                )}


        </div>
    );
};

export default List;
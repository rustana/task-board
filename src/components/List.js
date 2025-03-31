import React, {useEffect, useState} from 'react';
import InfoCard from "./InfoCard";
import Card from "./Card";

const List = ({list, updateTask, deleteTask, priorityList, selectedPriorityTemplate, priorityOptionTemplate}) => {
    const [selectedTask, setSelectedTask] = useState(null)
    console.log(list)

    return (
        <div className="list-line">
            {list.map((item, ind) => (
                    <Card item={item}
                          ind={ind}
                          setSelectedTask={setSelectedTask}
                    />
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
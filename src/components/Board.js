import React, {useState} from 'react';
import Column from "./Column";
import Header from "./Header";


const Board = () => {
    const initialColumns = ["To Do", "Assigned", "In Progress", "Done"]
    const [list, setList] = useState([])
    const [columns, setColumns] = useState(initialColumns)
    const [visibleCreateColumn, setVisibleCreateColumn] = useState(false);
    const [visibleDeleteColumn, setVisibleDeleteColumn] = useState(false);


    const priorityList=[
        {name: "Critical", value: "critical", color:"#e71d36"},
        {name: "High", value: "high", color:"#fc7a57"},
        {name: "Medium", value: "medium", color:"#eefc57"},
        {name: "Low", value: "low",color:"#0cce6b"},
        {name: "Optional", value: "optional",color:"#28affa"}
    ]
    const selectedPriorityTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div className="priority" style={{background: option.color}}>
                        <div style={{marginLeft: "30px"}}>{option.name}</div>
                    </div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };
    const priorityOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div className="priority" style={{background: option.color}}></div>
                <div>{option.name}</div>
            </div>
        );
    };
    const addColumn = (newColumn) => {
        const updatedColumnlist = [...columns, newColumn]
        setColumns(updatedColumnlist)
        setVisibleCreateColumn(false)

    }
    return (
        <div>
            <Header list={list}
                    setList={setList}
                    columns={columns}
                    setColumns={setColumns}
                    addColumn={addColumn}
                    visibleCreateColumn={visibleCreateColumn}
                    setVisibleCreateColumn={setVisibleCreateColumn}
                    visibleDeleteColumn={visibleDeleteColumn}
                    setVisibleDeleteColumn={setVisibleDeleteColumn}
                    initialColumns={initialColumns}
                    priorityList={priorityList}
                    selectedPriorityTemplate={selectedPriorityTemplate}
                    priorityOptionTemplate={priorityOptionTemplate}/>

            <div className="panel">
                {columns.map((column, index) => (

                    <Column key={index}
                            header={column}
                            card={column === "To Do"}
                            list={list}
                            setList={setList}
                            columns={columns}
                            priorityList={priorityList}
                            selectedPriorityTemplate={selectedPriorityTemplate}
                            priorityOptionTemplate={priorityOptionTemplate}
                    />
                ))}
            </div>
        </div>
    );
};

export default Board;
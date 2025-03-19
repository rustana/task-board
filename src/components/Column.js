import React from 'react';
import Card from "./Card";

const Column = ({header, card, list, columns, setList, priorityList, selectedPriorityTemplate, priorityOptionTemplate}) => {
    console.log(card)
    return (
        <div className="column">

            <h1>{header.toUpperCase()}</h1>
            {(card && list.length !== 0) && <Card list={list}
                                                  setList={setList}
                                                  priorityList={priorityList}
                                                  selectedPriorityTemplate={selectedPriorityTemplate}
                                                  priorityOptionTemplate={priorityOptionTemplate}/>

                    }

        </div>
    );
};

export default Column;
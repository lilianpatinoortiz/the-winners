import React from 'react';
import {DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function KanbanBoard() {
    const [completed, setCompleted] = useState([]);
    const [incomplete, setIncomplete] = useState([]);

    return (
        <DragDropContext>
            <h2 style={{ textAlign: "center "}}>Progress Board</h2>

            <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
            }}>



            </div>

        </DragDropContext>
    )
}
import { useEffect, useState } from "react";
import "./App.css";
import Board from "./assets/components/KanbanBoard/Board";
import Editable from "./assets/components/Editable/Editable";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import "../bootstrap.css";

function App() {

  const [data, setData] = useState(
    localStorage.getItem("kanban-board")
      ? JSON.parse(localStorage.getItem("kanban-board"))
      : []
  );

  const setName = (title, bid) => {
    const index = data.findIndex((item) => item.id === bid);
    const tempData = [...data];
    tempData[index].boardName = title;
    setData(tempData);
  };

  const dragCardInBoard = (source, destination) => {
    let tempData = [...data];
    const destinationBoardIdx = tempData.findIndex(
      (item) => item.id.toString() === destination.droppableId
    );
    const sourceBoardIdx = tempData.findIndex(
      (item) => item.id.toString() === source.droppableId
    );
    tempData[destinationBoardIdx].card.splice(
      destination.index,
      0,
      tempData[sourceBoardIdx].card[source.index]
    );
    tempData[sourceBoardIdx].card.splice(source.index, 1);

    return tempData;

    const addBoard = (title) => {
      const tempData = [...data];
      tempData.push({
        id: uuidv4(),
        boardName: title,
        card: [],
      });
      setData(tempData);
    };
  
    const removeBoard = (bid) => {
      const tempData = [...data];
      const index = data.findIndex((item) => item.id === bid);
      tempData.splice(index, 1);
      setData(tempData);
    };

    const onDragEnd = (result) => {
      const { source, destination } = result;
      if (!destination) return;
  
      if (source.droppableId === destination.droppableId) return;
  
      setData(dragCardInBoard(source, destination));
    };

    useEffect(() => {
      localStorage.setItem("kanban-board", JSON.stringify(data));
    }, [data]);
  
  
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App" data-theme={theme}>
        <Navbar switchTheme={switchTheme} />
        <div className="app_outer">
          <div className="app_boards">
            {data.map((item) => (
              <Board
                key={item.id}
                id={item.id}
                name={item.boardName}
                card={item.card}
                setName={setName}
                addCard={addCard}
                removeCard={removeCard}
                removeBoard={removeBoard}
                updateCard={updateCard}
              />
            ))}
            <Editable
              class={"add__board"}
              name={"Add Board"}
              btnName={"Add Board"}
              onSubmit={addBoard}
              placeholder={"Enter Board  Title"}
            />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App

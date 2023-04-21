import React from "react";
import Sidebar from "./Sidebar";
import { BsCheckSquare } from "react-icons/bs"; //RiDeleteBin6Line
import { RiDeleteBin6Line } from "react-icons/ri"; //
import { TbGridDots } from "react-icons/tb"; //
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// TbGridDots
const AllTodos = ({ Todos, setTodos }) => {
  // console.log("setTodos", setTodos);
  const MarkDoneTodo = async (_id) => {
    const { data } = await axios.patch(
      `http://localhost:5002/api/todos/${_id}`,
      {
        status: true,
      }
    );
    console.log("data in MarkDoneTodo ", data.todos);
    setTodos([...data.todos]);
  };
  const DeleteTodo = async (_id) => {
    // DeleteTodo
    const { data } = await axios.delete(
      `http://localhost:5002/api/todos/${_id}`
    );
    console.log("data in DeleteTodo ", data);
    setTodos([...data.todos]);
  };
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    console.log("resul", result);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    console.log("result", result);
    const items = reorder(Todos, result.source.index, result.destination.index);
    console.log("items", items);
    setTodos([...items]);
  };

  const updatePosition = async () => {
    let newTodos = [];
    Todos.forEach((todo, index) => {
      console.log("todo", todo);
      newTodos.push({ ...todo, orderIndex: index });
    });
    let promises = [];
    console.log("updaing the pos;", newTodos);
    let updatedTodo = [];
    /**    */
    for (let i = 0; i < newTodos.length; i++) {
      let { data } = await axios.patch(
        `http://localhost:5002/api/todos/${newTodos[i]._id}`,
        { ...newTodos[i] }
      );
      updatedTodo = data.todos;
    }
    console.log("updatedTodo", updatedTodo);
    setTodos(updatedTodo);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex min-h-[100vh]">
        <Sidebar />
        <div className="bg-green-100 px-20 py-10 flex-auto flex ">
          <div className="w-[30vw]">
            <Droppable droppableId="droppable">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {Todos?.map((todo, index) => {
                    // console.log("todo", todo);
                    return (
                      <Draggable
                        draggableId={todo._id}
                        key={todo._id}
                        index={index}
                      >
                        {(provided_) => (
                          <div
                            {...provided_.draggableProps}
                            {...provided_.dragHandleProps}
                            ref={provided_.innerRef}
                            className="my-2 border-2 border-stone-800 rounded-lg flex max-w-sm justify-between  bg-green-100 p-3 "
                          >
                            <div className="px-1 my-auto cursor-pointer ">
                              <TbGridDots />
                            </div>
                            <div>
                              <div
                                className={`${
                                  todo.status ? "line-through" : ""
                                }`}
                              >
                                {todo.text}
                              </div>
                              <p>{todo.createdBy} </p>
                            </div>
                            <div>
                              <BsCheckSquare
                                className="my-2 cursor-pointer "
                                onClick={() => MarkDoneTodo(todo._id)}
                              />
                              <RiDeleteBin6Line
                                className="my-2 cursor-pointer "
                                onClick={() => DeleteTodo(todo._id)}
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className="mx-5">
            <button
              onClick={() => updatePosition()}
              className="bg-green-400 px-5 py-3 rounded-lg"
            >
              Update the positions
            </button>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default AllTodos;

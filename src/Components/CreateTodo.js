import React, { useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

const CreateTodo = ({ setTodos }) => {
  const [state, setstate] = useState(null);
  const addTodo = async () => {
    console.log("state", state);
    if (
      state === null ||
      state === undefined ||
      !state.text ||
      !state.createdBy
    )
      return;
    console.log("getting data");
    const { data } = await axios.post("http://localhost:5002/api/todos/", {
      ...state,
    });
    console.log("allTodos,", data);
    setTodos(data.todos);
  };
  return (
    <>
      <div className="flex min-h-[100vh]">
        <Sidebar />
        <div className="bg-green-100 px-20 py-10 flex-auto ">
          <div className="my-5 flex max-w-[15vw] flex-col  ">
            <label htmlFor="text">Description</label>
            <input
              type="text"
              id="text"
              className="bg-slate-300 px-2 py-2 "
              name="text"
              onChange={(e) =>
                setstate({ ...state, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="my-5 flex max-w-[15vw] flex-col  ">
            <label htmlFor="owner">Your name</label>
            <input
              id="owner"
              type="text"
              className="bg-slate-300 px-2 py-2 "
              name="createdBy"
              onChange={(e) =>
                setstate({ ...state, [e.target.name]: e.target.value })
              }
            />
          </div>
          <button
            className="bg-green-400 px-5 py-3 rounded-md "
            onClick={() => addTodo()}
          >
            Add TODO
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateTodo;

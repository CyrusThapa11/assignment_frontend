import "./App.css";
import React, {
  PureComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Sidebar from "./Components/Sidebar";
import { Route, Routes } from "react-router-dom";
import CreateTodo from "./Components/CreateTodo";
import AllTodos from "./Components/AllTodos";
import Home from "./Components/Home";
import axios from "axios";

function App() {
  const [Todos, setTodos] = useState([
    {
      _id: "lorem1",
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. In, impedit.",
      createdBy: "naman Kumar",
    },
    {
      _id: "lorem2",
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. In, impedit.",
      createdBy: "Lartik Kumar",
    },
    {
      _id: "lorem3",
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. In, impedit.",
      createdBy: "Mihir Kumar",
    },
    {
      _id: "lorem4",
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. In, impedit.",
      createdBy: "Dhruv Kumar",
    },
  ]);
  const getTodos = async () => {
    console.log("getting todods");
    const { data } = await axios.get("http://localhost:5002/api/todos/");
    let todos = data.todos;
    todos.sort((a, b) => {
      return a.orderIndex - b.orderIndex;
    });
    setTodos(todos);
  };

  useEffect(() => {
    getTodos();
    return () => {};
  }, []);

  return (
    <>
      <div>
        <Routes>
          <Route
            path="/create"
            exact
            element={<CreateTodo setTodos={setTodos} />}
          />
          <Route
            path="/"
            exact
            element={<AllTodos Todos={Todos} setTodos={setTodos} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;

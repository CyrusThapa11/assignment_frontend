import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[20vw] min-h-[80vh] bg-green-200 flex flex-col bg px-10 py-10  w-70  ">
      <Link to="/" className="hover:bg-green-100 cursor-pointer px-4 py-2">
        <div>Todos</div>
      </Link>
      <Link
        className="hover:bg-green-100 cursor-pointer px-4 py-2"
        to="/create"
      >
        <div>Create Todo</div>
      </Link>
    </div>
  );
};

export default Sidebar;

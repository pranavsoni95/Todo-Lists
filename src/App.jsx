import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){

      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLS = () => {
    localStorage.setItem("todos" , JSON.stringify(todos))
  }
  

  const handleEdit = (e, id) => {
    let t = todos.filter((i) =>i.id === id
    );
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id
    });
    setTodos(newTodos);
    saveToLS();

  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isComplete: false }]);
    setTodo("");
    console.log(todos);
    saveToLS();

  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isComplete = !newTodos[index].isComplete;
    setTodos(newTodos);
    saveToLS();

  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-teal-100 min-h-[80vh] md:w-1/2">
         <h1 className="font-bold text-center text-xl">iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-lg my-5 font-bold">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full px-2 rounded-md"
          />
          <button
            onClick={handleAdd} disabled={todo.length<=2}
            className="border bg-teal-400 border-zinc-950  rounded-sm px-3 py-[0.5px] hover:bg-teal-500 duration-75"
          >
            Save
          </button>
        </div>
        <div className="w-[100%]">
          <h2 className="text-lg font-bold">Yours Todos</h2>
          <div className="todos">
            {todos.length === 0 && (
              <div className="mx-5">No Todos to display</div>
            )}
            {todos.map((item) => {
              return (
                <div
                  key={item.id}
                  className="todo w-[56%] justify-between my-3 flex"
                >
                  <div className="flex gap-2">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isComplete}
                    />
                    <div className={item.isComplete ? "line-through" : ""}>
                      {" "}
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full mx-9">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="mx-2 border bg-teal-200 border-zinc-950 rounded-sm px-3 py-[0.5px] hover:bg-teal-500 duration-75"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="mx-2 border bg-teal-200 border-zinc-950 rounded-sm px-3 py-[0.5px] hover:bg-teal-500 duration-75"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

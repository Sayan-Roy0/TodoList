import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, settodo] = useState(""); //It hold input for temporary
  const [todos, settodos] = useState([]); //It store the inputs

  const [check, setcheck] = useState(false); //checking for is the task is completed or not
  const [nTodo, setnTodo] = useState(); //Making Your todos to No todos

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      //if todoString is not null then move towards
      let todos = JSON.parse(localStorage.getItem("todos"));
      settodos(todos);
    }
  }, []);

  //This useEffect is for rendering the web for noTodo() and BtnColor() function
  useEffect(() => {
    noTodo();
    BtnColor();
  });

  //It make todos as a string and store it in localstorage
  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  //Making Your Todos to No Todos
  const noTodo = () => {
    let count = 0;
    todos.forEach((item) => {
      if (item.isCompleted === true) {
        count = count + 1;
      }
      if (count === todos.length) {
        setnTodo(true);
      } else {
        setnTodo(false);
      }
    });
  };

  //Color chenge the clicked button
  const BtnColor = () => {
    if (check === true) {
      document.querySelector(".FinishTodo").style.color = "black";
      document.querySelector(".NoTodos").style.color = "gray";
    } else {
      document.querySelector(".FinishTodo").style.color = "gray";
      document.querySelector(".NoTodos").style.color = "black";
    }
  };

  //Showing Todos and Finished Todos
  const finished = () => {
    setcheck(true);
  };
  const yourTodos = () => {
    setcheck(false);
  };

  //Handling the Edit button
  const handleEdit = (e, id) => {
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    settodo(todos[index].todo);
    let newTodos = [];
    todos.forEach((item) => {
      if (item.id != id) {
        newTodos.push(item);
      }
    });
    settodos(newTodos);
    saveToLS();
  };

  //Handling the Delete button
  const handleDelete = (id) => {
    let result = confirm("Are you sure you want to delete it");
    if (result === true) {
      let newTodos = [];
      todos.forEach((item) => {
        if (item.id != id) {
          newTodos.push(item);
        }
      });
      settodos(newTodos);
      saveToLS();
    }
  };

  //Handling the Save button
  const handleSave = () => {
    todo.length !== 0 &&
      settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    // noTodo()
    saveToLS();
    settodo("");
  };

  //Handling the Inputs
  const handleChange = (e) => {
    if (e.target.value != " ") {
      settodo(e.target.value); //Another way to do this, I can add a function on button disabled={todo.length<0}   it make the button disabled when the length is lessthan 0
    } //Also I can add tailwindcss disabled:bg-black
  };

  //Handling the CheckBoxes
  const handleDone = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted; //Reason of doing this is for rerendering by settodos
    settodos(newTodos);
    //noTodo()
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="container bg-violet-200  m-auto   mt-[10px] sm:w-[45vw] w-[660px] sm:h-[85vh] h-[1200px] p-3 rounded-xl shadow-2xl shadow-slate-950  ">
        <h1 className="text-gray-800 font-bold lg:text-2xl text-3xl m-auto text-center mb-7 ">
          TODO
        </h1>
        <div className="">
          <div className="addTodo flex flex-col gap-3 mb-3 border-b border-gray-800">
            <p className="font-bold lg:text-xl text-2xl">Add a Todo</p>
            <div className="input mb-2">
              <input
                type="text"
                className="rounded-3xl w-[85%] px-2 ml-1 lg:py-[5px] py-[6px] shadow-lg text-lg"
                onChange={handleChange}
                value={todo}
              />
              <button
                onClick={handleSave}
                className="bg-violet-800 text-white hover:bg-violet-900 py-[10px] px-5 lg:rounded-2xl rounded-full text-xs  font-bold ml-3 shadow-lg"
              >
                Save
              </button>
            </div>
          </div>
          <div className="yourTodos">
            <div className=" flex items-center gap-5">
              {nTodo || todos.length === 0 ? (
                <p
                  onClick={yourTodos}
                  className="NoTodos font-bold mb-2 cursor-pointer lg:text-xl text-2xl"
                >
                  No Todos
                </p>
              ) : (
                <p
                  onClick={yourTodos}
                  className="NoTodos font-bold mb-2 cursor-pointer lg:text-xl text-2xl"
                >
                  Your Todos
                </p>
              )}
              <p
                onClick={finished}
                className="FinishTodo font-bold mb-2 cursor-pointer lg:text-xl text-2xl"
              >
                Finished Todos
              </p>
            </div>
            <div className="todos flex flex-col  gap-2 lg:h-[50vh] sm:h-[60vh] h-[100vh] overflow-auto overflow-x-hidden">
              {todos.map((item) => {
                return (
                  (check ? item.isCompleted : !item.isCompleted) && (
                    <div
                      key={item.id}
                      className="todo flex  gap-3 sm:w-[620px] w-[590px] bg-gray-400 justify-between lg:py-[2px] py-2 px-2 rounded-md items-center shadow-md mx-5"
                    >
                      <div className="flex gap-2">
                        <input
                          type="checkbox"
                          className="cursor-pointer"
                          onChange={handleDone}
                          name={item.id}
                          checked={item.isCompleted} //when isCompleted is true then the checkbox is checked
                          id=""
                        />
                        <div
                          className={
                            item.isCompleted
                              ? "line-through w-[270px] break-words lg:text-lg text-xl"
                              : " w-[270px] break-words lg:text-lg text-xl"
                          }
                        >
                          {item.todo}
                        </div>
                      </div>
                      <div className="buttons flex gap-2 ">
                        <button
                          onClick={(e) => {
                            handleEdit(e, item.id);
                          }}
                          className="bg-violet-800 text-white hover:bg-violet-900 lg:py-[5px] py-2 px-2  rounded-lg text-xs font-bold"
                        >
                          <img src="./image/edit.svg" alt="Edit" />
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                          className="bg-violet-800 text-white hover:bg-violet-900 lg:py-[5px] py-2 px-2  rounded-lg text-xs font-bold"
                        >
                          <img src="delete.svg" alt="Delete" />
                        </button>
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

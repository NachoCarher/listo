import { useState, useRef, useReducer } from "react";
import logo from "../assets/logo.avif";
import TasksList from "./TasksList";

// a mejorar: añadir el local storage

function reducer(state, action) {
  switch (action.type) {
    case "add":
      if (!action.payload.task) return state;

      return [...state, action.payload];
    case "delete":
      const newList = state.filter((task) => task.id !== action.payload.id);
      return newList;
    default:
      throw Error("Unknown action");
  }
}

function App() {
  const initialValue = { task: "", id: -1 };
  const [state, dispatch] = useReducer(reducer, []);
  const [taskToAdd, setTaskToAdd] = useState(initialValue);
  const counterRef = useRef(0);

  // const [tasksList, setTasksList] = useState(function () {
  //   const storedValue = localStorage.getItem("tasks").split(",");
  //   return storedValue ? storedValue : [];
  // });

  // useEffect(
  //   function () {
  //     localStorage.setItem("tasks", tasksList);
  //   },
  //   [tasksList]
  // );

  function handleSubmit(event) {
    event.preventDefault();
    // setTasksList([...tasksList, taskToAdd]);
    dispatch({ type: "add", payload: taskToAdd });
    counterRef.current++;
    setTaskToAdd(initialValue);
  }

  return (
    <div className="app">
      <header>
        <img src={logo} alt="logo"></img>
      </header>
      <form onSubmit={handleSubmit}>
        <label>Add a new task:</label>
        <input
          type="text"
          value={taskToAdd.task}
          onChange={(e) =>
            setTaskToAdd({ task: e.currentTarget.value, id: Date.now() })
          }
        />
        <input type="submit" value="Add" />
      </form>
      <span>Tasks added: {state.length}</span>

      <TasksList
        tasks={state}
        onDelete={(taskToDelete) =>
          dispatch({ type: "delete", payload: taskToDelete })
        }
      />
    </div>
  );
}

export default App;

import { useState, useEffect, useRef, useReducer } from "react";
import logo from "../assets/logo.avif";
import TasksList from "./TasksList";

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
  const [taskToAdd, setTaskToAdd] = useState(initialValue);
  const counterRef = useRef(0);
  const [state, dispatch] = useReducer(reducer, [], function () {
    const storedValue = localStorage?.getItem("tasks")?.split(",");
    if (storedValue?.[0] === "") {
      return [];
    }
    return storedValue ? JSON.parse(storedValue) : [];
  });

  useEffect(
    function () {
      localStorage.setItem("tasks", JSON.stringify(state));
    },
    [state]
  );

  function handleSubmit(event) {
    event.preventDefault();
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

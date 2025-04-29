import { useState, useRef, useEffect, useReducer } from "react";

function TasksList({ tasks, onDelete }) {
  return (
    <>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((item, key) => (
            <li key={item.id}>
              <button onClick={() => onDelete(item)}>Delete</button>
              {item.task}
            </li>
          ))}
        </ul>
      ) : (
        <p>Empty list</p>
      )}
    </>
  );
}

// a mejorar: añadir el local storage
// mejorar css

function reducer(state, action) {
  switch (action.type) {
    case "add":
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

  // const [tasksList, setTasksList] = useState(function () {
  //   const storedValue = localStorage.getItem("tasks").split(",");
  //   return storedValue ? storedValue : [];
  // });
  const [taskToAdd, setTaskToAdd] = useState(initialValue);
  const counterRef = useRef(0);

  // useEffect(
  //   function () {
  //     localStorage.setItem("tasks", tasksList);
  //   },
  //   [tasksList]
  // );

  function handleSubmit(event) {
    event.preventDefault();

    if (!taskToAdd) return;

    // setTasksList([...tasksList, taskToAdd]);
    dispatch({ type: "add", payload: taskToAdd });
    counterRef.current++;
    setTaskToAdd(initialValue);
  }

  function handleDelete(taskToDelete) {
    // const newList = tasksList.filter((task) => task !== name);
    // console.log("Task to delete: " + name);
    // setTasksList(newList);

    dispatch({ type: "delete", payload: taskToDelete });
  }

  return (
    <div>
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

      <TasksList tasks={state} onDelete={handleDelete} />
    </div>
  );
}

export default App;

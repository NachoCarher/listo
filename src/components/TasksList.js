function TasksList({ tasks, onDelete }) {
  return (
    <>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((item, key) => (
            <li key={item.id}>
              <button onClick={() => onDelete(item)}>Listo!</button>
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

export default TasksList;

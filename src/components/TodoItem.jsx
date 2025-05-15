import React from "react";

export default function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 8,
        background: "#f0f0f0",
        padding: 8,
        borderRadius: 4,
      }}
    >
      <label style={{ flexGrow: 1, cursor: "pointer" }}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          style={{ marginRight: 8 }}
        />
        <span
          style={{
            textDecoration: todo.completed ? "line-through" : "none",
            color: todo.completed ? "#888" : "#000",
          }}
        >
          {todo.text}
        </span>
      </label>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  );
}


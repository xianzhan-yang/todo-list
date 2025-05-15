import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("Todo List App", () => {
  test("renders input field and add button", () => {
    render(<App />);
    // Check if the input field is rendered
    expect(screen.getByPlaceholderText(/add new task/i)).toBeInTheDocument();
    // Check if the add button is rendered
    expect(screen.getByText(/add/i)).toBeInTheDocument();
  });

  test("can add a new todo item", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/add new task/i);
    // Simulate typing into the input field
    fireEvent.change(input, { target: { value: "New Task" } });
    // Simulate clicking the "Add" button
    fireEvent.click(screen.getByText(/add/i));
    // Verify the new todo is added to the list
    expect(screen.getByText("New Task")).toBeInTheDocument();
  });

  test("can toggle todo item completion", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/add new task/i);
    fireEvent.change(input, { target: { value: "Toggle Test" } });
    fireEvent.click(screen.getByText(/add/i));

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox.checked).toEqual(false);

    // Simulate checking the checkbox
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
  });

  test("can delete a todo item", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/add new task/i);
    fireEvent.change(input, { target: { value: "Delete Test" } });
    fireEvent.click(screen.getByText(/add/i));

    const deleteButton = screen.getByText(/delete/i);
    // Simulate clicking the delete button
    fireEvent.click(deleteButton);

    // Verify the todo item is removed from the DOM
    expect(screen.queryByText("Delete Test")).not.toBeInTheDocument();
  });
});


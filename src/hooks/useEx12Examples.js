import { useState } from "react";

const initialTodos = [
  { id: 1, text: "Review React state", completed: false },
  { id: 2, text: "Build a small project", completed: true },
];

const searchableItems = [
  "Apple",
  "Blueberry",
  "Kiwi",
  "Mango",
  "Orange",
  "Strawberry",
];

const initialDragItems = ["Plan", "Design", "Build", "Ship"];

export default function useEx12Examples() {
  const [count, setCount] = useState(0);
  const [liveText, setLiveText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [todos, setTodos] = useState(initialTodos);
  const [todoInput, setTodoInput] = useState("");
  const [selectedColor, setSelectedColor] = useState("lightblue");
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(initialDragItems);
  const [draggingItem, setDraggingItem] = useState(null);

  const addTodo = (event) => {
    event.preventDefault();
    const text = todoInput.trim();
    if (!text) return;

    setTodos((currentTodos) => [
      ...currentTodos,
      { id: Date.now(), text, completed: false },
    ]);
    setTodoInput("");
  };

  const toggleTodo = (id) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  };

  const filteredItems = searchableItems.filter((item) =>
    item.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  const handleDrop = (targetIndex) => {
    if (draggingItem === null || draggingItem === targetIndex) {
      setDraggingItem(null);
      return;
    }

    setItems((currentItems) => {
      const reorderedItems = [...currentItems];
      const [movedItem] = reorderedItems.splice(draggingItem, 1);
      reorderedItems.splice(targetIndex, 0, movedItem);
      return reorderedItems;
    });
    setDraggingItem(null);
  };

  return {
    count,
    increment: () => setCount((currentCount) => currentCount + 1),
    liveText,
    setLiveText,
    isVisible,
    toggleVisibility: () =>
      setIsVisible((currentVisibility) => !currentVisibility),
    todos,
    todoInput,
    setTodoInput,
    addTodo,
    toggleTodo,
    deleteTodo,
    selectedColor,
    setSelectedColor,
    searchQuery,
    setSearchQuery,
    filteredItems,
    items,
    draggingItem,
    setDraggingItem,
    handleDrop,
  };
}

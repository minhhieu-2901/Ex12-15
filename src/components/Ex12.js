import useEx12Examples from "../hooks/useEx12Examples";

const colorOptions = [
  { label: "Red", value: "lightcoral" },
  { label: "Blue", value: "lightblue" },
  { label: "Green", value: "lightgreen" },
  { label: "Yellow", value: "lightyellow" },
];

function Exercise({ number, title, wide = false, children }) {
  return (
    <section className={`exercise${wide ? " exercise-wide" : ""}`}>
      <div className="exercise-heading">
        <span className="exercise-number">{number}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Ex12() {
  const {
    count,
    increment,
    liveText,
    setLiveText,
    isVisible,
    toggleVisibility,
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
  } = useEx12Examples();

  return (
    <div className="workshop">
      <div className="exercise-grid">
        <Exercise title="Counter">
          <div className="control-row">
            <span>{count}</span>
            <button onClick={increment} type="button">
              Increment
            </button>
          </div>
        </Exercise>

        <Exercise title="Live text">
          <label className="field-label" htmlFor="live-text">
            Input text here
          </label>
          <input
            className="text-input"
            id="live-text"
            onChange={(event) => setLiveText(event.target.value)}
            placeholder="Please enter your text"
            type="text"
            value={liveText}
          />
          <p className="live-output">
            {liveText || <span className="hint-text">Your text.</span>}
          </p>
        </Exercise>

        <Exercise title="Toggle visibility">
          <div className="control-row">
            <button
              aria-expanded={isVisible}
              onClick={toggleVisibility}
              type="button"
            >
              {isVisible ? "Hide" : "Show"}
            </button>
            {isVisible && <p>Toggle me!.</p>}
          </div>
        </Exercise>

        <Exercise title="Todo list">
          <form className="todo-form" onSubmit={addTodo}>
            <input
              className="text-input"
              id="new-todo"
              onChange={(event) => setTodoInput(event.target.value)}
              placeholder="Add a task"
              type="text"
              value={todoInput}
            />
            <button className="control-button" type="submit">
              Add
            </button>
          </form>
          <ul className="todo-list">
            {todos.map((todo) => (
              <li
                className={`todo-item${todo.completed ? " is-complete" : ""}`}
                key={todo.id}
              >
                <input
                  aria-label={`Mark ${todo.text} completed`}
                  checked={todo.completed}
                  className="todo-check"
                  onChange={() => toggleTodo(todo.id)}
                  type="checkbox"
                />
                <span>{todo.text}</span>
                <button
                  aria-label={`Delete ${todo.text}`}
                  className="delete-button"
                  onClick={() => deleteTodo(todo.id)}
                  type="button"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          {todos.length === 0 && (
            <p className="empty-state">No tasks yet. Add one above.</p>
          )}
        </Exercise>

        <Exercise number="05" title="Color switcher">
          <label className="field-label" htmlFor="color-choice">
            Choose a color
          </label>
          <select
            className="color-select"
            id="color-choice"
            onChange={(event) => setSelectedColor(event.target.value)}
            value={selectedColor}
          >
            {colorOptions.map((color) => (
              <option key={color.value} value={color.value}>
                {color.label}
              </option>
            ))}
          </select>
          <div
            className="color-demo"
            style={{ backgroundColor: selectedColor }}
          ></div>
        </Exercise>

        <Exercise title="Search filter">
          <div className="filter-header">
            <label className="field-label" htmlFor="item-search">
              Find a fruit
            </label>
            <span className="result-count" aria-live="polite">
              {filteredItems.length}{" "}
              {filteredItems.length === 1 ? "result" : "results"}
            </span>
          </div>
          <input
            className="text-input"
            id="item-search"
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search fruits"
            type="search"
            value={searchQuery}
          />
          {filteredItems.length > 0 ? (
            <ul className="filter-list">
              {filteredItems.map((item) => (
                <li className="filter-item" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-state">No matching fruits.</p>
          )}
        </Exercise>

        <Exercise title="Drag and drop list" wide>
          <p className="field-label">
            Drag a step onto another to change the order.
          </p>
          <ol className="drag-list" aria-label="Reorderable workflow steps">
            {items.map((item, index) => (
              <li
                className={`drag-item${draggingItem === index ? " is-dragging" : ""}`}
                draggable
                key={item}
                onDragEnd={() => setDraggingItem(null)}
                onDragOver={(event) => event.preventDefault()}
                onDragStart={(event) => {
                  setDraggingItem(index);
                  event.dataTransfer.effectAllowed = "move";
                }}
                onDrop={(event) => {
                  event.preventDefault();
                  handleDrop(index);
                }}
              >
                <span>{item}</span>
                <span aria-hidden="true" className="drag-grip">
                  ::
                </span>
              </li>
            ))}
          </ol>
        </Exercise>
      </div>
    </div>
  );
}

export default Ex12;

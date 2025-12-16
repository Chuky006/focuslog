import { useState } from "react";

type FocusItem = {
  id: number;
  text: string;
  done: boolean;
};

function App() {
  const [items, setItems] = useState<FocusItem[]>([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <h1>FocusLog</h1>
      <p>Track what you focus on today.</p>

      <button onClick={() => setDarkMode(!darkMode)}>
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </button>

      <div className="input-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What are you focusing on?"
        />

        <button
          onClick={() => {
            if (!input.trim()) return;

            setItems([
              ...items,
              { id: Date.now(), text: input, done: false },
            ]);

            setInput("");
          }}
        >
          Add Task
        </button>
      </div>

      <ul>
        {items.map((item) => (
          <li key={item.id} className="task-item">
            <span className={item.done ? "done" : ""}>
              {item.text}
            </span>

            <button
              onClick={() =>
                setItems(
                  items.map((i) =>
                    i.id === item.id
                      ? { ...i, done: !i.done }
                      : i
                  )
                )
              }
            >
              {item.done ? "Undo" : "Mark Done"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


import "./App.css";

import React, { useState } from "react";
import Bank from "../components/Bank";
import Quote from "../components/Quote";
import TodoList from "../components/TodoList";
import Scroll from "../components/Scroll";

function App() {
  const [display, setDisplay] = useState({ todo: false, quote: false, bank: false })

  const showToDo = () => {
    setDisplay({ todo: true, quote: false, bank: false })
  };
  const showBank = () => {
    setDisplay({ todo: false, quote: false, bank: true })
  };
  const showQuote = () => {
    setDisplay({ todo: false, quote: true, bank: false })
  };



  return (
    <div>
      <header>
        <h1>Welcome to the world of React</h1>
        <h2>You have many options. choose wisely:</h2>
      </header>
      <div id="navigation">

        <button onClick={showToDo} id="showToDo">
          Create your ToDo-List
        </button>
        <button onClick={showQuote} id="showDone">
          get a Quote of the day
        </button>
        <button onClick={showBank} id="showAll">
          check your bank account
        </button>
      </div>
      <Scroll>
        <main className={!display.todo && !display.quote && !display.bank ? "hide" : ""}>
          <div className={!display.todo ? "section section-todo hide" : "section section-todo"}>
            <h2>Fill your To-Do List</h2>
            <TodoList />
          </div>
          <div className={!display.quote ? "section section-quote hide" : "section section-quote"}>
            <Quote />
          </div>
          <div className={!display.bank ? "section section-bank hide" : "section section-bank"}>
            <Bank />
          </div>
        </main>
      </Scroll>
    </div>


  );
}

export default App;

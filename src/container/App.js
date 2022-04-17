import "./App.css";

import React, { useState } from "react";
import Bank from "../components/bank/Bank";
import Quote from "../components/quote/Quote";
import TodoList from "../components/todo/TodoList";
import Scroll from "../components/Scroll";
import Weather from "../components/weather/Weather";

function App() {
  const [display, setDisplay] = useState({ todo: false, quote: false, bank: false, weather: false })

  const showToDo = () => {
    setDisplay({ todo: true, quote: false, bank: false, weather: false })
  };
  const showBank = () => {
    setDisplay({ todo: false, quote: false, bank: true, weather: false })
  };
  const showQuote = () => {
    setDisplay({ todo: false, quote: true, bank: false, weather: false })
  };
  const showWeather = () => { setDisplay({ todo: false, quote: false, bank: false, weather: true }) }



  return (
    <div>
      <header>
        <h1>Welcome to the world of React</h1>
        <h2>You have many options. choose wisely:</h2>
      </header>
      <div id="navigation">

        <button onClick={showToDo} id="showToDo">
          create your ToDo-List
        </button>
        <button onClick={showQuote} id="showQuote">
          get a Quote of the day
        </button>
        <button onClick={showBank} id="showBank">
          check your bank account
        </button>
        <button onClick={showWeather} id="showWeather">
          check the weather
        </button>
      </div>
      <Scroll>
        <main className={!display.todo && !display.quote && !display.bank && !display.weather ? "hide" : ""}>
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
          <div className={!display.weather ? "section section-weather hide" : "section section-weather"}>
            <Weather />
          </div>
        </main>
      </Scroll>
    </div>


  );
}

export default App;

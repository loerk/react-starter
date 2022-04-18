import "./App.css";

import React, { useState } from "react";
import Scroll from "../components/Scroll";
import { Section } from "../components/selectSection/section";

function App() {
  const [page, setPage] = useState("")

  console.log(page)

  return (
    <div>
      <header>
        <h1>Welcome to the world of React</h1>
        <h2>You have many options. choose wisely:</h2>
      </header>
      <div id="navigation">

        <button onClick={() => { setPage("TODO") }}>
          create your ToDo-List
        </button>
        <button onClick={() => { setPage("QUOTE") }}>
          get a Quote of the day
        </button>
        <button onClick={() => { setPage("BANK") }}>
          check your bank account
        </button>
        <button onClick={() => { setPage("WEATHER") }}>
          check the weather
        </button>
      </div>
      <Scroll>
        <main >
          <div>
            <Section page={page} />
          </div>
        </main>
      </Scroll>
    </div>


  );
}

export default App;

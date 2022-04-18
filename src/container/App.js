import "./App.css";

import React, { useState } from "react";
import Scroll from "../components/Scroll";
import { Section } from "../components/selectSection/section";

function App() {
  const [page, setPage] = useState("")


  return (
    <div>
      <header>
        <h1>Welcome to the world of React</h1>
        <h2>You have many options. choose wisely:</h2>
      </header>
      <div id="navigation">
        {[{ pageType: "TODO", title: "create your ToDo-List" }, { pageType: "QUOTE", title: "get a Quote of the day" }, { pageType: "WEATHER", title: "check the weather" }, { pageType: "BANK", title: "check your bank account" }].map(({ pageType, title }) =>
        (
          <button key={pageType} onClick={() => { setPage(pageType) }}>
            {title}
          </button>
        )
        )}
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

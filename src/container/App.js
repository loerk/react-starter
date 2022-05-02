import { useState } from "react";
import Scroll from "../components/Scroll";
import { Section } from "../components/selectSection/Section";
import './App.module.css'
function App() {
  const [page, setPage] = useState("")


  return (
    <div>
      <header>
        <h1>Welcome to the world of React</h1>
      </header>
      <main >
        <nav>
          {[{ pageType: "TODO", title: "Todo-List" }, { pageType: "QUOTE", title: "Quote" }, { pageType: "WEATHER", title: "Weather" }, { pageType: "BANK", title: "Bank" }, { pageType: "HACKERNEWS", title: 'Hacker-News' }].map(({ pageType, title }) =>
          (
            <button key={pageType} onClick={() => { setPage(pageType) }}>
              {title}
            </button>
          )
          )}
        </nav>
        <div>
          <Section page={page} />
        </div>
      </main>
    </div>


  );
}

export default App;

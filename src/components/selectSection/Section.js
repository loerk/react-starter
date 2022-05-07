import TodoList from '../todo/TodoList';
import Weather from '../weather/Weather';
import Quote from '../quote/Quote';
import Bank from '../bank/Bank';
import HackerNews from '../hackerNews/HackerNews';
import "./Section.css"


export function Section({ page }) {
    switch (page) {
        case "TODO":
            return <TodoList />;
        case "WEATHER":
            return <Weather />
        case "QUOTE":
            return <Quote />
        case "BANK":
            return <Bank />
        case "HACKERNEWS":
            return <HackerNews />
        default:
            return <h2 className='upAndDown'> ⬅ Choose wisely</h2>
    }
}


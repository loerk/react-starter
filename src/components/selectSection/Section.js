import TodoList from '../todo/TodoList';
import Weather from '../weather/Weather';
import Quote from '../quote/Quote';
import Bank from '../bank/Bank';
import background from '../../assets/bgi.jpg'
import HackerNews from '../hackerNews/HackerNews';

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
            return <img src={background} alt='flowers' className='landingImage' />
    }
}


import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from 'react-icons/io'
import "./Quote.css"

function Quote() {
  const [quote, setQuote] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [arrow, setArrow] = useState(false)

  function getData() {
    fetch("https://programming-quotes-api.herokuapp.com/Quotes/random")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setQuote(data);
      });
  }

  const changeQuote = () => {
    getData();
  };

  const getQuoteByAuthor = async () => {
    setArrow(true)
    const resp = await fetch(
      `https://programming-quotes-api.herokuapp.com/Quotes/author/${quote.author}`
    );
    const data = await resp.json();
    setQuotes([...data]);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div id="quote">
      <h2> Get your fresh Developers quote</h2>
      <div className="quoteContainer">
        {!quote ? <p>Loading...</p> :
          <div>
            <p>{quote.en}</p>
            <p>{quote.author}</p>
          </div>
        }
      </div>

      <button onClick={changeQuote}>get new Quote</button>
      <button onClick={getQuoteByAuthor}>
        get more quotes by <br />{quote.author}
      </button>
      <div>
        <IoIosArrowDown onClick={getQuoteByAuthor} className={!arrow ? " arrow hide" : "arrow"} />
      </div>
      <div>
        <ol>
          {quotes.map((item, i) => {
            return <li key={i}>{item.en}</li>;
          })}
        </ol>
      </div>
    </div>
  );
}

export default Quote;

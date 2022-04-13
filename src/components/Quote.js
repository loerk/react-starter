import React, { useEffect, useState } from "react";

function Quote() {
  const [quote, setQuote] = useState([]);
  const [quotes, setQuotes] = useState([]);

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
      <p>{quote.en}</p>
      <p>{quote.author}</p>
      <button onClick={changeQuote}>get new Quote</button>
      <button onClick={getQuoteByAuthor}>
        get more quotes by {quote.author}
      </button>
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

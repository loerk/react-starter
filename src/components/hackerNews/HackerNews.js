import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import { TiDelete } from "react-icons/ti";

import "./HackerNews.css";
function HackerNews() {
  const [latestNews, setLatestNews] = useState({ hits: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [showLatest, setShowLatest] = useState(false);
  const [storedItems, setStoredItems] = useState(
    JSON.parse(localStorage.getItem("news")) || []
  );

  useEffect(() => {
    localStorage.setItem("news", JSON.stringify(storedItems));
  }, [storedItems]);

  useEffect(() => {
    (async () => {
      const currentTimeInSeconds = new Date().getTime() / 1000;
      const lastTwentyFourHoursInSeconds = 86400;
      if (showLatest) {
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=created_at_i>${
              currentTimeInSeconds - lastTwentyFourHoursInSeconds
            }`
          );
          let result = await response.json();
          setLatestNews(result);
          setIsLoading(false);
        } catch (e) {
          console.log(e.message);
        }
      } else {
        return;
      }
    })();
  }, [showLatest]);

  if (!latestNews) {
    return;
  }
  const deleteItemFromStorage = (deleteItem) => {
    const deletedItems = storedItems.filter(
      (storageItem) => storageItem.objectID !== deleteItem.objectID
    );
    setStoredItems(deletedItems);
  };
  return (
    <div>
      <h2>The freshest News from the Dev Community: </h2>
      <button onClick={() => setShowLatest(!showLatest)}>
        {showLatest ? "show saved News" : "show latest News"}
      </button>
      {isLoading ? <h3>is Loading...</h3> : null}
      <ul className="NewsList">
        {showLatest
          ? latestNews.hits.map((item) =>
              item.url ? (
                <NewsCard
                  item={item}
                  latestNews={latestNews}
                  storedItems={storedItems}
                  setStoredItems={setStoredItems}
                />
              ) : null
            )
          : storedItems.map((item) => (
              <li key={item.objectID} className="savedItem">
                <a className="savedItemLink" href={item.url}>
                  {item.title}
                </a>
                <TiDelete
                  className="deleteIcon"
                  onClick={() => deleteItemFromStorage(item)}
                ></TiDelete>
              </li>
            ))}
      </ul>
    </div>
  );
}

export default HackerNews;

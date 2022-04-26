import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";

function HackerNews() {
  const [latestNews, setLatestNews] = useState({ hits: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [showLatest, setShowLatest] = useState(false);

  useEffect(() => {
    (async () => {
      const currentTimeInSeconds = new Date().getTime() / 1000;
      const lastTwentyFourHoursInSeconds = 86400;
      if (showLatest) {
        try {
          const response = await fetch(
            `http://hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=created_at_i>${
              currentTimeInSeconds - lastTwentyFourHoursInSeconds
            }`
          );
          let result = await response.json();
          setLatestNews(result);
          setIsLoading(false);
          setShowLatest(false);
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
  const showStoredItems = () => {
    let storedItems = JSON.parse(localStorage.getItem("news"));
  };

  return (
    <div>
      <h2>The freshest News from the Dev Community: </h2>
      <button onClick={() => setShowLatest(true)}>show latest</button>
      <button onClick={() => showStoredItems()}>show stored</button>
      <ul>
        {latestNews.hits.map((item) =>
          item.url ? <NewsCard item={item} data={latestNews} /> : null
        )}
      </ul>
    </div>
  );
}

export default HackerNews;

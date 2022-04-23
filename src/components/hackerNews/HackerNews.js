import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";

function HackerNews() {
  const [latest, setLatest] = useState({ hits: [] });
  const [isLoading, setIsLoading] = useState(true);

  const currentTimeInSeconds = new Date().getTime() / 1000;
  const lastTwentyFourHoursInSeconds = 86400;

  const getLatestNews = async () => {
    fetch(
      `http://hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=created_at_i>${
        currentTimeInSeconds - lastTwentyFourHoursInSeconds
      }`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLatest(data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getLatestNews();
  }, []);
  console.log(latest);
  if (!latest) {
    return;
  }
  if (!isLoading) {
    return (
      <div>
        <h2>The freshest News directly out of the Dev Community: </h2>
        <button onClick={getLatestNews}>reFresh</button>
        <ul>
          {latest.hits.map((item) => {
            if (item.url) {
              return <NewsCard item={item} />;
            }
          })}
        </ul>
      </div>
    );
  }
}

export default HackerNews;

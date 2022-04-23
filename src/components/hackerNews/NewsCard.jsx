import React from "react";

function NewsCard({ item }) {
  const getTime = (dateFromData) => {
    let date = new Date(dateFromData * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let currentDate = date.toDateString("en-US", options);
    return `| ${currentDate} | ${hours}:${minutes}:${seconds}  |`;
  };

  const safeItem = () => {
    localStorage.setItem("news", item);
  };

  return (
    <div className="newsCard">
      <input
        checked={item.isSafed}
        type="checkbox"
        key={item.ObjectID}
        onChange={safeItem}
      />
      <li key={item.ObjectID}>
        <div className="newsCardText">
          <a target="blank" href={item.url}>
            {item.title}
          </a>
          <div>
            <p>
              <i>by {item.author}</i>
            </p>
            <p>released at {getTime(parseInt(item.created_at_i))}</p>
          </div>
        </div>
      </li>
    </div>
  );
}

export default NewsCard;

import React, { useEffect, useState } from "react";
import { RiSave3Fill } from "react-icons/ri";

function NewsCard({ item }) {
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("news"));
    console.log("useeffect", data);
    setSavedItems(data);
  }, []);

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

  const saveItem = (item) => {
    console.log(savedItems);
    if (savedItems === null) {
      return;
    }
    let array = [...savedItems, item];

    localStorage.setItem("news", JSON.stringify(array));
    setSavedItems(array);
  };

  return (
    <div className="newsCard">
      <li key={item.objectID}>
        <RiSave3Fill onClick={() => saveItem(item)} />
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

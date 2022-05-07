import { RiSave3Fill } from "react-icons/ri";

function NewsCard({ item, latestNews, storedItems, setStoredItems }) {
  const getTime = (dateFromData) => {
    let date = new Date(dateFromData * 1000);
    let hours = date.getHours();
    let minutes =
      date.getMinutes() < "10" ? "0" + date.getMinutes() : date.getMinutes();
    let seconds =
      date.getSeconds() < "10" ? "0" + date.getSeconds() : date.getSeconds();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let currentDate = date.toDateString("en-US", options);
    return `| ${currentDate} | ${hours}:${minutes}:${seconds}  |`;
  };

  const saveItem = (savedItem) => {
    let noDoubles = storedItems.filter(
      (item) => item.objectID === savedItem.objectID
    );
    if (noDoubles.length > 0) {
      return;
    }
    if (storedItems) {
      setStoredItems([...storedItems, savedItem]);
    } else {
      setStoredItems(savedItem);
    }
  };

  return (
    <div className="newsCard">
      <li key={item.objectID}>
        <RiSave3Fill
          className="icon"
          title="save"
          onClick={() => saveItem(item)}
        />
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

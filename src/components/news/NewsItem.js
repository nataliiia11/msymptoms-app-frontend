import React from "react";
import "./NewsItem.scss";

const NewsItem = ({
  title,
  description,
  url,
  urlToImage,
  publishedAt,
  author,
}) => {
  return (
    <div className="news-app">
      <div className="news-item">
        <img className="news-img" src={urlToImage} alt={urlToImage} />
        <h3 className="news-title-text">
          <a className="news-title-text" href={url}>
            {title}
          </a>
        </h3>
        <p className="news-text">{description}</p>
        <p className="news-author"> {publishedAt} </p>
        <p className="news-date">{author}</p>
      </div>
    </div>
  );
};

export default NewsItem;

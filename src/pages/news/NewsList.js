import React, { useState, useEffect } from "react";
import { DocumentTitle } from "react-document-title";
import NewsItem from "../../components/news/NewsItem";
import "./NewsList.scss";
import getNews from "../../redux/features/news/newsService";

const NewsList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      const response = await getNews();
      setArticles(response.articles);
    };
    getArticles();
  }, []);
  return (
    <DocumentTitle title="News">
      <div>
        <div className="news-container">
          <h1 className="news-container-title">Multiple Sclerosis News</h1>
          {articles.map((article) => {
            return (
              <NewsItem
                key={article.title}
                title={article.title}
                description={article.description}
                url={article.url}
                urlToImage={article.urlToImage}
                publishedAt={article.publishedAt}
                author={article.author}
              />
            );
          })}
        </div>
      </div>
    </DocumentTitle>
  );
};

export default NewsList;

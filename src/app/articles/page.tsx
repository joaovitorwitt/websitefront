//////////////////////////////////////////////////////
// Imports
//////////////////////////////////////////////////////
"use client";
import Header from "../components/Header";
import Link from "next/link";
import LoadingComponent from "../components/LoadingComponent";
import { useEffect, useState } from "react";
import Image from "next/image";
import "../assets/css/pages/articles/articles.modules.css";
import "../assets/css/globals.css";
import RoundButton from "../components/RoundButton";

//////////////////////////////////////////////////////
// Article Interface Implementation
//////////////////////////////////////////////////////
interface Article {
  id: number;
  Title: string;
  Description: string;
  Content: string;
  date: string;
  image_url: string;
  url_title: string;
}

//////////////////////////////////////////////////////
// Articles Component Implementation
//////////////////////////////////////////////////////
export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // const response = await fetch(`${process.env.local}/get/articles/`);
        const response = await fetch(`http://127.0.0.1:5000/get/articles`);
        const result = await response.json();
        console.log(result);
        setArticles(result);
      } catch (error) {
        console.error("Error fetching articles: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="articles-page-wrapper">
      <Header />
      <div className="container">
        {loading ? (
          <LoadingComponent />
        ) : Array.isArray(articles) && articles.length > 0 ? (
          <div className="posts-wrapper">
            {articles.map((article) => (
              <Link
                key={article.id}
                className="article"
                href={`/articles/${article.url_title}`}
              >
                <div className="article-wrapper">
                  <div className="posts-article-image-wrapper">
                    <Image
                      src={article?.image_url}
                      key={article.id}
                      alt="article image"
                      width={1920}
                      height={1080}
                      className="article-image"
                      loading="lazy"
                    />
                  </div>

                  <div className="article-data-container">
                    <div className="article-data">
                      <span>{article.date}</span>
                      <span className="article-data-spacer"></span>
                    </div>

                    <h3 className="article-title">{article.Title}</h3>
                    <p className="article-description">{article.Description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>No articles found.</p>
        )}

        <div
          className="large-button-container"
          style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
        >
          <RoundButton url={"/"} buttonText={"Return"} />
        </div>
      </div>
    </div>
  );
}

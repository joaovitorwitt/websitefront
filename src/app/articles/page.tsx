//////////////////////////////////////////////////////
// Imports
//////////////////////////////////////////////////////
"use client";
import Header from "../components/Header";
import Link from "next/link";
import LoadingComponent from "../components/LoadingComponent";
import { useEffect, useState } from "react";
import Image from "next/image";
import { formatArticleDate, formatTitleForURL } from "@/app/utils";
import "../assets/css/pages/articles/articles.modules.css";
import "../assets/css/globals.css";
import RoundButton from "../components/RoundButton";

//////////////////////////////////////////////////////
// Article Interface Implementation
//////////////////////////////////////////////////////
interface Article {
  id: number;
  title: string;
  description: string;
  content: string;
  publish_date: string;
  thumbnail: string;
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
        const response = await fetch(
          // PRODUCTION API
          "https://portfolio-backend-fdxe.onrender.com/api/v1/get/articles/"

          // DEVELOPMENT API
          // "http://127.0.0.1:8000/api/v1/get/articles/"
        );
        const result = await response.json();
        setArticles(result.articles);
        // console.log("Fetched articles:", result.articles);
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
            {articles
              .sort((a, b) => {
                const dateA = new Date(a.publish_date).getTime();
                const dateB = new Date(b.publish_date).getTime();
                return dateB - dateA;
              })
              .map((article) => (
                <Link
                  key={article.id}
                  className="article"
                  href={`/articles/${formatTitleForURL(article.title)}`}
                >
                  <div className="article-wrapper">
                    <div className="posts-article-image-wrapper">
                      <Image
                        src={article?.thumbnail}
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
                        <span>{formatArticleDate(article.publish_date)}</span>
                        <span className="article-data-spacer"></span>
                      </div>

                      <h3 className="article-title">{article.title}</h3>
                      <p className="article-description">
                        {article.description}
                      </p>
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

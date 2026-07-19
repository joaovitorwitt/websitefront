import Header from "../components/Header";
import Link from "next/link";
import Image from "next/image";
import "../assets/css/pages/articles/articles.modules.css";
import "../assets/css/globals.css";
import RoundButton from "../components/RoundButton";
import { getArticles, formatDate } from "../lib/api";

export const revalidate = 300;

export default async function Articles() {
  const articles = await getArticles();

  return (
    <div className="articles-page-wrapper">
      <Header />
      <div className="container">
        {articles.length > 0 ? (
          <div className="posts-wrapper">
            {articles.map((article) => (
              <Link
                key={article.id}
                className="article"
                href={`/articles/${article.slug}`}
              >
                <div className="article-wrapper">
                  <div className="posts-article-image-wrapper">
                    {article.image_url && (
                      <Image
                        src={article.image_url}
                        alt={article.title}
                        width={1920}
                        height={1080}
                        className="article-image"
                        loading="lazy"
                      />
                    )}
                  </div>

                  <div className="article-data-container">
                    <h3 className="article-title">{article.title}</h3>
                    <p className="article-description">{article.description}</p>

                    <div className="article-data">
                      <span className="article-data-spacer"></span>
                      <p className="tags">{article.tags.join(", ")}</p>
                      <span className="title-font">
                        {formatDate(article.created_at)}
                      </span>
                    </div>
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

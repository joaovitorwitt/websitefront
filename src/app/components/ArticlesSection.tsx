import Link from "next/link";
import Image from "next/image";
import "../assets/css/components/articles-section.modules.css";
import RoundButton from "./RoundButton";
import { getArticles, formatDate } from "../lib/api";

export default async function ArticlesSection() {
  const articles = await getArticles({ limit: 3 });

  if (articles.length === 0) return null;

  return (
    <section className="articles-section section" id="articles">
      <div className="container">
        <div className="section-title-container">
          <h2 className="title section-title">Articles</h2>
          <div className="section-subtitle-container">
            <span className="subtitle-number has-sparkles">03</span>
            <h5 className="title section-subtitle">recent</h5>
          </div>
        </div>

        <div className="portfolio-cards d-grid">
          {articles.map((article, index) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className={"portfolio-card portfolio-card-" + (index + 1)}
            >
              <div className="card-image">
                {article.image_url && (
                  <Image
                    src={article.image_url}
                    alt={article.title}
                    width={1920}
                    height={1080}
                  />
                )}
              </div>

              <div className="card-heading">
                <h5 className="card-title">{article.title}</h5>
                <span className="card-subtitle">
                  {formatDate(article.created_at)}
                  {article.tags.length > 0 && ` · ${article.tags.join(", ")}`}
                </span>
              </div>
            </Link>
          ))}

          <div className="portfolio-card portfolio-card-4 large-button-container">
            <RoundButton url={"/articles"} buttonText={"See All"} />
          </div>
        </div>
      </div>
    </section>
  );
}

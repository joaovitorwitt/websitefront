import Link from "next/link";
import Image from "next/image";
import "../assets/css/components/related-articles.modules.css";
import { getArticles, formatDate } from "../lib/api";

type Props = {
  currentSlug: string;
  tags: string[];
};

export default async function RelatedArticles({ currentSlug, tags }: Props) {
  if (tags.length === 0) return null;

  // Fetch a few extra so there's still something left after the current
  // article (which necessarily has this tag too) is filtered out below.
  const candidates = await getArticles({ tag: tags[0], limit: 4 });
  const related = candidates
    .filter((article) => article.slug !== currentSlug)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="related-articles">
      <div className="container">
        <h4 className="related-articles-title">Related articles</h4>

        <div className="related-articles-grid">
          {related.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="related-article-card"
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
        </div>
      </div>
    </section>
  );
}

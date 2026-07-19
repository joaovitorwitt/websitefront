import Header from "@/app/components/Header";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import "../../assets/css/pages/article/article.modules.css";
import RoundButton from "@/app/components/RoundButton";
import ArticleContent from "@/app/components/ArticleContent";
import { getArticles, getContentItem, formatDate } from "@/app/lib/api";

export const revalidate = 300;

type Props = {
  params: Promise<{ articleTitle: string }>;
};

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ articleTitle: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { articleTitle } = await params;
  const article = await getContentItem("article", articleTitle);

  if (!article) return { title: "Article Not Found | João Vitor Witt" };

  return {
    title: `${article.title} | João Vitor Witt`,
    description: article.description,
  };
}

export default async function Article({ params }: Props) {
  const { articleTitle } = await params;
  const article = await getContentItem("article", articleTitle);

  if (!article) notFound();

  return (
    <div className="article-page-wrapper">
      <Header />
      <section className="blog-post section-header-offset">
        <div className="blog-post-container container">
          <div className="blog-post-data">
            <h3 className="blog-post-title title">{article.title}</h3>

            <div className="article-data">
              <span>{formatDate(article.created_at)}</span>
            </div>

            {article.image_url && (
              <Image
                src={article.image_url}
                width={1920}
                height={1080}
                alt={article.title}
                priority
              />
            )}
          </div>

          <div className="container">
            {article.content && <ArticleContent html={article.content} />}
          </div>
        </div>
      </section>

      <div className="large-button-container" style={{ padding: "3rem 0" }}>
        <RoundButton url={"/articles"} buttonText={"Return"} />
      </div>
    </div>
  );
}

import Header from "@/app/components/Header";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import "../../assets/css/pages/article/article.modules.css";
import RoundButton from "@/app/components/RoundButton";
import ArticleContent from "@/app/components/ArticleContent";
import RelatedArticles from "@/app/components/RelatedArticles";
import ReadingProgress from "@/app/components/ReadingProgress";
import ShareButtons from "@/app/components/ShareButtons";
import {
  getArticles,
  getContentItem,
  formatDate,
  estimateReadingTime,
} from "@/app/lib/api";
import ProfilePicture from "@/app/assets/images/profile-picture.jpg";

export const revalidate = 300;

const BASE_URL = "https://www.joaovitorwitt.com";

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

  const title = `${article.title} | João Vitor Witt`;

  return {
    title,
    description: article.description,
    openGraph: {
      type: "article",
      url: `/articles/${article.slug}`,
      siteName: "João Vitor Witt",
      locale: "en_US",
      title,
      description: article.description,
      publishedTime: article.created_at,
      tags: article.tags,
      images: article.image_url
        ? [{ url: article.image_url }]
        : [
            {
              url: ProfilePicture.src,
              width: ProfilePicture.width,
              height: ProfilePicture.height,
              alt: title,
            },
          ],
    },
  };
}

export default async function Article({ params }: Props) {
  const { articleTitle } = await params;
  const article = await getContentItem("article", articleTitle);

  if (!article) notFound();

  return (
    <div className="article-page-wrapper">
      <ReadingProgress />
      <Header />
      <section className="blog-post section-header-offset">
        <div className="blog-post-container container">
          <div className="blog-post-data">
            <h3 className="blog-post-title title">{article.title}</h3>

            <div className="article-data">
              <span>
                {formatDate(article.created_at)}
                {article.content &&
                  ` · ${estimateReadingTime(article.content)} min read`}
              </span>
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

          <ShareButtons
            title={article.title}
            url={`${BASE_URL}/articles/${article.slug}`}
          />
        </div>
      </section>

      <RelatedArticles currentSlug={article.slug} tags={article.tags} />

      <div className="large-button-container" style={{ padding: "3rem 0" }}>
        <RoundButton url={"/articles"} buttonText={"Return"} />
      </div>
    </div>
  );
}

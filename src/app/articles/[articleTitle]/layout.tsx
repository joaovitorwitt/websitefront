import { Metadata } from "next";

type Props = {
  params: {
    articleTitle: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await fetch(
    "https://portfolio-backend-fdxe.onrender.com/api/v1/get/articles/"
  );
  const result = await article.json();
  const correctArticle = result.articles.find(
    (article: any) =>
      article.title.toLowerCase().replace(/\s+/g, "-") === params.articleTitle
  );

  return {
    title: correctArticle.title,
    description: correctArticle.description,
    openGraph: {
      images: correctArticle.thumbnail,
      description: correctArticle.description,
      url: `https://www.joaovitorwitt.com/articles/${correctArticle.title
        .toLowerCase()
        .replace(/\s+/g, "-")}`,
    },
    twitter: {
      card: "summary_large_image",
      description: correctArticle.description,
      title: correctArticle.title,
      images: correctArticle.thumbnail,
    },
  };
}

export default function articleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

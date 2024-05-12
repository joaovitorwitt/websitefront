"use client";
import Header from "@/app/components/Header";
import LoadingComponent from "@/app/components/LoadingComponent";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Metadata } from "next";

interface Article {
  id: number;
  title: string;
  description: string;
  content: string;
  publish_date: string;
  thumbnail: string;
}

type Props = {
  params: {
    articleTitle: string;
  };
};

export default function Article({ params }: Props) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  // metadata states
  // const [metadataInfo, setMetadataInfo] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          // "https://portfolio-backend-fdxe.onrender.com/api/v1/get/articles/"
          "http://127.0.0.1:8000/api/v1/get/articles/"
        );

        const result = await response.json();
        // console.log(result);
        const correctArticleTitle = getCorrectTitle(result.articles);
        // console.log(result.articles);
        setArticle(correctArticleTitle);
      } catch (error) {
        console.log("Error fetching articles,", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  function getCorrectTitle(list: any) {
    const correct = list.find(
      (article: any) => formatTitleForURL(article.title) === params.articleTitle
    );
    // setMetadataInfo(correct);
    console.log(correct.title);
    return correct;
  }

  function formatTitleForURL(title: any) {
    console.log(title);
    return title.toLowerCase().replace(/\s+/g, "-");
  }

  function formatArticleDate(date: any) {
    // Create a new Date object from the input string
    const dateObject = new Date(date);

    // Define the months array
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Extract day, month, and year from the date object
    const day = dateObject.getDate();
    const monthIndex = dateObject.getMonth();
    const year = dateObject.getFullYear();

    // Format the date string
    const formattedDate = `${months[monthIndex]} ${day}, ${year}`;

    return formattedDate;
  }

  return (
    <div className="article-page-wrapper">
      <Header />
      <section className="blog-post section-header-offset">
        {loading ? (
          <LoadingComponent />
        ) : (
          <div className="blog-post-container container">
            <div className="blog-post-data">
              <h3 className="blog-post-title title">{article?.title}</h3>
              <div className="article-data">
                <span>{formatArticleDate(article?.publish_date)}</span>
              </div>

              <Image
                src={article?.thumbnail ?? "/default.jpg"}
                width={1920}
                height={1080}
                alt="article"
              />
            </div>

            <div className="container">
              {article?.content && (
                <p dangerouslySetInnerHTML={{ __html: article?.content }} />
              )}
            </div>
          </div>
        )}
      </section>

      <div className="large-button-container" style={{ padding: "3rem 0" }}>
        <Link href={"/articles"} className="large-button button-fill">
          Return
        </Link>
      </div>
    </div>
  );
}

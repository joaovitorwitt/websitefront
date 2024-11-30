//////////////////////////////////////////////////////
// Imports
//////////////////////////////////////////////////////
"use client";
import Header from "@/app/components/Header";
import LoadingComponent from "@/app/components/LoadingComponent";
import { useEffect, useState } from "react";
import Image from "next/image";
import MathFormula from "@/app/components/MathJax";
import Head from "next/head";
import "../../assets/css/pages/article/article.modules.css";
import RoundButton from "@/app/components/RoundButton";

//////////////////////////////////////////////////////
// Article Interface
//////////////////////////////////////////////////////
interface Article {
  id: number;
  Title: string;
  Description: string;
  Content: string;
  date: string;
  image_url: string;
}

type Props = {
  params: {
    articleTitle: string;
  };
};

//////////////////////////////////////////////////////
// Article Component
//////////////////////////////////////////////////////
export default function Article({ params }: Props) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          // PRODUCTION API
          // "https://portfolio-backend-fdxe.onrender.com/api/v1/get/articles/"

          // DEVELOPMENT API
          "http://127.0.0.1:5000/get/articles"
        );
        const result = await response.json();
        console.log(result);
        const correctArticleTitle = getCorrectTitle(result);
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
      (article: any) => article.url_title === params.articleTitle
    );
    console.log(correct?.title);
    return correct;
  }

  useEffect(() => {
    if (!loading && typeof window !== "undefined" && window.MathJax) {
      window.MathJax.typeset();
    }
  }, [loading, article]);

  return (
    <>
      <Head>
        <script
          src="https://polyfill.io/v3/polyfill.min.js?features=es6"
          async
        ></script>
        <script
          id="MathJax-script"
          async
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
        ></script>
      </Head>
      <div className="article-page-wrapper">
        <Header />
        <section className="blog-post section-header-offset">
          <MathFormula formula="" />
          {loading ? (
            <LoadingComponent />
          ) : (
            <div className="blog-post-container container">
              <div className="blog-post-data">
                <h3 className="blog-post-title title">
                  {article?.Title ?? "Article Not Found"}
                </h3>

                <div className="article-data">
                  <span>{article?.date}</span>
                </div>

                <Image
                  src={article?.image_url ?? "/default.jpg"}
                  width={1920}
                  height={1080}
                  alt="article"
                  priority
                />
              </div>

              <div className="container">
                {article?.Content && (
                  <p dangerouslySetInnerHTML={{ __html: article?.Content }} />
                )}
              </div>
            </div>
          )}
        </section>

        <div className="large-button-container" style={{ padding: "3rem 0" }}>
          <RoundButton url={"/articles"} buttonText={"Return"} />
        </div>
      </div>
    </>
  );
}

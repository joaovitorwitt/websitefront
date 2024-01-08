"use client";
import Header from "../components/Header";
import Link from "next/link";
import { RevealWrapper } from "next-reveal";

export default function ThanksNewsletter() {
  return (
    <div className="thankyou-page-wrapper">
      <RevealWrapper>
        <Header />
        <div className="container">
          <div className="newsletter-container">
            <div className="thankyou-description">
              <h1 className="title">Thank you!</h1>
              <p>
                Welcome to my newsletter. Thank you for signing up! I greatly
                appreciate your interest in computer science, mathematics, and
                physics.
              </p>
            </div>

            <div className="thankyou-description thankyou-description-two">
              <h1 className="title">What to expect</h1>
              <p>
                I will provide a monthly content with articles, videos, books,
                or any other useful materials.
              </p>
            </div>

            <div className="thankyou-redirections">
              <Link href={"/"}>Back to the homepage</Link>
              <Link href={"/articles"}>Check out some articles</Link>
            </div>
          </div>
        </div>
      </RevealWrapper>
    </div>
  );
}

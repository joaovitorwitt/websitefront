"use client";
import { RevealWrapper } from "next-reveal";
import Header from "../components/Header";
import Link from "next/link";

export default function ThanksContact() {
  return (
    <RevealWrapper>
      <Header />
      <div className="container">
        <div className="thankyou-description">
          <h1 className="title">Thank you!</h1>
          <p>
            Thank you for reaching out! Your message has been successfully
            received. I will get back to you in no time to. In the meantime,
            feel free to explore my articles and stay updated with our latest
            content.
          </p>
        </div>

        <div className="thankyou-redirections">
          <Link href={"/"}>Back to the homepage</Link>
          <Link href={"/articles"}>Check out some articles</Link>
        </div>
      </div>
    </RevealWrapper>
  );
}

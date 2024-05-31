import Link from "next/link";
import Image from "next/image";
import "../assets/css/components/portfolio.modules.css";
import RoundButton from "./RoundButton";

export default function PortfolioSection() {
  return (
    <section className="portfolio section" id="portfolio">
      <div className="container">
        <div className="section-title-container">
          <h2 className="title section-title">Projects</h2>
          <div className="section-subtitle-container">
            <span className="subtitle-number has-sparkles">02</span>
            <h5 className="title section-subtitle">recent</h5>
          </div>
        </div>

        <div className="portfolio-cards d-grid">
          <Link
            href={"/projects/halting"}
            className="portfolio-card portfolio-card-1"
          >
            <div className="card-image">
              <Image
                src="https://res.cloudinary.com/djmr9rxjg/image/upload/v1704252733/project-images/physics-model-project_oafck7.png"
                alt="card1"
                width={1920}
                height={1080}
              />
            </div>

            <div className="card-heading">
              <h5 className="card-title">Halting</h5>
              <span className="card-subtitle">
                This library physics library allows you to manipulate and deal
                with physical quantities such as mass, time, length, energy, and
                much more.
              </span>
            </div>
          </Link>

          <Link
            href={"/projects/quantum-programming-project"}
            className="portfolio-card portfolio-card-2"
          >
            <div className="card-image">
              <Image
                src="https://res.cloudinary.com/djmr9rxjg/image/upload/v1704252733/project-images/quantum-programming-project_ejqzgb.png"
                alt="card1"
                width={1920}
                height={1080}
              />
            </div>
            <div className="card-heading">
              <h5 className="card-title">Quantum Programming Project</h5>
              <span className="card-subtitle">
                Shaping the next generation of quantum programing. Stay tunned
                for updates
              </span>
            </div>
          </Link>

          <Link
            href={"/projects/physics-engine"}
            className="portfolio-card portfolio-card-3"
          >
            <div className="card-image">
              <Image
                src="https://res.cloudinary.com/djmr9rxjg/image/upload/v1704252733/project-images/blockchain-project-thumb_mvomf0.png"
                alt="card1"
                width={1920}
                height={1080}
              />
            </div>

            <div className="card-heading">
              <h5 className="card-title">Physics Engine</h5>
              <span className="card-subtitle">
                Physics engine built in C, designed to perform real world
                simulations of objects, planets, and particles.
              </span>
            </div>
          </Link>

          <div className="portfolio-card portfolio-card-4 large-button-container">
            <RoundButton url={"/projects"} buttonText={"See All"} />
          </div>
        </div>
      </div>
    </section>
  );
}

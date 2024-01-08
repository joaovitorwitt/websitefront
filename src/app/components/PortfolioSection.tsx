import Link from "next/link";
import Image from "next/image";

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
            href={"/projects/ai-research-model"}
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
              <h5 className="card-title">AI Research Model</h5>
              <span className="card-subtitle">
                AI model that can solve complex mathematical and physics
                questions.
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
                My Greatest project, shaping the next generation of quantum
                programing. Stay tunned for updates
              </span>
            </div>
          </Link>

          <Link
            href={"/projects/blockchain-ecosystem"}
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
              <h5 className="card-title">Blockchain Ecosystem</h5>
              <span className="card-subtitle">
                Build, test, run, and deploy all your blockchain operations.
              </span>
            </div>
          </Link>

          <Link
            href={"/projects/physics-educational-platform"}
            className="portfolio-card portfolio-card-4"
          >
            <div className="card-image">
              <Image
                src="https://res.cloudinary.com/djmr9rxjg/image/upload/v1704252733/project-images/physics-educational-platform_cdbv7e.jpg"
                alt="card1"
                width={1920}
                height={1080}
              />
            </div>

            <div className="card-heading">
              <h5 className="card-title">Physics Educational Platform</h5>
              <span className="card-subtitle">
                Take your physics knownledge to the next level with real
                simulations.
              </span>
            </div>
          </Link>

          <Link
            href={"/projects/academic-paper-scraper"}
            className="portfolio-card portfolio-card-5"
          >
            <div className="card-image">
              <Image
                src="https://res.cloudinary.com/djmr9rxjg/image/upload/v1704252733/project-images/web-scraper-project_dfxzau.png"
                alt="card1"
                width={1920}
                height={1080}
              />
            </div>

            <div className="card-heading">
              <h5 className="card-title">Academic Paper Scraper</h5>
              <span className="card-subtitle">
                Gather all the information from the scientific community in one
                place
              </span>
            </div>
          </Link>

          <div className="portfolio-card portfolio-card-6 large-button-container">
            <Link href={"/projects"} className="large-button button-fill">
              See
              <br />
              All
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

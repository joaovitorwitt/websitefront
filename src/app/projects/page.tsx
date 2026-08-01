import Link from "next/link";
import Image from "next/image";

import "../assets/css/pages/projects/projects.modules.css";

import Header from "../components/Header";
import RoundButton from "../components/RoundButton";
import { getProjects } from "../lib/api";

export const revalidate = 300;

export default async function Projects() {
  const projects = await getProjects();

  return (
    <div className="projects-page-wrapper">
      <Header />
      <div className="container">
        <h1 className="title main-title-projects">
          Explore my personal projects where ideas come to life
        </h1>

        <div className="loading-container-wrapper">
          <div className="portfolio-cards d-grid">
            {projects.map((project, index) => (
              <Link
                href={`/projects/${project.slug}`}
                className={"portfolio-card portfolio-card-" + ((index % 6) + 1)}
                key={project.id}
              >
                <div className="card-image">
                  {project.image_url && (
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      width={1920}
                      height={1080}
                      priority
                    />
                  )}
                </div>
                <div className="card-heading">
                  <h5 className="card-title">{project.title}</h5>
                  <span className="card-subtitle">{project.description}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div
          className="portfolio-card large-button-container"
          style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
        >
          <RoundButton url={"/"} buttonText={"Return"} />
        </div>
      </div>
    </div>
  );
}

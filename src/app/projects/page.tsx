//////////////////////////////////////////////////////
// Imports
//////////////////////////////////////////////////////
"use client";
import Header from "../components/Header";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingComponent from "../components/LoadingComponent";
import Image from "next/image";
import { formatTitleForURL } from "@/app/utils";

//////////////////////////////////////////////////////
// Project Interface Implementation
//////////////////////////////////////////////////////
interface Project {
  project_id: number;
  project_title: string;
  project_description: string;
  project_image_url: string;
}

//////////////////////////////////////////////////////
// Projects Component Implementation
//////////////////////////////////////////////////////
export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          // PRODUCTION API
          // "https://portfolio-backend-fdxe.onrender.com/api/v1/get/projects/"

          // DEVELOPMENT API
          "http://127.0.0.1:8000/api/v1/get/projects/"
        );

        const result = await response.json();
        setProjects(result.projects);
      } catch (error) {
        console.log("Error fetching projects, ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="projects-page-wrapper">
      <Header />
      <div className="container">
        <h1 className="title main-title-projects">
          Explore my personal projects where ideas come to life
        </h1>

        <div className="loading-container-wrapper">
          {loading ? (
            <LoadingComponent />
          ) : (
            <div className="portfolio-cards d-grid">
              {projects.map((project) => (
                <Link
                  href={`/projects/${formatTitleForURL(project.project_title)}`}
                  as={`/projects/${formatTitleForURL(project.project_title)}`}
                  className={
                    "portfolio-card portfolio-card-" + project.project_id
                  }
                  key={project.project_id}
                >
                  <div className="card-image">
                    <Image
                      src={project.project_image_url}
                      alt="card1"
                      width={1920}
                      height={1080}
                      priority
                    />
                  </div>
                  <div className="card-heading">
                    <h5 className="card-title">{project.project_title}</h5>
                    <span className="card-subtitle">
                      {project.project_description}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div
          className="large-button-container"
          style={{ paddingTop: "3rem", paddingBottom: "3rem" }}
        >
          <Link href={"/"} className="large-button button-fill">
            Return
          </Link>
        </div>
      </div>
    </div>
  );
}

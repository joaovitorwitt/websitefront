//////////////////////////////////////////////////////
// Imports
//////////////////////////////////////////////////////
"use client";
import Link from "next/link";
import Image from "next/image";

import { useEffect, useState } from "react";
import "../assets/css/pages/projects/projects.modules.css";

import Header from "../components/Header";
import LoadingComponent from "../components/LoadingComponent";
import RoundButton from "../components/RoundButton";

import projects from "../assets/projects.json";

//////////////////////////////////////////////////////
// Project Interface Implementation
//////////////////////////////////////////////////////
interface Project {
  id: number;
  Title: string;
  Description: string;
  image_url: string;
  url_title: string;
}

//////////////////////////////////////////////////////
// Projects Component Implementation
//////////////////////////////////////////////////////
export default function Projects() {
  // const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // const response = await fetch(`http://127.0.0.1:5000/get/projects`);
        // const response = await fetch(projects);

        // const result = await response.json();

        console.log(projects);

        // setProjects(result);
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
                  href={`/projects/${project.url_title}`}
                  as={`/projects/${project.url_title}`}
                  className={"portfolio-card portfolio-card-" + project.id}
                  key={project.id}
                >
                  <div className="card-image">
                    <Image
                      src={project.image_url}
                      alt="card1"
                      width={1920}
                      height={1080}
                      priority
                    />
                  </div>
                  <div className="card-heading">
                    <h5 className="card-title">{project.Title}</h5>
                    <span className="card-subtitle">{project.Description}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
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

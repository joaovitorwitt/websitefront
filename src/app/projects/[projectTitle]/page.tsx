//////////////////////////////////////////////////////
// Imports
//////////////////////////////////////////////////////
"use client";
import Header from "@/app/components/Header";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LoadingComponent from "@/app/components/LoadingComponent";
import "../../assets/css/pages/project/project.modules.css";
import RoundButton from "@/app/components/RoundButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Url } from "url";

import projects from "../../assets/projects.json";

//////////////////////////////////////////////////////
// Project Interface Implementation
//////////////////////////////////////////////////////
interface Project {
  id: number;
  Title: string;
  Description: string;
  image_url: string;
  Content: Url | string;
  url_title: string;
}

type Props = {
  params: {
    projectTitle: string;
  };
};

//////////////////////////////////////////////////////
// Project Component Implementation
//////////////////////////////////////////////////////
export default function Project({ params }: Props) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // const response = await fetch("http://127.0.0.1:5000/get/projects");
        // const result = await response.json();
        console.log(projects);
        const correctTitleProject = getCorrectTitle(projects);
        setProject(correctTitleProject ?? null);
      } catch (error) {
        console.log("Error fetching projects,", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  function getCorrectTitle(list: Project[]) {
    return list.find((project) => project.url_title === params.projectTitle);
  }

  return (
    <div className="project-page-wrapper">
      <Header />
      <div className="container">
        <section className="project-wrapper">
          {loading ? (
            <LoadingComponent />
          ) : (
            <div className="project-container">
              <div className="project-image-data">
                <Image
                  src={project?.image_url ?? "/default.png"}
                  alt="project image"
                  width={1920}
                  height={1080}
                  priority
                />
              </div>
              <div className="project-data">
                <div className="project-data-main">
                  <h2 className="project-data-title">{project?.Title}</h2>
                  <p className="project-data-description">
                    {project?.Description}
                  </p>
                  <Link
                    href={project?.Content!}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon
                      icon={faGithub}
                      style={{ fontSize: "2.5rem", marginTop: "1rem" }}
                    />
                  </Link>
                </div>
              </div>
              <div
                className="large-button-container"
                style={{ marginTop: "2rem" }}
              >
                <RoundButton url={"/projects"} buttonText={"Return"} />
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

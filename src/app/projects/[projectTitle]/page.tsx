//////////////////////////////////////////////////////
// Imports
//////////////////////////////////////////////////////
"use client";
import Header from "@/app/components/Header";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatTitleForURL } from "@/app/utils";
import LoadingComponent from "@/app/components/LoadingComponent";
import "../../assets/css/pages/project/project.modules.css";
import RoundButton from "@/app/components/RoundButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

//////////////////////////////////////////////////////
// Project Interface Implementation
//////////////////////////////////////////////////////
interface Project {
  project_id: number;
  project_title: string;
  project_description: string;
  project_image_url: string;
  project_link: string;
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
        const response = await fetch(
          // PRODUCTION API
          "https://portfolio-backend-fdxe.onrender.com/api/v1/get/projects/"

          // DEVELOPMENT API
          // "http://127.0.0.1:8000/api/v1/get/projects/"
        );
        const result = await response.json();
        const correctTitleProject = getCorrectTitle(result.projects);
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
    return list.find(
      (project) =>
        formatTitleForURL(project.project_title) === params.projectTitle
    );
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
                  src={project?.project_image_url ?? "/default.png"}
                  alt="project image"
                  width={1920}
                  height={1080}
                  priority
                />
              </div>
              <div className="project-data">
                <div className="project-data-main">
                  <h2 className="project-data-title">
                    {project?.project_title}
                  </h2>
                  <p className="project-data-description">
                    {project?.project_description}
                  </p>
                  <Link
                    href={project?.project_link!}
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

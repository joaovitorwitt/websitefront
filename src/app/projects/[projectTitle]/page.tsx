"use client";
import Header from "@/app/components/Header";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

interface Project {
  project_id: number;
  project_title: string;
  project_description: string;
  project_image_url: string;
}

type Props = {
  params: {
    projectTitle: string;
  };
};

export default function Project({ params }: Props) {
  // ==================================================== //
  const [project, setProject] = useState<Project | null>(null);
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
  function formatTitleForURL(title: string) {
    return title.toLowerCase().replace(/\s+/g, "-");
  }
  return (
    <div className="project-page-wrapper">
      <Header />
      <div className="container">
        <section className="project-wrapper">
          {loading ? (
            <p>Loading project...</p>
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
                </div>
                <Link href="/projects" legacyBehavior>
                  <a className="return-projects">Return</a>
                </Link>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

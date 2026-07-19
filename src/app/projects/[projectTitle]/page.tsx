import Header from "@/app/components/Header";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import "../../assets/css/pages/project/project.modules.css";
import RoundButton from "@/app/components/RoundButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { getProjects, getContentItem } from "@/app/lib/api";

export const revalidate = 300;

type Props = {
  params: Promise<{ projectTitle: string }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ projectTitle: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { projectTitle } = await params;
  const project = await getContentItem("project", projectTitle);

  if (!project) return { title: "Project Not Found | João Vitor Witt" };

  return {
    title: `${project.title} | João Vitor Witt`,
    description: project.description,
  };
}

export default async function Project({ params }: Props) {
  const { projectTitle } = await params;
  const project = await getContentItem("project", projectTitle);

  if (!project) notFound();

  return (
    <div className="project-page-wrapper">
      <Header />
      <div className="container">
        <section className="project-wrapper">
          <div className="project-container">
            <div className="project-image-data">
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
            <div className="project-data">
              <div className="project-data-main">
                <h2 className="project-data-title">{project.title}</h2>
                <p className="project-data-description">
                  {project.description}
                </p>
                {project.repo_url && (
                  <a
                    href={project.repo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} on GitHub`}
                  >
                    <FontAwesomeIcon
                      icon={faGithub}
                      style={{ fontSize: "2.5rem", marginTop: "1rem" }}
                    />
                  </a>
                )}
              </div>
            </div>
            <div
              className="large-button-container"
              style={{ marginTop: "2rem" }}
            >
              <RoundButton url={"/projects"} buttonText={"Return"} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// src/components/Sections/MyProjects/Cards/ProjectCard.tsx
import React from "react";
import FlippableCard from "../../../UI/FlippableCard";
import ProjectFront from "./ProjectFront";
import ProjectBack from "./ProjectBack";

interface Project {
  title: string;
  desc: string;
  imgDesktop: string;
  imgMobile: string;
  link: string;
  technologies: string[];
}

interface Props {
  project: Project;
  onSelect?: () => void;
}

export default function ProjectCard({ project, onSelect }: Props) {
  return (
    <FlippableCard
      onFlip={onSelect}
      front={
        <ProjectFront
          title={project.title}
          desc={project.desc}
          imgDesktop={project.imgDesktop}
          imgMobile={project.imgMobile}
          link={project.link}
        />
      }
      back={<ProjectBack technologies={project.technologies} />}
    />
  );
}

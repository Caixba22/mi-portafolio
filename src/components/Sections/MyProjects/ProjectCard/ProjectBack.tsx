// src/components/Sections/MyProjects/ProjectCard/ProjectBack.tsx
import React from "react";
import type { Project } from "../ProjectReel/types";

interface Props {
  project: Project;
}

export default function ProjectBack({ project }: Props) {
  return (
    <div
      className="
        flex flex-col justify-center items-center h-full bg-[#0b0f18]/95
        border border-white/10 rounded-xl p-6
      "
    >
      <h3 className="text-cyan-400 text-lg font-semibold mb-4">
        Tecnologías
      </h3>
      <ul className="flex flex-wrap justify-center gap-3">
        {project.technologies.map((tech, i) => (
          <li
            key={i}
            className="px-3 py-1 bg-white/5 border border-white/10 text-gray-200 text-sm rounded-md"
          >
            {tech}
          </li>
        ))}
      </ul>
      <p className="text-gray-400 text-xs mt-6 opacity-75 text-center">
        Haz clic para volver
      </p>
    </div>
  );
}

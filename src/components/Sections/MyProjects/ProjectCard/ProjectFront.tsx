// src/components/Sections/MyProjects/ProjectCard/ProjectFront.tsx
import React from "react";
import type { Project } from "../ProjectReel/types";

interface Props {
  project: Project;
}

export default function ProjectFront({ project }: Props) {
  return (
    <div
      className="
        flex flex-col justify-between h-full bg-[#0b0f18] border border-white/10
        rounded-xl p-5 transition-transform duration-300 ease-in-out
        hover:scale-105 hover:shadow-[0_0_25px_rgba(0,180,255,0.3)]
      "
    >
      {/* IMÁGENES */}
      <div className="flex justify-center gap-2 mb-4">
        <img
          src={project.imgDesktop}
          alt={`${project.title} Desktop`}
          className="w-[68%] h-40 rounded-md object-cover brightness-95"
        />
        <img
          src={project.imgMobile}
          alt={`${project.title} Mobile`}
          className="w-[26%] h-40 rounded-md object-cover opacity-90"
        />
      </div>

      {/* TEXTO */}
      <div className="text-center">
        <h3 className="text-cyan-400 text-lg font-semibold mb-2">
          {project.title}
        </h3>
        <p className="text-gray-300 text-sm mb-4 opacity-90 leading-relaxed">
          {project.desc}
        </p>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-block px-4 py-2 rounded-md border border-cyan-400/60 text-cyan-400 font-semibold text-sm
            bg-cyan-400/10 hover:bg-cyan-400 hover:text-[#0b0f18]
            transition-all duration-300
          "
        >
          Visit Site →
        </a>
      </div>
    </div>
  );
}

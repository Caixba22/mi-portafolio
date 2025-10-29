// src/components/Sections/MyProjects/ProjectCard/ProjectCard.tsx
import React, { useState } from "react";
import type { Project } from "../ProjectReel/types";
import ProjectFront from "./ProjectFront";
import ProjectBack from "./ProjectBack";

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative w-full max-w-[22rem] h-[26rem] cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`
          absolute inset-0 transition-transform duration-500
          [transform-style:preserve-3d]
          ${flipped ? "[transform:rotateY(180deg)]" : ""}
        `}
      >
        {/* Front Side */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <ProjectFront project={project} />
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <ProjectBack project={project} />
        </div>
      </div>
    </div>
  );
}

import React from "react";

interface Props {
  technologies: string[];
}

export default function ProjectBack({ technologies }: Props) {
  return (
    <div
      className="
        flex flex-col items-center justify-center
        h-full p-6 gap-4
        [transform:rotateY(180deg)]
        bg-transparent
      "
    >
      <h3 className="text-[var(--color-primary)] text-base font-semibold tracking-wide">
        Technologies
      </h3>

      <ul
        className="
          flex flex-wrap gap-2 justify-center
          list-none p-0 m-0
        "
      >
        {technologies.map((tech, i) => (
          <li
            key={i}
            className="
              bg-[color-mix(in_oklab,var(--color-surface)_15%,transparent)]
              border border-[color-mix(in_oklab,var(--color-border)_30%,transparent)]
              rounded-md px-3 py-1
              text-sm font-medium
              text-[color-mix(in_oklab,var(--color-text)_85%,transparent)]
            "
          >
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
}

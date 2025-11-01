import React from "react";

interface Props {
  title: string;
  desc: string;
  imgDesktop: string;
  imgMobile: string;
  link: string;
}

export default function ProjectFront({
  title,
  desc,
  imgDesktop,
  imgMobile,
  link,
}: Props) {
  return (
    <div
      className="
        flex flex-col h-full p-5 gap-5
        bg-transparent
      "
    >
      {/* IMÁGENES */}
      <div className="flex justify-center gap-2">
        <img
          src={imgDesktop}
          alt={`${title} Desktop`}
          className="w-[68%] h-[160px] rounded-md object-cover brightness-[0.98]"
        />
        <img
          src={imgMobile}
          alt={`${title} Mobile`}
          className="w-[26%] h-[160px] rounded-md object-cover opacity-90"
        />
      </div>

      {/* TEXTO + BOTÓN */}
      <div className="flex flex-col gap-4 pb-2">
        <div>
          <h3 className="text-[var(--color-primary)] text-lg font-semibold tracking-tight mb-2">
            {title}
          </h3>
          <p className="text-app/90 text-sm leading-relaxed">
            {desc}
          </p>
        </div>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-block px-4 py-2 rounded-md text-sm font-semibold
            border border-[color-mix(in_oklab,var(--color-primary)_55%,transparent)]
            bg-[color-mix(in_oklab,var(--color-primary)_12%,transparent)]
            text-[var(--color-primary)]
            transition
            hover:bg-[var(--color-primary)] hover:text-[var(--color-bg)]
            focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/60
          "
        >
          Visit Site →
        </a>
      </div>
    </div>
  );
}

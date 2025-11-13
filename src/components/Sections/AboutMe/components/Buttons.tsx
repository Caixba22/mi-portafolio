// src/components/Sections/AboutMe/components/Buttons.tsx
import { useUI } from "../../../../context/uiContext";
import SeeButton from "./SeeButton";
import DownloadButton from "./DownloadButton";

interface Props {
  pdfPath?: string; // por si algún día quieres cambiar la ruta
}

export default function Buttons({ pdfPath = "/cv_MartínezCaixbaMiguelAngel.pdf" }: Props) {
  const { lang } = useUI();

  const labels =
    lang === "es"
      ? { see: "Ver", download: "Descargar CV" }
      : { see: "View", download: "Download CV" };

  return (
    <div
      className="
        inline-flex items-stretch
        rounded-lg overflow-hidden
        border
        shadow-[0_4px_12px_rgba(0,0,0,0.25)]
      "
      style={{
        background: "var(--color-primary)",
        color: "var(--color-bg)",
        borderColor:
          "color-mix(in oklab, var(--color-primary) 60%, var(--color-border))",
        boxShadow:
          "0 4px 12px color-mix(in oklab, var(--color-primary) 40%, transparent)",
      }}
    >
      <SeeButton href={pdfPath} label={labels.see} />

      {/* Separador central tipo barra */}
      <span
        aria-hidden="true"
        className="
          self-stretch
          flex items-center
          px-1
          text-xs font-semibold
          bg-transparent
          text-[color-mix(in_oklab,var(--color-bg)_85%,var(--color-primary))]
          opacity-80
          select-none
        "
      >
        /
      </span>

      <DownloadButton href={pdfPath} label={labels.download} />
    </div>
  );
}

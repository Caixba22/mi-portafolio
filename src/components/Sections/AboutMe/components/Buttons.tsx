// src/components/Sections/AboutMe/components/Buttons.tsx
import { useUI } from "../../../../context/uiContext";
import SeeButton from "./SeeButton";
import DownloadButton from "./DownloadButton";

interface Props {
  pdfPath?: string;
}

export default function Buttons({
  pdfPath = "/cv_MartínezCaixbaMiguelAngel.pdf",
}: Props) {
  const { lang } = useUI();

  const labels =
    lang === "es"
      ? { see: "Ver", download: "Descargar CV" }
      : { see: "View", download: "Download CV" };

  return (
    <div className="relative inline-flex group">
      {/* Halo neón suave y más controlado */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -inset-[3px]
          rounded-full
          bg-[radial-gradient(circle_at_0%_0%,rgba(56,189,248,0.45),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(129,140,248,0.5),transparent_55%)]
          opacity-60
          blur-md
          group-hover:opacity-95
          group-hover:blur-lg
          transition-all duration-300
        "
      />

      {/* Cuerpo del botón */}
      <div
        className="
          relative inline-flex items-stretch
          rounded-full overflow-hidden
          border border-[color-mix(in_oklab,var(--color-primary)_55%,transparent)]
          bg-[color-mix(in_oklab,var(--color-surface)_82%,transparent)]
          backdrop-blur-xl
          shadow-[0_12px_30px_rgba(15,23,42,0.85)]
          group-hover:-translate-y-[1px]
          group-hover:shadow-[0_16px_38px_rgba(15,23,42,0.9)]
          transition-transform duration-200
        "
        style={{ color: "var(--color-text)" }}
      >
        {/* Reflejo interior suave */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0
            bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent_45%)]
            opacity-80
          "
        />

        {/* Contenido real */}
        <div className="relative inline-flex items-stretch">
          <SeeButton href={pdfPath} label={labels.see} />

          {/* Separador: barra sutil + micro punto de luz, más fino */}
          <span
            aria-hidden="true"
            className="
              relative flex items-center justify-center
              px-1.5
            "
          >
            <span
              className="
                h-7 w-px
                bg-[color-mix(in_oklab,var(--color-primary)_70%,transparent)]
                opacity-70
                rounded-full
              "
            />
            <span
              className="
                absolute
                h-[0.22rem] w-[0.22rem]
                rounded-full
                bg-[var(--color-primary)]
                shadow-[0_0_10px_color-mix(in_oklab,var(--color-primary)_85%,transparent)]
              "
            />
          </span>

          <DownloadButton href={pdfPath} label={labels.download} />
        </div>
      </div>
    </div>
  );
}

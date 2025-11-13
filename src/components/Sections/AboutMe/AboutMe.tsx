// src/components/Sections/AboutMe/AboutMe.tsx

import { useUI } from "../../../context/uiContext";
import Buttons from "./components/Buttons";

export default function AboutMe() {
  const { lang } = useUI();

  const strings =
    lang === "es"
      ? {
          title: "Hola, soy",
          name: "Tu Nombre",
          desc:
            "Estudiante de Ingeniería de Software en los últimos semestres. Busco un lugar para realizar mis prácticas profesionales, aportar al equipo y seguir aprendiendo. Me gusta diseñar interfaces claras y responsivas; puedo trabajar sin problema en cualquier fase del ciclo de vida del software.",
        }
      : {
          title: "Hi, I'm",
          name: "Your Name",
          desc:
            "Software Engineering student in my final semesters. I'm looking for an internship to contribute to the team and keep learning. I design clear, responsive UIs and I'm comfortable working across any stage of the software lifecycle.",
        };

  const hiClass =
    "font-semibold bg-clip-text text-transparent " +
    "bg-[linear-gradient(90deg,var(--color-primary),#60a5fa)] " +
    "underline decoration-[color-mix(in_oklab,var(--color-primary)_60%,transparent)] " +
    "decoration-2 underline-offset-4 drop-shadow";

  return (
    <section
      id="about"
      className="
        w-full
        flex justify-center
        bg-transparent
        text-[var(--color-text)]
      "
    >
      <div
        className="
          relative
          w-[min(100%,52rem)]
          mx-auto
          rounded-2xl md:rounded-3xl
          border
          shadow-[0_18px_45px_rgba(0,0,0,0.15)]
          backdrop-blur-md
          px-6 sm:px-10
          py-10 md:py-12
          flex flex-col md:flex-row items-center
          gap-10 md:gap-16
          transition-all duration-300
          hover:shadow-[0_22px_55px_rgba(0,0,0,0.25)]
        "
        style={{
          borderColor: "var(--color-border)",
          background:
            "color-mix(in oklab, var(--color-surface) 75%, transparent)",
        }}
      >
        {/* Halo */}
        <div
          className="
            absolute inset-0 rounded-2xl md:rounded-3xl
            bg-[var(--color-primary)]
            opacity-10 blur-md
            pointer-events-none
          "
        />

        {/* Foto */}
        <div className="flex flex-col items-center gap-5 shrink-0 z-10">
          <div
            className="
              relative w-[180px] h-[180px]
              md:w-[220px] md:h-[220px]
              rounded-full overflow-hidden
              border-2
              shadow-[0_4px_25px_rgba(0,0,0,0.2)]
              transition-all duration-300
              hover:shadow-[0_6px_28px_color-mix(in_oklab,var(--color-primary)_45%,rgba(0,0,0,0.25))]
            "
            style={{
              borderColor:
                "color-mix(in oklab, var(--color-primary) 60%, var(--color-border))",
            }}
          >
            <img
              src="/models/profile.png"
              alt={strings.name}
              className="w-full h-full object-cover"
            />
          </div>

          <Buttons />
        </div>

        {/* Texto */}
        <div className="flex-1 max-w-[520px] text-base leading-relaxed text-center md:text-left z-10">
          <h2 className="text-3xl font-semibold mb-4">
            {strings.title}{" "}
            <span className="text-[var(--color-primary)] font-bold">
              {strings.name}
            </span>
          </h2>

          <p className="opacity-90">
            {lang === "es" ? (
              <>
                Estudiante de{" "}
                <span className={hiClass}>Ingeniería de Software</span> en los
                últimos semestres. Busco un lugar para realizar mis prácticas
                profesionales, aportar al equipo y seguir aprendiendo. Me gusta
                diseñar interfaces claras y responsivas; puedo trabajar sin
                problema en cualquier fase del ciclo de vida del software.
                <br />
                Más que un estudiante, un pensador.
              </>
            ) : (
              <>
                <span className={hiClass}>Software Engineering</span> student in
                my final semesters. I'm looking for an internship to contribute
                to the team and keep learning. I design clear, responsive UIs
                and I'm comfortable working across any stage of the software
                lifecycle.
                <br />
                More than a student, a thinker.
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

// src/components/Sections/AboutMe/AboutMe.tsx
import { useUI } from "../../../context/uiContext";

export default function AboutMe() {
  const { lang } = useUI();

  const strings =
    lang === "es"
      ? {
          title: "Hola, soy",
          name: "Tu Nombre",
          desc:
            "Estudiante de Ingeniería de Software en los últimos semestres. Busco un lugar para realizar mis prácticas profesionales, aportar al equipo y seguir aprendiendo. Me gusta diseñar interfaces claras y responsivas; puedo trabajar sin problema en cualquier fase del ciclo de vida del software.",
          cv: "Descargar CV",
        }
      : {
          title: "Hi, I'm",
          name: "Your Name",
          desc:
            "Software Engineering student in my final semesters. I'm looking for an internship to contribute to the team and keep learning. I design clear, responsive UIs and I'm comfortable working across any stage of the software lifecycle.",
          cv: "Download CV",
        };

  // Estilo del “highlight”
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
        py-20 px-4 sm:px-6 lg:px-8
        flex justify-center
        bg-transparent text-[#1a1a1a]
      "
    >
      <div
        className="
          relative
          w-[min(100%,52rem)]
          mx-auto
          rounded-2xl md:rounded-3xl
          border border-[color-mix(in_oklab,var(--color-primary)_30%,rgba(0,0,0,0.08))]
          shadow-[0_18px_45px_rgba(0,0,0,0.15)]
          bg-[rgba(255,255,255,0.65)]
          backdrop-blur-md
          px-6 sm:px-10 py-12
          flex flex-col md:flex-row items-center gap-10 md:gap-16
          transition-all duration-300
          hover:shadow-[0_22px_55px_rgba(0,0,0,0.25)]
        "
      >
        {/* ✨ Halo dinámico */}
        <div
          className="
            absolute inset-0 rounded-2xl md:rounded-3xl
            bg-[var(--color-primary)]
            opacity-15 blur-2xl
            pointer-events-none
          "
        />

        {/* 🧑‍💻 Foto + botón */}
        <div className="flex flex-col items-center gap-5 shrink-0 z-10">
          <div
            className="
              relative w-[180px] h-[180px] md:w-[220px] md:h-[220px]
              rounded-full overflow-hidden
              border-2 border-[color-mix(in_oklab,var(--color-primary)_60%,white)]
              shadow-[0_4px_25px_rgba(0,0,0,0.2)]
              transition-all duration-300
              hover:shadow-[0_6px_28px_color-mix(in_oklab,var(--color-primary)_45%,rgba(0,0,0,0.25))]
            "
          >
            <img
              src="/models/profile.png"
              alt={strings.name}
              className="w-full h-full object-cover"
            />
          </div>

          <a
            href="/cv.pdf"
            download
            className="
              inline-flex items-center justify-center
              px-5 py-2.5 rounded-lg
              bg-[var(--color-primary)]
              text-white font-semibold text-base
              transition-all duration-200
              hover:brightness-110 hover:-translate-y-0.5
              focus:outline-none
              focus:ring-2 focus:ring-[var(--color-primary)]
              focus:ring-offset-2 focus:ring-offset-white
            "
          >
            {strings.cv}
          </a>
        </div>

        {/* 💬 Texto */}
        <div className="flex-1 max-w-[520px] text-base leading-relaxed text-center md:text-left z-10">
          <h2 className="text-3xl font-semibold mb-4">
            {strings.title}{" "}
            <span className="text-[var(--color-primary)] font-bold">
              {strings.name}
            </span>
          </h2>

          {lang === "es" ? (
            <p className="opacity-90">
              Estudiante de{" "}
              <span className={hiClass}>Ingeniería de Software</span> en los
              últimos semestres. Busco un lugar para realizar mis prácticas
              profesionales, aportar al equipo y seguir aprendiendo. Me gusta
              diseñar interfaces claras y responsivas; puedo trabajar sin
              problema en cualquier fase del ciclo de vida del software.
              <br />
              Más que un estudiante, un pensador.
            </p>
          ) : (
            <p className="opacity-90">
              <span className={hiClass}>Software Engineering</span> student in
              my final semesters. I’m looking for an internship to contribute to
              the team and keep learning. I design clear, responsive UIs and I’m
              comfortable working across any stage of the software lifecycle.
              <br />
              More than a student, a thinker.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

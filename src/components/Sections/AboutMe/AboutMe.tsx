// src/components/Sections/AboutMe/AboutMe.tsx
import { useUI } from "../../../context/uiContext"; // ajusta la ruta

export default function AboutMe() {
  const { lang } = useUI();

  const strings =
    lang === "es"
      ? {
          title: "Hola, soy",
          name: "Tu Nombre",
          desc:
            "Desarrollador full-stack especializado en React, Three.js y experiencias 3D. Me gusta crear interfaces elegantes y útiles.",
          cv: "Descargar CV",
        }
      : {
          title: "Hi, I'm",
          name: "Your Name",
          desc:
            "Full-stack developer specialized in React, Three.js and 3D experiences. I love building clean and useful UIs.",
          cv: "Download CV",
        };

  return (
    <section id="about" className="py-16 bg-app text-app">
      <div className="max-w-[1200px] mx-auto px-[clamp(1rem,5vw,2rem)]">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
          {/* 🧑‍💻 Foto + botón */}
          <div className="flex flex-col items-center gap-5 shrink-0">
            <img
              src="/models/profile.png"
              alt={strings.name}
              className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full object-cover
                         border border-app
                         shadow-[0_0_18px_rgba(0,0,0,0.25)]"
            />

            <a
              href="/cv.pdf"
              download
              className="btn-primary"
            >
              {strings.cv}
            </a>
          </div>

          {/* 💬 Texto */}
          <div className="flex-1 max-w-[520px] text-base leading-relaxed">
            <h2 className="text-3xl font-semibold mb-4">
              {strings.title}{" "}
              <span className="text-[var(--color-primary)] font-bold">
                {strings.name}
              </span>
            </h2>
            <p className="opacity-90">{strings.desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

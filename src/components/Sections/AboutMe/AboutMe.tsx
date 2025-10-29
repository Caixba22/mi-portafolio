// src/components/Sections/AboutMe/AboutMe.tsx
import React from "react";

export default function AboutMe() {
  return (
    <section
      id="about"
      className="
        relative z-10 flex items-center justify-center 
        px-8 pt-10 pb-24 text-white
      "
    >
      <div
        className="
          flex flex-col md:flex-row items-center justify-center gap-14
          max-w-[900px] w-full mx-auto text-center md:text-left
        "
      >
        {/* 🧑‍💻 Imagen + botón */}
        <div className="flex flex-col items-center gap-5 flex-shrink-0">
          <img
            src="/models/profile.png"
            alt="Tu foto"
            className="
              w-[180px] h-[180px] md:w-[220px] md:h-[220px] 
              rounded-full object-cover border border-sky-400/20 
              shadow-[0_0_10px_rgba(0,180,255,0.5),_inset_0_0_5px_rgba(0,180,255,0.2)] 
              transition-all duration-300 ease-out
            "
          />

          <a
            href="/cv.pdf"
            download
            className="
              bg-blue-600 hover:bg-blue-700 text-white font-semibold 
              px-6 py-3 rounded-lg transition-all duration-300
            "
          >
            Descargar CV
          </a>
        </div>

        {/* 💬 Texto descriptivo */}
        <div className="flex-1 max-w-[480px] text-base leading-relaxed">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Hola, soy{" "}
            <span className="text-sky-400 font-bold">Tu Nombre</span>
          </h2>
          <p className="opacity-90">
            Desarrollador full-stack especializado en{" "}
            <b>React</b>, <b>Three.js</b> y desarrollo interactivo en 3D.  
            Me apasiona crear interfaces elegantes y experiencias inmersivas.
          </p>
        </div>
      </div>
    </section>
  );
}

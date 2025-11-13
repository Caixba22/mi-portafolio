// src/pages/LandingPage.tsx
import Header from "../components/Sections/Header/Header";
import { AppMenu } from "../components/AppMenu";
import AboutMe from "../components/Sections/AboutMe/AboutMe";
import MyProjects from "../components/Sections/MyProjects/MyProjects";
import Contact from "../components/Sections/Contact/ContactForm";

export default function LandingPage() {
  return (
    <div
      className="
        w-full min-h-screen overflow-x-hidden
        transition-colors duration-300
      "
      style={{
        background: "var(--color-bg)",
        color: "var(--color-text)",
      }}
    >
      {/* 🔝 Encabezado */}
      <Header />

      {/* 🧭 Menú flotante de contraste */}
      <AppMenu />

      {/* 💬 Sección AboutMe */}
      <main className="max-w-[1200px] mx-auto px-[clamp(1rem,5vw,2rem)]">
        <AboutMe />
      </main>

      {/* 💻 Proyectos */}
      <MyProjects />

      {/* 💌 Contacto */}
      <main className="max-w-[1200px] mx-auto px-[clamp(1rem,5vw,2rem)] pb-16">
        <Contact />
      </main>
    </div>
  );
}

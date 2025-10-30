// src/pages/LandingPage.tsx
import Header from "../components/Sections/Header/Header";
import AboutMe from "../components/Sections/AboutMe/AboutMe";
import MyProjects from "../components/Sections/MyProjects/MyProjects";
import Contact from "../components/Sections/Contact/ContactForm";

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-app text-app">
      {/* Header fijo arriba */}
      <Header />

      {/* Contenido centrado */}
      <main className="max-w-[1200px] mx-auto px-[clamp(1rem,5vw,2rem)]">
        {/* 👇 esta sección puede llegar desde #about */}
        <AboutMe />
      </main>

      {/* full width pero con scroll-margin */}
      <MyProjects />

      <main className="max-w-[1200px] mx-auto px-[clamp(1rem,5vw,2rem)] pb-16">
        {/* 👇 esta sección puede llegar desde #contact */}
        <Contact />
      </main>
    </div>
  );
}

// src/pages/LandingPage.tsx
import Header from '../components/Sections/Header'
import AboutMe from '../components/Sections/AboutMe'
import MyProjects from '../components/Sections/MyProjects'
import Contact from '../components/Sections/ContactForm' // 👈 importamos la nueva sección

export default function LandingPage() {
  return (
   <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0a0e15 0%, #10141f 100%)',
        color: 'white',
        fontFamily: 'Inter, sans-serif',
        // ✅ Aseguramos que nada se salga horizontalmente
        overflowX: 'hidden', 
        overflowY: 'auto', 
        scrollBehavior: 'smooth',
      }}
    >
      {/* 🌐 Encabezado principal */}
      <Header />

      {/* 🧍‍♂️ Sección "Sobre mí" */}
      <AboutMe />

      {/* 💼 Sección de proyectos + modelo 3D */}
      <MyProjects />

      {/* 📬 Sección de contacto */}
      <Contact />
    </div>
  )
}

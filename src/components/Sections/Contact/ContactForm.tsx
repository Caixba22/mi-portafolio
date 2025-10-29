// src/components/Sections/Contact/ContactForm.tsx
import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Mensaje enviado:", formData);
    alert("Gracias por tu mensaje. Te contactaré pronto 🚀");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="
        w-full min-h-[80vh] flex flex-col items-center justify-center
        px-6 sm:px-10 py-24
        bg-gradient-to-b from-[#10141f] to-[#0a0e15]
        text-white
      "
    >
      {/* 📨 Título */}
      <h2
        className="
          text-[2rem] sm:text-[2.4rem] mb-10 text-sky-400 text-center
          drop-shadow-[0_0_10px_rgba(0,180,255,0.3)]
        "
      >
        Contáctame
      </h2>

      {/* 📬 Formulario */}
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-[600px] flex flex-col gap-5
          bg-white/5 p-10 rounded-2xl
          shadow-[0_0_25px_rgba(0,180,255,0.1)]
          backdrop-blur-md
        "
      >
        {/* Nombre */}
        <label className="font-medium">Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Tu nombre"
          required
          className="
            px-4 py-3 rounded-lg border border-[#1c2435]
            bg-[#0f131d] text-white outline-none text-base
            transition-all duration-300
            focus:border-sky-400 focus:shadow-[0_0_8px_rgba(0,180,255,0.3)]
          "
        />

        {/* Correo */}
        <label className="font-medium">Correo</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="tucorreo@ejemplo.com"
          required
          className="
            px-4 py-3 rounded-lg border border-[#1c2435]
            bg-[#0f131d] text-white outline-none text-base
            transition-all duration-300
            focus:border-sky-400 focus:shadow-[0_0_8px_rgba(0,180,255,0.3)]
          "
        />

        {/* Mensaje */}
        <label className="font-medium">Mensaje</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Escribe tu mensaje aquí..."
          required
          rows={5}
          className="
            px-4 py-3 rounded-lg border border-[#1c2435]
            bg-[#0f131d] text-white outline-none text-base resize-none
            transition-all duration-300
            focus:border-sky-400 focus:shadow-[0_0_8px_rgba(0,180,255,0.3)]
          "
        />

        {/* Botón */}
        <button
          type="submit"
          className="
            mt-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 
            rounded-lg text-white font-semibold text-base
            transition-all duration-300 hover:-translate-y-0.5
          "
        >
          Enviar mensaje
        </button>
      </form>
    </section>
  );
}

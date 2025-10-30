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
        w-full
        flex justify-center
        px-4 sm:px-6 lg:px-8
        py-20
        bg-app
        text-app
      "
    >
      {/* CONTENEDOR REDONDEADO */}
      <div
        className="
          w-[min(100%,52rem)]
          mx-auto
          bg-[color-mix(in_oklab,var(--color-bg-soft)_88%,transparent)]
          border border-[color-mix(in_oklab,var(--color-border)_80%,transparent)]
          rounded-2xl md:rounded-3xl
          shadow-[0_18px_45px_rgba(0,0,0,0.25)]
          backdrop-blur-sm
          px-5 sm:px-10
          py-10 sm:py-12
        "
      >
        {/* título */}
        <h2
          className="
            text-[2rem] sm:text-[2.4rem]
            mb-10
            text-[var(--color-primary)]
            text-center
          "
        >
          Contáctame
        </h2>

        {/* formulario */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          {/* Nombre */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-app" htmlFor="name">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tu nombre"
              required
              className="
                px-4 py-3 rounded-lg
                border border-[color-mix(in_oklab,var(--color-border)_80%,transparent)]
                bg-[color-mix(in_oklab,var(--color-bg)_75%,transparent)]
                text-app outline-none text-base
                placeholder:text-muted
                transition-all duration-200
                focus:border-[var(--color-primary)]
                focus:ring-2 focus:ring-[color-mix(in_oklab,var(--color-primary)_45%,transparent)]
              "
            />
          </div>

          {/* Correo */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-app" htmlFor="email">
              Correo
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tucorreo@ejemplo.com"
              required
              className="
                px-4 py-3 rounded-lg
                border border-[color-mix(in_oklab,var(--color-border)_80%,transparent)]
                bg-[color-mix(in_oklab,var(--color-bg)_75%,transparent)]
                text-app outline-none text-base
                placeholder:text-muted
                transition-all duration-200
                focus:border-[var(--color-primary)]
                focus:ring-2 focus:ring-[color-mix(in_oklab,var(--color-primary)_45%,transparent)]
              "
            />
          </div>

          {/* Mensaje */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-app" htmlFor="message">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Escribe tu mensaje aquí..."
              required
              rows={5}
              className="
                px-4 py-3 rounded-lg
                border border-[color-mix(in_oklab,var(--color-border)_80%,transparent)]
                bg-[color-mix(in_oklab,var(--color-bg)_75%,transparent)]
                text-app outline-none text-base resize-none
                placeholder:text-muted
                transition-all duration-200
                focus:border-[var(--color-primary)]
                focus:ring-2 focus:ring-[color-mix(in_oklab,var(--color-primary)_45%,transparent)]
              "
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="
              mt-2
              inline-flex items-center justify-center
              px-6 py-3
              rounded-lg
              bg-[var(--color-primary)]
              text-[var(--color-text)]
              font-semibold text-base
              transition-all duration-200
              hover:brightness-110
              hover:-translate-y-0.5
              focus:outline-none
              focus:ring-2 focus:ring-[color-mix(in_oklab,var(--color-primary)_50%,transparent)]
              focus:ring-offset-2
              focus:ring-offset-[color-mix(in_oklab,var(--color-bg-soft)_80%,transparent)]
            "
          >
            Enviar mensaje
          </button>
        </form>
      </div>
    </section>
  );
}

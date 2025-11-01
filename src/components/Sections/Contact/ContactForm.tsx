// src/components/Sections/Contact/ContactForm.tsx
import React, { useState } from "react";
import { useUI } from "../../../context/uiContext";

export default function ContactForm() {
  const { lang } = useUI();

  const strings =
    lang === "es"
      ? {
          title: "Contáctame",
          nameLabel: "Nombre",
          namePh: "Tu nombre",
          emailLabel: "Correo",
          emailPh: "tucorreo@ejemplo.com",
          msgLabel: "Mensaje",
          msgPh: "Escribe tu mensaje aquí...",
          submit: "Enviar mensaje",
          alert: "Gracias por tu mensaje. Te contactaré pronto 🚀",
          sentLog: "Mensaje enviado:",
          privacy:
            "🔒 Descuida: no almacenamos tu información. Tu mensaje no se guarda en ningún servidor.",
        }
      : {
          title: "Contact me",
          nameLabel: "Name",
          namePh: "Your name",
          emailLabel: "Email",
          emailPh: "you@example.com",
          msgLabel: "Message",
          msgPh: "Write your message here...",
          submit: "Send message",
          alert: "Thanks for your message. I’ll get back to you soon 🚀",
          sentLog: "Message sent:",
          privacy:
            "🔒 Don’t worry: we don’t store your information. Your message isn’t saved on any server.",
        };

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
    console.log(strings.sentLog, formData);
    alert(strings.alert);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
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
          transition-all duration-300
          hover:shadow-[0_22px_55px_rgba(0,0,0,0.25)]
        "
      >
        {/* ✨ Halo dinámico alrededor del bloque */}
        <div
          className="
            absolute inset-0 rounded-2xl md:rounded-3xl
            bg-[var(--color-primary)]
            opacity-15 blur-2xl
            pointer-events-none
          "
        />

        {/* 💌 Contenido principal */}
        <div className="relative z-10">
          <h2
            className="
              text-[2rem] sm:text-[2.4rem]
              mb-10
              text-[var(--color-primary)]
              text-center font-semibold
            "
          >
            {strings.title}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Nombre */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-[#1a1a1a]" htmlFor="name">
                {strings.nameLabel}
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={strings.namePh}
                required
                className="
                  px-4 py-3 rounded-lg
                  border border-[color-mix(in_oklab,var(--color-primary)_25%,rgba(0,0,0,0.08))]
                  bg-[rgba(255,255,255,0.75)]
                  text-[#1a1a1a] outline-none text-base
                  placeholder:text-gray-500
                  transition-all duration-200
                  focus:border-[var(--color-primary)]
                  focus:ring-2 focus:ring-[color-mix(in_oklab,var(--color-primary)_45%,transparent)]
                "
              />
            </div>

            {/* Correo */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-[#1a1a1a]" htmlFor="email">
                {strings.emailLabel}
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={strings.emailPh}
                required
                className="
                  px-4 py-3 rounded-lg
                  border border-[color-mix(in_oklab,var(--color-primary)_25%,rgba(0,0,0,0.08))]
                  bg-[rgba(255,255,255,0.75)]
                  text-[#1a1a1a] outline-none text-base
                  placeholder:text-gray-500
                  transition-all duration-200
                  focus:border-[var(--color-primary)]
                  focus:ring-2 focus:ring-[color-mix(in_oklab,var(--color-primary)_45%,transparent)]
                "
              />
            </div>

            {/* Mensaje */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-[#1a1a1a]" htmlFor="message">
                {strings.msgLabel}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={strings.msgPh}
                required
                rows={5}
                className="
                  px-4 py-3 rounded-lg
                  border border-[color-mix(in_oklab,var(--color-primary)_25%,rgba(0,0,0,0.08))]
                  bg-[rgba(255,255,255,0.75)]
                  text-[#1a1a1a] outline-none text-base resize-none
                  placeholder:text-gray-500
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
                text-white font-semibold text-base
                transition-all duration-200
                hover:brightness-110
                hover:-translate-y-0.5
                focus:outline-none
                focus:ring-2 focus:ring-[var(--color-primary)]
                focus:ring-offset-2 focus:ring-offset-white
              "
            >
              {strings.submit}
            </button>

            {/* Nota de privacidad */}
            <p className="text-xs text-gray-600/90 mt-3 text-center">
              {strings.privacy}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

//src/components/Sections/AboutMe.tsx
import React, { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Mensaje enviado:', formData)
    alert('Gracias por tu mensaje. Te contactaré pronto 🚀')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section
      id="contact"
      style={{
        width: '100%',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 2rem',
        background: 'linear-gradient(180deg, #10141f 0%, #0a0e15 100%)',
        color: 'white',
      }}
    >
      {/* 📨 Título */}
      <h2
        style={{
          fontSize: '2.4rem',
          marginBottom: '2.5rem',
          color: '#00b4ff',
          textAlign: 'center',
          textShadow: '0 0 10px rgba(0,180,255,0.3)',
        }}
      >
        Contáctame
      </h2>

      {/* 📬 Formulario */}
      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          maxWidth: '600px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem',
          background: 'rgba(255,255,255,0.05)',
          padding: '2.5rem',
          borderRadius: '16px',
          boxShadow: '0 0 25px rgba(0,180,255,0.1)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <label style={{ fontWeight: 500 }}>Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Tu nombre"
          required
          style={{
            padding: '0.8rem 1rem',
            borderRadius: '8px',
            border: '1px solid #1c2435',
            backgroundColor: '#0f131d',
            color: 'white',
            outline: 'none',
            fontSize: '1rem',
            transition: 'border 0.3s, box-shadow 0.3s',
          }}
          onFocus={(e) => {
            e.target.style.border = '1px solid #00b4ff'
            e.target.style.boxShadow = '0 0 8px rgba(0,180,255,0.3)'
          }}
          onBlur={(e) => {
            e.target.style.border = '1px solid #1c2435'
            e.target.style.boxShadow = 'none'
          }}
        />

        <label style={{ fontWeight: 500 }}>Correo</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="tucorreo@ejemplo.com"
          required
          style={{
            padding: '0.8rem 1rem',
            borderRadius: '8px',
            border: '1px solid #1c2435',
            backgroundColor: '#0f131d',
            color: 'white',
            outline: 'none',
            fontSize: '1rem',
            transition: 'border 0.3s, box-shadow 0.3s',
          }}
          onFocus={(e) => {
            e.target.style.border = '1px solid #00b4ff'
            e.target.style.boxShadow = '0 0 8px rgba(0,180,255,0.3)'
          }}
          onBlur={(e) => {
            e.target.style.border = '1px solid #1c2435'
            e.target.style.boxShadow = 'none'
          }}
        />

        <label style={{ fontWeight: 500 }}>Mensaje</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Escribe tu mensaje aquí..."
          required
          rows={5}
          style={{
            padding: '0.8rem 1rem',
            borderRadius: '8px',
            border: '1px solid #1c2435',
            backgroundColor: '#0f131d',
            color: 'white',
            outline: 'none',
            fontSize: '1rem',
            resize: 'none',
            transition: 'border 0.3s, box-shadow 0.3s',
          }}
          onFocus={(e) => {
            e.target.style.border = '1px solid #00b4ff'
            e.target.style.boxShadow = '0 0 8px rgba(0,180,255,0.3)'
          }}
          onBlur={(e) => {
            e.target.style.border = '1px solid #1c2435'
            e.target.style.boxShadow = 'none'
          }}
        />

        <button
          type="submit"
          style={{
            marginTop: '1rem',
            padding: '0.9rem 1.4rem',
            background: '#0d6efd',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.3s, transform 0.2s',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#0b5ed7'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = '#0d6efd'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Enviar mensaje
        </button>
      </form>
    </section>
  )
}

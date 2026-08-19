import React from 'react';

export function Navbar() {
  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4 flex justify-center">
      <header className="w-full max-w-7xl bg-white rounded-full p-2 flex justify-between items-center [box-shadow:0px_4px_0px_0px_rgba(0,0,0,0.15)]">
        <div className="flex items-center gap-3 px-4">
        <a href="https://www.aluragonzalez.com" className="flex items-center gap-3 px-4 hover:opacity-80 transition-opacity">
          <img src="/e-commerce-audit-dashboard/seedling-fill.svg" alt="Icono" className="w-6 h-6 object-contain" />
          <span className="font-extrabold text-lg tracking-tight">Laura González</span>
          </a>
        </div>
        <nav className="hidden md:flex gap-8 font-medium text-base items-center">
          <a href="https://www.aluragonzalez.com/#case-studies" className="hover:text-brand-purple transition-colors">Case Studies</a>
          <a href="https://www.aluragonzalez.com/#philosophy" className="hover:text-brand-purple transition-colors">Philosophy</a>
          <a href="https://www.aluragonzalez.com/#contact" className="hover:text-brand-purple transition-colors">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          {/* Cambiado a 'Let's talk' y configurado para abrir el correo */}
          <a 
            href="mailto:alura.gonzalez@gmail.com" 
            className="bg-[#111111] text-white text-base font-bold px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity"
          >
            Let's talk
          </a>
        </div>
      </header>
    </div>
  );
}
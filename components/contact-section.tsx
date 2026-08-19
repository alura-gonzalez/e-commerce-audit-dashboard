import React from 'react';

export function ContactSection() {
  return (
    <section id="contact" className="w-full py-[200px] bg-[#2665d6] text-white relative overflow-hidden">
      
      {/* Contenedor fijo para la planta izquierda */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-full flex items-center pointer-events-none select-none opacity-100">
        <img 
          src="/e-commerce-audit-dashboard/seedling-fill.svg" 
          alt="" 
          className="h-[120%] w-auto max-none object-contain brightness-0 saturate-100" 
          style={{ filter: 'brightness(0) saturate(100%) invert(26%) sepia(85%) saturate(1637%) hue-rotate(205deg) brightness(93%) contrast(93%)' }} 
        />
      </div>

      {/* Contenedor fijo para la planta derecha con el color #7321bf */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-full flex items-center pointer-events-none select-none opacity-100 scale-x-[-1]">
        <img 
          src="/e-commerce-audit-dashboard/seedling-fill.svg" 
          alt="" 
          className="h-[120%] w-auto max-none object-contain brightness-0 saturate-100" 
          style={{ filter: 'brightness(0) saturate(100%) invert(24%) sepia(51%) saturate(3474%) hue-rotate(222deg) brightness(90%) contrast(97%)'}} 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 text-center flex flex-col items-center justify-center relative z-10">
        
        {/* Título principal con la palabra "real" en el color #D2E823 */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-10 leading-[1.1] max-w-4xl">
          Have an idea? <br />
          Let's make it <span className="text-[#D2E823]">real.</span>
        </h2>

        {/* Botones de acción inferiores */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          
          {/* Botón principal de correo */}
          <a 
            href="mailto:alura.gonzalez@gmail.com" 
            className="bg-[#D2E823] hover:opacity-90 text-[#111111] font-bold text-base px-8 py-4 rounded-full transition-opacity inline-flex items-center gap-2"
          >
            hello@aluragonzalez.com
          </a>

          {/* Enlace secundario "ABOUT ME" */}
          <a 
            href="https://www.aluragonzalez.com/#about" 
            className="text-white hover:text-[#D2E823] font-extrabold text-sm uppercase tracking-wider px-6 py-4 transition-colors inline-flex items-center gap-2"
          >
            ABOUT ME 👋
          </a>

        </div>

      </div>
    </section>
  );
}
import React from 'react';

export function AboutSection() {
  return (
    <section className="py-20 px-4 bg-[#780016]">
      <div className="max-w-4xl mx-auto">
        
        {/* Título con separación corta hacia el párrafo */}
        <h2 className="text-4xl font-bold text-[#f8e8ff] mb-4">About this Audit Dashboard</h2>
        
        {/* Párrafo principal con separación amplia hacia las columnas */}
        <p className="text-[#f8e8ff] leading-relaxed mb-14">
          Your website now serves two types of users: humans and AI agents. Shoppers are increasingly buying through their personalized AI assistants, meaning your e-commerce could be getting overlooked if it is not "machine-readable." By entering your product URL, this dashboard instantly evaluates your site's agent readiness.
          <br /><br />
          🔥Tip: It’s time to design for agents, not just humans.
        </p>
        
        {/* Cuadrícula de 3 columnas */}
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-3 text-[#f8e8ff]">What it solves</h3>
            <p className="text-[#f8e8ff]">Identifies critical conversion friction by evaluating e-commerce performance through both Human-Centric Heuristics (Jakob Nielsen) and AI-Readiness Frameworks (ICEME 2026). It ensures your store is optimized for both human shoppers and autonomous web agents.</p>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-3 text-[#f8e8ff]">How it works</h3>
            <p className="text-[#f8e8ff]">Our agent-driven audits analyze your site across three dimensions: Interpretability (semantic clarity/machine readability), Executability (action pathways/API reliability), and Decision Reliability (evidence/temporal validity signals). The dashboard maps these findings into actionable recommendations.</p>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-3 text-[#f8e8ff]">Built with</h3>
            <p className="text-[#f8e8ff]">A modern stack using React and Tailwind CSS, deployed on Vercel. Powered by real-time automated workflows via Make and GitHub API webhooks to deliver instantaneous performance scores.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
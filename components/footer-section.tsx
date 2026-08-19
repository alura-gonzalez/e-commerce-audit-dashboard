import React from 'react';

export function FooterSection() {
  return (
    <footer className="w-full bg-[#2665d6] text-white border-t border-white/15">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        <div className="py-8 flex flex-col md:flex-row justify-between items-center text-sm font-medium">
          <p>© 2026 Laura González. Made with React, Tailwind & Gemini.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
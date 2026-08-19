import { AuditDashboard } from "@/components/audit-dashboard"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { FooterSection } from "@/components/footer-section" // 1. Importa aquí

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f4f3ec]">
      <Navbar />
      {/* 2. Colócalo justo aquí */}
      <HeroSection />
      <div className="pt-24">
        <AuditDashboard />
        <AboutSection />
      <ContactSection />
      <FooterSection /> {/* 2. Colócalo al final */}
      </div>
    </main>
  )
}
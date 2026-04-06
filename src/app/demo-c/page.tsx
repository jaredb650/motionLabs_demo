"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { siteContent } from "@/lib/content";
import { img } from "@/lib/basePath";

/* -------------------------------------------------------------------------- */
/*  ICON COMPONENTS                                                           */
/* -------------------------------------------------------------------------- */

function IconUser() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}

function IconBuilding() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5M3.75 3v18m4.5-18v18m4.5-18v18m4.5-18v18M6 6.75h.008v.008H6V6.75zm0 3h.008v.008H6V9.75zm0 3h.008v.008H6v-.008zm0 3h.008v.008H6v-.008zm3-9h.008v.008H9V6.75zm0 3h.008v.008H9V9.75zm0 3h.008v.008H9v-.008zm0 3h.008v.008H9v-.008zm3-9h.008v.008H12V6.75zm0 3h.008v.008H12V9.75zm0 3h.008v.008H12v-.008zm0 3h.008v.008H12v-.008zm3-9h.008v.008H15V6.75zm0 3h.008v.008H15V9.75zm0 3h.008v.008H15v-.008zm0 3h.008v.008H15v-.008z" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.264.26-2.467.73-3.563" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function IconSparkles() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}

const iconMap: Record<string, () => React.JSX.Element> = {
  user: IconUser,
  users: IconUsers,
  building: IconBuilding,
  globe: IconGlobe,
  calendar: IconCalendar,
  sparkles: IconSparkles,
};

/* -------------------------------------------------------------------------- */
/*  REUSABLE ANIMATION WRAPPERS                                               */
/* -------------------------------------------------------------------------- */

function FadeInOnScroll({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const dirMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...dirMap[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 60, damping: 20, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  BLOB CSS KEYFRAMES (injected via style tag)                               */
/* -------------------------------------------------------------------------- */

const blobStyles = `
@keyframes blobMorph1 {
  0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: rotate(0deg) scale(1); }
  25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: rotate(90deg) scale(1.05); }
  50% { border-radius: 50% 60% 30% 60% / 30% 50% 70% 60%; transform: rotate(180deg) scale(0.95); }
  75% { border-radius: 60% 30% 60% 40% / 70% 40% 50% 60%; transform: rotate(270deg) scale(1.02); }
}

@keyframes blobMorph2 {
  0%, 100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; transform: rotate(0deg) scale(1); }
  33% { border-radius: 70% 30% 50% 60% / 30% 70% 40% 60%; transform: rotate(120deg) scale(1.08); }
  66% { border-radius: 50% 50% 30% 70% / 60% 40% 70% 30%; transform: rotate(240deg) scale(0.96); }
}

@keyframes blobMorph3 {
  0%, 100% { border-radius: 50% 50% 40% 60% / 50% 40% 60% 50%; transform: rotate(0deg) scale(1); }
  50% { border-radius: 40% 60% 50% 50% / 60% 50% 40% 60%; transform: rotate(180deg) scale(1.04); }
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes breathe {
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.05); opacity: 1; }
}

@keyframes floatUp {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}
`;

/* -------------------------------------------------------------------------- */
/*  MAIN PAGE COMPONENT                                                       */
/* -------------------------------------------------------------------------- */

export default function DemoCPage() {
  const [toast, setToast] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  /* Track active section for nav highlighting */
  useEffect(() => {
    const sections = ["about", "services", "credentials", "gallery", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* Smooth scroll handler */
  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  /* Form submit handler */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  /* Gallery images */
  const galleryImages = [
    { src: img("/images/gallery/lucy_d1.webp"), alt: "Gentle pose at columns, graceful movement", orientation: "portrait" },
    { src: img("/images/gallery/lucy_d5.webp"), alt: "Dramatic backbend with flowing hair, dreamy atmosphere", orientation: "landscape" },
    { src: img("/images/gallery/lucy_f3.webp"), alt: "Silhouette with lens flare, ethereal light", orientation: "landscape" },
    { src: img("/images/gallery/lucy_f5.webp"), alt: "Soft portrait at column, contemplative expression", orientation: "portrait" },
    { src: img("/images/gallery/lucy_f7.webp"), alt: "Seated pose reaching upward, intimate moment", orientation: "portrait" },
    { src: img("/images/gallery/lucy_f9.webp"), alt: "Close-up arms in movement, soft motion blur", orientation: "landscape" },
    { src: img("/images/gallery/lucy_f17.webp"), alt: "Expressive pose with arms framing face", orientation: "portrait" },
    { src: img("/images/gallery/lucy_f21.webp"), alt: "Joyful smile close-up with hair flowing naturally", orientation: "landscape" },
    { src: img("/images/gallery/lucy_f30.webp"), alt: "Gentle movement with eyes closed, peaceful expression", orientation: "portrait" },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: blobStyles }} />

      {/* ================================================================== */}
      {/*  NAVIGATION                                                        */}
      {/* ================================================================== */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 60, damping: 18, delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
        style={{
          background: "linear-gradient(135deg, rgba(248,215,218,0.6), rgba(212,181,216,0.5), rgba(255,248,240,0.6))",
          borderBottom: "1px solid rgba(232,180,200,0.3)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#8B5E83] hover:text-[#C9A0DC] transition-colors duration-300"
            >
              &larr; Back to Styles
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {siteContent.navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`px-4 py-1.5 rounded-full text-sm font-[family-name:var(--font-inter)] font-light transition-all duration-300 ${
                    activeSection === link.href.replace("#", "")
                      ? "bg-white/60 text-[#8B5E83] shadow-sm"
                      : "text-[#8B5E83]/70 hover:bg-white/40 hover:text-[#8B5E83]"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => scrollTo("#contact")}
              className="md:hidden px-4 py-1.5 rounded-full text-sm font-[family-name:var(--font-inter)] bg-gradient-to-r from-[#E8B4C8] to-[#C9A0DC] text-white"
            >
              Contact
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ================================================================== */}
      {/*  HERO SECTION                                                      */}
      {/* ================================================================== */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #F8D7DA 0%, #E8B4C8 20%, #D4B5D8 40%, #C9A0DC 60%, #F0D78C 80%, #FFF8F0 100%)",
            backgroundSize: "400% 400%",
            animation: "gradientShift 12s ease infinite",
          }}
        />

        {/* Blob shapes */}
        <div
          className="absolute top-[10%] left-[5%] w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] opacity-30"
          style={{
            background: "linear-gradient(135deg, #F8D7DA, #C9A0DC)",
            animation: "blobMorph1 18s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-[10%] right-[5%] w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] opacity-25"
          style={{
            background: "linear-gradient(135deg, #F0D78C, #E8B4C8)",
            animation: "blobMorph2 22s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] opacity-20"
          style={{
            background: "linear-gradient(135deg, #D4B5D8, #F0D78C)",
            animation: "blobMorph3 15s ease-in-out infinite",
          }}
        />

        {/* Hero Image — Lucy silhouette emerging from the gradient */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 30, damping: 18, delay: 0.3 }}
          className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none"
        >
          <div className="relative w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] lg:w-[520px] lg:h-[520px]">
            <div
              className="absolute inset-0 rounded-[50%] overflow-hidden"
              style={{
                boxShadow: "0 8px 60px rgba(201, 160, 220, 0.35), 0 2px 20px rgba(232, 180, 200, 0.25)",
              }}
            >
              <Image
                src="/images/hero/lucy_f3.webp"
                alt="Lucy — ethereal backlit silhouette with lens flare"
                fill
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 420px, 520px"
                className="object-cover"
                style={{ mixBlendMode: "luminosity", opacity: 0.78 }}
                priority
              />
              {/* Soft radial fade at edges to blend into background */}
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(ellipse at center, transparent 50%, rgba(248, 215, 218, 0.6) 85%, rgba(255, 248, 240, 0.9) 100%)",
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 40, damping: 15, delay: 0.2 }}
            className="font-[family-name:var(--font-nunito)] text-5xl sm:text-7xl lg:text-8xl font-bold text-[#6B3A5E] leading-tight"
          >
            {siteContent.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 18, delay: 0.5 }}
            className="font-[family-name:var(--font-nunito)] text-2xl sm:text-3xl text-[#8B5E83] mt-3 font-semibold"
          >
            {siteContent.business}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 18, delay: 0.8 }}
            className="font-[family-name:var(--font-inter)] text-lg sm:text-xl text-[#8B5E83]/70 mt-6 font-light leading-relaxed"
          >
            Feel the rhythm within — where movement becomes poetry
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 18, delay: 1.1 }}
            className="mt-10"
          >
            <button
              onClick={() => scrollTo("#about")}
              className="px-8 py-3.5 rounded-full font-[family-name:var(--font-nunito)] font-semibold text-white text-lg shadow-lg shadow-[#E8B4C8]/40 hover:shadow-xl hover:shadow-[#E8B4C8]/50 transition-all duration-500 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #E8B4C8, #C9A0DC, #D4B5D8)",
              }}
            >
              Explore
            </button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="w-6 h-10 rounded-full border-2 border-[#8B5E83]/30 flex items-start justify-center p-1.5"
            >
              <motion.div className="w-1.5 h-1.5 rounded-full bg-[#8B5E83]/50" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ================================================================== */}
      {/*  ABOUT SECTION                                                     */}
      {/* ================================================================== */}
      <section
        id="about"
        className="relative py-24 sm:py-32 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #FFF8F0 0%, #F8D7DA 30%, #E8B4C8 60%, #D4B5D8 100%)",
        }}
      >
        {/* Decorative blob */}
        <div
          className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] opacity-15"
          style={{
            background: "linear-gradient(135deg, #C9A0DC, #F0D78C)",
            animation: "blobMorph2 20s ease-in-out infinite",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInOnScroll>
            <h2 className="font-[family-name:var(--font-nunito)] text-4xl sm:text-5xl font-bold text-[#6B3A5E] text-center mb-6">
              {siteContent.about.title}
            </h2>
          </FadeInOnScroll>

          {/* Style badges */}
          <FadeInOnScroll delay={0.15}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {siteContent.styles.map((style, i) => (
                <motion.span
                  key={style}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 + i * 0.1 }}
                  className="px-6 py-2.5 rounded-full text-white font-[family-name:var(--font-nunito)] font-semibold text-sm shadow-md"
                  style={{
                    background: [
                      "linear-gradient(135deg, #E8B4C8, #C9A0DC)",
                      "linear-gradient(135deg, #C9A0DC, #D4B5D8)",
                      "linear-gradient(135deg, #F0D78C, #E8C56D)",
                    ][i],
                  }}
                >
                  {style}
                </motion.span>
              ))}
            </div>
          </FadeInOnScroll>

          {/* About cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: "Background", text: siteContent.about.intro },
              { title: "Specialization", text: siteContent.about.specialization },
              { title: "What Sets Her Apart", text: siteContent.about.uniqueness },
              { title: "Clinical Expertise", text: siteContent.about.clinical },
            ].map((card, i) => (
              <FadeInOnScroll key={card.title} delay={0.1 * i} direction={i % 2 === 0 ? "left" : "right"}>
                <div
                  className="p-6 sm:p-8 rounded-3xl shadow-lg shadow-[#E8B4C8]/20 backdrop-blur-sm h-full"
                  style={{
                    background: "linear-gradient(145deg, rgba(255,255,255,0.85), rgba(255,248,240,0.75))",
                  }}
                >
                  <h3 className="font-[family-name:var(--font-nunito)] text-xl font-bold text-[#6B3A5E] mb-3">
                    {card.title}
                  </h3>
                  <p className="font-[family-name:var(--font-inter)] text-[#6B3A5E]/70 font-light leading-relaxed text-sm sm:text-base">
                    {card.text}
                  </p>
                </div>
              </FadeInOnScroll>
            ))}
          </div>

          {/* Highlights */}
          <FadeInOnScroll delay={0.3}>
            <div
              className="mt-10 p-6 sm:p-8 rounded-3xl shadow-lg shadow-[#E8B4C8]/20"
              style={{
                background: "linear-gradient(145deg, rgba(255,255,255,0.8), rgba(248,215,218,0.4))",
              }}
            >
              <h3 className="font-[family-name:var(--font-nunito)] text-xl font-bold text-[#6B3A5E] mb-4">
                Highlights
              </h3>
              <ul className="space-y-3">
                {siteContent.about.highlights.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 60, damping: 18, delay: 0.05 * i }}
                    className="flex gap-3 font-[family-name:var(--font-inter)] text-[#6B3A5E]/70 font-light text-sm sm:text-base leading-relaxed"
                  >
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-gradient-to-br from-[#E8B4C8] to-[#C9A0DC] shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  SERVICES SECTION                                                  */}
      {/* ================================================================== */}
      <section
        id="services"
        className="relative py-24 sm:py-32 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #D4B5D8 0%, #C9A0DC 30%, #E8B4C8 70%, #FFF8F0 100%)",
        }}
      >
        <div
          className="absolute bottom-[-5%] left-[-5%] w-[350px] h-[350px] opacity-15"
          style={{
            background: "linear-gradient(135deg, #F8D7DA, #F0D78C)",
            animation: "blobMorph1 25s ease-in-out infinite",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInOnScroll>
            <h2 className="font-[family-name:var(--font-nunito)] text-4xl sm:text-5xl font-bold text-[#6B3A5E] text-center mb-4">
              Services
            </h2>
            <p className="font-[family-name:var(--font-inter)] text-[#6B3A5E]/60 font-light text-center mb-14 max-w-xl mx-auto">
              Every body moves differently. Find the format that flows with you.
            </p>
          </FadeInOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteContent.services.map((service, i) => {
              const Icon = iconMap[service.icon] || IconSparkles;
              return (
                <FadeInOnScroll key={service.title} delay={0.08 * i}>
                  <motion.div
                    whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                    className="group p-6 sm:p-8 rounded-[24px] shadow-lg shadow-[#C9A0DC]/15 h-full cursor-default"
                    style={{
                      background: "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(255,248,240,0.8))",
                    }}
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-5 shadow-md transition-transform duration-500 group-hover:scale-110"
                      style={{
                        background: [
                          "linear-gradient(135deg, #E8B4C8, #C9A0DC)",
                          "linear-gradient(135deg, #C9A0DC, #D4B5D8)",
                          "linear-gradient(135deg, #F0D78C, #E8C56D)",
                          "linear-gradient(135deg, #D4B5D8, #E8B4C8)",
                          "linear-gradient(135deg, #F8D7DA, #C9A0DC)",
                          "linear-gradient(135deg, #E8C56D, #F8D7DA)",
                        ][i % 6],
                      }}
                    >
                      <Icon />
                    </div>
                    <h3 className="font-[family-name:var(--font-nunito)] text-lg font-bold text-[#6B3A5E] mb-2">
                      {service.title}
                    </h3>
                    <p className="font-[family-name:var(--font-inter)] text-[#6B3A5E]/60 font-light text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </motion.div>
                </FadeInOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  CREDENTIALS / TIMELINE SECTION                                    */}
      {/* ================================================================== */}
      <section
        id="credentials"
        className="relative py-24 sm:py-32 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #FFF8F0 0%, #F0D78C 40%, #E8C56D 70%, #F8D7DA 100%)",
        }}
      >
        <div
          className="absolute top-[20%] right-[-8%] w-[280px] h-[280px] opacity-12"
          style={{
            background: "linear-gradient(135deg, #E8B4C8, #D4B5D8)",
            animation: "blobMorph3 20s ease-in-out infinite",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInOnScroll>
            <h2 className="font-[family-name:var(--font-nunito)] text-4xl sm:text-5xl font-bold text-[#6B3A5E] text-center mb-4">
              Journey
            </h2>
            <p className="font-[family-name:var(--font-inter)] text-[#6B3A5E]/60 font-light text-center mb-16 max-w-lg mx-auto">
              A decade of dedication — every step building toward mastery.
            </p>
          </FadeInOnScroll>

          {/* Timeline */}
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-4 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#E8B4C8] via-[#C9A0DC] to-[#F0D78C] rounded-full" />

            {siteContent.timeline.map((entry, i) => {
              const isLeft = i % 2 === 0;
              return (
                <FadeInOnScroll
                  key={i}
                  delay={0.06 * i}
                  direction={isLeft ? "right" : "left"}
                  className="relative mb-10 last:mb-0"
                >
                  <div className={`flex items-start gap-4 sm:gap-0 ${isLeft ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                    {/* Content card */}
                    <div className={`flex-1 ${isLeft ? "sm:pr-10 sm:text-right" : "sm:pl-10 sm:text-left"} pl-10 sm:pl-0`}>
                      <div
                        className="inline-block p-5 rounded-2xl shadow-md shadow-[#E8B4C8]/15"
                        style={{
                          background: "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(255,248,240,0.8))",
                        }}
                      >
                        <span
                          className="inline-block px-3 py-1 rounded-full text-xs font-[family-name:var(--font-nunito)] font-bold text-white mb-2"
                          style={{
                            background: "linear-gradient(135deg, #E8B4C8, #C9A0DC)",
                          }}
                        >
                          {entry.year}
                        </span>
                        <p className="font-[family-name:var(--font-inter)] text-[#6B3A5E]/80 font-light text-sm leading-relaxed">
                          {entry.milestone}
                        </p>
                      </div>
                    </div>

                    {/* Node */}
                    <div className="absolute left-2 sm:left-1/2 sm:-translate-x-1/2 top-5 z-10">
                      <div
                        className="w-5 h-5 rounded-full shadow-md border-2 border-white"
                        style={{
                          background: "linear-gradient(135deg, #E8B4C8, #C9A0DC)",
                        }}
                      />
                    </div>

                    {/* Spacer for other side */}
                    <div className="hidden sm:block flex-1" />
                  </div>
                </FadeInOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  GALLERY SECTION                                                   */}
      {/* ================================================================== */}
      <section
        id="gallery"
        className="relative py-24 sm:py-32 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #F8D7DA 0%, #D4B5D8 50%, #C9A0DC 100%)",
        }}
      >
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInOnScroll>
            <h2 className="font-[family-name:var(--font-nunito)] text-4xl sm:text-5xl font-bold text-[#6B3A5E] text-center mb-4">
              Gallery
            </h2>
            <p className="font-[family-name:var(--font-nunito)] text-[#8B5E83]/60 font-light text-center mb-14 italic text-lg">
              Moments of grace, captured in motion
            </p>
          </FadeInOnScroll>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, i) => {
              const heights = ["h-48", "h-64", "h-56", "h-44", "h-60", "h-52", "h-48", "h-56", "h-64"];
              return (
                <FadeInOnScroll key={i} delay={0.06 * i}>
                  <motion.div
                    whileHover={{
                      scale: 1.03,
                      transition: { type: "spring", stiffness: 300, damping: 20 },
                    }}
                    className={`${heights[i]} rounded-[20px] shadow-md shadow-[#E8B4C8]/20 cursor-default overflow-hidden`}
                    style={{ animation: `breathe ${4 + i * 0.5}s ease-in-out infinite` }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      className="w-full h-full object-cover rounded-[20px]"
                    />
                  </motion.div>
                </FadeInOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  CONTACT SECTION                                                   */}
      {/* ================================================================== */}
      <section
        id="contact"
        className="relative py-24 sm:py-32 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #C9A0DC 0%, #E8B4C8 40%, #F8D7DA 70%, #FFF8F0 100%)",
        }}
      >
        <div
          className="absolute top-[5%] left-[-5%] w-[300px] h-[300px] opacity-12"
          style={{
            background: "linear-gradient(135deg, #F0D78C, #D4B5D8)",
            animation: "blobMorph1 22s ease-in-out infinite",
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInOnScroll>
            <h2 className="font-[family-name:var(--font-nunito)] text-4xl sm:text-5xl font-bold text-[#6B3A5E] text-center mb-4">
              Get in Touch
            </h2>
            <p className="font-[family-name:var(--font-inter)] text-[#6B3A5E]/60 font-light text-center mb-12 max-w-md mx-auto">
              Ready to begin your movement journey? Reach out below.
            </p>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-10 rounded-[28px] shadow-xl shadow-[#E8B4C8]/20"
              style={{
                background: "linear-gradient(145deg, rgba(255,255,255,0.92), rgba(255,248,240,0.85))",
              }}
            >
              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#6B3A5E] mb-1.5">
                    Name <span className="text-[#E8B4C8]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-5 py-3 rounded-full border border-[#E8B4C8]/30 bg-white/70 font-[family-name:var(--font-inter)] font-light text-[#6B3A5E] text-sm placeholder-[#C9A0DC]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A0DC]/40 focus:border-transparent transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#6B3A5E] mb-1.5">
                    Email <span className="text-[#E8B4C8]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-5 py-3 rounded-full border border-[#E8B4C8]/30 bg-white/70 font-[family-name:var(--font-inter)] font-light text-[#6B3A5E] text-sm placeholder-[#C9A0DC]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A0DC]/40 focus:border-transparent transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Lesson Type */}
                <div>
                  <label className="block font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#6B3A5E] mb-1.5">
                    Lesson Type <span className="text-[#E8B4C8]">*</span>
                  </label>
                  <select
                    required
                    className="w-full px-5 py-3 rounded-full border border-[#E8B4C8]/30 bg-white/70 font-[family-name:var(--font-inter)] font-light text-[#6B3A5E] text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A0DC]/40 focus:border-transparent transition-all duration-300 appearance-none"
                    defaultValue=""
                  >
                    <option value="" disabled>Select a lesson type</option>
                    {siteContent.contactFields
                      .find((f) => f.name === "lessonType")
                      ?.options?.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                  </select>
                </div>

                {/* Preferred Schedule */}
                <div>
                  <label className="block font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#6B3A5E] mb-1.5">
                    Preferred Schedule
                  </label>
                  <input
                    type="text"
                    className="w-full px-5 py-3 rounded-full border border-[#E8B4C8]/30 bg-white/70 font-[family-name:var(--font-inter)] font-light text-[#6B3A5E] text-sm placeholder-[#C9A0DC]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A0DC]/40 focus:border-transparent transition-all duration-300"
                    placeholder="e.g. Weekday evenings"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#6B3A5E] mb-1.5">
                    Message <span className="text-[#E8B4C8]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-5 py-3 rounded-2xl border border-[#E8B4C8]/30 bg-white/70 font-[family-name:var(--font-inter)] font-light text-[#6B3A5E] text-sm placeholder-[#C9A0DC]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A0DC]/40 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell me about your dance goals..."
                  />
                </div>

                {/* Submit */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full py-3.5 rounded-full font-[family-name:var(--font-nunito)] font-bold text-white text-base shadow-lg shadow-[#C9A0DC]/30 transition-shadow duration-300 hover:shadow-xl hover:shadow-[#C9A0DC]/40"
                  style={{
                    background: "linear-gradient(135deg, #E8B4C8, #C9A0DC, #D4B5D8)",
                  }}
                >
                  Send Message
                </motion.button>
              </div>
            </form>
          </FadeInOnScroll>

          {/* Contact info */}
          <FadeInOnScroll delay={0.3}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm font-[family-name:var(--font-inter)] font-light text-[#6B3A5E]/60">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {siteContent.location}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.264.26-2.467.73-3.563" />
                </svg>
                {siteContent.domain}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                {siteContent.instagram}
              </span>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  FOOTER                                                            */}
      {/* ================================================================== */}
      <footer
        className="relative py-10"
        style={{ background: "#FFF8F0" }}
      >
        {/* Gradient divider */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent 0%, #E8B4C8 20%, #C9A0DC 50%, #F0D78C 80%, transparent 100%)",
          }}
        />
        <p className="text-center font-[family-name:var(--font-inter)] text-sm font-light text-[#8B5E83]/50">
          &copy; 2026 {siteContent.business} &mdash; {siteContent.name}
        </p>
      </footer>

      {/* ================================================================== */}
      {/*  TOAST NOTIFICATION                                                */}
      {/* ================================================================== */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed bottom-6 right-6 z-[60] px-6 py-3.5 rounded-2xl shadow-xl font-[family-name:var(--font-nunito)] font-semibold text-[#6B3A5E] text-sm"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,215,218,0.9))",
              border: "1px solid rgba(232,180,200,0.4)",
            }}
          >
            Coming soon — form not yet active
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

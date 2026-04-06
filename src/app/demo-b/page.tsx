"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { siteContent } from "@/lib/content";
import { img } from "@/lib/basePath";

/* ──────────────────────────────────────────────
   CONSTANTS
   ────────────────────────────────────────────── */
const CORAL = "#FF4F4F";
const OFF_WHITE = "#F5F5F0";
const BLACK = "#000000";

const SECTION_IDS = ["hero", "about", "services", "credentials", "gallery", "contact"];

const bebas = "font-[family-name:var(--font-bebas)]";
const mono = "font-[family-name:var(--font-geist-mono)]";
const inter = "font-[family-name:var(--font-inter)]";

/* ──────────────────────────────────────────────
   MARQUEE COMPONENT
   ────────────────────────────────────────────── */
function Marquee({
  children,
  speed = 30,
  className = "",
  reverse = false,
  style,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  reverse?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`} style={style}>
      <motion.div
        className="inline-flex"
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        <span className="inline-flex">{children}</span>
        <span className="inline-flex">{children}</span>
      </motion.div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   SNAP-IN REVEAL WRAPPER
   ────────────────────────────────────────────── */
function SnapReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const initialX = direction === "left" ? -120 : direction === "right" ? 120 : 0;
  const initialY = direction === "up" ? 60 : 0;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: initialX, y: initialY, skewY: direction === "up" ? 3 : 0 }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0, skewY: 0 }
          : { opacity: 0, x: initialX, y: initialY, skewY: direction === "up" ? 3 : 0 }
      }
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   TOAST COMPONENT
   ────────────────────────────────────────────── */
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] px-8 py-4 bg-[${BLACK}] text-[${OFF_WHITE}] ${mono} text-sm uppercase tracking-widest border-2 border-[${CORAL}]`}
      style={{ backgroundColor: BLACK, color: OFF_WHITE, borderColor: CORAL }}
    >
      {message}
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   MAIN PAGE COMPONENT
   ────────────────────────────────────────────── */
export default function DemoBPage() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  /* ── Intersection Observer for active section ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ── Mouse tracking for hero ── */
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const cx = (clientX / window.innerWidth - 0.5) * 2;
    const cy = (clientY / window.innerHeight - 0.5) * 2;
    setMousePos({ x: cx, y: cy });
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileNavOpen(false);
  };

  /* ── Scroll-driven rotation for decorative elements ── */
  const globalRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div className="relative h-screen overflow-hidden" style={{ backgroundColor: OFF_WHITE, color: BLACK }}>
      {/* ═══════════════════════════════════════════
          FIXED NAVIGATION
          ═══════════════════════════════════════════ */}
      <nav
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-4 sm:px-8 h-14 border-b-2"
        style={{ backgroundColor: BLACK, borderColor: CORAL }}
      >
        <Link
          href="/"
          className={`${mono} text-xs uppercase tracking-[0.2em] hover:opacity-70 transition-opacity`}
          style={{ color: OFF_WHITE }}
        >
          &larr; Back to Styles
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {siteContent.navLinks.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <button
                key={link.label}
                onClick={() => scrollTo(sectionId)}
                className={`${mono} text-[11px] uppercase tracking-[0.25em] transition-colors duration-200 cursor-pointer`}
                style={{ color: isActive ? CORAL : OFF_WHITE }}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] cursor-pointer p-2"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          aria-label="Toggle navigation"
        >
          <span className="block w-6 h-[2px] transition-transform duration-200" style={{
            backgroundColor: OFF_WHITE,
            transform: mobileNavOpen ? "rotate(45deg) translateY(7px)" : "none"
          }} />
          <span className="block w-6 h-[2px] transition-opacity duration-200" style={{
            backgroundColor: OFF_WHITE,
            opacity: mobileNavOpen ? 0 : 1
          }} />
          <span className="block w-6 h-[2px] transition-transform duration-200" style={{
            backgroundColor: OFF_WHITE,
            transform: mobileNavOpen ? "rotate(-45deg) translateY(-7px)" : "none"
          }} />
        </button>
      </nav>

      {/* Mobile nav dropdown */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="fixed top-14 left-0 right-0 z-[99] overflow-hidden border-b-2"
            style={{ backgroundColor: BLACK, borderColor: CORAL }}
          >
            <div className="flex flex-col py-4 px-6 gap-4">
              {siteContent.navLinks.map((link) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <button
                    key={link.label}
                    onClick={() => scrollTo(sectionId)}
                    className={`${mono} text-left text-sm uppercase tracking-[0.2em] cursor-pointer`}
                    style={{ color: isActive ? CORAL : OFF_WHITE }}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-14 left-0 right-0 h-[3px] z-[100] origin-left"
        style={{ backgroundColor: CORAL, scaleX: scrollYProgress }}
      />

      {/* ═══════════════════════════════════════════
          SCROLLABLE CONTENT
          ═══════════════════════════════════════════ */}
      <div ref={containerRef} className="h-screen overflow-y-auto scroll-smooth">

        {/* ═══════════════════════════════════════════
            SECTION 1 — HERO
            ═══════════════════════════════════════════ */}
        <section
          id="hero"
          className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-14"
          onMouseMove={handleMouseMove}
          style={{ backgroundColor: OFF_WHITE }}
        >
          {/* Decorative rotating element */}
          <motion.div
            className="absolute top-20 right-8 sm:right-16 w-24 h-24 sm:w-40 sm:h-40 border-[3px] pointer-events-none"
            style={{ borderColor: CORAL, rotate: globalRotate }}
          />
          <motion.div
            className="absolute bottom-20 left-8 sm:left-16 w-16 h-16 sm:w-28 sm:h-28 pointer-events-none"
            style={{ backgroundColor: CORAL, rotate: globalRotate }}
          />


          {/* Hero image — kinetic brutalist treatment */}
          <motion.div
            className="absolute right-0 top-14 bottom-0 w-full lg:w-[55%] z-[5] overflow-hidden"
            initial={{ opacity: 0, scale: 1.15, x: 80 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              transform: `translate(${mousePos.x * 3}px, ${mousePos.y * 3}px)`,
            }}
          >
            <div
              className="relative w-full h-full border-l-[4px] lg:border-l-[6px]"
              style={{ borderColor: BLACK }}
            >
              <Image
                src="/images/hero/lucy_d3.webp"
                alt="Lucy in a dynamic lunge pose"
                fill
                priority
                className="object-cover object-center"
                style={{
                  filter: "contrast(1.2) brightness(0.9) grayscale(0.15)",
                  mixBlendMode: "multiply",
                }}
              />
              {/* Harsh overlay for brutalist feel */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ backgroundColor: OFF_WHITE, mixBlendMode: "multiply", opacity: 0.15 }}
              />
            </div>
          </motion.div>

          {/* Main hero content with mouse parallax */}
          <motion.div
            className="relative z-10 px-4 sm:px-8 lg:px-16"
            style={{
              transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 6}px)`,
            }}
          >
            <motion.h1
              className={`${bebas} text-[15vw] sm:text-[13vw] lg:text-[11vw] leading-[0.85] uppercase tracking-tight select-none`}
              initial={{ opacity: 0, y: 80, skewY: 6 }}
              animate={{ opacity: 1, y: 0, skewY: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ color: BLACK }}
            >
              Lucy<br />Marie<br />Schmidt
            </motion.h1>
          </motion.div>

          {/* Marquee strip */}
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Marquee
              speed={20}
              className="mt-6 sm:mt-10 py-3 sm:py-4 border-y-2"
              style={{ backgroundColor: CORAL, borderColor: BLACK } as React.CSSProperties}
            >
              <span className={`${bebas} text-3xl sm:text-5xl uppercase tracking-wide px-4 sm:px-8`} style={{ color: OFF_WHITE }}>
                Movement Labs &mdash;
              </span>
              <span className={`${bebas} text-3xl sm:text-5xl uppercase tracking-wide px-4 sm:px-8`} style={{ color: BLACK }}>
                Movement Labs &mdash;
              </span>
              <span className={`${bebas} text-3xl sm:text-5xl uppercase tracking-wide px-4 sm:px-8`} style={{ color: OFF_WHITE }}>
                Movement Labs &mdash;
              </span>
              <span className={`${bebas} text-3xl sm:text-5xl uppercase tracking-wide px-4 sm:px-8`} style={{ color: BLACK }}>
                Movement Labs &mdash;
              </span>
            </Marquee>
          </motion.div>

          {/* Tagline + CTA */}
          <div className="relative z-10 px-4 sm:px-8 lg:px-16 mt-8 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pb-12">
            <motion.p
              className={`${mono} text-xs sm:text-sm uppercase tracking-[0.3em]`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              style={{ color: BLACK }}
            >
              Dance / Movement / Body &mdash; Berlin
            </motion.p>

            <motion.button
              className={`${mono} text-xs sm:text-sm uppercase tracking-[0.25em] px-6 sm:px-10 py-3 sm:py-4 border-2 cursor-pointer transition-colors duration-200`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              style={{ backgroundColor: BLACK, color: OFF_WHITE, borderColor: BLACK }}
              whileHover={{ backgroundColor: CORAL, borderColor: CORAL }}
              onClick={() => scrollTo("contact")}
            >
              Book a Lesson
            </motion.button>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 2 — ABOUT
            ═══════════════════════════════════════════ */}
        <section
          id="about"
          className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-16 overflow-hidden border-t-2"
          style={{ backgroundColor: OFF_WHITE, borderColor: BLACK }}
        >
          {/* Giant background number */}
          <div
            className={`${bebas} absolute -top-4 sm:-top-8 right-2 sm:right-8 text-[30vw] sm:text-[25vw] leading-none pointer-events-none select-none opacity-[0.04]`}
          >
            02
          </div>

          <SnapReveal>
            <p className={`${mono} text-xs uppercase tracking-[0.3em] mb-6`} style={{ color: CORAL }}>
              About
            </p>
          </SnapReveal>

          {/* Specializations in massive type */}
          <SnapReveal delay={0.1}>
            <h2
              className={`${bebas} text-[12vw] sm:text-[8vw] lg:text-[6vw] leading-[0.95] uppercase mb-12`}
              style={{ color: BLACK }}
            >
              Salsa On 1 /<br />
              Salsa On 2 /<br />
              Modern Dance
            </h2>
          </SnapReveal>

          {/* Coral divider */}
          <SnapReveal delay={0.15}>
            <div className="w-full h-[3px] mb-12" style={{ backgroundColor: CORAL }} />
          </SnapReveal>

          {/* Content blocks */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-6xl">
            <SnapReveal delay={0.2} direction="left">
              <p className={`${inter} text-base sm:text-lg leading-relaxed`}>
                {siteContent.about.intro}
              </p>
            </SnapReveal>

            <SnapReveal delay={0.3} direction="right">
              <p className={`${inter} text-base sm:text-lg leading-relaxed`}>
                {siteContent.about.specialization}
              </p>
            </SnapReveal>

            <SnapReveal delay={0.35} direction="left">
              <p className={`${inter} text-base sm:text-lg leading-relaxed`}>
                {siteContent.about.uniqueness}
              </p>
            </SnapReveal>

            <SnapReveal delay={0.4} direction="right">
              <p className={`${inter} text-base sm:text-lg leading-relaxed`}>
                {siteContent.about.clinical}
              </p>
            </SnapReveal>
          </div>

          {/* Coral accent line at bottom */}
          <SnapReveal delay={0.5}>
            <div className="mt-16 w-32 h-[3px]" style={{ backgroundColor: CORAL }} />
          </SnapReveal>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 3 — SERVICES
            ═══════════════════════════════════════════ */}
        <section
          id="services"
          className="relative py-24 sm:py-32 border-t-2"
          style={{ backgroundColor: BLACK, borderColor: CORAL }}
        >
          <div className="px-4 sm:px-8 lg:px-16 mb-12">
            <SnapReveal>
              <p className={`${mono} text-xs uppercase tracking-[0.3em] mb-4`} style={{ color: CORAL }}>
                Services
              </p>
            </SnapReveal>
            <SnapReveal delay={0.1}>
              <h2 className={`${bebas} text-[10vw] sm:text-[6vw] lg:text-[4.5vw] uppercase leading-none`} style={{ color: OFF_WHITE }}>
                What I Offer
              </h2>
            </SnapReveal>
          </div>

          {/* Service rows */}
          <div>
            {siteContent.services.map((service, i) => (
              <SnapReveal key={service.title} delay={i * 0.08}>
                <button
                  className="w-full text-left cursor-pointer group border-t last:border-b transition-colors duration-300"
                  style={{ borderColor: `rgba(245,245,240,0.15)` }}
                  onClick={() => setExpandedService(expandedService === i ? null : i)}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = `rgba(255,79,79,0.08)`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  }}
                >
                  <div className="flex items-center justify-between px-4 sm:px-8 lg:px-16 py-5 sm:py-7">
                    <div className="flex items-center gap-4 sm:gap-8">
                      <span className={`${mono} text-xs sm:text-sm`} style={{ color: CORAL }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`${bebas} text-2xl sm:text-4xl lg:text-5xl uppercase`}
                        style={{ color: OFF_WHITE }}
                      >
                        {service.title}
                      </span>
                    </div>
                    <motion.span
                      className={`${bebas} text-2xl sm:text-3xl`}
                      style={{ color: CORAL }}
                      animate={{ rotate: expandedService === i ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      +
                    </motion.span>
                  </div>

                  <AnimatePresence>
                    {expandedService === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p
                          className={`${inter} text-sm sm:text-base leading-relaxed px-4 sm:px-8 lg:px-16 pb-6 sm:pb-8 pl-12 sm:pl-20 lg:pl-28 max-w-3xl`}
                          style={{ color: `rgba(245,245,240,0.7)` }}
                        >
                          {service.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </SnapReveal>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 4 — CREDENTIALS / TIMELINE
            ═══════════════════════════════════════════ */}
        <section
          id="credentials"
          className="relative py-24 sm:py-32 overflow-hidden border-t-2"
          style={{ backgroundColor: OFF_WHITE, borderColor: BLACK }}
        >
          {/* Year marquee */}
          <Marquee speed={35} className="mb-12 sm:mb-16">
            {siteContent.timeline.map((item, i) => (
              <span
                key={i}
                className={`${bebas} text-[8vw] sm:text-[5vw] uppercase px-4 sm:px-8 opacity-10`}
                style={{ color: BLACK }}
              >
                {item.year}
              </span>
            ))}
          </Marquee>

          <div className="px-4 sm:px-8 lg:px-16 mb-12">
            <SnapReveal>
              <p className={`${mono} text-xs uppercase tracking-[0.3em] mb-4`} style={{ color: CORAL }}>
                Credentials
              </p>
            </SnapReveal>
            <SnapReveal delay={0.1}>
              <h2 className={`${bebas} text-[10vw] sm:text-[6vw] lg:text-[4.5vw] uppercase leading-none mb-12`} style={{ color: BLACK }}>
                The Journey
              </h2>
            </SnapReveal>
          </div>

          {/* Timeline entries */}
          <div className="px-4 sm:px-8 lg:px-16 max-w-5xl">
            {siteContent.timeline.map((item, i) => (
              <SnapReveal key={i} delay={i * 0.06}>
                <div
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-8 py-5 sm:py-6 border-b"
                  style={{ borderColor: `rgba(0,0,0,0.12)` }}
                >
                  <span
                    className={`${bebas} text-4xl sm:text-6xl lg:text-7xl shrink-0 w-auto sm:w-36`}
                    style={{ color: CORAL }}
                  >
                    {item.year}
                  </span>
                  <span className={`${inter} text-sm sm:text-base lg:text-lg leading-relaxed`} style={{ color: BLACK }}>
                    {item.milestone}
                  </span>
                </div>
              </SnapReveal>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 5 — GALLERY
            ═══════════════════════════════════════════ */}
        <section
          id="gallery"
          className="relative py-24 sm:py-32 overflow-hidden border-t-2"
          style={{ backgroundColor: BLACK, borderColor: CORAL }}
        >
          <div className="px-4 sm:px-8 lg:px-16 mb-12">
            <SnapReveal>
              <p className={`${mono} text-xs uppercase tracking-[0.3em] mb-4`} style={{ color: CORAL }}>
                Gallery
              </p>
            </SnapReveal>
            <SnapReveal delay={0.1}>
              <h2 className={`${bebas} text-[10vw] sm:text-[6vw] lg:text-[4.5vw] uppercase leading-none`} style={{ color: OFF_WHITE }}>
                Visuals
              </h2>
            </SnapReveal>
          </div>

          {/* Asymmetric photo grid */}
          <div className="px-4 sm:px-8 lg:px-16">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {[
                { src: img("/images/gallery/lucy_d4.webp"), alt: "Lucy spinning with hair flying, back view with motion blur", h: "h-48 sm:h-64 lg:h-80", col: "col-span-2", rotate: "rotate-0" },
                { src: img("/images/gallery/lucy_f2.webp"), alt: "Lucy with arms raised in powerful stance wearing boots", h: "h-48 sm:h-64 lg:h-80", col: "col-span-1", rotate: "rotate-[2deg]" },
                { src: img("/images/gallery/lucy_d9.webp"), alt: "Lucy spinning joyful close-up with motion blur", h: "h-48 sm:h-64 lg:h-80", col: "col-span-1", rotate: "-rotate-[1.5deg]" },
                { src: img("/images/gallery/lucy_f16.webp"), alt: "Lucy in full motion blur mid-spin with raw energy", h: "h-40 sm:h-56 lg:h-64", col: "col-span-1", rotate: "rotate-[1deg]" },
                { src: img("/images/gallery/lucy_d10.webp"), alt: "Lucy in dramatic spinning pose with hair flowing and motion blur", h: "h-40 sm:h-56 lg:h-64", col: "col-span-1", rotate: "-rotate-[2.5deg]" },
                { src: img("/images/gallery/lucy_d11.webp"), alt: "Lucy in dynamic arms-out mid-spin pose", h: "h-40 sm:h-56 lg:h-80", col: "col-span-2", rotate: "rotate-[0.5deg]" },
                { src: img("/images/gallery/lucy_f25.webp"), alt: "Lucy at a tilted angle in an edgy denim shorts look", h: "h-48 sm:h-64 lg:h-80", col: "col-span-2 sm:col-span-1", rotate: "-rotate-[1deg]" },
                { src: img("/images/gallery/lucy_f27.webp"), alt: "Lucy spinning from behind with hair flowing and arms out", h: "h-48 sm:h-64 lg:h-80", col: "col-span-1", rotate: "rotate-[2.5deg]" },
                { src: img("/images/gallery/lucy_f31.webp"), alt: "Lucy spinning with arms wide and motion blur", h: "h-48 sm:h-64 lg:h-80", col: "col-span-2", rotate: "-rotate-[0.5deg]" },
              ].map((photo, i) => (
                <SnapReveal key={i} delay={i * 0.08} className={`${photo.col}`}>
                  <div
                    className={`${photo.h} ${photo.rotate} border-2 overflow-hidden transition-transform duration-300 hover:scale-[1.02]`}
                    style={{
                      borderColor: `rgba(245,245,240,0.2)`,
                    }}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SnapReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 6 — CONTACT
            ═══════════════════════════════════════════ */}
        <section
          id="contact"
          className="relative py-24 sm:py-32 border-t-2"
          style={{ backgroundColor: OFF_WHITE, borderColor: BLACK }}
        >
          {/* Giant background number */}
          <div
            className={`${bebas} absolute -top-4 sm:-top-8 left-2 sm:left-8 text-[30vw] sm:text-[25vw] leading-none pointer-events-none select-none opacity-[0.04]`}
          >
            06
          </div>

          <div className="relative z-10 px-4 sm:px-8 lg:px-16 max-w-4xl">
            <SnapReveal>
              <p className={`${mono} text-xs uppercase tracking-[0.3em] mb-4`} style={{ color: CORAL }}>
                Contact
              </p>
            </SnapReveal>
            <SnapReveal delay={0.1}>
              <h2 className={`${bebas} text-[10vw] sm:text-[6vw] lg:text-[4.5vw] uppercase leading-none mb-12`} style={{ color: BLACK }}>
                Get in Touch
              </h2>
            </SnapReveal>

            {/* Brutalist form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setToastMsg("COMING SOON");
              }}
              className="space-y-0"
            >
              {/* Name */}
              <SnapReveal delay={0.15}>
                <div className="border-2 border-b-0" style={{ borderColor: BLACK }}>
                  <label className={`${mono} text-[10px] sm:text-xs uppercase tracking-[0.3em] px-4 pt-3 block`} style={{ color: CORAL }}>
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    className={`${inter} w-full px-4 pb-3 pt-1 text-sm sm:text-base bg-transparent outline-none`}
                    placeholder="Your name"
                    style={{ color: BLACK }}
                  />
                </div>
              </SnapReveal>

              {/* Email */}
              <SnapReveal delay={0.2}>
                <div className="border-2 border-b-0" style={{ borderColor: BLACK }}>
                  <label className={`${mono} text-[10px] sm:text-xs uppercase tracking-[0.3em] px-4 pt-3 block`} style={{ color: CORAL }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    className={`${inter} w-full px-4 pb-3 pt-1 text-sm sm:text-base bg-transparent outline-none`}
                    placeholder="your@email.com"
                    style={{ color: BLACK }}
                  />
                </div>
              </SnapReveal>

              {/* Lesson Type */}
              <SnapReveal delay={0.25}>
                <div className="border-2 border-b-0" style={{ borderColor: BLACK }}>
                  <label className={`${mono} text-[10px] sm:text-xs uppercase tracking-[0.3em] px-4 pt-3 block`} style={{ color: CORAL }}>
                    Lesson Type *
                  </label>
                  <select
                    required
                    className={`${inter} w-full px-4 pb-3 pt-1 text-sm sm:text-base bg-transparent outline-none appearance-none cursor-pointer`}
                    defaultValue=""
                    style={{ color: BLACK, borderRadius: 0 }}
                  >
                    <option value="" disabled>
                      Select a lesson type
                    </option>
                    {siteContent.contactFields
                      .find((f) => f.name === "lessonType")
                      ?.options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                  </select>
                </div>
              </SnapReveal>

              {/* Preferred Schedule */}
              <SnapReveal delay={0.3}>
                <div className="border-2 border-b-0" style={{ borderColor: BLACK }}>
                  <label className={`${mono} text-[10px] sm:text-xs uppercase tracking-[0.3em] px-4 pt-3 block`} style={{ color: CORAL }}>
                    Preferred Schedule
                  </label>
                  <input
                    type="text"
                    className={`${inter} w-full px-4 pb-3 pt-1 text-sm sm:text-base bg-transparent outline-none`}
                    placeholder="e.g. Weekday evenings, Saturday mornings"
                    style={{ color: BLACK }}
                  />
                </div>
              </SnapReveal>

              {/* Message */}
              <SnapReveal delay={0.35}>
                <div className="border-2" style={{ borderColor: BLACK }}>
                  <label className={`${mono} text-[10px] sm:text-xs uppercase tracking-[0.3em] px-4 pt-3 block`} style={{ color: CORAL }}>
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    className={`${inter} w-full px-4 pb-3 pt-1 text-sm sm:text-base bg-transparent outline-none resize-none`}
                    placeholder="Tell me about your goals..."
                    style={{ color: BLACK }}
                  />
                </div>
              </SnapReveal>

              {/* Submit */}
              <SnapReveal delay={0.4}>
                <motion.button
                  type="submit"
                  className={`${mono} mt-6 text-xs sm:text-sm uppercase tracking-[0.25em] px-8 sm:px-12 py-4 sm:py-5 border-2 cursor-pointer w-full sm:w-auto transition-colors duration-200`}
                  style={{ backgroundColor: BLACK, color: OFF_WHITE, borderColor: BLACK }}
                  whileHover={{ backgroundColor: CORAL, borderColor: CORAL }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </SnapReveal>
            </form>

            {/* Contact details */}
            <SnapReveal delay={0.5}>
              <div className="mt-16 pt-8 border-t-2 flex flex-col sm:flex-row gap-6 sm:gap-12" style={{ borderColor: BLACK }}>
                <div>
                  <p className={`${mono} text-[10px] uppercase tracking-[0.3em] mb-1`} style={{ color: CORAL }}>
                    Instagram
                  </p>
                  <p className={`${mono} text-sm`} style={{ color: BLACK }}>
                    {siteContent.instagram}
                  </p>
                </div>
                <div>
                  <p className={`${mono} text-[10px] uppercase tracking-[0.3em] mb-1`} style={{ color: CORAL }}>
                    Web
                  </p>
                  <p className={`${mono} text-sm`} style={{ color: BLACK }}>
                    {siteContent.domain}
                  </p>
                </div>
                <div>
                  <p className={`${mono} text-[10px] uppercase tracking-[0.3em] mb-1`} style={{ color: CORAL }}>
                    Location
                  </p>
                  <p className={`${mono} text-sm`} style={{ color: BLACK }}>
                    {siteContent.location}
                  </p>
                </div>
              </div>
            </SnapReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 7 — FOOTER
            ═══════════════════════════════════════════ */}
        <footer
          className="py-8 sm:py-10 px-4 sm:px-8 lg:px-16 border-t-4 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ backgroundColor: BLACK, borderColor: CORAL }}
        >
          <p className={`${mono} text-[10px] sm:text-xs uppercase tracking-[0.2em] text-center sm:text-left`} style={{ color: OFF_WHITE }}>
            &copy; 2026 Movement Labs &mdash; Lucy Marie Schmidt
          </p>
          <button
            onClick={() => scrollTo("hero")}
            className={`${mono} text-[10px] sm:text-xs uppercase tracking-[0.2em] cursor-pointer hover:opacity-70 transition-opacity`}
            style={{ color: CORAL }}
          >
            Back to Top &uarr;
          </button>
        </footer>
      </div>

      {/* ═══════════════════════════════════════════
          TOAST
          ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg(null)} />}
      </AnimatePresence>
    </div>
  );
}

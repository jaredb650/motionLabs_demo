"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { siteContent } from "@/lib/content";
import { img } from "@/lib/basePath";

/* ─────────────────────────────────────────────
   PALETTE
   ───────────────────────────────────────────── */
const C = {
  black: "#FAF7F2",       // cream (was black)
  nearBlack: "#F5EDE4",   // deeper cream (was near-black)
  darkGray: "#E8DDD0",    // warm light tan (was dark gray)
  midGray: "#8A7B6B",     // warm mid-tone (was mid gray)
  lightGray: "#5C4F42",   // warm dark text (was light gray)
  offWhite: "#2D2A26",    // charcoal text (was off-white)
  white: "#2D2A26",       // charcoal for headings (was white)
  gold: "#C47248",        // terracotta accent (was gold)
  goldDark: "#A0522D",    // sienna (was dark gold)
};

/* ─────────────────────────────────────────────
   FILM GRAIN OVERLAY (inline SVG data URI)
   ───────────────────────────────────────────── */
const grainSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`;

function FilmGrain() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] opacity-15 mix-blend-multiply"
      style={{
        backgroundImage: grainSvg,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
      }}
      aria-hidden="true"
    />
  );
}

/* ─────────────────────────────────────────────
   SECTION FADE-IN WRAPPER
   ───────────────────────────────────────────── */
function FadeSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Qualifications", href: "#qualifications" },
  { label: "Credentials", href: "#credentials" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

/* ─────────────────────────────────────────────
   GOLD DIVIDER
   ───────────────────────────────────────────── */
function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`mx-auto h-px w-24 ${className}`}
      style={{ backgroundColor: C.gold }}
    />
  );
}

/* ─────────────────────────────────────────────
   TOAST
   ───────────────────────────────────────────── */
function Toast({
  message,
  show,
  onClose,
}: {
  message: string;
  show: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (show) {
      const t = setTimeout(onClose, 2500);
      return () => clearTimeout(t);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          className="fixed bottom-8 left-1/2 z-[10000] -translate-x-1/2 rounded-sm border px-6 py-3 font-[family-name:var(--font-inter)] text-sm tracking-widest uppercase"
          style={{
            backgroundColor: "#2D2A26",
            borderColor: "#C47248",
            color: "#FAF7F2",
          }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* =============================================================
   NAVIGATION
   ============================================================= */
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(250,247,242,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        {/* Logo / site name */}
        <a
          href="#"
          onClick={(e: React.MouseEvent) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="font-[family-name:var(--font-cormorant)] text-lg uppercase tracking-[0.15em] transition-colors duration-300 hover:opacity-80"
          style={{ color: C.gold }}
        >
          Movement Labs
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-[family-name:var(--font-inter)] text-[11px] uppercase tracking-[0.25em] transition-colors duration-300"
                style={{ color: C.lightGray }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = C.gold)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = C.lightGray)
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <span
            className="block h-px w-6 transition-all duration-300"
            style={{
              backgroundColor: C.gold,
              transform: mobileOpen ? "rotate(45deg) translateY(4px)" : "none",
            }}
          />
          <span
            className="block h-px w-6 transition-all duration-300"
            style={{
              backgroundColor: C.gold,
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            className="block h-px w-6 transition-all duration-300"
            style={{
              backgroundColor: C.gold,
              transform: mobileOpen
                ? "rotate(-45deg) translateY(-4px)"
                : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden md:hidden"
            style={{ backgroundColor: "rgba(245,237,228,0.98)" }}
          >
            <ul className="flex flex-col items-center gap-6 py-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-[family-name:var(--font-inter)] text-sm uppercase tracking-[0.25em]"
                    style={{ color: C.offWhite }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* =============================================================
   HERO
   ============================================================= */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{ backgroundColor: C.black }}
    >

      {/* Hero background image — cinematic monochrome */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        style={{ y }}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <img
          src={img("/images/hero/lucy_f4.webp")}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-[center_top]"
          style={{
            filter: "sepia(0.15) contrast(1.05) brightness(1.02)",
            opacity: 0.35,
          }}
        />
      </motion.div>

      {/* Spotlight / vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 55% 55% at 50% 45%, rgba(196,114,72,0.06) 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(250,247,242,0.7) 100%)`,
        }}
        aria-hidden="true"
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 px-6 text-center"
      >
        {/* Business name — primary headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-[family-name:var(--font-cormorant)] text-5xl font-light uppercase leading-none tracking-[0.2em] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
          style={{ color: C.white }}
        >
          <span className="block">Movement</span>
          <span className="block">Labs</span>
        </motion.h1>

        {/* Name — secondary */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="mt-8 font-[family-name:var(--font-inter)] text-sm uppercase tracking-[0.35em]"
          style={{ color: C.gold }}
        >
          {siteContent.name}
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="mx-auto mt-6 max-w-lg font-[family-name:var(--font-cormorant)] text-lg font-light italic tracking-wide sm:text-xl"
          style={{ color: C.lightGray }}
        >
          Between anatomy and dance, a space emerges where your body can be understood, strengthened, and rediscovered
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.8 }}
          className="mt-12"
        >
          <a
            href="#contact"
            className="inline-block border px-10 py-3 font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.3em] transition-all duration-500 hover:bg-[#C47248] hover:text-[#FAF7F2]"
            style={{ borderColor: C.gold, color: C.gold }}
          >
            Book a Lesson
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-10 w-px"
          style={{ backgroundColor: C.gold, opacity: 0.5 }}
        />
      </motion.div>
    </section>
  );
}

/* =============================================================
   ABOUT — INTRO (brief, coach-focused)
   ============================================================= */
function AboutIntroSection() {
  return (
    <section
      id="about"
      className="relative py-28 sm:py-36"
      style={{ backgroundColor: C.nearBlack }}
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        {/* Section header */}
        <FadeSection className="text-center">
          <p
            className="font-[family-name:var(--font-inter)] text-[11px] uppercase tracking-[0.35em]"
            style={{ color: C.gold }}
          >
            About
          </p>
          <h2
            className="mt-4 font-[family-name:var(--font-cormorant)] text-4xl font-light uppercase tracking-[0.15em] sm:text-5xl"
            style={{ color: C.white }}
          >
            Meet Your Coach
          </h2>
          <GoldDivider className="mt-8" />
        </FadeSection>

        {/* Specializations */}
        <FadeSection delay={0.2} className="mt-16 text-center">
          <p
            className="font-[family-name:var(--font-cormorant)] text-xl font-light uppercase tracking-[0.2em] sm:text-2xl"
            style={{ color: C.gold }}
          >
            {siteContent.styles.join(" \u2022 ")}
          </p>
        </FadeSection>

        <GoldDivider className="mt-12" />

        {/* What she does for you */}
        <FadeSection delay={0.3} className="mt-12">
          <p
            className="text-center font-[family-name:var(--font-inter)] text-base leading-relaxed sm:text-lg"
            style={{ color: C.offWhite }}
          >
            Aesthetics meet function. With a holistic approach, Lucy merges movement art and clinical knowledge to support you individually &mdash; for greater ease, stability, and confidence in your body.
          </p>
        </FadeSection>

        {/* Her unique edge as a coach */}
        <FadeSection delay={0.15} className="mt-10">
          <p
            className="text-center font-[family-name:var(--font-inter)] text-sm leading-relaxed"
            style={{ color: C.lightGray }}
          >
            Her work connects physiological understanding with the freedom of dance to help you build lasting strength and restore balance. She guides you through this process with care, knowledge, and a deep passion for movement &mdash; decoding movement patterns to unlock your body&apos;s full potential.
          </p>
        </FadeSection>
      </div>
    </section>
  );
}

/* =============================================================
   ABOUT — DETAILS (qualifications, expanded background)
   ============================================================= */
function AboutDetailsSection() {
  return (
    <section
      id="qualifications"
      className="relative py-28 sm:py-36"
      style={{ backgroundColor: C.nearBlack }}
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        {/* Section header */}
        <FadeSection className="text-center">
          <p
            className="font-[family-name:var(--font-inter)] text-[11px] uppercase tracking-[0.35em]"
            style={{ color: C.gold }}
          >
            Qualifications
          </p>
          <h2
            className="mt-4 font-[family-name:var(--font-cormorant)] text-4xl font-light uppercase tracking-[0.15em] sm:text-5xl"
            style={{ color: C.white }}
          >
            Why Train With Lucy
          </h2>
          <GoldDivider className="mt-8" />
        </FadeSection>

        {/* Depth of training + Clinical edge */}
        <FadeSection delay={0.15} className="mt-16 space-y-8">
          <p
            className="font-[family-name:var(--font-inter)] text-sm leading-relaxed"
            style={{ color: C.lightGray }}
          >
            Lucy didn&apos;t just learn one style in one city &mdash; she sought out the best teachers globally and synthesized multiple traditions into a teaching methodology that&apos;s uniquely her own. From the Martha Graham School in New York to Danceworks Berlin, from Canadian Dance Company in Toronto to studios in Buenos Aires and Bilbao, her training spans continents and disciplines. In Berlin, this combination of niche Latin and Modern dance expertise is extremely rare.
          </p>
          <p
            className="font-[family-name:var(--font-inter)] text-sm leading-relaxed"
            style={{ color: C.lightGray }}
          >
            With a Bachelor of Science in Physiotherapy and certifications in STOTT Pilates and Progressive Ballet Technique, Lucy brings a clinical understanding of the human body into every class. She doesn&apos;t just teach movement &mdash; she understands biomechanics, injury prevention, and physical rehabilitation, giving her students a safer, smarter, and more effective training experience.
          </p>
        </FadeSection>

        {/* Highlights */}
        <FadeSection delay={0.15} className="mt-16">
          <h3
            className="text-center font-[family-name:var(--font-inter)] text-[11px] uppercase tracking-[0.35em]"
            style={{ color: C.gold }}
          >
            Training &amp; Credentials
          </h3>
          <ul className="mt-8 space-y-4">
            {siteContent.about.highlights.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="flex items-start gap-3 font-[family-name:var(--font-inter)] text-sm leading-relaxed"
                style={{ color: C.lightGray }}
              >
                <span
                  className="mt-2 block h-1 w-1 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: C.gold }}
                />
                {item}
              </motion.li>
            ))}
          </ul>
        </FadeSection>
      </div>
    </section>
  );
}

/* =============================================================
   SERVICES
   ============================================================= */
function ServicesSection() {
  return (
    <section
      id="services"
      className="relative py-28 sm:py-36"
      style={{ backgroundColor: C.black }}
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <FadeSection className="text-center">
          <p
            className="font-[family-name:var(--font-inter)] text-[11px] uppercase tracking-[0.35em]"
            style={{ color: C.gold }}
          >
            Services
          </p>
          <h2
            className="mt-4 font-[family-name:var(--font-cormorant)] text-4xl font-light uppercase tracking-[0.15em] sm:text-5xl"
            style={{ color: C.white }}
          >
            Offerings
          </h2>
          <GoldDivider className="mt-8" />
        </FadeSection>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {siteContent.services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`group relative border p-8 transition-all duration-500 ${i === siteContent.services.length - 1 && siteContent.services.length % 2 === 1 ? "sm:col-span-2 sm:max-w-[calc(50%-0.75rem)] sm:mx-auto" : ""}`}
              style={{
                backgroundColor: C.nearBlack,
                borderColor: `${C.gold}33`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = C.gold;
                e.currentTarget.style.boxShadow = `0 0 30px ${C.gold}15, inset 0 0 30px ${C.gold}08`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${C.gold}33`;
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <h3
                className="font-[family-name:var(--font-cormorant)] text-xl font-light uppercase tracking-[0.1em]"
                style={{ color: C.white }}
              >
                {service.title}
              </h3>
              <p
                className="mt-4 font-[family-name:var(--font-inter)] text-sm leading-relaxed"
                style={{ color: C.midGray }}
              >
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   CREDENTIALS / TIMELINE
   ============================================================= */
function CredentialsSection() {
  return (
    <section
      id="credentials"
      className="relative py-28 sm:py-36"
      style={{ backgroundColor: C.nearBlack }}
    >
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <FadeSection className="text-center">
          <p
            className="font-[family-name:var(--font-inter)] text-[11px] uppercase tracking-[0.35em]"
            style={{ color: C.gold }}
          >
            Credentials
          </p>
          <h2
            className="mt-4 font-[family-name:var(--font-cormorant)] text-4xl font-light uppercase tracking-[0.15em] sm:text-5xl"
            style={{ color: C.white }}
          >
            Timeline
          </h2>
          <GoldDivider className="mt-8" />
        </FadeSection>

        {/* Timeline */}
        <div className="relative mt-20">
          {/* Vertical gold line */}
          <div
            className="absolute left-6 top-0 h-full w-px sm:left-1/2 sm:-translate-x-px"
            style={{ backgroundColor: `${C.gold}40` }}
            aria-hidden="true"
          />

          <div className="space-y-12">
            {siteContent.timeline.map((entry, i) => (
              <motion.div
                key={`${entry.year}-${i}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: i * 0.08 }}
                className="relative flex items-start gap-6 pl-14 sm:pl-0"
              >
                {/* Dot */}
                <div
                  className="absolute left-[19px] top-1 h-3 w-3 rounded-full border-2 sm:left-1/2 sm:-translate-x-1.5"
                  style={{
                    borderColor: C.gold,
                    backgroundColor: C.nearBlack,
                  }}
                  aria-hidden="true"
                />

                {/* Year - mobile: above; desktop: alternating */}
                <div
                  className={`hidden w-1/2 sm:block ${
                    i % 2 === 0 ? "pr-12 text-right" : "order-2 pl-12 text-left"
                  }`}
                >
                  {i % 2 === 0 ? (
                    <span
                      className="font-[family-name:var(--font-cormorant)] text-2xl font-light"
                      style={{ color: C.gold }}
                    >
                      {entry.year}
                    </span>
                  ) : (
                    <p
                      className="font-[family-name:var(--font-inter)] text-sm leading-relaxed"
                      style={{ color: C.lightGray }}
                    >
                      {entry.milestone}
                    </p>
                  )}
                </div>
                <div
                  className={`hidden w-1/2 sm:block ${
                    i % 2 === 0 ? "order-2 pl-12 text-left" : "pr-12 text-right"
                  }`}
                >
                  {i % 2 === 0 ? (
                    <p
                      className="font-[family-name:var(--font-inter)] text-sm leading-relaxed"
                      style={{ color: C.lightGray }}
                    >
                      {entry.milestone}
                    </p>
                  ) : (
                    <span
                      className="font-[family-name:var(--font-cormorant)] text-2xl font-light"
                      style={{ color: C.gold }}
                    >
                      {entry.year}
                    </span>
                  )}
                </div>

                {/* Mobile layout */}
                <div className="sm:hidden">
                  <span
                    className="block font-[family-name:var(--font-cormorant)] text-lg font-light"
                    style={{ color: C.gold }}
                  >
                    {entry.year}
                  </span>
                  <p
                    className="mt-1 font-[family-name:var(--font-inter)] text-sm leading-relaxed"
                    style={{ color: C.lightGray }}
                  >
                    {entry.milestone}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   GALLERY
   ============================================================= */
const galleryPhotos = [
  { src: img("/images/gallery/lucy_d7.webp"), alt: "Dramatic close-up portrait with hand raised in a powerful gesture", aspect: "aspect-[3/4]" },
  { src: img("/images/gallery/lucy_f3.webp"), alt: "Silhouette with backlight and dramatic lens flare", aspect: "aspect-[4/3]" },
  { src: img("/images/gallery/lucy_d12.webp"), alt: "Grand jete leap with arms wide in a stunning display of movement", aspect: "aspect-[3/4]" },
  { src: img("/images/gallery/lucy_f4.webp"), alt: "Silhouette with arm reaching up toward dramatic sun behind", aspect: "aspect-[3/4]" },
  { src: img("/images/gallery/lucy_f8.webp"), alt: "Overhead artistic composition looking down at dancer", aspect: "aspect-[4/5]" },
  { src: img("/images/gallery/lucy_f23.webp"), alt: "Dramatic backlit hair spin captured from below", aspect: "aspect-[4/3]" },
  { src: img("/images/gallery/lucy_f13.webp"), alt: "Backlit spinning with dramatic light flare", aspect: "aspect-[3/4]" },
  { src: img("/images/gallery/lucy_f14.webp"), alt: "Looking up at camera with architectural ceiling creating dramatic frame", aspect: "aspect-[3/4]" },
  { src: img("/images/gallery/lucy_f32.webp"), alt: "Intimate portrait at column with beautiful light on face", aspect: "aspect-[3/4]" },
];

function GallerySection() {
  return (
    <section
      id="gallery"
      className="relative py-28 sm:py-36"
      style={{ backgroundColor: C.black }}
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <FadeSection className="text-center">
          <p
            className="font-[family-name:var(--font-inter)] text-[11px] uppercase tracking-[0.35em]"
            style={{ color: C.gold }}
          >
            Gallery
          </p>
          <h2
            className="mt-4 font-[family-name:var(--font-cormorant)] text-4xl font-light uppercase tracking-[0.15em] sm:text-5xl"
            style={{ color: C.white }}
          >
            Portfolio
          </h2>
          <GoldDivider className="mt-8" />
        </FadeSection>

        <div className="mt-16 columns-2 gap-4 sm:columns-3">
          {galleryPhotos.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`group relative mb-4 overflow-hidden border ${photo.aspect}`}
              style={{
                borderColor: `${C.white}15`,
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                style={{
                  filter: "sepia(0.08) saturate(1.05)",
                }}
              />
              {/* Subtle gold border glow on hover */}
              <div
                className="pointer-events-none absolute inset-0 border opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ borderColor: `${C.gold}60` }}
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   CONTACT
   ============================================================= */
function ContactSection() {
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("Sending...");
  const [submitting, setSubmitting] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && !document.getElementById("forminit-sdk")) {
      const script = document.createElement("script");
      script.id = "forminit-sdk";
      script.src = "https://forminit.com/sdk/v1/forminit.js";
      script.async = true;
      script.onload = () => setSdkReady(true);
      document.head.appendChild(script);
    } else if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).Forminit) {
      setSdkReady(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current || submitting) return;

    setSubmitting(true);
    setToastMsg("Sending...");
    setShowToast(true);

    try {
      const ForminitClass = (window as unknown as Record<string, new () => { submit: (id: string, data: FormData) => Promise<{ error?: { message: string } }> }>).Forminit;
      if (!ForminitClass) throw new Error("Forminit SDK not loaded");
      const fi = new ForminitClass();
      const { error } = await fi.submit("7lw68385bpv", new FormData(formRef.current));
      if (error) {
        setToastMsg(error.message || "Something went wrong");
      } else {
        setToastMsg("Message sent successfully!");
        formRef.current.reset();
      }
    } catch {
      setToastMsg("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const baseStyles: React.CSSProperties = {
    backgroundColor: C.black,
    borderColor: `${C.white}20`,
    color: C.white,
  };

  const inputClass = "w-full border px-4 py-3 font-[family-name:var(--font-inter)] text-sm outline-none transition-colors duration-300 focus:border-[#C47248]";
  const labelClass = "mb-2 block font-[family-name:var(--font-inter)] text-[11px] uppercase tracking-[0.25em]";

  return (
    <section
      id="contact"
      className="relative py-28 sm:py-36"
      style={{ backgroundColor: C.nearBlack }}
    >
      <div className="mx-auto max-w-2xl px-6 lg:px-10">
        <FadeSection className="text-center">
          <p
            className="font-[family-name:var(--font-inter)] text-[11px] uppercase tracking-[0.35em]"
            style={{ color: C.gold }}
          >
            Contact
          </p>
          <h2
            className="mt-4 font-[family-name:var(--font-cormorant)] text-4xl font-light uppercase tracking-[0.15em] sm:text-5xl"
            style={{ color: C.white }}
          >
            Get in Touch
          </h2>
          <GoldDivider className="mt-8" />
        </FadeSection>

        <FadeSection delay={0.2} className="mt-16">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* Name (sender) */}
            <div>
              <label htmlFor="fi-sender-fullName" className={labelClass} style={{ color: C.lightGray }}>
                Name
              </label>
              <input
                id="fi-sender-fullName"
                name="fi-sender-fullName"
                type="text"
                required
                className={inputClass}
                style={baseStyles}
              />
            </div>

            {/* Email (sender) */}
            <div>
              <label htmlFor="fi-sender-email" className={labelClass} style={{ color: C.lightGray }}>
                Email
              </label>
              <input
                id="fi-sender-email"
                name="fi-sender-email"
                type="email"
                required
                className={inputClass}
                style={baseStyles}
              />
            </div>

            {/* Lesson Type (select field) */}
            <div>
              <label htmlFor="fi-select-lessonType" className={labelClass} style={{ color: C.lightGray }}>
                Lesson Type
              </label>
              <select
                id="fi-select-lessonType"
                name="fi-select-lessonType"
                required
                className={inputClass}
                style={baseStyles}
              >
                <option value="">Select...</option>
                <option value="Private">Private</option>
                <option value="Group">Group</option>
                <option value="Online">Online</option>
                <option value="Workshop">Workshop</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Message (text field) */}
            <div>
              <label htmlFor="fi-text-message" className={labelClass} style={{ color: C.lightGray }}>
                Message
              </label>
              <textarea
                id="fi-text-message"
                name="fi-text-message"
                rows={5}
                required
                className={inputClass}
                style={baseStyles}
              />
            </div>

            <div className="pt-4 text-center">
              <button
                type="submit"
                disabled={submitting || !sdkReady}
                className="inline-block border px-12 py-3 font-[family-name:var(--font-inter)] text-xs uppercase tracking-[0.3em] transition-all duration-500 hover:bg-[#C47248] hover:text-[#FAF7F2] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ borderColor: C.gold, color: C.gold, backgroundColor: "transparent" }}
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </FadeSection>

        {/* Contact info */}
        <FadeSection delay={0.3} className="mt-16">
          <GoldDivider />
          <div className="mt-10 flex flex-col items-center gap-3 text-center">
            <p
              className="font-[family-name:var(--font-inter)] text-sm"
              style={{ color: C.lightGray }}
            >
              {siteContent.instagram}
            </p>
            <p
              className="font-[family-name:var(--font-inter)] text-sm"
              style={{ color: C.midGray }}
            >
              {siteContent.domain}
            </p>
            <p
              className="font-[family-name:var(--font-inter)] text-sm"
              style={{ color: C.midGray }}
            >
              {siteContent.location}
            </p>
          </div>
        </FadeSection>
      </div>

      <Toast
        message={toastMsg}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </section>
  );
}

/* =============================================================
   FOOTER
   ============================================================= */
function FooterSection() {
  return (
    <footer style={{ backgroundColor: C.black }} className="py-12">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="h-px w-full" style={{ backgroundColor: `${C.gold}30` }} />
        <p
          className="mt-8 text-center font-[family-name:var(--font-inter)] text-xs tracking-[0.15em]"
          style={{ color: C.midGray }}
        >
          &copy; 2026 {siteContent.business} &mdash; {siteContent.name}
        </p>
      </div>
    </footer>
  );
}

/* =============================================================
   PAGE (default export)
   ============================================================= */
export default function DemoEPage() {
  return (
    <main
      className="relative min-h-screen"
      style={{ backgroundColor: C.black, color: C.white }}
    >
      <FilmGrain />
      <Navigation />
      <HeroSection />
      <AboutIntroSection />
      <ServicesSection />
      <AboutDetailsSection />
      <CredentialsSection />
      <GallerySection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}

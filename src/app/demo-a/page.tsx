"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { siteContent } from "@/lib/content";
import { img } from "@/lib/basePath";

/* ─────────────────────────────────────────────
   Shared animation helpers
   ───────────────────────────────────────────── */

function FadeInSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SlideInFromLeft({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -60 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Color palette constants
   ───────────────────────────────────────────── */

const CREAM = "#FAF7F2";
const CREAM_DEEP = "#F5EDE4";
const TERRACOTTA = "#C47248";
const SIENNA = "#A0522D";
const CHARCOAL = "#2D2A26";

/* ─────────────────────────────────────────────
   NAVIGATION
   ───────────────────────────────────────────── */

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "shadow-[0_1px_20px_rgba(45,42,38,0.06)]"
          : ""
      }`}
      style={{
        backgroundColor: scrolled
          ? "rgba(250, 247, 242, 0.92)"
          : "rgba(250, 247, 242, 0.7)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-[72px]">
        {/* Logo / back link */}
        <Link
          href="/"
          className="font-[family-name:var(--font-playfair)] text-sm tracking-wide hover:opacity-60 transition-opacity"
          style={{ color: CHARCOAL }}
        >
          &larr; Back to Styles
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {siteContent.navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href)}
                className="font-[family-name:var(--font-inter)] text-[13px] tracking-[0.08em] uppercase hover:opacity-60 transition-opacity cursor-pointer"
                style={{ color: CHARCOAL }}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] cursor-pointer"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-[1.5px] transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""
            }`}
            style={{ backgroundColor: CHARCOAL }}
          />
          <span
            className={`block w-5 h-[1.5px] transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
            style={{ backgroundColor: CHARCOAL }}
          />
          <span
            className={`block w-5 h-[1.5px] transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
            }`}
            style={{ backgroundColor: CHARCOAL }}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      <motion.div
        initial={false}
        animate={{
          height: mobileOpen ? "auto" : 0,
          opacity: mobileOpen ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="md:hidden overflow-hidden"
        style={{ backgroundColor: "rgba(250, 247, 242, 0.98)" }}
      >
        <ul className="flex flex-col gap-1 px-6 pb-6 pt-2">
          {siteContent.navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href)}
                className="font-[family-name:var(--font-inter)] text-[14px] tracking-[0.06em] uppercase py-2 w-full text-left hover:opacity-60 transition-opacity cursor-pointer"
                style={{ color: CHARCOAL }}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </motion.div>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   HERO
   ───────────────────────────────────────────── */

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const handleCTA = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: CREAM }}
    >
      {/* Noise / grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Floating terracotta shapes */}
      <motion.div
        className="absolute top-[15%] left-[8%] w-[1px] h-32 lg:h-48 origin-top"
        style={{ backgroundColor: TERRACOTTA, opacity: 0.25 }}
        animate={{ scaleY: [1, 1.3, 1], rotate: [0, 3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[10%] w-24 h-24 lg:w-36 lg:h-36 rounded-full border"
        style={{ borderColor: TERRACOTTA, opacity: 0.15 }}
        animate={{ scale: [1, 1.08, 1], y: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[30%] right-[18%] w-[60px] h-[1px]"
        style={{ backgroundColor: TERRACOTTA, opacity: 0.2 }}
        animate={{ scaleX: [1, 1.5, 1], x: [0, 15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[35%] left-[15%] w-16 h-16 lg:w-20 lg:h-20 rounded-full"
        style={{ border: `1px solid ${TERRACOTTA}`, opacity: 0.12 }}
        animate={{ scale: [1, 0.9, 1], y: [0, 8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[55%] left-[45%] w-[1px] h-20"
        style={{ backgroundColor: SIENNA, opacity: 0.1 }}
        animate={{ scaleY: [1, 1.6, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Two-column layout: text left, image right */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-20 lg:pt-0 lg:pb-0">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-12 lg:gap-16 xl:gap-20">

          {/* Left column — text content */}
          <motion.div
            style={{ y: yText, opacity }}
            className="flex-1 text-center lg:text-left order-2 lg:order-1"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-[family-name:var(--font-inter)] text-[11px] tracking-[0.25em] uppercase mb-6 lg:mb-8"
              style={{ color: TERRACOTTA }}
            >
              Berlin &middot; Dance &middot; Movement
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-playfair)] text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-medium leading-[0.95] tracking-[-0.02em] mb-4 lg:mb-6"
              style={{ color: CHARCOAL }}
            >
              Lucy Marie
              <br />
              Schmidt
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="font-[family-name:var(--font-playfair)] text-lg sm:text-xl lg:text-2xl italic font-light tracking-wide mb-3"
              style={{ color: SIENNA }}
            >
              {siteContent.business}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="font-[family-name:var(--font-inter)] text-sm sm:text-base lg:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10 lg:mb-14"
              style={{ color: `${CHARCOAL}cc` }}
            >
              Where art meets anatomy — a journey through movement, dance, and the
              human body
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCTA}
              className="font-[family-name:var(--font-inter)] text-[12px] tracking-[0.18em] uppercase px-10 py-4 border transition-colors duration-300 cursor-pointer"
              style={{
                borderColor: TERRACOTTA,
                color: TERRACOTTA,
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget.style.backgroundColor = TERRACOTTA);
                (e.currentTarget.style.color = CREAM);
              }}
              onMouseLeave={(e) => {
                (e.currentTarget.style.backgroundColor = "transparent");
                (e.currentTarget.style.color = TERRACOTTA);
              }}
            >
              Get in Touch
            </motion.button>
          </motion.div>

          {/* Right column — hero image */}
          <motion.div
            style={{ y: yImage, opacity }}
            className="relative flex-1 order-1 lg:order-2 w-full max-w-sm sm:max-w-md lg:max-w-none"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              {/* Decorative terracotta accent — offset rectangle behind image */}
              <div
                className="absolute -top-3 -right-3 lg:-top-4 lg:-right-4 w-full h-full rounded-2xl"
                style={{
                  border: `1px solid ${TERRACOTTA}30`,
                }}
              />

              {/* Image container */}
              <div
                className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden"
                style={{
                  boxShadow: `0 25px 60px -12px rgba(196, 114, 72, 0.15), 0 12px 28px -8px rgba(45, 42, 38, 0.1)`,
                }}
              >
                <img
                  src={img("/images/hero/lucy_d6.webp")}
                  alt="Lucy performing an arabesque under a pavilion ceiling"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    filter: "sepia(0.08) saturate(1.05) brightness(1.02)",
                  }}
                />

                {/* Subtle warm gradient overlay at the bottom */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(
                      to top,
                      rgba(196, 114, 72, 0.08) 0%,
                      transparent 40%
                    )`,
                  }}
                />
              </div>

              {/* Small decorative terracotta dot */}
              <motion.div
                className="absolute -bottom-2 -left-2 lg:-bottom-3 lg:-left-3 w-4 h-4 lg:w-5 lg:h-5 rounded-full"
                style={{ backgroundColor: TERRACOTTA, opacity: 0.3 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="font-[family-name:var(--font-inter)] text-[10px] tracking-[0.2em] uppercase"
          style={{ color: `${CHARCOAL}88` }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-8"
          style={{ backgroundColor: `${CHARCOAL}44` }}
        />
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ABOUT
   ───────────────────────────────────────────── */

function AboutSection() {
  const { about, styles } = siteContent;

  return (
    <section
      id="about"
      className="relative py-24 lg:py-36 overflow-hidden"
      style={{ backgroundColor: CREAM }}
    >
      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
        {/* Section label */}
        <FadeInSection>
          <p
            className="font-[family-name:var(--font-inter)] text-[11px] tracking-[0.25em] uppercase mb-4"
            style={{ color: TERRACOTTA }}
          >
            About
          </p>
          <h2
            className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-medium mb-16 lg:mb-24 leading-tight"
            style={{ color: CHARCOAL }}
          >
            {about.title}
          </h2>
        </FadeInSection>

        {/* Specializations — elegant typographic cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20 lg:mb-28">
          {styles.map((style, i) => (
            <FadeInSection key={style} delay={i * 0.12}>
              <div
                className="group relative p-8 lg:p-10 text-center transition-all duration-500 hover:-translate-y-1"
                style={{
                  backgroundColor: CREAM_DEEP,
                  borderTop: `2px solid ${TERRACOTTA}`,
                }}
              >
                <span
                  className="font-[family-name:var(--font-inter)] text-[10px] tracking-[0.3em] uppercase block mb-3"
                  style={{ color: TERRACOTTA }}
                >
                  0{i + 1}
                </span>
                <h3
                  className="font-[family-name:var(--font-playfair)] text-2xl lg:text-3xl font-medium italic"
                  style={{ color: CHARCOAL }}
                >
                  {style}
                </h3>
              </div>
            </FadeInSection>
          ))}
        </div>

        {/* Text content — two column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <FadeInSection>
              <p
                className="font-[family-name:var(--font-inter)] text-base lg:text-lg leading-[1.85] mb-6"
                style={{ color: `${CHARCOAL}dd` }}
              >
                {about.intro}
              </p>
            </FadeInSection>
            <FadeInSection delay={0.1}>
              <p
                className="font-[family-name:var(--font-inter)] text-base lg:text-lg leading-[1.85] mb-6"
                style={{ color: `${CHARCOAL}dd` }}
              >
                {about.specialization}
              </p>
            </FadeInSection>
            <FadeInSection delay={0.2}>
              <p
                className="font-[family-name:var(--font-inter)] text-base lg:text-lg leading-[1.85]"
                style={{ color: `${CHARCOAL}dd` }}
              >
                {about.uniqueness}
              </p>
            </FadeInSection>
          </div>

          <div>
            {/* Feature image */}
            <FadeInSection delay={0.1}>
              <div className="overflow-hidden mb-8 group">
                <img
                  src={img("/images/hero/lucy_d1.webp")}
                  alt="Lucy in an elegant pose at classical columns during golden hour"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
            </FadeInSection>

            <FadeInSection delay={0.15}>
              <p
                className="font-[family-name:var(--font-inter)] text-base lg:text-lg leading-[1.85] mb-8"
                style={{ color: `${CHARCOAL}dd` }}
              >
                {about.clinical}
              </p>
            </FadeInSection>

            <FadeInSection delay={0.25}>
              <div
                className="p-6 lg:p-8"
                style={{
                  backgroundColor: CREAM_DEEP,
                  borderLeft: `3px solid ${TERRACOTTA}`,
                }}
              >
                <p
                  className="font-[family-name:var(--font-playfair)] text-lg lg:text-xl italic leading-relaxed"
                  style={{ color: CHARCOAL }}
                >
                  Trained at the Martha Graham School in NYC, Danceworks Berlin,
                  and internationally in Toronto, Buenos Aires, and Bilbao.
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SERVICES
   ───────────────────────────────────────────── */

function ServicesSection() {
  return (
    <section
      id="services"
      className="relative py-24 lg:py-36"
      style={{ backgroundColor: CREAM_DEEP }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <FadeInSection>
          <p
            className="font-[family-name:var(--font-inter)] text-[11px] tracking-[0.25em] uppercase mb-4"
            style={{ color: TERRACOTTA }}
          >
            Services
          </p>
          <h2
            className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-medium mb-16 lg:mb-24 leading-tight"
            style={{ color: CHARCOAL }}
          >
            What I Offer
          </h2>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {siteContent.services.map((service, i) => (
            <FadeInSection key={service.title} delay={i * 0.08}>
              <div
                className="group relative p-8 lg:p-10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(196,114,72,0.08)] h-full"
                style={{
                  backgroundColor: CREAM,
                  borderLeft: `3px solid ${TERRACOTTA}`,
                }}
              >
                <span
                  className="font-[family-name:var(--font-inter)] text-[10px] tracking-[0.3em] uppercase block mb-4"
                  style={{ color: `${CHARCOAL}66` }}
                >
                  0{i + 1}
                </span>
                <h3
                  className="font-[family-name:var(--font-playfair)] text-xl lg:text-2xl font-medium mb-3"
                  style={{ color: CHARCOAL }}
                >
                  {service.title}
                </h3>
                <p
                  className="font-[family-name:var(--font-inter)] text-sm lg:text-[15px] leading-[1.8]"
                  style={{ color: `${CHARCOAL}bb` }}
                >
                  {service.description}
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CREDENTIALS / TIMELINE
   ───────────────────────────────────────────── */

function CredentialsSection() {
  return (
    <section
      id="credentials"
      className="relative py-24 lg:py-36"
      style={{ backgroundColor: CREAM }}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <FadeInSection>
          <p
            className="font-[family-name:var(--font-inter)] text-[11px] tracking-[0.25em] uppercase mb-4"
            style={{ color: TERRACOTTA }}
          >
            Credentials
          </p>
          <h2
            className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-medium mb-16 lg:mb-24 leading-tight"
            style={{ color: CHARCOAL }}
          >
            A Journey in
            <br />
            Movement
          </h2>
        </FadeInSection>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical accent line */}
          <div
            className="absolute left-[18px] md:left-[22px] top-0 bottom-0 w-[1px]"
            style={{ backgroundColor: `${TERRACOTTA}30` }}
          />

          <div className="flex flex-col gap-0">
            {siteContent.timeline.map((item, i) => (
              <SlideInFromLeft key={`${item.year}-${i}`} delay={i * 0.06}>
                <div className="relative flex items-start gap-6 md:gap-10 py-6 group">
                  {/* Dot on the timeline line */}
                  <div className="relative flex-shrink-0 w-[37px] md:w-[45px] flex justify-start">
                    <div
                      className="w-[9px] h-[9px] rounded-full mt-[6px] ring-4 ring-[#FAF7F2] transition-all duration-300 group-hover:scale-125"
                      style={{
                        backgroundColor: TERRACOTTA,
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <span
                      className="font-[family-name:var(--font-inter)] text-[11px] tracking-[0.2em] uppercase block mb-1"
                      style={{ color: TERRACOTTA }}
                    >
                      {item.year}
                    </span>
                    <p
                      className="font-[family-name:var(--font-inter)] text-sm lg:text-[15px] leading-[1.7]"
                      style={{ color: `${CHARCOAL}cc` }}
                    >
                      {item.milestone}
                    </p>
                  </div>
                </div>
              </SlideInFromLeft>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   GALLERY
   ───────────────────────────────────────────── */

const galleryItems = [
  { src: img("/images/gallery/lucy_d1.webp"), alt: "Lucy in an elegant pose at classical columns during golden hour", aspect: "aspect-[3/4]" },
  { src: img("/images/gallery/lucy_d2.webp"), alt: "Lucy in a reaching pose at columns with beautiful natural light", aspect: "aspect-[3/4]" },
  { src: img("/images/gallery/lucy_d6.webp"), alt: "Lucy performing an arabesque under a pavilion ceiling with stunning composition", aspect: "aspect-[3/4]" },
  { src: img("/images/gallery/lucy_f1.webp"), alt: "Lucy performing a high kick at columns, strong and graceful", aspect: "aspect-[3/4]" },
  { src: img("/images/gallery/lucy_f5.webp"), alt: "Lucy in a contemplative portrait at a column", aspect: "aspect-[3/4]" },
  { src: img("/images/gallery/lucy_f7.webp"), alt: "Lucy in a seated floor pose with arm reaching up, artistic composition", aspect: "aspect-[3/4]" },
  { src: img("/images/gallery/lucy_f12.webp"), alt: "Lucy leaning against a column in a profile portrait", aspect: "aspect-[3/4]" },
  { src: img("/images/gallery/lucy_f19.webp"), alt: "Lucy in a back pose at columns with arms raised elegantly", aspect: "aspect-[3/4]" },
  { src: img("/images/gallery/lucy_f24.webp"), alt: "Lucy looking up at columns with open arms bathed in warm light", aspect: "aspect-[4/3]" },
];

function GallerySection() {
  return (
    <section
      id="gallery"
      className="relative py-24 lg:py-36"
      style={{ backgroundColor: CREAM_DEEP }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <FadeInSection>
          <p
            className="font-[family-name:var(--font-inter)] text-[11px] tracking-[0.25em] uppercase mb-4"
            style={{ color: TERRACOTTA }}
          >
            Gallery
          </p>
          <h2
            className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-medium mb-6 leading-tight"
            style={{ color: CHARCOAL }}
          >
            In Motion
          </h2>
          <p
            className="font-[family-name:var(--font-inter)] text-sm lg:text-base mb-16 lg:mb-24 max-w-lg"
            style={{ color: `${CHARCOAL}99` }}
          >
            A glimpse into the artistry of movement — captured at golden hour among classical columns
          </p>
        </FadeInSection>

        {/* Masonry-style grid */}
        <div className="columns-2 lg:columns-3 gap-4 lg:gap-6">
          {galleryItems.map((item, i) => (
            <FadeInSection key={i} delay={i * 0.06}>
              <div
                className={`${item.aspect} mb-4 lg:mb-6 overflow-hidden group relative`}
                style={{ backgroundColor: `${CHARCOAL}08` }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CONTACT
   ───────────────────────────────────────────── */

function ContactSection() {
  const [toast, setToast] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputStyles: React.CSSProperties = {
    backgroundColor: "transparent",
    borderBottom: `1px solid ${CHARCOAL}22`,
    color: CHARCOAL,
    outline: "none",
  };

  return (
    <section
      id="contact"
      className="relative py-24 lg:py-36"
      style={{ backgroundColor: CREAM }}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <FadeInSection>
          <p
            className="font-[family-name:var(--font-inter)] text-[11px] tracking-[0.25em] uppercase mb-4"
            style={{ color: TERRACOTTA }}
          >
            Contact
          </p>
          <h2
            className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-medium mb-16 lg:mb-24 leading-tight"
            style={{ color: CHARCOAL }}
          >
            Let&apos;s Move
            <br />
            Together
          </h2>
        </FadeInSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20">
          {/* Form */}
          <FadeInSection className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="font-[family-name:var(--font-inter)] text-[11px] tracking-[0.2em] uppercase block mb-3"
                  style={{ color: `${CHARCOAL}88` }}
                >
                  Name *
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  value={formData.name || ""}
                  onChange={handleChange}
                  className="font-[family-name:var(--font-inter)] text-base w-full py-3 transition-colors duration-300 focus:border-b-[#C47248]"
                  style={inputStyles}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderBottomColor = TERRACOTTA)
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderBottomColor = `${CHARCOAL}22`)
                  }
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="font-[family-name:var(--font-inter)] text-[11px] tracking-[0.2em] uppercase block mb-3"
                  style={{ color: `${CHARCOAL}88` }}
                >
                  Email *
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email || ""}
                  onChange={handleChange}
                  className="font-[family-name:var(--font-inter)] text-base w-full py-3 transition-colors duration-300"
                  style={inputStyles}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderBottomColor = TERRACOTTA)
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderBottomColor = `${CHARCOAL}22`)
                  }
                />
              </div>

              {/* Lesson Type */}
              <div>
                <label
                  htmlFor="contact-lessonType"
                  className="font-[family-name:var(--font-inter)] text-[11px] tracking-[0.2em] uppercase block mb-3"
                  style={{ color: `${CHARCOAL}88` }}
                >
                  Lesson Type *
                </label>
                <select
                  id="contact-lessonType"
                  name="lessonType"
                  required
                  value={formData.lessonType || ""}
                  onChange={handleChange}
                  className="font-[family-name:var(--font-inter)] text-base w-full py-3 transition-colors duration-300 appearance-none cursor-pointer"
                  style={{
                    ...inputStyles,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%232D2A26' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 4px center",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderBottomColor = TERRACOTTA)
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderBottomColor = `${CHARCOAL}22`)
                  }
                >
                  <option value="">Select a lesson type</option>
                  {siteContent.contactFields
                    .find((f) => f.name === "lessonType")
                    ?.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                </select>
              </div>

              {/* Preferred Schedule */}
              <div>
                <label
                  htmlFor="contact-schedule"
                  className="font-[family-name:var(--font-inter)] text-[11px] tracking-[0.2em] uppercase block mb-3"
                  style={{ color: `${CHARCOAL}88` }}
                >
                  Preferred Schedule
                </label>
                <input
                  id="contact-schedule"
                  name="schedule"
                  type="text"
                  value={formData.schedule || ""}
                  onChange={handleChange}
                  placeholder="e.g. Weekday evenings, Saturday mornings"
                  className="font-[family-name:var(--font-inter)] text-base w-full py-3 transition-colors duration-300 placeholder:text-[#2D2A2633]"
                  style={inputStyles}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderBottomColor = TERRACOTTA)
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderBottomColor = `${CHARCOAL}22`)
                  }
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="font-[family-name:var(--font-inter)] text-[11px] tracking-[0.2em] uppercase block mb-3"
                  style={{ color: `${CHARCOAL}88` }}
                >
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message || ""}
                  onChange={handleChange}
                  className="font-[family-name:var(--font-inter)] text-base w-full py-3 transition-colors duration-300 resize-none"
                  style={inputStyles}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderBottomColor = TERRACOTTA)
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderBottomColor = `${CHARCOAL}22`)
                  }
                />
              </div>

              {/* Submit */}
              <div className="mt-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="font-[family-name:var(--font-inter)] text-[12px] tracking-[0.18em] uppercase px-12 py-4 transition-colors duration-300 cursor-pointer"
                  style={{
                    backgroundColor: TERRACOTTA,
                    color: CREAM,
                    border: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = SIENNA;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = TERRACOTTA;
                  }}
                >
                  Send Message
                </motion.button>
              </div>
            </form>
          </FadeInSection>

          {/* Contact info sidebar */}
          <FadeInSection className="lg:col-span-2" delay={0.2}>
            <div className="flex flex-col gap-10 lg:pt-2">
              <div>
                <p
                  className="font-[family-name:var(--font-inter)] text-[11px] tracking-[0.2em] uppercase mb-2"
                  style={{ color: `${CHARCOAL}66` }}
                >
                  Instagram
                </p>
                <a
                  href="https://instagram.com/lucymarie.s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[family-name:var(--font-playfair)] text-lg hover:opacity-60 transition-opacity"
                  style={{ color: CHARCOAL }}
                >
                  {siteContent.instagram}
                </a>
              </div>

              <div>
                <p
                  className="font-[family-name:var(--font-inter)] text-[11px] tracking-[0.2em] uppercase mb-2"
                  style={{ color: `${CHARCOAL}66` }}
                >
                  Website
                </p>
                <p
                  className="font-[family-name:var(--font-playfair)] text-lg"
                  style={{ color: CHARCOAL }}
                >
                  {siteContent.domain}
                </p>
              </div>

              <div>
                <p
                  className="font-[family-name:var(--font-inter)] text-[11px] tracking-[0.2em] uppercase mb-2"
                  style={{ color: `${CHARCOAL}66` }}
                >
                  Location
                </p>
                <p
                  className="font-[family-name:var(--font-playfair)] text-lg"
                  style={{ color: CHARCOAL }}
                >
                  {siteContent.location}
                </p>
              </div>

              {/* Decorative element */}
              <div className="mt-4">
                <div
                  className="w-12 h-[1px] mb-6"
                  style={{ backgroundColor: `${TERRACOTTA}40` }}
                />
                <p
                  className="font-[family-name:var(--font-playfair)] text-base italic leading-relaxed"
                  style={{ color: `${CHARCOAL}99` }}
                >
                  &ldquo;The body says what words cannot.&rdquo;
                  <br />
                  <span className="text-sm not-italic">
                    &mdash; Martha Graham
                  </span>
                </p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>

      {/* Toast notification */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={
          toast ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
        }
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-8 right-8 z-50 px-6 py-4 shadow-lg"
        style={{
          backgroundColor: CHARCOAL,
          color: CREAM,
          pointerEvents: toast ? "auto" : "none",
        }}
      >
        <p className="font-[family-name:var(--font-inter)] text-sm tracking-wide">
          Coming soon — form submissions are not yet active.
        </p>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
   ───────────────────────────────────────────── */

function FooterSection() {
  return (
    <footer
      className="py-12 lg:py-16 text-center"
      style={{ backgroundColor: CHARCOAL }}
    >
      <p
        className="font-[family-name:var(--font-inter)] text-[12px] tracking-[0.15em]"
        style={{ color: `${CREAM}88` }}
      >
        &copy; 2026 {siteContent.business} &mdash; {siteContent.name}
      </p>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────── */

export default function DemoAPage() {
  return (
    <main className="min-h-screen" style={{ scrollBehavior: "smooth" }}>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <CredentialsSection />
      <GallerySection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}

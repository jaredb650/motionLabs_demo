"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const styles = [
  {
    href: "/demo-a",
    name: "Warm Editorial",
    label: "Demo A",
    vibe: "Luxury editorial magazine with warmth and grace",
    gradient: "linear-gradient(135deg, #faf6f0 0%, #e8d5c0 30%, #c47248 60%, #a0522d 80%, #2d2926 100%)",
    accentText: "#c47248",
    accentBorder: "#c47248",
    bgCard: "rgba(250, 246, 240, 0.04)",
  },
  {
    href: "/demo-b",
    name: "Kinetic Brutalist",
    label: "Demo B",
    vibe: "Bold, raw, high-energy movement in its purest form",
    gradient: "linear-gradient(135deg, #f5f0eb 0%, #f5f0eb 40%, #ff4f3b 60%, #1a1a1a 100%)",
    accentText: "#ff4f3b",
    accentBorder: "#ff4f3b",
    bgCard: "rgba(255, 79, 59, 0.03)",
  },
  {
    href: "/demo-c",
    name: "Fluid & Organic",
    label: "Demo C",
    vibe: "Flowing, liquid beauty of the body in motion",
    gradient: "linear-gradient(135deg, #f8e8e0 0%, #e8c8d8 30%, #c8a8d0 60%, #d4b896 80%, #f0d8a8 100%)",
    accentText: "#d4a0c0",
    accentBorder: "#d4a0c0",
    bgCard: "rgba(212, 160, 192, 0.04)",
  },
  {
    href: "/demo-d",
    name: "Monochrome Cinematic",
    label: "Demo D",
    vibe: "Dramatic black and white with golden accents",
    gradient: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 30%, #0a0a0a 60%, #c9a84c 90%, #d4af37 100%)",
    accentText: "#d4af37",
    accentBorder: "#d4af37",
    bgCard: "rgba(212, 175, 55, 0.04)",
  },
  {
    href: "/demo-e",
    name: "Warm Cinematic",
    label: "Demo E",
    vibe: "Cinematic elegance with a warm, inviting palette",
    gradient: "linear-gradient(135deg, #FAF7F2 0%, #F5EDE4 25%, #C47248 55%, #A0522D 80%, #2D2A26 100%)",
    accentText: "#C47248",
    accentBorder: "#C47248",
    bgCard: "rgba(196, 114, 72, 0.04)",
  },
];

const smoothEase = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.4,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: smoothEase,
    },
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center px-5 py-16 sm:py-24 selection:bg-white/20">
      {/* Subtle radial glow behind content */}
      <div
        className="pointer-events-none fixed inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }}
      />

      {/* Header */}
      <motion.header
        className="relative z-10 text-center max-w-2xl mb-16 sm:mb-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: smoothEase }}
      >
        <motion.p
          className="text-xs sm:text-sm tracking-[0.3em] uppercase text-white/40 font-[family-name:var(--font-inter)] mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Lucy Marie Schmidt
        </motion.p>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-[family-name:var(--font-playfair)] font-semibold tracking-tight leading-tight"
          animate={{
            y: [0, -4, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Movement Labs
          <span className="block text-lg sm:text-xl md:text-2xl font-light text-white/50 mt-1 tracking-normal">
            — Style Demos
          </span>
        </motion.h1>

        <motion.p
          className="mt-6 text-base sm:text-lg text-white/50 font-[family-name:var(--font-inter)] font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Select a style to preview the full site
        </motion.p>

        {/* Decorative line */}
        <motion.div
          className="mx-auto mt-8 h-px w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        />
      </motion.header>

      {/* Cards Grid */}
      <motion.div
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 w-full max-w-3xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {styles.map((style) => (
          <motion.div key={style.href} variants={cardVariants}>
            <Link href={style.href} className="block group">
              <motion.div
                className="relative overflow-hidden rounded-2xl border border-white/[0.06] p-6 sm:p-7 h-full"
                style={{ backgroundColor: style.bgCard }}
                whileHover={{
                  scale: 1.03,
                  borderColor: `${style.accentBorder}33`,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Hover glow effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${style.accentBorder}08 0%, transparent 70%)`,
                  }}
                />

                {/* Label */}
                <p
                  className="text-[10px] sm:text-xs tracking-[0.25em] uppercase font-[family-name:var(--font-inter)] mb-3 transition-colors duration-300"
                  style={{ color: `${style.accentText}99` }}
                >
                  {style.label}
                </p>

                {/* Style Name */}
                <h2
                  className="text-xl sm:text-2xl font-[family-name:var(--font-playfair)] font-semibold mb-2 transition-colors duration-300 group-hover:translate-x-0.5"
                  style={{ color: style.accentText }}
                >
                  {style.name}
                </h2>

                {/* Vibe */}
                <p className="text-sm text-white/40 font-[family-name:var(--font-inter)] font-light leading-relaxed mb-5">
                  {style.vibe}
                </p>

                {/* Color Swatch */}
                <div
                  className="h-12 sm:h-14 w-full rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
                  style={{ background: style.gradient }}
                />

                {/* Arrow indicator */}
                <div className="mt-4 flex items-center gap-1.5 text-white/25 group-hover:text-white/50 transition-all duration-300">
                  <span className="text-xs font-[family-name:var(--font-inter)] tracking-wide">
                    Preview
                  </span>
                  <svg
                    className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="relative z-10 mt-16 sm:mt-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <p className="text-xs text-white/20 font-[family-name:var(--font-inter)] tracking-wide">
          Movement Labs Berlin &middot; Dance &middot; Body &middot; Expression
        </p>
      </motion.footer>
    </div>
  );
}

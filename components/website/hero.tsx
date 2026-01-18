"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Info } from "lucide-react";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "backOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/videos/hero.mov" type="video/mp4" />
          {/* Fallback image if video doesn't load */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-gray-900 to-cyan-950" />
        </video>
        
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/70 via-gray-900/50 to-gray-950/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-cyan-900/20" />
        
        {/* Animated Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        
        {/* Animated Glow Effects */}
        <div className="absolute top-1/4 -left-20 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-purple-600/20 to-transparent blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 h-72 w-72 animate-pulse rounded-full bg-gradient-to-l from-cyan-600/20 to-transparent blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto w-full max-w-6xl text-center"
        >
          {/* Badge / Tag */}
          <motion.div variants={itemVariants as Variants} className="mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 px-4 py-2 backdrop-blur-sm">
              <div className="h-2 w-2 animate-ping rounded-full bg-green-500" />
              <span className="text-sm font-medium text-green-400">
                • LIVE • 10,000+ Active Players
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants as Variants}
            className="mb-6 bg-gradient-to-r from-white via-cyan-100 to-purple-100 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
          >
            Play Smart.
            <span className="block">Win{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Coins</span>
                <span className="absolute inset-0 z-0 animate-pulse bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent blur-xl">
                  Coins
                </span>
              </span>
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants as Variants}
            className="mx-auto mb-10 max-w-2xl text-lg text-gray-300 sm:text-xl md:text-2xl"
          >
            Fast-paced prediction games —{" "}
            <span className="font-semibold text-cyan-400">Color</span>,{" "}
            <span className="font-semibold text-purple-400">Number</span>,{" "}
            <span className="font-semibold text-yellow-400">Spin</span> &{" "}
            <span className="font-semibold text-green-400">Dice</span>
          </motion.p>

          {/* Stats Bar */}
          <motion.div
            variants={itemVariants as Variants}
            className="mx-auto mb-12 max-w-3xl"
          >
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: "₹10K+", label: "Daily Winnings" },
                { value: "99.8%", label: "Uptime" },
                { value: "<1s", label: "Payout Speed" },
                { value: "50K+", label: "Players" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-800/50 bg-gray-900/30 p-4 backdrop-blur-sm"
                >
                  <div className="text-2xl font-bold text-white sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400 sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action Buttons */}
          <motion.div
            variants={buttonVariants as Variants}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              className="group relative gap-3 overflow-hidden bg-gradient-to-r from-purple-600 to-cyan-500 px-8 py-6 text-lg font-bold text-white shadow-2xl shadow-purple-500/25 transition-all duration-300 hover:scale-105 hover:shadow-3xl hover:shadow-purple-500/40"
              asChild
            >
              <a href="/games">
                <Play className="h-5 w-5" />
                Play Now
                {/* Button glow effect */}
                <div className="absolute inset-0 -z-10 animate-pulse bg-gradient-to-r from-purple-600 to-cyan-500 blur-xl opacity-50" />
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="group gap-3 border-2 border-gray-700 bg-gray-900/30 px-8 py-6 text-lg font-medium text-gray-300 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-gray-600 hover:bg-gray-800/50 hover:text-white"
              asChild
            >
              <a href="/how-it-works">
                <Info className="h-5 w-5" />
                How It Works
              </a>
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={itemVariants as Variants}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400"
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>Secure Transactions</span>
            </div>
            <div className="hidden sm:block">•</div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span>Instant Withdrawals</span>
            </div>
            <div className="hidden sm:block">•</div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
              <span>Provably Fair</span>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants as Variants}
            className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-gray-500">Scroll to explore</span>
              <div className="h-6 w-px bg-gradient-to-b from-cyan-500 to-transparent" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/4 top-1/3 hidden h-4 w-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 blur-sm md:block"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute right-1/4 bottom-1/3 hidden h-3 w-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 blur-sm md:block"
      />
    </section>
  );
}
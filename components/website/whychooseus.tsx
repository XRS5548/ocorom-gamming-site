"use client";

import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, CheckCircle2 } from "lucide-react";
import {
  Zap,
  Shield,
  Smartphone,
  Clock,
  TrendingUp,
  Gamepad2,
  Users,
  Award,
  Globe,
  Lock,
  Bolt,
} from "lucide-react";

const features = [
  {
    id: 1,
    title: "Fast Rounds",
    description: "60-second games with instant results",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
    gradient: "bg-gradient-to-br from-yellow-900/20 to-orange-900/20",
    stat: "<1 min",
    statLabel: "per round",
    delay: 0.1,
  },
  {
    id: 2,
    title: "Fair Result System",
    description: "Provably fair algorithms for every game",
    icon: Shield,
    color: "from-green-500 to-emerald-500",
    gradient: "bg-gradient-to-br from-green-900/20 to-emerald-900/20",
    stat: "100%",
    statLabel: "verifiable",
    delay: 0.2,
  },
  {
    id: 3,
    title: "Smooth Gameplay",
    description: "No lag, no delays, just pure gaming",
    icon: Gamepad2,
    color: "from-purple-500 to-pink-500",
    gradient: "bg-gradient-to-br from-purple-900/20 to-pink-900/20",
    stat: "60 FPS",
    statLabel: "smooth",
    delay: 0.3,
  },
  {
    id: 4,
    title: "Secure Platform",
    description: "Bank-level encryption and security",
    icon: Lock,
    color: "from-blue-500 to-cyan-500",
    gradient: "bg-gradient-to-br from-blue-900/20 to-cyan-900/20",
    stat: "256-bit",
    statLabel: "encryption",
    delay: 0.4,
  },
  {
    id: 5,
    title: "Mobile Friendly",
    description: "Play anywhere on any device",
    icon: Smartphone,
    color: "from-indigo-500 to-purple-500",
    gradient: "bg-gradient-to-br from-indigo-900/20 to-purple-900/20",
    stat: "100%",
    statLabel: "responsive",
    delay: 0.5,
  },
  {
    id: 6,
    title: "24/7 Availability",
    description: "Round-the-clock gaming action",
    icon: Clock,
    color: "from-cyan-500 to-blue-500",
    gradient: "bg-gradient-to-br from-cyan-900/20 to-blue-900/20",
    stat: "24/7",
    statLabel: "support",
    delay: 0.6,
  },
];

const stats = [
  { label: "Active Players", value: "50K+", icon: Users },
  { label: "Games Played", value: "10M+", icon: TrendingUp },
  { label: "Payout Rate", value: "98.5%", icon: Award },
  { label: "Countries", value: "100+", icon: Globe },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const iconHoverVariants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.1,
    rotate: [0, -5, 5, -5, 0],
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    }
  },
};

const cardHoverVariants = {
  rest: {
    y: 0,
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
  },
  hover: {
    y: -8,
    boxShadow: "0px 20px 40px rgba(139, 92, 246, 0.25)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export default function WhyChooseUsSection() {
  return (
    <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-950">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-purple-600/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-gradient-to-l from-cyan-600/10 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge
            variant="outline"
            className="mb-6 border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 px-4 py-2 backdrop-blur-sm"
          >
            <Sparkles className="mr-2 h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium text-purple-300">
              PREMIUM EXPERIENCE
            </span>
          </Badge>

          <h2 className="bg-gradient-to-r from-white via-cyan-100 to-purple-100 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl mb-4">
            Why Choose Ocorom
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-gray-400 sm:text-xl">
            Built for speed, fairness, and fun
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/30 p-6 backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-white sm:text-3xl">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                    <Icon className="h-8 w-8 text-gray-600 group-hover:text-gray-500 transition-colors duration-300" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial="rest"
                whileHover="hover"
                variants={cardHoverVariants as Variants}
                custom={feature.delay}
              >
                <Card className="group relative h-full overflow-hidden border border-gray-800 bg-gray-900/40 backdrop-blur-sm transition-all duration-300">
                  {/* Animated Gradient Border */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-gray-900 to-gray-900 p-px">
                    <div
                      className={`absolute inset-0 rounded-lg bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                  </div>

                  {/* Glow Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`}
                  />

                  <CardContent className="relative p-6">
                    {/* Icon with Animation */}
                    <motion.div
                      className="mb-4"
                      variants={iconHoverVariants as Variants}
                      whileHover="hover"
                    >
                      <div
                        className={`relative inline-flex items-center justify-center rounded-xl ${feature.gradient} p-3`}
                      >
                        <div
                          className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.color} opacity-20 blur-sm`}
                        />
                        
                        {/* Animated Ring */}
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute inset-0 rounded-xl border border-gray-600/20"
                        />
                        
                        <Icon className={`h-6 w-6 `} />
                      </div>
                    </motion.div>

                    {/* Feature Title */}
                    <h3 className="mb-2 text-lg font-bold text-white">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="mb-4 text-sm text-gray-400">
                      {feature.description}
                    </p>

                    {/* Stat Badge */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3 text-green-400" />
                        <span className="text-xs text-gray-500">
                          Available now
                        </span>
                      </div>
                      
                      <div className="rounded-full bg-gray-800/50 px-3 py-1 backdrop-blur-sm">
                        <span className="text-xs font-bold text-white">
                          {feature.stat}
                        </span>
                        <span className="ml-1 text-xs text-gray-400">
                          {feature.statLabel}
                        </span>
                      </div>
                    </div>

                    {/* Hover Indicator */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Bolt className="h-4 w-4 text-yellow-400" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust & Security Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="relative overflow-hidden border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-transparent to-cyan-600/20" />
            </div>

            <CardContent className="relative p-8">
              <div className="mx-auto max-w-4xl">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="mb-4 text-2xl font-bold text-white">
                      Trust & Security First
                    </h3>
                    <p className="mb-6 text-gray-400">
                      We prioritize your security and gaming experience with
                      state-of-the-art technology and fair play guarantees.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "SSL-encrypted transactions",
                        "Two-factor authentication",
                        "Regular security audits",
                        "Provably fair algorithms",
                        "Instant withdrawal processing",
                        "24/7 customer support",
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          viewport={{ once: true }}
                          className="flex items-center gap-3"
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                          <span className="text-sm text-gray-300">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-gray-800 bg-gray-900/30 p-6">
                    <h4 className="mb-4 text-lg font-bold text-white">
                      Platform Highlights
                    </h4>
                    <div className="space-y-4">
                      {[
                        { label: "Uptime", value: "99.9%", color: "text-green-400" },
                        { label: "Response Time", value: "< 2s", color: "text-blue-400" },
                        { label: "Payout Speed", value: "Instant", color: "text-purple-400" },
                        { label: "Support Response", value: "< 5 min", color: "text-cyan-400" },
                      ].map((highlight, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center justify-between rounded-lg bg-gray-800/30 px-4 py-3"
                        >
                          <span className="text-sm text-gray-400">
                            {highlight.label}
                          </span>
                          <span className={`font-bold ${highlight.color}`}>
                            {highlight.value}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-800 bg-gray-900/30 px-6 py-3 backdrop-blur-sm">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span className="text-sm text-gray-300">
              Join <span className="font-bold text-white">50,000+</span> players
              worldwide
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
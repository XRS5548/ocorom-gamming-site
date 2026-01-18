"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Users, Gamepad2, Zap, Star, TrendingUp } from "lucide-react";
import Counter from "../ui/counter";

// Custom Counter Component (create this separately)
const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {value.toLocaleString()}
      {suffix}
    </motion.span>
  );
};

const stats = [
  {
    id: 1,
    title: "Players",
    icon: Users,
    value: 50000,
    suffix: "+",
    color: "from-purple-500 to-pink-500",
    gradient: "bg-gradient-to-br from-purple-900/20 to-pink-900/20",
    description: "Active users worldwide",
    rate: "+2K weekly",
  },
  {
    id: 2,
    title: "Games Available",
    icon: Gamepad2,
    value: 4,
    suffix: "",
    color: "from-cyan-500 to-blue-500",
    gradient: "bg-gradient-to-br from-cyan-900/20 to-blue-900/20",
    description: "Fast-paced prediction games",
    rate: "+1 coming soon",
  },
  {
    id: 3,
    title: "Rounds Played",
    icon: Zap,
    value: 1000000,
    suffix: "+",
    color: "from-yellow-500 to-orange-500",
    gradient: "bg-gradient-to-br from-yellow-900/20 to-orange-900/20",
    description: "Total games completed",
    rate: "+50K daily",
  },
  {
    id: 4,
    title: "User Rating",
    icon: Star,
    value: 4.9,
    suffix: "",
    color: "from-green-500 to-emerald-500",
    gradient: "bg-gradient-to-br from-green-900/20 to-emerald-900/20",
    description: "Average platform rating",
    rate: "Out of 5.0",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const numberVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "backOut",
    },
  },
};

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section 
      ref={ref}
      className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-purple-600/10 to-transparent blur-3xl" />
        <div className="absolute top-1/2 right-1/4 h-96 w-96 rounded-full bg-gradient-to-l from-cyan-600/10 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        
        {/* Animated Particles */}
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.sin(i) * 10, 0],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
            className={`absolute h-1 w-1 rounded-full ${
              i % 2 === 0 ? "bg-purple-400/30" : "bg-cyan-400/30"
            }`}
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <Badge
            variant="outline"
            className="mb-6 border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 px-4 py-2 backdrop-blur-sm"
          >
            <Sparkles className="mr-2 h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium text-purple-300">
              BY THE NUMBERS
            </span>
          </Badge>

          <h2 className="bg-gradient-to-r from-white via-cyan-100 to-purple-100 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl mb-4">
            Our Platform in Numbers
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-gray-400 sm:text-xl">
            Real-time stats that define our gaming excellence
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            
            return (
              <motion.div
                key={stat.id}
                variants={itemVariants as Variants}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="group relative h-full overflow-hidden border border-gray-800/50 bg-gray-900/30 backdrop-blur-sm transition-all duration-300 hover:border-gray-700">
                  {/* Animated Gradient Border */}
                  <motion.div
                    className="absolute inset-0 rounded-lg p-px"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-gray-900 to-gray-900">
                      <div
                        className={`absolute inset-0 rounded-lg bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      />
                    </div>
                  </motion.div>

                  <CardContent className="relative p-8">
                    {/* Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.3 + index * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className={`mb-6 inline-flex items-center justify-center rounded-xl ${stat.gradient} p-4`}
                    >
                      <div
                        className={`absolute inset-0 rounded-xl bg-gradient-to-br ${stat.color} opacity-20 blur-sm`}
                      />
                      
                      {/* Animated Ring */}
                      <motion.div
                        animate={isInView ? { 
                          scale: [1, 1.2, 1],
                          opacity: [0.2, 0.5, 0.2],
                        } : {}}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.2,
                        }}
                        className="absolute inset-0 rounded-xl border border-gray-600/20"
                      />
                      
                      <Icon className={`h-8 w-8 `} />
                    </motion.div>

                    {/* Animated Number */}
                    <motion.div
                      variants={numberVariants as Variants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      className="mb-2"
                    >
                      <div className="text-4xl font-bold tracking-tight sm:text-5xl">
                        <span className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                          {isInView ? (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5 }}
                            >
                              <Counter 
                                from={0} 
                                to={stat.value} 
                                duration={2} 
                                delay={index * 0.2}
                              />
                              {stat.suffix}
                            </motion.span>
                          ) : (
                            "0" + stat.suffix
                          )}
                        </span>
                      </div>
                    </motion.div>

                    {/* Title */}
                    <h3 className="mb-2 text-lg font-semibold text-white">
                      {stat.title}
                    </h3>

                    {/* Description */}
                    <p className="mb-4 text-sm text-gray-400">
                      {stat.description}
                    </p>

                    {/* Rate Indicator */}
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-xs font-medium text-green-400">
                        {stat.rate}
                      </span>
                    </div>

                    {/* Animated Bar */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: "100%" } : {}}
                      transition={{ 
                        duration: 1.5, 
                        delay: 0.8 + index * 0.1,
                        ease: "easeOut",
                      }}
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-20"
                      style={{ 
                        backgroundImage: `linear-gradient(to right, transparent, var(--tw-gradient-stops))`,
                      }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16"
        >
          <Card className="border border-gray-800/50 bg-gray-900/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { label: "Avg. Payout", value: "98.5%", color: "text-green-400" },
                  { label: "Uptime", value: "99.9%", color: "text-blue-400" },
                  { label: "Response Time", value: "< 2s", color: "text-purple-400" },
                  { label: "Support", value: "24/7", color: "text-cyan-400" },
                ].map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className={`text-2xl font-bold sm:text-3xl ${metric.color}`}>
                      {metric.value}
                    </div>
                    <div className="text-sm text-gray-400">{metric.label}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Live Activity Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-gray-800/50 bg-gray-900/30 px-6 py-3 backdrop-blur-sm">
            <div className="relative">
              <div className="h-2 w-2 animate-ping rounded-full bg-green-500" />
              <div className="absolute top-0 h-2 w-2 rounded-full bg-green-500" />
            </div>
            <span className="text-sm text-gray-300">
              <span className="font-bold text-white">1,250</span> players online now
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import * as LucideIcons from "lucide-react";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  UserPlus,
  Coins,
  Gamepad2,
  Trophy,
  Zap,
  Clock,
  Shield,
  TrendingUp
} from "lucide-react";

const steps = [
  {
    id: 1,
    number: "01",
    title: "Create Account",
    icon: UserPlus,
    description: "Sign up in seconds with email or social login",
    time: "30 seconds",
    color: "from-purple-500 to-pink-500",
    gradient: "bg-gradient-to-br from-purple-900/20 to-pink-900/20",
    features: ["No verification needed", "Instant access", "Free account"],
  },
  {
    id: 2,
    number: "02",
    title: "Add Coins",
    icon: Coins,
    description: "Get virtual coins to start playing immediately",
    time: "Instant",
    color: "from-cyan-500 to-blue-500",
    gradient: "bg-gradient-to-br from-cyan-900/20 to-blue-900/20",
    features: ["Multiple payment options", "Instant deposit", "Bonus coins"],
  },
  {
    id: 3,
    number: "03",
    title: "Play Games",
    icon: Gamepad2,
    description: "Choose from 4+ fast-paced prediction games",
    time: "Live",
    color: "from-yellow-500 to-orange-500",
    gradient: "bg-gradient-to-br from-yellow-900/20 to-orange-900/20",
    features: ["Real-time gameplay", "Simple rules", "Any time, anywhere"],
  },
  {
    id: 4,
    number: "04",
    title: "Win Rewards",
    icon: Trophy,
    description: "Earn more coins and climb the leaderboards",
    time: "Instant Payout",
    color: "from-green-500 to-emerald-500",
    gradient: "bg-gradient-to-br from-green-900/20 to-emerald-900/20",
    features: ["Instant withdrawals", "Daily bonuses", "VIP rewards"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

const cardHoverVariants = {
  rest: {
    y: 0,
    scale: 1,
  },
  hover: {
    y: -5,
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

export default function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-purple-600/5 to-transparent blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-gradient-to-l from-cyan-600/5 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        
        {/* Animated Lines */}
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent lg:block" />
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
              SIMPLE & FAST
            </span>
          </Badge>

          <h2 className="bg-gradient-to-r from-white via-cyan-100 to-purple-100 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl mb-4">
            How It Works
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-gray-400 sm:text-xl">
            Start playing in just 4 simple steps
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step, index) => {
            const IconComponent = step.icon; // Fixed: Use as React component
            const isLast = index === steps.length - 1;
            
            return (
              <div key={step.id} className="relative">
                {/* Connector Lines */}
                {!isLast && (
                  <div className="absolute -right-4 top-12 hidden h-px w-8 bg-gradient-to-r from-gray-700 to-transparent lg:block" />
                )}
                
                {/* Animated Arrow */}
                {!isLast && (
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5,
                    }}
                    className="absolute -right-8 top-10 hidden lg:block"
                  >
                    <ArrowRight className="h-6 w-6 text-gray-600" />
                  </motion.div>
                )}

                <motion.div
                  initial="rest"
                  whileHover="hover"
                  variants={cardHoverVariants as Variants}
                >
                  <Card className="group relative h-full overflow-hidden border border-gray-800 bg-gray-900/40 backdrop-blur-sm">
                    {/* Glow Effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500`}
                    />

                    <CardContent className="p-6">
                      {/* Step Number Badge */}
                      <div className="mb-6 flex items-start justify-between">
                        <Badge
                          variant="secondary"
                          className={`bg-gradient-to-br ${step.gradient} border-0 px-3 py-1 text-sm font-bold text-white`}
                        >
                          {step.number}
                        </Badge>
                        
                        {/* Time Badge */}
                        <div className="flex items-center gap-1 rounded-full bg-gray-800/50 px-3 py-1 backdrop-blur-sm">
                          <Clock className="h-3 w-3 text-cyan-400" />
                          <span className="text-xs font-medium text-gray-300">
                            {step.time}
                          </span>
                        </div>
                      </div>

                      {/* Icon Container */}
                      <div className="mb-6 flex justify-center">
                        <div
                          className={`relative flex h-20 w-20 items-center justify-center rounded-2xl ${step.gradient} p-4`}
                        >
                          <div
                            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-20 blur-sm`}
                          />
                          <IconComponent 
                            className={`h-10 w-10`} 
                          />
                          
                          {/* Animated Ring */}
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="absolute inset-0 rounded-2xl border-2 border-gray-600/20"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="mb-3 text-center text-xl font-bold text-white">
                        {step.title}
                      </h3>
                      
                      <p className="mb-6 text-center text-sm text-gray-400">
                        {step.description}
                      </p>

                      {/* Features List */}
                      <div className="space-y-2">
                        {step.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 rounded-lg bg-gray-800/30 px-3 py-2"
                          >
                            <CheckCircle2 className="h-3 w-3 text-green-400" />
                            <span className="text-xs text-gray-300">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>

                    {/* Step Indicator */}
                    <div className="absolute bottom-4 right-4">
                      <div className="flex items-center gap-1">
                        <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                        <span className="text-xs text-gray-500">Step {index + 1}</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        {/* Process Flow Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 hidden lg:block"
        >
          <div className="relative mx-auto max-w-4xl">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="relative flex flex-col items-center">
                  <div className="relative">
                    <div className="h-4 w-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500" />
                    {num < 4 && (
                      <div className="absolute top-1/2 left-4 h-px w-32 bg-gradient-to-r from-gray-700 to-gray-800" />
                    )}
                  </div>
                  <span className="mt-2 text-xs text-gray-500">Step {num}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="relative overflow-hidden border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="mx-auto max-w-3xl">
                <div className="mb-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <div className="flex items-center gap-3">
                    <Zap className="h-6 w-6 text-yellow-400" />
                    <h3 className="text-xl font-bold text-white">
                      Ready to Start?
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-gray-400">Secure Platform</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-gray-400">High Payouts</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-lg bg-gray-800/30 p-4">
                    <div className="text-2xl font-bold text-white">30s</div>
                    <div className="text-sm text-gray-400">Signup Time</div>
                  </div>
                  
                  <div className="rounded-lg bg-gray-800/30 p-4">
                    <div className="text-2xl font-bold text-white">99.9%</div>
                    <div className="text-sm text-gray-400">Uptime</div>
                  </div>
                  
                  <div className="rounded-lg bg-gray-800/30 p-4">
                    <div className="text-2xl font-bold text-white">Instant</div>
                    <div className="text-sm text-gray-400">Payouts</div>
                  </div>
                </div>

                <p className="mt-6 text-gray-400">
                  Join thousands of players already winning on ocorom
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
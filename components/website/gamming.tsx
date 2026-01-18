"use client";

import { motion, Variants } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  Sparkles, 
  ChevronRight,
  Palette,
  Hash,
  CircleSlash2,
  Dice5,
  TrendingUp,
  Zap,
  Crown,
  Target,
  Circle
} from "lucide-react";

// Game data with icon components
const games = [
  {
    id: 1,
    name: "Color Prediction",
    slug: "color-prediction",
    icon: Palette, // This is now a proper component reference
    color: "from-purple-500 to-pink-500",
    borderColor: "border-purple-500/30",
    description: "Predict the next color and win big",
    players: "2.5k+ playing",
    winRate: "98% payout",
    difficulty: "Easy",
    gradient: "bg-gradient-to-br from-purple-900/20 to-pink-900/20",
  },
  {
    id: 2,
    name: "Number Prediction",
    slug: "number-prediction",
    icon: Hash, // This is now a proper component reference
    color: "from-cyan-500 to-blue-500",
    borderColor: "border-cyan-500/30",
    description: "Guess the number, multiply your coins",
    players: "1.8k+ playing",
    winRate: "95% payout",
    difficulty: "Medium",
    gradient: "bg-gradient-to-br from-cyan-900/20 to-blue-900/20",
  },
  {
    id: 3,
    name: "Spin Wheel",
    slug: "spin-wheel",
    icon: CircleSlash2, // This is now a proper component reference
    color: "from-yellow-500 to-orange-500",
    borderColor: "border-yellow-500/30",
    description: "Spin and win massive multipliers",
    players: "3.2k+ playing",
    winRate: "96% payout",
    difficulty: "Easy",
    gradient: "bg-gradient-to-br from-yellow-900/20 to-orange-900/20",
  },
  {
    id: 4,
    name: "Dice Game",
    slug: "dice-game",
    icon: Dice5, // This is now a proper component reference
    color: "from-green-500 to-emerald-500",
    borderColor: "border-green-500/30",
    description: "Roll the dice, beat the odds",
    players: "2.1k+ playing",
    winRate: "97% payout",
    difficulty: "Hard",
    gradient: "bg-gradient-to-br from-green-900/20 to-emerald-900/20",
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const hoverVariants = {
  rest: {
    y: 0,
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
  },
  hover: {
    y: -8,
    boxShadow: "0px 20px 40px rgba(139, 92, 246, 0.3)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export default function GamesListingSection() {
  return (
    <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-purple-600/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-gradient-to-l from-cyan-600/10 to-transparent blur-3xl" />
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
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 px-4 py-2 backdrop-blur-sm mb-6">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium text-purple-300">
              • LIVE GAMES •
            </span>
          </div>

          <h2 className="bg-gradient-to-r from-white via-cyan-100 to-purple-100 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl mb-4">
            Our Games
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-gray-400 sm:text-xl">
            Choose your game and start playing instantly
            <span className="block text-sm text-gray-500 mt-2">
              Instant deposits • Fast withdrawals • 24/7 support
            </span>
          </p>
        </motion.div>

        {/* Games Grid */}
        <motion.div
          variants={containerVariants as Variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {games.map((game) => {
            const IconComponent = game.icon; // Renamed for clarity
            return (
              <motion.div
                key={game.id}
                initial="rest"
                whileHover="hover"
                variants={hoverVariants as Variants}
              >
                <Card
                  className={`group relative overflow-hidden border ${game.borderColor} bg-gray-900/50 backdrop-blur-sm transition-all duration-300`}
                >
                  {/* Glow Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`}
                  />

                  {/* Top Badge */}
                  <div className="absolute right-4 top-4 z-10">
                    <div className="flex items-center gap-1 rounded-full bg-gray-900/90 px-3 py-1 backdrop-blur-sm">
                      <Zap className="h-3 w-3 text-yellow-400" />
                      <span className="text-xs font-medium text-white">
                        {game.difficulty}
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    {/* Game Icon */}
                    <div className="mb-6">
                      <div
                        className={`relative inline-flex items-center justify-center rounded-2xl ${game.gradient} p-4`}
                      >
                        <div
                          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${game.color} opacity-20 blur-sm`}
                        />
                        {/* Use IconComponent properly */}
                        <IconComponent
                          className={`h-10 w-10 bg-gradient-to-br ${game.color} bg-clip-text fill-transparent`}
                        />
                      </div>
                    </div>

                    {/* Game Name */}
                    <h3 className="mb-2 text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text">
                      {game.name}
                    </h3>

                    {/* Description */}
                    <p className="mb-4 text-sm text-gray-400">
                      {game.description}
                    </p>

                    {/* Stats */}
                    <div className="mb-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-xs text-gray-400">Players</span>
                        </div>
                        <span className="text-sm font-medium text-green-400">
                          {game.players}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-3 w-3 text-blue-400" />
                          <span className="text-xs text-gray-400">
                            Win Rate
                          </span>
                        </div>
                        <span className="text-sm font-medium text-blue-400">
                          {game.winRate}
                        </span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-6 pt-0">
                    <Button
                      className={`group/btn w-full gap-2 bg-gradient-to-r ${game.color} border-0 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                      size="lg"
                      asChild
                    >
                      <a href={`/games/${game.slug}`}>
                        <Play className="h-4 w-4" />
                        Play Now
                        <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300" />
                      </a>
                    </Button>
                  </CardFooter>

                  {/* Active Players Pulse */}
                  <div className="absolute bottom-20 right-6">
                    <div className="relative">
                      <div className="absolute h-2 w-2 animate-ping rounded-full bg-green-500" />
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col items-center gap-4 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-900/30 p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <Crown className="h-6 w-6 text-yellow-400" />
              <h3 className="text-xl font-bold text-white">
                Want higher limits?
              </h3>
            </div>
            <p className="text-gray-400 max-w-md">
              Unlock VIP features, higher betting limits, and exclusive bonuses
              with our premium membership.
            </p>
            <Button
              variant="outline"
              className="gap-2 border-gray-700 text-gray-300 hover:border-gray-600 hover:bg-gray-800 hover:text-white"
              size="lg"
              asChild
            >
              <a href="/vip">
                <Target className="h-4 w-4" />
                Upgrade to VIP
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
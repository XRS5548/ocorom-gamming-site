// app/not-found.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gamepad2, Home, Sparkles, Clock, AlertTriangle, PartyPopper } from "lucide-react";

export default function NotFoundPage() {
  const [countdown, setCountdown] = useState(30); // 30 days countdown example

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 86400000); // Decrease by 1 day each real day

    return () => clearInterval(timer);
  }, []);

  // Floating animation variants for 404 text
  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Stagger fade-up animation for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonHoverVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/30 to-gray-900 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500/30 rounded-full"
            initial={{
              x: Math.random() * 100 + "vw",
              y: Math.random() * 100 + "vh",
            }}
            animate={{
              y: [null, -30, 30, 0],
              x: [null, 20, -20, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Glowing Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />

      {/* Gaming Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl w-full text-center"
        >
          {/* Logo */}
          <motion.div variants={itemVariants as Variants} className="flex items-center justify-center gap-3 mb-8">
            
            <img src="/logo.png" alt="logo " width={150} />
          </motion.div>

          {/* 404 Text with Floating Animation */}
          <motion.div
            variants={floatingVariants as Variants}
            initial="initial"
            animate="animate"
            className="relative mb-8"
          >
            <div className="relative inline-block">
              <h2 className="text-[180px] md:text-[240px] font-black bg-gradient-to-b from-white via-purple-100 to-purple-300 bg-clip-text text-transparent leading-none">
                404
              </h2>
              {/* Glow Effect */}
              <div className="absolute inset-0 -z-10 blur-3xl bg-gradient-to-r from-purple-500/30 to-cyan-500/30 rounded-full scale-125" />
              <Sparkles className="absolute top-4 right-4 h-8 w-8 text-yellow-400 animate-spin" style={{ animationDuration: "3s" }} />
              <Sparkles className="absolute bottom-4 left-4 h-6 w-6 text-cyan-400 animate-spin" style={{ animationDuration: "4s", animationDirection: "reverse" }} />
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div variants={itemVariants as Variants} className="mb-8">
            <Badge className="px-6 py-3 text-base bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/30">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Coming Soon 🚧
            </Badge>
          </motion.div>

          {/* Heading */}
          <motion.h3 variants={itemVariants as Variants} className="text-4xl md:text-5xl font-bold text-white mb-6">
            Page Not Found
          </motion.h3>

          {/* Subtext */}
          <motion.p variants={itemVariants as Variants} className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            This page is under development or coming soon. We&apos;re working hard to bring you something amazing!
          </motion.p>

          {/* Countdown Timer (Optional) */}
          <motion.div 
            variants={itemVariants as Variants}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-3 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl px-6 py-4">
              <Clock className="h-5 w-5 text-purple-400" />
              <span className="text-gray-300">Launching in</span>
              <div className="flex items-center gap-2">
                <div className="bg-gray-800 rounded-lg px-3 py-2 min-w-[60px]">
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {countdown}
                  </div>
                  <div className="text-xs text-gray-400">days</div>
                </div>
                <span className="text-gray-500 mx-1">:</span>
                <div className="bg-gray-800 rounded-lg px-3 py-2 min-w-[60px]">
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    23
                  </div>
                  <div className="text-xs text-gray-400">hours</div>
                </div>
                <span className="text-gray-500 mx-1">:</span>
                <div className="bg-gray-800 rounded-lg px-3 py-2 min-w-[60px]">
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    59
                  </div>
                  <div className="text-xs text-gray-400">mins</div>
                </div>
              </div>
              <PartyPopper className="h-5 w-5 text-yellow-400 ml-2" />
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            variants={itemVariants as Variants}
            className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
          >
            <motion.div variants={buttonHoverVariants} whileHover="hover" whileTap="tap">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold px-8 py-6 text-lg shadow-xl shadow-purple-500/20"
                onClick={() => window.location.href = "/"}
              >
                <Home className="h-5 w-5 mr-2" />
                Go Home
              </Button>
            </motion.div>

            <motion.div variants={buttonHoverVariants as Variants} whileHover="hover" whileTap="tap">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-gray-700 bg-gray-900/50 hover:bg-gray-800/50 hover:border-purple-500 text-white font-semibold px-8 py-6 text-lg backdrop-blur-sm"
                onClick={() => window.location.href = "/games"}
              >
                <Gamepad2 className="h-5 w-5 mr-2" />
                View Games
              </Button>
            </motion.div>
          </motion.div>

          {/* Additional Info */}
          <motion.div 
            variants={itemVariants as Variants}
            className="mt-16 pt-8 border-t border-gray-800/50"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-400 text-sm">
              <div className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-4">
                <div className="font-semibold text-gray-300 mb-1">What&apos;s Coming?</div>
                <p>Exciting new gaming features, tournaments, and rewards system.</p>
              </div>
              <div className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-4">
                <div className="font-semibold text-gray-300 mb-1">Stay Updated</div>
                <p>Follow us for launch announcements and exclusive early access.</p>
              </div>
              <div className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-4">
                <div className="font-semibold text-gray-300 mb-1">Need Help?</div>
                <p>Contact support if you believe this is an error.</p>
              </div>
            </div>
          </motion.div>

          {/* Back to top message */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-gray-500 text-sm mt-12"
          >
            The adventure continues on our main pages 🎮
          </motion.p>
        </motion.div>
      </div>

      {/* Footer Notification */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 backdrop-blur-sm border-t border-gray-800/50"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <span>This page is under active development</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>Expected launch: Q2 2024</span>
              <span className="hidden sm:inline">•</span>
              <span>Follow progress on our social media</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
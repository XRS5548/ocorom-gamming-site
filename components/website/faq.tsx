// app/components/faq.tsx
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, Variants } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";

// FAQ data type
interface FAQItem {
  id: string;
  question: string;
  answer: string;
  icon?: React.ReactNode;
}

// FAQ data
const faqData: FAQItem[] = [
  {
    id: "item-1",
    question: "Is this real money gaming?",
    answer: "No, this platform uses virtual coins for gameplay. All transactions and rewards are in virtual currency only. You can enjoy the full gaming experience without any real money involvement.",
  },
  {
    id: "item-2",
    question: "How do I get coins?",
    answer: "Coins are provided for gameplay through daily login bonuses, completing challenges, participating in tournaments, and leveling up your account. You can also earn bonus coins through special events and referrals.",
  },
  {
    id: "item-3",
    question: "Are the results fair?",
    answer: "Absolutely. All game results are generated through a controlled RNG (Random Number Generator) system that is regularly audited for fairness. Our system ensures equal opportunity for all players.",
  },
  {
    id: "item-4",
    question: "Can I play on mobile?",
    answer: "Yes, the platform is fully mobile-friendly and optimized for all devices. You can access all games and features through our responsive web app or download our mobile app from the App Store or Google Play.",
  },
  {
    id: "item-5",
    question: "Do I need any experience to play?",
    answer: "No prior experience is required. Our games are designed to be simple and beginner-friendly with intuitive controls and helpful tutorials. You can start playing and learning as you go.",
  },
  {
    id: "item-6",
    question: "Is there an age restriction?",
    answer: "Yes, you must be at least 13 years old to create an account. For certain competitive features, the minimum age is 16. Please refer to our Terms of Service for complete age requirements.",
  },
];

// Animated FAQ item component
const FAQItemComponent = ({ faq, index }: { faq: FAQItem; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <AccordionItem
        value={faq.id}
        className="border border-gray-800/50 rounded-lg px-4 mb-4 hover:border-gray-700/70 transition-colors data-[state=open]:border-purple-500/30 data-[state=open]:bg-gray-900/30"
      >
        <AccordionTrigger className="text-left hover:no-underline group py-5">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white text-lg group-hover:text-purple-300 transition-colors">
                {faq.question}
              </h3>
            </div>
            <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-purple-400" />
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-5">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10" /> {/* Spacer for alignment */}
            </div>
            <div className="flex-1">
              <div className="pl-2 border-l-2 border-purple-500/30">
                <p className="text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  );
};

export default function FAQ() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/5 via-transparent to-transparent" />
      
      <div className="max-w-4xl mx-auto relative">
        <motion.div
          ref={containerRef}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants as Variants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants as Variants} className="inline-block mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/20">
              <HelpCircle className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300 font-medium">FAQ</span>
            </div>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants as Variants}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"
          >
            Frequently Asked Questions
          </motion.h2>
          
          <motion.p 
            variants={itemVariants as Variants}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Everything you need to know before playing
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-gradient-to-br from-gray-900/40 to-gray-800/20 backdrop-blur-sm border border-gray-800/30 rounded-2xl p-6 md:p-8 shadow-2xl"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <FAQItemComponent key={faq.id} faq={faq} index={index} />
            ))}
          </Accordion>
        </motion.div>

        {/* Additional help section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-6 bg-gradient-to-r from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-800/50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-white">Still have questions?</h3>
                <p className="text-sm text-gray-400">We're here to help!</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 active:scale-95">
                Contact Support
              </button>
              <button className="px-6 py-2.5 bg-gray-800/50 text-gray-300 font-medium rounded-lg border border-gray-700 hover:bg-gray-700/50 hover:text-white transition-colors">
                View Guides
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-16 pt-8 border-t border-gray-800/50"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "24/7", label: "Support Available" },
              { value: "<5 min", label: "Avg. Response Time" },
              { value: "98%", label: "Satisfaction Rate" },
              { value: "10K+", label: "Questions Answered" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
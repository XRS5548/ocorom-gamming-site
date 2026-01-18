// app/components/testimonials.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, StarHalf, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

// Testimonial data type
interface Testimonial {
  id: number;
  name: string;
  initials: string;
  rating: number;
  review: string;
  avatar?: string;
}

// Dummy data
const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: 'Alex Chen',
    initials: 'AC',
    rating: 5,
    review: 'Best gaming community I\'ve ever been part of. The tournaments are incredibly well-organized!',
  },
  {
    id: 2,
    name: 'Sam Rivera',
    initials: 'SR',
    rating: 4.5,
    review: 'Graphics optimization guides saved my FPS. From 60 to 144 stable!',
  },
  {
    id: 3,
    name: 'Jordan Patel',
    initials: 'JP',
    rating: 5,
    review: 'Met my regular squad here. The LFG system is absolutely brilliant.',
  },
  {
    id: 4,
    name: 'Taylor Kim',
    initials: 'TK',
    rating: 4,
    review: 'Weekly challenges keep me coming back. The reward system is fair and fun.',
  },
  {
    id: 5,
    name: 'Morgan Lee',
    initials: 'ML',
    rating: 5,
    review: 'As a competitive player, the ranked system here is the most balanced I\'ve seen.',
  },
];

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
    <div className="flex gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
      ))}
      {hasHalfStar && (
        <div className="relative">
          <Star className="w-4 h-4 text-gray-300" />
          <StarHalf className="absolute top-0 left-0 w-4 h-4 fill-yellow-500 text-yellow-500" />
        </div>
      )}
      {[...Array(5 - Math.ceil(rating))].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      ))}
    </div>
  );
};

// Testimonial card component
const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      className="h-full"
    >
      <Card className="h-full bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border-gray-700/50 shadow-2xl hover:shadow-gray-900/30 transition-shadow duration-300">
        <CardContent className="p-6 h-full flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar className="border-2 border-gray-600">
                <AvatarImage src={testimonial.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                  {testimonial.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold text-white">{testimonial.name}</h4>
                <StarRating rating={testimonial.rating} />
              </div>
            </div>
          </div>
          <p className="text-gray-300 mt-4 leading-relaxed flex-grow">
            "{testimonial.review}"
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [currentIndex, setCurrentIndex] = useState(0);

  // For mobile horizontal scroll
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
      setCurrentIndex(Math.max(0, currentIndex - 1));
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      setCurrentIndex(Math.min(testimonialsData.length - 1, currentIndex + 1));
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            What Players Say
          </h2>
          <p className="text-gray-400 text-lg md:text-xl">
            Real feedback from our community
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonialsData.slice(0, 3).map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial} 
              index={index}
            />
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="lg:hidden relative">
          <div 
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonialsData.map((testimonial, index) => (
              <div key={testimonial.id} className="min-w-[85vw] sm:min-w-[400px] snap-center">
                <TestimonialCard testimonial={testimonial} index={index} />
              </div>
            ))}
          </div>
          
          {/* Scroll buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-900/80 backdrop-blur-sm p-2 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-900/80 backdrop-blur-sm p-2 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50"
            disabled={currentIndex === testimonialsData.length - 1}
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Dots indicator for mobile */}
        <div className="lg:hidden flex justify-center gap-2 mt-6">
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (scrollRef.current) {
                  scrollRef.current.scrollTo({
                    left: index * (window.innerWidth * 0.85),
                    behavior: 'smooth'
                  });
                  setCurrentIndex(index);
                }
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-white w-6' 
                  : 'bg-gray-600 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 pt-8 border-t border-gray-800/50"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '4.8/5', label: 'Average Rating' },
              { value: '10K+', label: 'Active Players' },
              { value: '500+', label: 'Tournaments' },
              { value: '99%', label: 'Satisfaction' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
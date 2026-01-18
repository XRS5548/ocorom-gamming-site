// app/games/color/page.tsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins, Timer, Trophy, TrendingUp, TrendingDown, RefreshCw, Sparkles, Target, AlertCircle, Pause, Play } from "lucide-react";

type GameColor = 'RED' | 'GREEN' | 'VIOLET';
type GameResult = 'WIN' | 'LOSS' | null;
type GamePhase = 'SELECTION' | 'COUNTDOWN' | 'RESULT';

interface RoundHistory {
  id: number;
  selectedColor: GameColor;
  resultColor: GameColor;
  result: GameResult;
  timestamp: Date;
}

const COLORS = {
  RED: {
    name: 'RED',
    bg: 'bg-red-500',
    border: 'border-red-500',
    glow: 'shadow-red-500/50',
    light: 'bg-red-400',
    dark: 'bg-red-600',
    gradient: 'from-red-500 to-red-700'
  },
  GREEN: {
    name: 'GREEN',
    bg: 'bg-green-500',
    border: 'border-green-500',
    glow: 'shadow-green-500/50',
    light: 'bg-green-400',
    dark: 'bg-green-600',
    gradient: 'from-green-500 to-green-700'
  },
  VIOLET: {
    name: 'VIOLET',
    bg: 'bg-violet-500',
    border: 'border-violet-500',
    glow: 'shadow-violet-500/50',
    light: 'bg-violet-400',
    dark: 'bg-violet-600',
    gradient: 'from-violet-500 to-violet-700'
  }
} as const;

const ROUND_TIME = 15; // Reduced from 30 to 15 seconds for faster gameplay
const SELECTION_TIME = 12; // Time for selection phase
const RESULT_TIME = 3; // Time to show results before next round
const BET_AMOUNT = 100;
const WIN_AMOUNT = 200;
const STARTING_COINS = 1000;

export default function ColorPredictionGame() {
  // Game State
  const [coins, setCoins] = useState(STARTING_COINS);
  const [timeLeft, setTimeLeft] = useState(SELECTION_TIME);
  const [phase, setPhase] = useState<GamePhase>('SELECTION');
  const [selectedColor, setSelectedColor] = useState<GameColor | null>(null);
  const [resultColor, setResultColor] = useState<GameColor | null>(null);
  const [gameResult, setGameResult] = useState<GameResult>(null);
  const [history, setHistory] = useState<RoundHistory[]>([]);
  const [roundNumber, setRoundNumber] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);
  const [lastRoundTime, setLastRoundTime] = useState<number>(Date.now());
  
  const roundRef = useRef<NodeJS.Timeout>(null);

  
  const handleRoundEnd = useCallback(() => {
    setPhase('COUNTDOWN');
  }, []);

  const generateResult = useCallback(() => {
    // Generate random result
    const colors: GameColor[] = ['RED', 'GREEN', 'VIOLET'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setResultColor(randomColor);
    
    // Calculate result
    if (selectedColor === randomColor) {
      setGameResult('WIN');
      setCoins(prev => prev + WIN_AMOUNT);
    } else {
      setGameResult('LOSS');
      setCoins(prev => Math.max(0, prev - BET_AMOUNT));
    }
    
    // Add to history
    if (selectedColor) {
      const newHistory: RoundHistory = {
        id: roundNumber,
        selectedColor,
        resultColor: randomColor,
        result: selectedColor === randomColor ? 'WIN' : 'LOSS',
        timestamp: new Date()
      };
      
      setHistory(prev => [newHistory, ...prev.slice(0, 9)]); // Keep last 10 rounds
    }
    
    setPhase('RESULT');
  }, [selectedColor, roundNumber]);
  // Handle game phase transitions
  useEffect(() => {
    if (isPaused) return;

    clearTimeout(roundRef.current!);

    switch (phase) {
      case 'SELECTION':
        roundRef.current = setTimeout(() => {
          handleRoundEnd();
        }, SELECTION_TIME * 1000);
        break;

      case 'COUNTDOWN':
        roundRef.current = setTimeout(() => {
          generateResult();
        }, 2000); // 2 second countdown before result
        break;

      case 'RESULT':
        roundRef.current = setTimeout(() => {
          startNewRound();
        }, RESULT_TIME * 1000);
        break;
    }

    return () => {
      clearTimeout(roundRef.current!);
    };
  }, [phase, isPaused]);

  // Timer for selection phase
  useEffect(() => {
    if (phase !== 'SELECTION' || isPaused) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, isPaused]);

  


  const startNewRound = useCallback(() => {
    setTimeLeft(SELECTION_TIME);
    setPhase('SELECTION');
    setSelectedColor(null);
    setResultColor(null);
    setGameResult(null);
    setRoundNumber(prev => prev + 1);
    setLastRoundTime(Date.now());
  }, []);

  const handleColorSelect = (color: GameColor) => {
    if (phase !== 'SELECTION' || selectedColor) return;
    setSelectedColor(color);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const resetGame = () => {
    setCoins(STARTING_COINS);
    setHistory([]);
    setRoundNumber(1);
    setIsPaused(false);
    startNewRound();
  };

  const toggleAutoPlay = () => {
    setAutoPlayEnabled(!autoPlayEnabled);
    if (!autoPlayEnabled && phase === 'RESULT') {
      startNewRound();
    }
  };

  // Animation variants
  const timerPulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    },
    idle: { scale: 1 }
  };

  const colorCardVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 },
    selected: { 
      scale: 1.1,
      boxShadow: "0 0 30px rgba(255,255,255,0.3)"
    }
  };

  const resultRevealVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      rotate: -180 
    },
    visible: { 
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  const winGlowVariants = {
    initial: { boxShadow: "0 0 0px rgba(74, 222, 128, 0)" },
    animate: { 
      boxShadow: [
        "0 0 0px rgba(74, 222, 128, 0)",
        "0 0 40px rgba(74, 222, 128, 0.8)",
        "0 0 0px rgba(74, 222, 128, 0)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity
      }
    }
  };

  const phaseIndicatorVariants = {
    selection: { backgroundColor: "#3B82F6" },
    countdown: { backgroundColor: "#F59E0B" },
    result: { backgroundColor: "#10B981" }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-4 md:p-8">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Color Prediction
          </h1>
          <p className="text-gray-400">Continuous Gameplay - Select colors to win!</p>
        </header>

        {/* Game Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Game Info */}
          <div className="space-y-6">
            {/* Stats Card */}
            <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Coins className="h-4 w-4" />
                      <span className="text-sm">Coins Balance</span>
                    </div>
                    <div className="text-3xl font-bold text-white flex items-center gap-2">
                      {coins.toLocaleString()}
                      <span className="text-yellow-400">🪙</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Target className="h-4 w-4" />
                      <span className="text-sm">Round #{roundNumber}</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{BET_AMOUNT} coins</div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">Game Controls</div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={togglePause}
                        className="border-gray-700 hover:border-blue-500"
                      >
                        {isPaused ? (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Resume
                          </>
                        ) : (
                          <>
                            <Pause className="h-4 w-4 mr-2" />
                            Pause
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={resetGame}
                        className="border-gray-700 hover:border-red-500"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">Auto Play</div>
                    <Button
                      size="sm"
                      variant={autoPlayEnabled ? "default" : "outline"}
                      onClick={toggleAutoPlay}
                      className={
                        autoPlayEnabled 
                          ? "bg-green-600 hover:bg-green-700" 
                          : "border-gray-700 hover:border-green-500"
                      }
                    >
                      {autoPlayEnabled ? 'ON' : 'OFF'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* History Card */}
            <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Recent Rounds
                  </h3>
                  <Badge variant="outline" className="text-xs">
                    Last 10
                  </Badge>
                </div>
                
                {history.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-500">No rounds played yet</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                    {history.map((round) => (
                      <div
                        key={round.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-sm text-gray-500">#{round.id}</div>
                          <div className={`w-8 h-8 rounded-full ${COLORS[round.selectedColor].bg}`} />
                          <div className="flex items-center gap-2">
                            <span className="text-gray-300">→</span>
                            <div className={`w-8 h-8 rounded-full ${COLORS[round.resultColor].bg}`} />
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={round.result === 'WIN' 
                              ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                              : 'bg-red-500/20 text-red-400 border-red-500/30'
                            }
                          >
                            {round.result === 'WIN' ? (
                              <Trophy className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            )}
                            {round.result}
                          </Badge>
                          <div className="text-xs text-gray-500 mt-1">
                            {round.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Next Round Countdown */}
            {phase === 'RESULT' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-gray-900/80 backdrop-blur-sm border-blue-500/30">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="text-sm text-blue-400 mb-2">Next Round Starts In</div>
                      <motion.div
                        className="text-4xl font-bold text-white font-mono"
                        animate={{
                          scale: [1, 1.1, 1],
                          transition: {
                            duration: 1,
                            repeat: Infinity
                          }
                        }}
                      >
                        {RESULT_TIME - Math.floor((Date.now() - lastRoundTime) / 1000) + 1}s
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Center Column - Game Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Game Phase Indicator */}
            <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-center md:text-left">
                    <div className="text-sm text-gray-400 mb-1 flex items-center justify-center md:justify-start gap-2">
                      <Timer className="h-4 w-4" />
                      <motion.span
                        variants={phaseIndicatorVariants}
                        animate={phase === 'SELECTION' ? 'selection' : phase === 'COUNTDOWN' ? 'countdown' : 'result'}
                        className="inline-block w-2 h-2 rounded-full"
                      />
                      {phase === 'SELECTION' ? 'SELECTION PHASE' : 
                       phase === 'COUNTDOWN' ? 'CALCULATING RESULT...' : 'RESULT PHASE'}
                    </div>
                    <motion.div
                      variants={timerPulseVariants}
                      animate={timeLeft <= 5 && phase === 'SELECTION' ? "pulse" : "idle"}
                      className="text-4xl md:text-5xl font-bold text-white font-mono"
                    >
                      {phase === 'SELECTION' ? `${timeLeft}s` :
                       phase === 'COUNTDOWN' ? '🎲' : '🎯'}
                    </motion.div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-1">Status</div>
                    <Badge
                      className={isPaused 
                        ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" 
                        : phase === 'SELECTION'
                          ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                          : phase === 'COUNTDOWN'
                            ? "bg-orange-500/20 text-orange-400 border-orange-500/30"
                            : "bg-green-500/20 text-green-400 border-green-500/30"
                      }
                    >
                      {isPaused ? 'PAUSED' : 
                       phase === 'SELECTION' ? 'SELECT NOW!' :
                       phase === 'COUNTDOWN' ? 'CALCULATING...' : 'RESULT'}
                    </Badge>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-1">Win Chance</div>
                    <div className="text-2xl font-bold text-white">33.3%</div>
                  </div>
                </div>
                
                {/* Phase Progress Bar */}
                <div className="mt-6">
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    {phase === 'SELECTION' && (
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                        initial={{ width: "100%" }}
                        animate={{ width: `${(timeLeft / SELECTION_TIME) * 100}%` }}
                        transition={{ duration: 1 }}
                      />
                    )}
                    {phase === 'COUNTDOWN' && (
                      <motion.div
                        className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"
                        animate={{
                          width: ["100%", "0%"],
                          transition: { duration: 2, ease: "linear" }
                        }}
                      />
                    )}
                    {phase === 'RESULT' && (
                      <motion.div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                        animate={{
                          width: ["100%", "0%"],
                          transition: { duration: RESULT_TIME, ease: "linear" }
                        }}
                      />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Color Selection / Result Display */}
            <AnimatePresence mode="wait">
              {phase === 'SELECTION' ? (
                <motion.div
                  key="selection"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-6 text-center">
                        Select Your Color Prediction
                        {timeLeft <= 5 && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="ml-2 text-red-400 text-sm"
                          >
                            - HURRY UP!
                          </motion.span>
                        )}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        {(Object.entries(COLORS) as [GameColor, typeof COLORS[GameColor]][]).map(([colorKey, color]) => (
                          <motion.div
                            key={colorKey}
                            variants={colorCardVariants}
                            initial="initial"
                            whileHover={phase === 'SELECTION' && !selectedColor ? "hover" : undefined}
                            whileTap={phase === 'SELECTION' && !selectedColor ? "tap" : undefined}
                            animate={selectedColor === colorKey ? "selected" : "initial"}
                            onClick={() => handleColorSelect(colorKey)}
                            className={`
                              relative cursor-pointer rounded-2xl p-6 md:p-8 transition-all duration-300
                              ${color.bg} border-2 ${color.border}
                              ${selectedColor === colorKey 
                                ? `${color.glow} shadow-2xl ring-4 ring-white/20` 
                                : 'hover:shadow-xl'
                              }
                              ${selectedColor ? 'opacity-70 cursor-default' : 'hover:opacity-90'}
                            `}
                          >
                            {/* Selection Checkmark */}
                            {selectedColor === colorKey && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-lg"
                              >
                                <Sparkles className="h-6 w-6 text-purple-600" />
                              </motion.div>
                            )}
                            
                            <div className="text-center">
                              <div className="text-4xl font-bold text-white mb-2">{colorKey}</div>
                              <div className="text-white/90">
                                {selectedColor === colorKey 
                                  ? '✅ SELECTED' 
                                  : phase === 'SELECTION' ? 'CLICK TO SELECT' : ''
                                }
                              </div>
                            </div>
                            
                            {/* Disabled Overlay */}
                            {selectedColor && selectedColor !== colorKey && (
                              <div className="absolute inset-0 bg-black/30 rounded-2xl" />
                            )}
                          </motion.div>
                        ))}
                      </div>
                      
                      {!selectedColor && (
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-center text-gray-400 mt-6"
                        >
                          Choose a color before time runs out! Auto-play continues...
                        </motion.p>
                      )}
                      
                      {selectedColor && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-center mt-6 p-4 bg-gray-800/50 rounded-xl"
                        >
                          <div className="text-lg text-white">
                            You selected <span className="font-bold">{selectedColor}</span>
                          </div>
                          <div className="text-sm text-gray-400 mt-1">
                            Waiting for other players... {timeLeft}s
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ) : phase === 'COUNTDOWN' ? (
                <motion.div
                  key="countdown"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                >
                  <Card className="bg-gray-900/80 backdrop-blur-sm border-orange-500/30">
                    <CardContent className="p-12 text-center">
                      <motion.div
                        animate={{
                          rotate: 360,
                          scale: [1, 1.2, 1],
                          transition: {
                            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                            scale: { duration: 1, repeat: Infinity }
                          }
                        }}
                        className="mb-8"
                      >
                        <div className="text-8xl">🎲</div>
                      </motion.div>
                      <h3 className="text-3xl font-bold text-orange-400 mb-4">
                        Calculating Result...
                      </h3>
                      <p className="text-gray-400">
                        The winning color is being determined
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card className={`bg-gray-900/80 backdrop-blur-sm border-gray-800 ${
                    gameResult === 'WIN' ? 'border-green-500/30' : 'border-red-500/30'
                  }`}>
                    <CardContent className="p-6">
                      <div className="text-center">
                        {/* Result Color */}
                        <motion.div
                          variants={resultRevealVariants as Variants}
                          initial="hidden"
                          animate="visible"
                          className="mb-8"
                        >
                          <div className="text-2xl font-semibold text-gray-400 mb-6">
                            Round #{roundNumber} Result
                          </div>
                          <div className={`
                            w-48 h-48 rounded-2xl mx-auto flex items-center justify-center
                            ${resultColor ? COLORS[resultColor].bg : 'bg-gray-700'} 
                            border-4 border-white/20 shadow-2xl
                          `}>
                            <motion.div
                              variants={gameResult === 'WIN' ? winGlowVariants : undefined}
                              initial="initial"
                              animate={gameResult === 'WIN' ? "animate" : undefined}
                              className="text-5xl font-bold text-white"
                            >
                              {resultColor}
                            </motion.div>
                          </div>
                        </motion.div>
                        
                        {/* Result Message */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 }}
                          className="mb-8"
                        >
                          {gameResult === 'WIN' ? (
                            <div className="space-y-4">
                              <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                🎉 VICTORY! 🎉
                              </div>
                              <div className="text-2xl text-green-300">
                                +{WIN_AMOUNT} coins won!
                              </div>
                              <div className="text-lg text-green-200">
                                You predicted correctly!
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="text-5xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                                ❌ DEFEAT
                              </div>
                              <div className="text-2xl text-red-300">
                                -{BET_AMOUNT} coins lost
                              </div>
                              <div className="text-lg text-red-200">
                                Better luck next round!
                              </div>
                            </div>
                          )}
                        </motion.div>
                        
                        {/* Selection vs Result Comparison */}
                        <div className="flex items-center justify-center gap-8 mb-8">
                          <div className="text-center">
                            <div className="text-sm text-gray-400 mb-2">Your Choice</div>
                            <div className={`w-20 h-20 rounded-full ${selectedColor ? COLORS[selectedColor].bg : 'bg-gray-700'} 
                              flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                              {selectedColor ? selectedColor.charAt(0) : '?'}
                            </div>
                            <div className="mt-2 text-sm text-gray-300">
                              {selectedColor || 'No selection'}
                            </div>
                          </div>
                          
                          <div className="text-4xl text-gray-600 mt-8">VS</div>
                          
                          <div className="text-center">
                            <div className="text-sm text-gray-400 mb-2">Winning Color</div>
                            <div className={`w-20 h-20 rounded-full ${resultColor ? COLORS[resultColor].bg : 'bg-gray-700'} 
                              flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                              {resultColor ? resultColor.charAt(0) : '?'}
                            </div>
                            <div className="mt-2 text-sm text-gray-300">
                              {resultColor || 'Calculating...'}
                            </div>
                          </div>
                        </div>
                        
                        {/* Auto Play Notice */}
                        <div className="p-4 bg-gray-800/50 rounded-xl">
                          <div className="text-lg text-white">
                            Next round starts automatically in {RESULT_TIME - Math.floor((Date.now() - lastRoundTime) / 1000) + 1}s
                          </div>
                          <div className="text-sm text-gray-400 mt-1">
                            Game continues automatically. Get ready for round #{roundNumber + 1}!
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
            <CardContent className="p-4">
              <div className="text-sm text-gray-400">Total Rounds</div>
              <div className="text-2xl font-bold text-white">{roundNumber - 1}</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
            <CardContent className="p-4">
              <div className="text-sm text-gray-400">Wins</div>
              <div className="text-2xl font-bold text-green-400">
                {history.filter(r => r.result === 'WIN').length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
            <CardContent className="p-4">
              <div className="text-sm text-gray-400">Losses</div>
              <div className="text-2xl font-bold text-red-400">
                {history.filter(r => r.result === 'LOSS').length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
            <CardContent className="p-4">
              <div className="text-sm text-gray-400">Win Rate</div>
              <div className="text-2xl font-bold text-purple-400">
                {history.length > 0 
                  ? `${((history.filter(r => r.result === 'WIN').length / history.length) * 100).toFixed(1)}%`
                  : '0%'
                }
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>🎮 Continuous Auto-Play Game • Select colors before timer ends • No real money involved</p>
        </div>
      </div>
    </div>
  );
}
// app/signup/page.tsx
"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Gamepad2, Loader2, CheckCircle, AlertCircle, Sparkles } from "lucide-react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false
  });

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    if (!password) return { score: 0, color: "bg-gray-500", text: "Enter a password" };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    const strengthMap = [
      { color: "bg-red-500", text: "Very weak" },
      { color: "bg-orange-500", text: "Weak" },
      { color: "bg-yellow-500", text: "Fair" },
      { color: "bg-blue-500", text: "Good" },
      { color: "bg-green-500", text: "Strong" }
    ];
    
    return { score, ...strengthMap[score] };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "fullName":
        if (!value.trim()) return "Full name is required";
        if (value.trim().split(" ").length < 2) return "Please enter your full name";
        return "";
      
      case "email":
        if (!value) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Please enter a valid email";
        return "";
      
      case "phone":
        if (!value) return "Phone number is required";
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanedPhone = value.replace(/[\s\-()]/g, '');
        if (!phoneRegex.test(cleanedPhone)) return "Please enter a valid phone number";
        return "";
      
      case "password":
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        return "";
      
      case "confirmPassword":
        if (!value) return "Please confirm your password";
        if (value !== formData.password) return "Passwords don't match";
        return "";
      
      default:
        return "";
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
    
    // Validate confirm password when password changes
    if (name === "password" && formData.confirmPassword) {
      const confirmError = validateField("confirmPassword", formData.confirmPassword);
      setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      fullName: validateField("fullName", formData.fullName),
      email: validateField("email", formData.email),
      phone: validateField("phone", formData.phone),
      password: validateField("password", formData.password),
      confirmPassword: validateField("confirmPassword", formData.confirmPassword)
    };
    
    setErrors(newErrors);
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true
    });
    
    const isValid = !Object.values(newErrors).some(error => error) && formData.agreeToTerms;
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Signup data:", formData);
    setIsLoading(false);
    
    // In a real app, you would handle registration here
    alert("Account created successfully! (This is a demo)");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const buttonHoverVariants = {
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.98 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex">
      {/* Left Column - Visual Section (Desktop) */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-cyan-900/20" />
        
        {/* Animated background elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        
        {/* Gaming pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center space-y-6 max-w-lg"
          >
            <div className="flex items-center justify-center gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Gamepad2 className="h-16 w-16 text-purple-400" />
              </motion.div>
              <img src="/logo.png" alt="logo" width={150} />
            </div>
            
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-4xl font-bold text-white mt-8"
            >
              Level Up Your Gaming
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xl text-gray-300"
            >
              Join the ultimate platform for competitive gamers
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex items-center justify-center gap-6 pt-8"
            >
              {["🏆", "⚡", "🎮", "✨"].map((emoji, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="text-3xl"
                >
                  {emoji}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Column - Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <Gamepad2 className="h-10 w-10 text-purple-500" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
              ocorom
            </h1>
          </div>

          <Card className="border-gray-800 bg-gray-900/80 backdrop-blur-xl shadow-2xl shadow-purple-500/10">
            <CardHeader className="space-y-4 pb-6">
              <CardTitle className="text-2xl text-center text-white font-bold tracking-wide">
                Create Your Account
              </CardTitle>
              <CardDescription className="text-center text-gray-400 text-base">
                Join and start playing smart prediction games
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent>
                <motion.div
                  variants={containerVariants as Variants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  {/* Full Name Field */}
                  <motion.div variants={itemVariants as Variants} className="space-y-3">
                    <Label htmlFor="fullName" className="text-gray-300 font-medium">
                      Full Name
                    </Label>
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 h-12 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                          errors.fullName ? "border-red-500" : touched.fullName && !errors.fullName ? "border-green-500" : ""
                        }`}
                      />
                    </motion.div>
                    <div className="h-5">
                      {errors.fullName && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm flex items-center gap-1"
                        >
                          <AlertCircle className="h-4 w-4" /> {errors.fullName}
                        </motion.p>
                      )}
                      {touched.fullName && !errors.fullName && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-green-500 text-sm flex items-center gap-1"
                        >
                          <CheckCircle className="h-4 w-4" /> Valid name
                        </motion.p>
                      )}
                    </div>
                  </motion.div>

                  {/* Email Field */}
                  <motion.div variants={itemVariants} className="space-y-3">
                    <Label htmlFor="email" className="text-gray-300 font-medium">
                      Email
                    </Label>
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 h-12 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                          errors.email ? "border-red-500" : touched.email && !errors.email ? "border-green-500" : ""
                        }`}
                      />
                    </motion.div>
                    <div className="h-5">
                      {errors.email && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm flex items-center gap-1"
                        >
                          <AlertCircle className="h-4 w-4" /> {errors.email}
                        </motion.p>
                      )}
                      {touched.email && !errors.email && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-green-500 text-sm flex items-center gap-1"
                        >
                          <CheckCircle className="h-4 w-4" /> Valid email
                        </motion.p>
                      )}
                    </div>
                  </motion.div>

                  {/* Phone Number Field */}
                  <motion.div variants={itemVariants} className="space-y-3">
                    <Label htmlFor="phone" className="text-gray-300 font-medium">
                      Phone Number
                    </Label>
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 h-12 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                          errors.phone ? "border-red-500" : touched.phone && !errors.phone ? "border-green-500" : ""
                        }`}
                      />
                    </motion.div>
                    <div className="h-5">
                      {errors.phone && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm flex items-center gap-1"
                        >
                          <AlertCircle className="h-4 w-4" /> {errors.phone}
                        </motion.p>
                      )}
                      {touched.phone && !errors.phone && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-green-500 text-sm flex items-center gap-1"
                        >
                          <CheckCircle className="h-4 w-4" /> Valid phone number
                        </motion.p>
                      )}
                    </div>
                  </motion.div>

                  {/* Password Field */}
                  <motion.div variants={itemVariants} className="space-y-3">
                    <Label htmlFor="password" className="text-gray-300 font-medium">
                      Password
                    </Label>
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 h-12 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-12 ${
                          errors.password ? "border-red-500" : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </motion.div>
                    
                    {/* Password Strength Indicator */}
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${passwordStrength.score * 25}%` }}
                          transition={{ duration: 0.5 }}
                          className={`h-full ${passwordStrength.color} rounded-full`}
                        />
                      </div>
                      <p className={`text-sm ${
                        passwordStrength.score === 0 ? "text-gray-500" :
                        passwordStrength.score <= 2 ? "text-red-500" :
                        passwordStrength.score === 3 ? "text-blue-500" : "text-green-500"
                      }`}>
                        {passwordStrength.text}
                      </p>
                    </div>
                    
                    <div className="h-5">
                      {errors.password && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm flex items-center gap-1"
                        >
                          <AlertCircle className="h-4 w-4" /> {errors.password}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>

                  {/* Confirm Password Field */}
                  <motion.div variants={itemVariants} className="space-y-3">
                    <Label htmlFor="confirmPassword" className="text-gray-300 font-medium">
                      Confirm Password
                    </Label>
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 h-12 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-12 ${
                          errors.confirmPassword ? "border-red-500" : 
                          touched.confirmPassword && !errors.confirmPassword ? "border-green-500" : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </motion.div>
                    <div className="h-5">
                      {errors.confirmPassword && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm flex items-center gap-1"
                        >
                          <AlertCircle className="h-4 w-4" /> {errors.confirmPassword}
                        </motion.p>
                      )}
                      {touched.confirmPassword && !errors.confirmPassword && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-green-500 text-sm flex items-center gap-1"
                        >
                          <CheckCircle className="h-4 w-4" /> Passwords match
                        </motion.p>
                      )}
                    </div>
                  </motion.div>

                  {/* Terms & Conditions */}
                  <motion.div variants={itemVariants} className="space-y-3 pt-2">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="agreeToTerms"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) =>
                          setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))
                        }
                        className="mt-1 border-gray-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                      />
                      <Label
                        htmlFor="agreeToTerms"
                        className="text-gray-400 text-sm cursor-pointer hover:text-gray-300 transition-colors"
                      >
                        I agree to the{" "}
                        <a href="#" className="text-purple-400 hover:text-purple-300 hover:underline">
                          Terms & Conditions
                        </a>
                      </Label>
                    </div>
                    {!formData.agreeToTerms && touched.confirmPassword && (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-500 text-sm flex items-center gap-1"
                      >
                        <AlertCircle className="h-4 w-4" /> You must agree to the terms
                      </motion.p>
                    )}
                  </motion.div>
                </motion.div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4 pt-2">
                <motion.div
                  variants={buttonHoverVariants as Variants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 text-white font-semibold h-12 text-base transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 group"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                        Create Account
                      </>
                    )}
                  </Button>
                </motion.div>

                <div className="text-center pt-4">
                  <p className="text-gray-400 text-sm">
                    Already have an account?{" "}
                    <a
                      href="/login"
                      className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors hover:underline"
                    >
                      Login
                    </a>
                  </p>
                </div>
              </CardFooter>
            </form>
          </Card>

          {/* Demo Note */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-gray-500 text-sm mt-8"
          >
            This is a demo signup form. No data will be stored.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
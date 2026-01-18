// app/login/page.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Gamepad2, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
    rememberMe: false
  });
  const [errors, setErrors] = useState({
    emailOrPhone: "",
    password: ""
  });

  const validateForm = () => {
    const newErrors = {
      emailOrPhone: "",
      password: ""
    };

    if (!formData.emailOrPhone.trim()) {
      newErrors.emailOrPhone = "Email or phone number is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      
      if (!emailRegex.test(formData.emailOrPhone) && !phoneRegex.test(formData.emailOrPhone.replace(/[\s\-()]/g, ''))) {
        newErrors.emailOrPhone = "Please enter a valid email or phone number";
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return !newErrors.emailOrPhone && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Login attempt with:", formData);
    setIsLoading(false);
    
    // In a real app, you would handle authentication here
    // For demo purposes, just show a success message
    alert("Login successful! (This is a demo)");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gaming elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md z-10">
        <Card className="border-gray-800 bg-gray-900/90 backdrop-blur-sm shadow-2xl shadow-purple-500/10">
          <CardHeader className="space-y-4 pb-8">
            <div className="flex items-center justify-center gap-3 mb-2">
              <img src="/logo.png" alt="logo" width={120} />
            </div>
            <CardTitle className="text-2xl text-center text-white font-bold tracking-wide">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center text-gray-400 text-base">
              Login to continue playing
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Email/Phone Field */}
              <div className="space-y-3">
                <Label htmlFor="emailOrPhone" className="text-gray-300 font-medium">
                  Email or Phone
                </Label>
                <Input
                  id="emailOrPhone"
                  name="emailOrPhone"
                  type="text"
                  placeholder="Enter your email or phone number"
                  value={formData.emailOrPhone}
                  onChange={handleInputChange}
                  className={`bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 h-12 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.emailOrPhone ? "border-red-500" : ""
                  }`}
                />
                {errors.emailOrPhone && (
                  <p className="text-red-500 text-sm mt-1">{errors.emailOrPhone}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-gray-300 font-medium">
                    Password
                  </Label>
                  <a
                    href="#"
                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 h-12 focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12 ${
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
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) =>
                    setFormData(prev => ({ ...prev, rememberMe: checked as boolean }))
                  }
                  className="border-gray-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                />
                <Label
                  htmlFor="rememberMe"
                  className="text-gray-400 text-sm cursor-pointer hover:text-gray-300 transition-colors"
                >
                  Remember me
                </Label>
              </div>

              {/* Error Message Placeholder */}
              <div className="min-h-[24px]">
                {/* Error messages will appear above */}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold h-12 text-base transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>

              <div className="text-center pt-4">
                <p className="text-gray-400 text-sm">
                  Don't have an account?{" "}
                  <a
                    href="#"
                    className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors hover:underline"
                  >
                    Create an account
                  </a>
                </p>
              </div>
            </CardFooter>
          </form>
        </Card>

        {/* Footer note */}
        <p className="text-center text-gray-500 text-sm mt-8">
          Enter any valid email/phone and password (min 6 chars) to test
        </p>
      </div>
    </div>
  );
}
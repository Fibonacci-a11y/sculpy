"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Float, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei"
import {
  AlertCircle,
  ArrowRight,
  Box,
  ImageIcon,
  Paintbrush,
  Type,
  Moon,
  Sun,
  Zap,
  Layers,
  Code,
  Download,
  Cpu,
  Palette,
  CreditCard,
  Lock,
  Globe,
  Wallet,
  DollarSign,
  Shield,
  Repeat,
  Server,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useGLTF } from "@react-three/drei"

export default function Home() {
  const [showQueue, setShowQueue] = useState(false)
  const [queuePosition, setQueuePosition] = useState(0)
  const [waitTime, setWaitTime] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [activeTab, setActiveTab] = useState("text")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredBrimColor, setHoveredBrimColor] = useState(null)

  // Cursor follower effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleGenerateClick = () => {
    // Generate random queue position between 50-300
    const position = Math.floor(Math.random() * 250) + 50
    // Generate random wait time between 10-45 minutes
    const time = Math.floor(Math.random() * 35) + 10

    setQueuePosition(position)
    setWaitTime(time)
    setShowQueue(true)
    setProgress(0)

    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 50)

    // Hide the queue message after 5 seconds
    setTimeout(() => {
      setShowQueue(false)
      clearInterval(interval)
    }, 5000)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""} relative overflow-hidden`}>
      {/* Cursor follower */}
      <div
        className="fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, rgba(59, 130, 246, 0) 70%)",
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 20px 10px rgba(139, 92, 246, 0.3)",
          filter: "blur(5px)",
        }}
      />

      {/* Background elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Grid background */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-600/20 filter blur-[100px] animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-600/20 filter blur-[100px] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-3/4 left-1/2 w-64 h-64 rounded-full bg-pink-600/20 filter blur-[100px] animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Fixed queue notification */}
      <AnimatePresence>
        {showQueue && (
          <motion.div
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <Alert variant="destructive" className="border border-purple-500/50 bg-black/80 backdrop-blur-md">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="flex items-center gap-2">
                High demand detected
                <Badge variant="outline" className="border-purple-500 text-purple-400">
                  Processing
                </Badge>
              </AlertTitle>
              <AlertDescription>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Queue position: #{queuePosition}</span>
                    <span>Est. wait: {waitTime} min</span>
                  </div>
                  <Progress
                    value={progress}
                    className="h-1 bg-gray-800"
                    indicatorClassName="bg-gradient-to-r from-purple-600 to-blue-600"
                  />
                </div>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-black/20 border-b border-white/10">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-20 h-20 relative overflow-hidden rounded-xl">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_8722.JPEG-xcZ9NvqXRVFt8lNlstaandiUopt2Ac.jpeg"
                alt="SculptAI Logo"
                width={80}
                height={80}
                className="object-contain hover:scale-110 transition-transform duration-300"
                style={{ borderRadius: "12px" }}
              />
            </div>
            <span className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              SculptAI
            </span>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors relative group">
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#generation" className="text-gray-300 hover:text-white transition-colors relative group">
              Generation
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#technical" className="text-gray-300 hover:text-white transition-colors relative group">
              Technical
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#api" className="text-gray-300 hover:text-white transition-colors relative group">
              API
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors relative group">
              Pricing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleDarkMode}
              className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0">
              Sign In
            </Button>
            <div className="flex items-center gap-2">
              {/* X (Twitter) Icon */}
              <a
                href="https://x.com/sculpt_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/70 hover:bg-gray-700/70 transition-colors"
                aria-label="X (Twitter)"
              >
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Telegram Icon */}
              <a
                href="https://t.me/+4AKLGvtMZnNhNzA0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/70 hover:bg-gray-700/70 transition-colors"
                aria-label="Telegram"
              >
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.269c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.18-2.935 5.337-4.82c.232-.206-.051-.32-.357-.113l-6.607 4.156-2.842-.917c-.618-.196-.63-.618.131-.917l11.093-4.279c.511-.196.958.114.813.641z" />
                </svg>
              </a>

              {/* GitHub Icon */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/70 hover:bg-gray-700/70 transition-colors"
                aria-label="GitHub"
              >
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>

              {/* Discord Icon */}
              <a
                href="https://t.me/+4AKLGvtMZnNhNzA0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/70 hover:bg-gray-700/70 transition-colors"
                aria-label="Discord"
              >
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Contract Address Banner */}
      <div className="bg-gradient-to-r from-purple-900/80 to-blue-900/80 py-3 border-b border-white/10 sticky top-[73px] z-30 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-purple-500/20 text-white border-purple-500/30">
                PUMPFUN COIN
              </Badge>
              <span className="text-sm text-gray-300">Contract Address:</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-lg border border-white/10 w-full sm:w-auto">
              <code className="text-xs sm:text-sm font-mono text-gray-200 truncate max-w-[200px] sm:max-w-none">
                6vdezYVDCA3cawmiSWp23Mmn6xfcuyB9QtZzX1iEpump
              </code>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => {
                  navigator.clipboard.writeText("6vdezYVDCA3cawmiSWp23Mmn6xfcuyB9QtZzX1iEpump")
                  const button = document.getElementById("copy-button")
                  if (button) {
                    button.innerText = "Copied!"
                    setTimeout(() => {
                      button.innerText = "Copy"
                    }, 2000)
                  }
                }}
              >
                <span id="copy-button">Copy</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32 relative">
        <motion.div
          className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <Badge
                variant="outline"
                className="px-3 py-1 text-sm font-medium text-blue-300 border-blue-500/50 bg-blue-500/10 backdrop-blur-sm"
              >
                Next-Gen 3D Generation
              </Badge>
              <Badge
                variant="outline"
                className="px-3 py-1 text-sm font-medium text-green-300 border-green-500/50 bg-green-500/10 backdrop-blur-sm flex items-center gap-1"
              >
                <Wallet className="h-3 w-3" />
                Solana Powered
              </Badge>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-bold leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Create stunning 3D models with{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 animate-gradient">
                AI
              </span>
            </motion.h1>
            <motion.p
              className="text-lg text-gray-300 max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              SculptAI transforms your ideas into high-quality 3D models instantly. No technical skills required — just
              describe, generate, and download.
            </motion.p>
            <motion.div
              className="flex gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 relative overflow-hidden group"
                onClick={handleGenerateClick}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600/40 to-blue-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 flex items-center">
                  Start Generating{" "}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
              <Button size="lg" variant="outline" className="border-gray-700 text-white hover:bg-white/10">
                View Gallery
              </Button>
            </motion.div>
          </div>
          <motion.div
            className="flex-1 h-[400px] w-full relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl -m-4"></div>
            <div className="absolute inset-0 border border-white/10 rounded-2xl backdrop-blur-sm"></div>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
              <OrbitControls enableZoom={true} enablePan={false} autoRotate={false} autoRotateSpeed={0.5} />
              <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <HeroModel />
              </Float>
              <Environment preset="city" />
            </Canvas>
          </motion.div>
        </motion.div>

        {/* Tech stats */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <TechStat value="10M+" label="Polygons" />
          <TechStat value="4K" label="Textures" />
          <TechStat value="99.8%" label="Accuracy" />
          <TechStat value="0.5s" label="Generation Time" />
        </motion.div>
      </section>

      {/* Generation Options */}
      <section id="generation" className="container mx-auto px-4 py-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge
            variant="outline"
            className="mb-4 px-3 py-1 text-sm font-medium text-purple-300 border-purple-500/50 bg-purple-500/10 backdrop-blur-sm"
          >
            Multiple Methods
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">
            Generation Methods
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Choose from various input methods to create your perfect 3D model. Our AI adapts to your preferred workflow.
          </p>
        </motion.div>

        <Tabs defaultValue="text" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-6 mb-8 bg-gray-900/50 border border-white/10 p-1 rounded-lg">
            <TabsTrigger
              value="text"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/80 data-[state=active]:to-blue-600/80 data-[state=active]:text-white"
            >
              <Type className="h-4 w-4 mr-2" />
              Text
            </TabsTrigger>
            <TabsTrigger
              value="image"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/80 data-[state=active]:to-blue-600/80 data-[state=active]:text-white"
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Image
            </TabsTrigger>
            <TabsTrigger
              value="image-to-3d"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/80 data-[state=active]:to-blue-600/80 data-[state=active]:text-white"
            >
              <Box className="h-4 w-4 mr-2" />
              Image to 3D
            </TabsTrigger>
            <TabsTrigger
              value="sketch"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/80 data-[state=active]:to-blue-600/80 data-[state=active]:text-white"
            >
              <Paintbrush className="h-4 w-4 mr-2" />
              Sketch
            </TabsTrigger>
            <TabsTrigger
              value="texturing"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/80 data-[state=active]:to-blue-600/80 data-[state=active]:text-white"
            >
              <Palette className="h-4 w-4 mr-2" />
              AI Texturing
            </TabsTrigger>
            <TabsTrigger
              value="style"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/80 data-[state=active]:to-blue-600/80 data-[state=active]:text-white"
            >
              <Box className="h-4 w-4 mr-2" />
              Style
            </TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="h-[400px] bg-gray-900/30 rounded-xl border border-white/10 overflow-hidden relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-md rounded-full px-3 py-1 text-xs font-medium text-white border border-white/10">
                {activeTab === "text" && "Text Prompt"}
                {activeTab === "image" && "Image Input"}
                {activeTab === "image-to-3d" && "Image to 3D"}
                {activeTab === "sketch" && "Sketch Input"}
                {activeTab === "texturing" && "AI Texturing"}
                {activeTab === "style" && "Style Reference"}
              </div>

              <TabsContent value="text" className="h-full">
                <div className="h-full flex items-center justify-center p-8">
                  <div className="w-full space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="text-sm text-gray-400">Enter your prompt:</div>
                        <div className="text-xs text-blue-400">AI-optimized</div>
                      </div>
                      <div className="relative">
                        <textarea
                          className="w-full h-32 bg-black/50 border border-white/10 rounded-lg p-4 text-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none resize-none"
                          placeholder="Describe your 3D model in detail..."
                          defaultValue="A futuristic robot with smooth curves, glowing blue accents, and a sleek metallic finish. The design should be minimalist yet detailed with visible mechanical joints."
                        />
                        <div className="absolute bottom-2 right-2 flex items-center gap-2 text-xs text-gray-500">
                          <span>Example prompt</span>
                          <button className="text-purple-400 hover:text-purple-300">Clear</button>
                        </div>
                      </div>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-600 hover:to-blue-600"
                      onClick={handleGenerateClick}
                    >
                      Generate from Text
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="image" className="h-full">
                <div className="h-full flex items-center justify-center p-8">
                  <div className="w-full space-y-4">
                    <div className="border-2 border-dashed border-white/20 rounded-lg h-48 flex items-center justify-center">
                      <div className="text-center">
                        <ImageIcon className="h-10 w-10 mx-auto mb-2 text-gray-500" />
                        <p className="text-gray-400">Drag & drop an image or click to browse</p>
                      </div>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-600 hover:to-blue-600"
                      onClick={handleGenerateClick}
                    >
                      Generate from Image
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="image-to-3d" className="h-full">
                <div className="h-full flex items-center justify-center p-8">
                  <div className="w-full space-y-4">
                    <div className="border-2 border-dashed border-white/20 rounded-lg h-48 flex items-center justify-center">
                      <div className="text-center">
                        <Box className="h-10 w-10 mx-auto mb-2 text-gray-500" />
                        <p className="text-gray-400">Upload an image to convert to 3D</p>
                      </div>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-600 hover:to-blue-600"
                      onClick={handleGenerateClick}
                    >
                      Convert Image to 3D
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="sketch" className="h-full">
                <div className="h-full flex items-center justify-center p-8">
                  <div className="w-full space-y-4">
                    <div className="border-2 border-dashed border-white/20 rounded-lg h-48 bg-gray-900 flex items-center justify-center">
                      <div className="text-center">
                        <Paintbrush className="h-10 w-10 mx-auto mb-2 text-gray-500" />
                        <p className="text-gray-400">Draw a sketch or upload one</p>
                      </div>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-600 hover:to-blue-600"
                      onClick={handleGenerateClick}
                    >
                      Generate from Sketch
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="texturing" className="h-full">
                <div className="h-full flex items-center justify-center p-8">
                  <div className="w-full space-y-4">
                    <div className="border-2 border-dashed border-white/20 rounded-lg h-48 flex items-center justify-center">
                      <div className="text-center">
                        <Palette className="h-10 w-10 mx-auto mb-2 text-gray-500" />
                        <p className="text-gray-400">Upload a 3D model for AI texturing</p>
                      </div>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-600 hover:to-blue-600"
                      onClick={handleGenerateClick}
                    >
                      Apply AI Texturing
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="style" className="h-full">
                <div className="h-full flex items-center justify-center p-8">
                  <div className="w-full space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div
                        className="bg-gray-800 rounded-lg h-20 overflow-hidden relative group cursor-pointer"
                        onMouseEnter={() => setHoveredBrimColor("cyberpunk")}
                        onMouseLeave={() => setHoveredBrimColor(null)}
                      >
                        <div
                          className={`absolute inset-0 ${hoveredBrimColor === "cyberpunk" ? "bg-gradient-to-r from-purple-500/40 to-blue-500/40" : "bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100"} transition-opacity`}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs text-white">Cyberpunk</span>
                        </div>
                      </div>
                      <div
                        className="bg-gray-800 rounded-lg h-20 overflow-hidden relative group cursor-pointer"
                        onMouseEnter={() => setHoveredBrimColor("minimalist")}
                        onMouseLeave={() => setHoveredBrimColor(null)}
                      >
                        <div
                          className={`absolute inset-0 ${hoveredBrimColor === "minimalist" ? "bg-gradient-to-r from-gray-500/40 to-white-500/40" : "bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100"} transition-opacity`}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs text-white">Minimalist</span>
                        </div>
                      </div>
                      <div
                        className="bg-gray-800 rounded-lg h-20 overflow-hidden relative group cursor-pointer"
                        onMouseEnter={() => setHoveredBrimColor("organic")}
                        onMouseLeave={() => setHoveredBrimColor(null)}
                      >
                        <div
                          className={`absolute inset-0 ${hoveredBrimColor === "organic" ? "bg-gradient-to-r from-green-500/40 to-emerald-500/40" : "bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100"} transition-opacity`}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs text-white">Organic</span>
                        </div>
                      </div>
                      <div
                        className="bg-gray-800 rounded-lg h-20 overflow-hidden relative group cursor-pointer"
                        onMouseEnter={() => setHoveredBrimColor("scifi")}
                        onMouseLeave={() => setHoveredBrimColor(null)}
                      >
                        <div
                          className={`absolute inset-0 ${hoveredBrimColor === "scifi" ? "bg-gradient-to-r from-blue-500/40 to-cyan-500/40" : "bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100"} transition-opacity`}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs text-white">Sci-Fi</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-600 hover:to-blue-600"
                      onClick={handleGenerateClick}
                    >
                      Apply Style Transfer
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </motion.div>

            <motion.div
              className="h-[400px] bg-gray-900/30 rounded-xl border border-white/10 overflow-hidden relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-md rounded-full px-3 py-1 text-xs font-medium text-white border border-white/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Live Preview
              </div>

              <TabsContent value="text" className="h-full">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                  <OrbitControls enableZoom={true} />
                  <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
                    <BlockyRobotModel />
                  </Float>
                  <Environment preset="city" />
                </Canvas>
              </TabsContent>

              <TabsContent value="image" className="h-full">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                  <OrbitControls enableZoom={true} />
                  <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <ImageTo3DModel />
                  </Float>
                  <Environment preset="city" />
                </Canvas>
              </TabsContent>

              <TabsContent value="image-to-3d" className="h-full">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                  <OrbitControls enableZoom={true} />
                  <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <ImageTo3DModel />
                  </Float>
                  <Environment preset="city" />
                </Canvas>
              </TabsContent>

              <TabsContent value="sketch" className="h-full">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                  <OrbitControls enableZoom={true} />
                  <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <SketchTo3DModel />
                  </Float>
                  <Environment preset="city" />
                </Canvas>
              </TabsContent>

              <TabsContent value="texturing" className="h-full">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                  <OrbitControls enableZoom={true} />
                  <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <AITexturingModel />
                  </Float>
                  <Environment preset="city" />
                </Canvas>
              </TabsContent>

              <TabsContent value="style" className="h-full">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                  <OrbitControls enableZoom={true} />
                  <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <StyleTransferModel />
                  </Float>
                  <Environment preset="city" />
                </Canvas>
              </TabsContent>
            </motion.div>
          </div>
        </Tabs>

        {/* Features grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            className="bg-gray-900/30 border border-white/10 rounded-xl p-6 relative overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Instant Generation</h3>
              <p className="text-gray-400 text-sm">
                Generate complex 3D models in seconds with our advanced AI algorithms.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-900/30 border border-white/10 rounded-xl p-6 relative overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                <Layers className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Multiple Export Formats</h3>
              <p className="text-gray-400 text-sm">
                Export your models in OBJ, FBX, GLTF, and more for maximum compatibility.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-900/30 border border-white/10 rounded-xl p-6 relative overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-pink-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Advanced Customization</h3>
              <p className="text-gray-400 text-sm">
                Fine-tune your models with advanced parameters and post-processing options.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* API Section */}
      <section id="api" className="container mx-auto px-4 py-20 relative">
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 px-3 py-1 text-sm font-medium text-cyan-300 border-cyan-500/50 bg-cyan-500/10 backdrop-blur-sm"
            >
              Developer Tools
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">
              Powerful API Integration
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Integrate SculptAI's powerful 3D generation capabilities directly into your applications with our robust
              API.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-gray-900/30 border border-white/10 rounded-xl p-8 backdrop-blur-sm"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-6">
                <Server className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-medium mb-4">RESTful API</h3>
              <p className="text-gray-400 mb-6">
                Our RESTful API provides simple, predictable URLs, accepts form-encoded request bodies, returns
                JSON-encoded responses, and uses standard HTTP response codes.
              </p>
              <div className="bg-black/50 rounded-lg p-4 font-mono text-sm text-gray-300 overflow-x-auto">
                <pre>
                  {`// Example API request
fetch('https://api.sculptai.com/v1/generate', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    prompt: 'A futuristic robot',
    format: 'glb',
    quality: 'high'
  })
})`}
                </pre>
              </div>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gray-900/30 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-medium mb-2 flex items-center">
                  <Cpu className="h-5 w-5 mr-2 text-cyan-400" />
                  Flexible Endpoints
                </h4>
                <p className="text-gray-400 text-sm">
                  Multiple endpoints for different generation methods: text-to-3D, image-to-3D, and AI texturing.
                </p>
              </div>

              <div className="bg-gray-900/30 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-medium mb-2 flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-blue-400" />
                  Global Infrastructure
                </h4>
                <p className="text-gray-400 text-sm">
                  Low-latency API access from anywhere in the world with our distributed edge network.
                </p>
              </div>

              <div className="bg-gray-900/30 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-medium mb-2 flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-green-400" />
                  Secure Authentication
                </h4>
                <p className="text-gray-400 text-sm">
                  API keys with granular permissions and optional webhook signatures for secure integrations.
                </p>
              </div>

              <div className="bg-gray-900/30 border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-medium mb-2 flex items-center">
                  <Wallet className="h-5 w-5 mr-2 text-purple-400" />
                  Solana Integration
                </h4>
                <p className="text-gray-400 text-sm">
                  Pay for API usage with Solana tokens for faster transactions and lower fees.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-20 relative">
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 px-3 py-1 text-sm font-medium text-green-300 border-green-500/50 bg-green-500/10 backdrop-blur-sm"
            >
              Simple Pricing
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">
              Pay Only For What You Use
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              No monthly fees or hidden costs. Purchase credits and use them whenever you need to generate 3D models.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-gray-900/30 border border-white/10 rounded-xl p-8 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500 rounded-full filter blur-3xl opacity-5"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-medium mb-2">Starter Pack</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold">$15</span>
                  <span className="text-gray-400 ml-2">/ 50 credits</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-300">Basic 3D model generation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-300">Up to 5M polygons</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-300">Standard textures</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-300">Email support</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-600 hover:to-blue-600">
                  Buy Credits
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-900/30 border border-purple-500/30 rounded-xl p-8 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500 rounded-full filter blur-3xl opacity-10"></div>
              <Badge className="absolute top-4 right-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
                Most Popular
              </Badge>
              <div className="relative z-10">
                <h3 className="text-xl font-medium mb-2">Pro Pack</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold">$25</span>
                  <span className="text-gray-400 ml-2">/ 250 credits</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-300">Advanced 3D model generation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-300">Up to 10M polygons</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-300">High-quality PBR textures</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-300">Priority support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-300">API access</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Buy Credits
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-900/30 border border-white/10 rounded-xl p-8 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500 rounded-full filter blur-3xl opacity-5"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-medium mb-2">Enterprise</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold">Custom</span>
                  <span className="text-gray-400 ml-2">/ pricing</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-300">Custom 3D model solutions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-300">Unlimited polygons</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-300">Custom texturing options</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-300">Dedicated support team</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-300">Custom API integration</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  Contact Sales
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Solana Integration Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          className="rounded-2xl bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-8 md:p-12 relative overflow-hidden border border-purple-500/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Glowing accent */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500 rounded-full filter blur-3xl opacity-10"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500 rounded-full filter blur-3xl opacity-10"></div>

          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <Badge
                variant="outline"
                className="mb-4 px-3 py-1 text-sm font-medium text-green-300 border-green-500/50 bg-green-500/10 backdrop-blur-sm"
              >
                Blockchain Powered
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Pay with Solana Credits</h2>
              <p className="text-gray-300 mb-6">
                SculptAI is built on the Solana blockchain, offering faster transactions, lower fees, and enhanced
                security for all your 3D generation needs.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mt-1">
                    <Zap className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Lightning Fast Transactions</h4>
                    <p className="text-sm text-gray-400">
                      Process payments in seconds with Solana's high-performance blockchain.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mt-1">
                    <DollarSign className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Minimal Transaction Fees</h4>
                    <p className="text-sm text-gray-400">
                      Save on transaction costs with Solana's efficient fee structure.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mt-1">
                    <Shield className="h-4 w-4 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Enhanced Security</h4>
                    <p className="text-sm text-gray-400">
                      Benefit from blockchain's inherent security features for all transactions.
                    </p>
                  </div>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white border-0">
                Connect Wallet
              </Button>
            </div>

            <div className="md:w-1/2 h-[300px] md:h-[400px] relative">
              <div className="absolute inset-0 border border-white/10 rounded-xl backdrop-blur-sm"></div>
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate={true} autoRotateSpeed={1} />
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                  <SolanaModel />
                </Float>
                <Environment preset="city" />
              </Canvas>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Technical Features */}
      <section id="technical" className="container mx-auto px-4 py-20 relative">
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 px-3 py-1 text-sm font-medium text-blue-300 border-blue-500/50 bg-blue-500/10 backdrop-blur-sm"
            >
              Advanced Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">
              Technical Specifications
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              SculptAI generates production-ready 3D models with advanced features for professional use.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <TechnicalFeatureCard
                title="Topology Optimization"
                description="Clean, efficient models with optimized polygon distribution."
                icon={<Layers className="h-6 w-6 text-purple-400" />}
                stats={[
                  { label: "Polygon Reduction", value: "Up to 80%" },
                  { label: "Mesh Quality", value: "High" },
                ]}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <TechnicalFeatureCard
                title="High-Res Textures"
                description="4K PBR texture support with normal, roughness, and metallic maps."
                icon={<ImageIcon className="h-6 w-6 text-blue-400" />}
                stats={[
                  { label: "Resolution", value: "Up to 4K" },
                  { label: "PBR Maps", value: "Full Support" },
                ]}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <TechnicalFeatureCard
                title="Multiple Export Formats"
                description="OBJ, FBX, GLTF, and more for maximum compatibility."
                icon={<Download className="h-6 w-6 text-green-400" />}
                stats={[
                  { label: "Formats", value: "6+" },
                  { label: "Compatibility", value: "Universal" },
                ]}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <TechnicalFeatureCard
                title="UV Unwrapping"
                description="Automatic UV mapping and material generation."
                icon={<Code className="h-6 w-6 text-pink-400" />}
                stats={[
                  { label: "UV Quality", value: "Optimized" },
                  { label: "Process", value: "Automatic" },
                ]}
              />
            </motion.div>
          </div>

          {/* Technical specs */}
          <motion.div
            className="mt-16 bg-gray-900/30 border border-white/10 rounded-xl p-8 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800/50 p-6 rounded-xl border-l-4 border-purple-500">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                  Model Specifications
                </h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex justify-between">
                    <span>Max Resolution</span>
                    <span className="text-white">10M polygons</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Texture Maps</span>
                    <span className="text-white">Diffuse, Normal, Roughness</span>
                  </li>
                  <li className="flex justify-between">
                    <span>UV Mapping</span>
                    <span className="text-white">Automatic</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Rigging</span>
                    <span className="text-white">Optional</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-xl border-l-4 border-blue-500">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                  Export Options
                </h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex justify-between">
                    <span>File Formats</span>
                    <span className="text-white">OBJ, FBX, GLTF, STL</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Scale Options</span>
                    <span className="text-white">Customizable</span>
                  </li>
                  <li className="flex justify-between">
                    <span>LOD Levels</span>
                    <span className="text-white">Up to 4</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Animation</span>
                    <span className="text-white">Supported</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-xl border-l-4 border-pink-500">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-pink-500 mr-2"></span>
                  Performance
                </h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex justify-between">
                    <span>Generation Time</span>
                    <span className="text-white">0.5-2 seconds</span>
                  </li>
                  <li className="flex justify-between">
                    <span>API Latency</span>
                    <span className="text-white">&lt;100ms</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Concurrent Users</span>
                    <span className="text-white">Unlimited</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Uptime</span>
                    <span className="text-white">99.99%</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          className="rounded-2xl bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-8 md:p-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Glowing accent */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500 rounded-full filter blur-3xl opacity-20"></div>

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <Badge
              variant="outline"
              className="mb-4 px-3 py-1 text-sm font-medium text-purple-300 border-purple-500/50 bg-purple-500/10 backdrop-blur-sm"
            >
              Get Started Today
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your ideas into 3D?</h2>
            <p className="text-gray-300 mb-8">
              Join thousands of designers, developers, and creators who are already using SculptAI to bring their ideas
              to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 relative overflow-hidden group"
                onClick={handleGenerateClick}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600/40 to-blue-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 flex items-center">
                  Start Generating Now{" "}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                View Pricing
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-gray-800">
        {/* Mesh texture overlay */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        {/* Main footer content */}
        <div className="relative">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-95"></div>

          {/* Content */}
          <div className="relative container mx-auto px-4">
            {/* Main footer sections */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 py-16">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 relative overflow-hidden rounded-xl">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_8722.JPEG-xcZ9NvqXRVFt8lNlstaandiUopt2Ac.jpeg"
                      alt="SculptAI Logo"
                      width={64}
                      height={64}
                      className="object-contain hover:scale-110 transition-transform duration-300"
                      style={{ borderRadius: "10px" }}
                    />
                  </div>
                  <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    SculptAI
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Next-generation 3D model creation powered by artificial intelligence and blockchain technology.
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-green-500/30 text-green-400 bg-green-500/10">
                    Solana Powered
                  </Badge>
                  <Badge variant="outline" className="border-blue-500/30 text-blue-400 bg-blue-500/10">
                    AI Driven
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-6 text-white">Product</h3>
                <ul className="space-y-4 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block"
                    >
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block"
                    >
                      Gallery
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block"
                    >
                      Roadmap
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-6 text-white">Resources</h3>
                <ul className="space-y-4 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block"
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block"
                    >
                      API Reference
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block"
                    >
                      Tutorials
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block"
                    >
                      Blog
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-6 text-white">Company</h3>
                <ul className="space-y-4 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block"
                    >
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom section */}
            <div className="border-t border-gray-800 py-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-400 text-sm">© {new Date().getFullYear()} SculptAI. All rights reserved.</p>
                <p className="text-gray-500 text-sm">Connect with us on social media for updates and announcements.</p>
              </div>
            </div>

            {/* Blockchain info */}
            <div className="py-8">
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <Wallet className="h-5 w-5 text-green-400" />
                    <span className="text-sm text-gray-300">Powered by Solana Blockchain</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-blue-400" />
                    <span className="text-sm text-gray-300">Secure Transactions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Repeat className="h-5 w-5 text-purple-400" />
                    <span className="text-sm text-gray-300">Low Transaction Fees</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-pink-400" />
                    <span className="text-sm text-gray-300">Buy Credits with SOL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// 3D Model Components
function HeroModel() {
  const meshRef = useRef()

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Slow auto-rotation
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.1
    }
  })

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.3, 256, 64]} />
      <MeshDistortMaterial
        color="#4f46e5"
        emissive="#2563eb"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
        distort={0.3}
        speed={2}
      />
    </mesh>
  )
}

function BlockyRobotModel() {
  const { scene } = useGLTF(
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blocky_robot-uZqAlqIWMAqwmmgsMfhPwnuFqceFFa.glb",
  )

  useFrame(({ clock }) => {
    if (scene) {
      scene.rotation.y = clock.getElapsedTime() * 0.2
    }
  })

  return <primitive object={scene} scale={1.5} position={[0, -1, 0]} />
}

function ImageTo3DModel() {
  return (
    <mesh>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial color="#3b82f6" metalness={0.6} roughness={0.2} distort={0.2} speed={1.5} />
    </mesh>
  )
}

function SketchTo3DModel() {
  return (
    <mesh>
      <cylinderGeometry args={[1, 1, 2, 64]} />
      <MeshWobbleMaterial color="#6366f1" metalness={0.6} roughness={0.2} factor={0.1} speed={0.5} />
    </mesh>
  )
}

function StyleTransferModel() {
  return (
    <mesh>
      <icosahedronGeometry args={[1, 2]} />
      <MeshDistortMaterial color="#ec4899" metalness={0.6} roughness={0.2} distort={0.4} speed={2} />
    </mesh>
  )
}

function AITexturingModel() {
  return (
    <mesh>
      <dodecahedronGeometry args={[1, 0]} />
      <MeshDistortMaterial color="#10b981" metalness={0.7} roughness={0.1} distort={0.2} speed={1} />
    </mesh>
  )
}

function SolanaModel() {
  const meshRef = useRef()

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.2
    }
  })

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <MeshDistortMaterial
        color="#14f195"
        emissive="#14f195"
        emissiveIntensity={0.3}
        metalness={0.9}
        roughness={0.1}
        distort={0.2}
        speed={1.5}
      />
    </mesh>
  )
}

// UI Components
function TechStat({ value, label }) {
  return (
    <div className="bg-gray-900/30 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
      <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
        {value}
      </div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  )
}

function TechnicalFeatureCard({ title, description, icon, stats = [] }) {
  return (
    <div className="bg-gray-900/30 border border-white/10 rounded-xl p-6 hover:bg-gray-900/50 transition-colors relative group overflow-hidden h-full">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4">
          {typeof icon === "string" ? (
            <Image src={icon || "/placeholder.svg"} width={24} height={24} alt={title} />
          ) : (
            icon
          )}
        </div>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-4">{description}</p>

        {stats.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-800">
            {stats.map((stat, index) => (
              <div key={index} className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">{stat.label}</span>
                <span className="text-sm font-medium text-white bg-gray-800 px-2 py-1 rounded">{stat.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


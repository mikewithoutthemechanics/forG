import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import reasons from './reasons'
import './App.css'

const AuroraBackground = () => {
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrame
    let time = 0
    
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resize()
    window.addEventListener('resize', resize)
    
    const draw = () => {
      time += 0.008
      
      // Dark gradient base
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, '#0a0612')
      gradient.addColorStop(0.5, '#1a0f2e')
      gradient.addColorStop(1, '#0a0612')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Aurora waves
      for (let i = 0; i < 5; i++) {
        const yBase = canvas.height * 0.3 + i * 80
        const amplitude = 50 + i * 20
        const frequency = 0.01 + i * 0.002
        
        const auroraGrad = ctx.createLinearGradient(0, yBase - amplitude, 0, yBase + amplitude)
        auroraGrad.addColorStop(0, 'transparent')
        auroraGrad.addColorStop(0.5, `rgba(244, 185, 66, ${0.15 - i * 0.02})`)
        auroraGrad.addColorStop(1, 'transparent')
        
        ctx.beginPath()
        ctx.moveTo(0, yBase)
        
        for (let x = 0; x < canvas.width; x += 5) {
          const y = yBase + Math.sin(x * frequency + time + i) * amplitude 
            + Math.sin(x * frequency * 2 + time * 1.5) * (amplitude * 0.5)
          ctx.lineTo(x, y)
        }
        
        ctx.strokeStyle = auroraGrad
        ctx.lineWidth = 30 + i * 10
        ctx.stroke()
      }
      
      // Floating golden orbs
      for (let i = 0; i < 20; i++) {
        const x = (Math.sin(time * 0.5 + i * 0.8) * 0.5 + 0.5) * canvas.width
        const y = (Math.cos(time * 0.3 + i * 1.2) * 0.5 + 0.5) * canvas.height
        const size = 2 + Math.sin(time + i) * 1
        
        const orbGrad = ctx.createRadialGradient(x, y, 0, x, y, size * 8)
        orbGrad.addColorStop(0, 'rgba(255, 209, 102, 0.8)')
        orbGrad.addColorStop(0.5, 'rgba(244, 185, 66, 0.3)')
        orbGrad.addColorStop(1, 'transparent')
        
        ctx.beginPath()
        ctx.arc(x, y, size * 8, 0, Math.PI * 2)
        ctx.fillStyle = orbGrad
        ctx.fill()
        
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 230, 180, 0.9)'
        ctx.fill()
      }
      
      // Sparkle stars
      for (let i = 0; i < 50; i++) {
        const x = (i * 137.5) % canvas.width
        const y = (i * 73.3) % canvas.height
        const twinkle = Math.sin(time * 3 + i) * 0.5 + 0.5
        
        if (twinkle > 0.7) {
          ctx.beginPath()
          ctx.arc(x, y, twinkle * 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 209, 102, ${twinkle})`
          ctx.fill()
        }
      }
      
      animationFrame = requestAnimationFrame(draw)
    }
    
    draw()
    
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrame)
    }
  }, [])
  
  return <canvas ref={canvasRef} className="aurora-canvas" />
}

const FloatingPetals = () => (
  <div className="petals-container">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="petal"
        initial={{ 
          x: Math.random() * 100 + '%',
          y: -20,
          rotate: 0,
          scale: 0
        }}
        animate={{ 
          y: '110vh',
          rotate: [0, 360, 720],
          scale: [0, 1, 0.8, 0],
          x: [null, Math.random() * 200 - 100 + 'px']
        }}
        transition={{ 
          duration: 8 + Math.random() * 6,
          repeat: Infinity,
          delay: Math.random() * 10,
          ease: "linear"
        }}
        style={{
          background: `radial-gradient(circle, rgba(244,185,66,0.8) 0%, rgba(212,155,42,0.4) 100%)`,
          width: 15 + Math.random() * 20,
          height: 15 + Math.random() * 20,
          borderRadius: '50%'
        }}
      />
    ))}
  </div>
)

const GiantSunflower = () => (
  <motion.div 
    className="sunflower-hero"
    animate={{ 
      rotate: [0, 3, -3, 0],
      scale: [1, 1.03, 1]
    }}
    transition={{ 
      duration: 5, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
  >
    <div className="sunflower-glow" />
    <div className="sunflower-center-large">
      {[...Array(12)].map((_, i) => (
        <div 
          key={i}
          className="center-detail"
          style={{ transform: `rotate(${i * 30}deg) translateY(-20px)` }}
        />
      ))}
    </div>
    {[...Array(28)].map((_, i) => (
      <motion.div 
        key={i}
        className="petal-large"
        style={{ transform: `rotate(${i * 12.86}deg) translateY(-90px)` }}
        animate={{
          scaleY: [1, 1.08, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: i * 0.08,
          ease: "easeInOut"
        }}
      />
    ))}
  </motion.div>
)

const GlowCard3D = ({ children, delay }) => {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const rotateX = useTransform(y, [-200, 200], [20, -20])
  const rotateY = useTransform(x, [-200, 200], [-20, 20])
  
  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }
  
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }
  
  return (
    <motion.div
      ref={ref}
      className="card-3d"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.02, z: 10 }}
    >
      <div className="card-shine" />
      {children}
    </motion.div>
  )
}

function App() {
  const [showMessage, setShowMessage] = useState(false)
  const [showReasons, setShowReasons] = useState(false)

  return (
    <div className="app">
      <AuroraBackground />
      <FloatingPetals />
      
      {/* Giant sunflower on intro only */}
      {!showMessage && !showReasons && <GiantSunflower />}

      <AnimatePresence>
        {!showMessage && !showReasons && (
          <motion.div 
            className="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <motion.div className="hero-box" style={{ transform: "translateZ(0)" }}>
              <motion.h1 
                className="main-title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                For My Gezelle
              </motion.h1>
              
              <motion.p 
                className="subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                100 reasons why I love you
              </motion.p>
              
              <motion.button 
                className="enter-button"
                onClick={() => setShowMessage(true)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.08, boxShadow: "0 0 60px rgba(244,185,66,0.7)" }}
                whileTap={{ scale: 0.95 }}
              >
                Tap to enter
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMessage && !showReasons && (
          <motion.div 
            className="letter-section"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="love-letter"
              initial={{ scale: 0.9, rotate: -2 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="letter-glow" />
              
              <motion.h2 
                className="letter-heading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                💛 My Dearest Gezelle 💛
              </motion.h2>
              
              <div className="divider-gold" />
              
              <motion.p 
                className="letter-para"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                I know I've been so preoccupied lately, but I want you to know something...
              </motion.p>
              
              <motion.p 
                className="letter-highlight"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
              >
                Having you by my side gives me more motivation than ever to keep building this life for us!
              </motion.p>
              
              <motion.p 
                className="letter-para"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                Here are 100 reasons why I love you 💕
              </motion.p>
              
              <motion.button 
                className="continue-button"
                onClick={() => setShowReasons(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Read them 💛
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showReasons && (
          <motion.div 
            className="reasons-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.h1 
              className="reasons-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              💛 100 Reasons Why I Love You 💛
            </motion.h1>
            
            <div className="reasons-grid">
              {reasons.map((reason, index) => (
                <GlowCard3D key={index} delay={index * 0.008}>
                  <span className="reason-num">{index + 1}</span>
                  <span className="reason-msg">{reason}</span>
                </GlowCard3D>
              ))}
            </div>
            
            <motion.button 
              className="back-home"
              onClick={() => { setShowReasons(false); setShowMessage(false); }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              ← Back
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
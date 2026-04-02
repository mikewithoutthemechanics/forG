import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import reasons from './reasons'
import './App.css'

const AnimatedBackground = () => {
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrame
    let particles = []
    
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resize()
    window.addEventListener('resize', resize)
    
    class Particle {
      constructor() {
        this.reset()
      }
      
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.opacity = Math.random() * 0.5 + 0.2
      }
      
      update() {
        this.x += this.speedX
        this.y += this.speedY
        
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
      }
      
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(244, 185, 66, ${this.opacity})`
        ctx.fill()
      }
    }
    
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle())
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y)
          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(244, 185, 66, ${0.1 * (1 - dist / 150)})`
            ctx.stroke()
          }
        })
      })
      
      particles.forEach(p => {
        p.update()
        p.draw()
      })
      
      animationFrame = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrame)
    }
  }, [])
  
  return <canvas ref={canvasRef} className="particle-canvas" />
}

const GlowCard = ({ children, delay }) => {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const rotateX = useTransform(y, [-100, 100], [30, -30])
  const rotateY = useTransform(x, [-100, 100], [-30, 30])
  
  const handleMouseMove = (e) => {
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
      className="glow-card"
      style={{ rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ scale: 1.03 }}
    >
      {children}
      <div className="glow-effect" />
    </motion.div>
  )
}

const GiantSunflower = () => (
  <motion.div 
    className="giant-sunflower-container"
    animate={{ 
      rotate: [0, 8, -8, 0],
      scale: [1, 1.05, 1]
    }}
    transition={{ 
      duration: 6, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
  >
    <div className="sunflower-glow" />
    <div className="sunflower-center">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="center-dot" style={{ 
          transform: `rotate(${i * 45}deg) translateY(-15px)` 
        }} />
      ))}
    </div>
    {[...Array(24)].map((_, i) => (
      <motion.div 
        key={i}
        className="sunflower-petal"
        style={{ 
          transform: `rotate(${i * 15}deg) translateY(-70px)`,
          animationDelay: `${i * 0.15}s`
        }}
        animate={{
          scaleY: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.1,
          ease: "easeInOut"
        }}
      />
    ))}
  </motion.div>
)

const FloatingElement = ({ delay, children }) => (
  <motion.div
    className="floating-element"
    initial={{ 
      x: Math.random() * 100 - 50,
      y: -50,
      opacity: 0 
    }}
    animate={{ 
      y: [null, 700],
      opacity: [0, 0.8, 0],
      rotate: [0, 360]
    }}
    transition={{ 
      duration: 10 + Math.random() * 5,
      repeat: Infinity,
      delay,
      ease: "linear"
    }}
    style={{
      left: `${Math.random() * 90 + 5}%`,
    }}
  >
    {children}
  </motion.div>
)

function App() {
  const [showMessage, setShowMessage] = useState(false)
  const [showReasons, setShowReasons] = useState(false)

  return (
    <div className="container">
      <AnimatedBackground />
      
      {/* Floating elements */}
      {[...Array(15)].map((_, i) => (
        <FloatingElement key={i} delay={i * 2}>
          <span style={{ fontSize: '1.5rem', filter: 'drop-shadow(0 0 10px gold)' }}>
            {['🌻', '💛', '✨', '💫'][i % 4]}
          </span>
        </FloatingElement>
      ))}
      
      {/* Giant sunflower on intro */}
      {!showMessage && !showReasons && <GiantSunflower />}

      <AnimatePresence>
        {!showMessage && !showReasons && (
          <motion.div 
            className="intro-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <motion.div 
              className="hero-content"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <motion.h1 
                className="title"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                style={{ textShadow: '0 0 40px rgba(244, 185, 66, 0.5)' }}
              >
                For My Gezelle
              </motion.h1>
              
              <motion.p 
                className="subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                100 reasons why I love you
              </motion.p>
              
              <motion.button 
                className="enter-btn"
                onClick={() => setShowMessage(true)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: '0 0 50px rgba(244, 185, 66, 0.8)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="btn-shimmer" />
                Tap to enter
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMessage && !showReasons && (
          <motion.div 
            className="message-screen"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div 
              className="immersive-letter"
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="letter-shine" />
              
              <motion.h2 
                className="letter-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                💛 My Dearest Gezelle 💛
              </motion.h2>
              
              <motion.div className="letter-divider" />
              
              <motion.p 
                className="letter-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                I know I've been so preoccupied lately, but I want you to know something...
              </motion.p>
              
              <motion.p 
                className="letter-highlight"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                style={{ 
                  boxShadow: '0 0 30px rgba(244, 185, 66, 0.3)',
                  border: '2px solid rgba(244, 185, 66, 0.5)'
                }}
              >
                Having you by my side gives me more motivation than ever to keep building this life for us!
              </motion.p>
              
              <motion.p 
                className="letter-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Here are 100 reasons why I love you 💕
              </motion.p>
              
              <motion.button 
                className="continue-btn"
                onClick={() => setShowReasons(true)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                whileHover={{ 
                  scale: 1.08,
                  boxShadow: '0 0 40px rgba(244, 185, 66, 0.6)'
                }}
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
            className="reasons-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="page-title"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ 
                textShadow: '0 0 30px rgba(244, 185, 66, 0.5)'
              }}
            >
              💛 100 Reasons Why I Love You 💛
            </motion.h1>
            
            <div className="reasons-container">
              {reasons.map((reason, index) => (
                <GlowCard key={index} delay={index * 0.01}>
                  <span className="reason-number">{index + 1}</span>
                  <span className="reason-message">{reason}</span>
                </GlowCard>
              ))}
            </div>
            
            <motion.button 
              className="back-button"
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
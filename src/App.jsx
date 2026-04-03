import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import reasons from './reasons'
import './App.css'

// ==================== SVG COMPONENTS ====================

const SunflowerSVG = ({ size = 300, animated = true }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" className="sunflower-svg">
    <defs>
      <linearGradient id="petalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFD166" />
        <stop offset="100%" stopColor="#D49B2A" />
      </linearGradient>
      <radialGradient id="centerGrad" cx="30%" cy="30%">
        <stop offset="0%" stopColor="#8B5A2B" />
        <stop offset="100%" stopColor="#3D2510" />
      </radialGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Glow effect */}
    <circle cx="100" cy="100" r="90" fill="rgba(244,185,66,0.2)" className={animated ? "pulse-glow" : ""} />
    
    {/* Petals */}
    {[...Array(24)].map((_, i) => {
      const angle = i * 15
      const rad = (angle * Math.PI) / 180
      const x = 100 + 70 * Math.cos(rad)
      const y = 100 + 70 * Math.sin(rad)
      return (
        <motion.g
          key={i}
          animate={animated ? { 
            rotate: [angle - 3, angle + 3, angle - 3],
            scale: [1, 1.05, 1]
          } : {}}
          transition={animated ? { 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: i * 0.1 
          } : {}}
          style={{ transformOrigin: '100px 100px' }}
        >
          <ellipse 
            cx={x} cy={y} rx="12" ry="35" 
            fill="url(#petalGrad)"
            transform={`rotate(${angle} ${x} ${y})`}
            filter="url(#glow)"
          />
        </motion.g>
      )
    })}
    
    {/* Center */}
    <circle cx="100" cy="100" r="35" fill="url(#centerGrad)" />
    {[...Array(16)].map((_, i) => (
      <circle 
        key={i} 
        cx={100 + 20 * Math.cos(i * Math.PI / 8)} 
        cy={100 + 20 * Math.sin(i * Math.PI / 8)} 
        r="4" 
        fill="#2d1a0a"
      />
    ))}
  </svg>
)

const ReasonCardSVG = ({ number, text, delay, isHovered, onHover }) => {
  const colors = [
    ['#FFD166', '#F4B942', '#D49B2A'],
    ['#FF6B6B', '#EE5A5A', '#CC4444'],
    ['#4ECDC4', '#3DBDB5', '#2AADA5'],
    ['#A78BFA', '#8B5CF6', '#7C3AED'],
    ['#F472B6', '#EC4899', '#DB2777'],
  ]
  const colorScheme = colors[number % 5]
  
  return (
    <motion.div 
      className="reason-svg-card"
      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ delay: delay * 0.01, duration: 0.5, type: "spring" }}
      whileHover={{ 
        scale: 1.05, 
        rotate: Math.random() * 6 - 3,
        boxShadow: `0 20px 60px ${colorScheme[0]}40`
      }}
      onMouseEnter={() => onHover(number)}
      onMouseLeave={() => onHover(null)}
      style={{
        '--color-1': colorScheme[0],
        '--color-2': colorScheme[1],
        '--color-3': colorScheme[2],
      }}
    >
      <svg viewBox="0 0 300 120" className="card-svg">
        <defs>
          <linearGradient id={`grad${number}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorScheme[0]}20 />
            <stop offset="100%" stopColor={colorScheme[1]}30 />
          </linearGradient>
          <filter id={`shadow${number}`}>
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor={colorScheme[0]}40/>
          </filter>
        </defs>
        
        {/* Card background */}
        <rect x="5" y="5" width="290" height="110" rx="20" fill="rgba(20,12,35,0.95)" stroke={colorScheme[1]} strokeWidth="2" filter={`url(#shadow${number})`} />
        
        {/* Gradient overlay */}
        <rect x="5" y="5" width="290" height="110" rx="20" fill={`url(#grad${number})`} />
        
        {/* Number circle */}
        <circle cx="40" cy="60" r="25" fill={colorScheme[0]}30 stroke={colorScheme[1]} strokeWidth="2" />
        <text x="40" y="67" textAnchor="middle" fill={colorScheme[0]} fontSize="22" fontFamily="Playfair Display, serif" fontWeight="bold">{number}</text>
        
        {/* Decorative dots */}
        <circle cx="270" cy="30" r="5" fill={colorScheme[0]} opacity="0.6" />
        <circle cx="280" cy="50" r="3" fill={colorScheme[1]} opacity="0.4" />
        <circle cx="265" cy="90" r="4" fill={colorScheme[2]} opacity="0.5" />
        
        {/* Text */}
        <text x="75" y="55" fill={colorScheme[0]} fontSize="14" fontFamily="Outfit, sans-serif" fontWeight="500">{text.substring(0, 35)}</text>
        {text.length > 35 && (
          <text x="75" y="75" fill={colorScheme[0]} opacity="0.8" fontSize="12" fontFamily="Outfit, sans-serif">{text.substring(35, 70)}</text>
        )}
        
        {/* Shine effect */}
        <rect x="5" y="5" width="290" height="40" rx="20" fill="url(#shine)" opacity="0.1" />
      </svg>
      
      {/* Floating particles when hovered */}
      {isHovered && (
        <div className="card-particles">
          {[...Array(8)].map((_, i) => (
            <motion.span
              key={i}
              className="particle"
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{ 
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                opacity: 0
              }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{ 
                background: colorScheme[0],
                left: '50%',
                top: '50%'
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

// ==================== MAIN SECTIONS ====================

const HeroReveal = ({ onComplete }) => {
  const [revealPhase, setRevealPhase] = useState(0)
  
  useEffect(() => {
    const timer = setTimeout(() => setRevealPhase(1), 500)
    const timer2 = setTimeout(() => setRevealPhase(2), 1500)
    const timer3 = setTimeout(() => setRevealPhase(3), 2500)
    const timer4 = setTimeout(() => onComplete?.(), 4000)
    return () => { clearTimeout(timer); clearTimeout(timer2); clearTimeout(timer3); clearTimeout(timer4) }
  }, [])
  
  return (
    <motion.div 
      className="hero-reveal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.5 }}
    >
      {/* Dark curtain */}
      <motion.div 
        className="curtain"
        animate={{ height: revealPhase === 0 ? '100%' : revealPhase === 1 ? '70%' : revealPhase === 2 ? '30%' : '0%' }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      
      {/* Sunflower appears */}
      <motion.div
        className="reveal-sunflower"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ 
          scale: revealPhase >= 1 ? 1 : 0,
          rotate: revealPhase >= 2 ? 0 : -180
        }}
        transition={{ 
          duration: 1.5, 
          delay: revealPhase >= 1 ? 0.3 : 0,
          type: "spring",
          stiffness: 100
        }}
        style={{ opacity: revealPhase >= 1 ? 1 : 0 }}
      >
        <SunflowerSVG size={350} animated={true} />
      </motion.div>
      
      {/* Title fades in */}
      <motion.div
        className="reveal-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: revealPhase >= 2 ? 1 : 0, y: revealPhase >= 2 ? 0 : 30 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{ opacity: revealPhase >= 2 ? 1 : 0 }}
      >
        <h1>For My Gezelle</h1>
        <p>100 Reasons Why I Love You</p>
        <motion.button 
          className="reveal-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
        >
          Explore 💛
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

const ParallaxBackground = () => {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 2000], [0, 300])
  const y2 = useTransform(scrollY, [0, 2000], [0, -200])
  const y3 = useTransform(scrollY, [0, 2000], [0, 150])
  
  return (
    <div className="parallax-bg">
      <motion.div style={{ y: y1 }} className="layer layer-1" />
      <motion.div style={{ y: y2 }} className="layer layer-2" />
      <motion.div style={{ y: y3 }} className="layer layer-3" />
    </div>
  )
}

function App() {
  const [started, setStarted] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const { scrollY } = useScroll()
  
  return (
    <div className="app">
      <ParallaxBackground />
      
      {!started ? (
        <HeroReveal onComplete={() => setStarted(true)} />
      ) : (
        <>
          {/* Fixed sunflower in corner */}
          <motion.div 
            className="corner-sunflower"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            style={{ top: '20px', right: '20px' }}
          >
            <SunflowerSVG size={80} animated={false} />
          </motion.div>
          
          {/* Main content */}
          <section className="main-content">
            <motion.h1 
              className="main-title"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
            >
              💛 100 Reasons Why I Love You 💛
            </motion.h1>
            
            <div className="reasons-container">
              {reasons.map((reason, index) => (
                <ReasonCardSVG 
                  key={index}
                  number={index + 1}
                  text={reason}
                  delay={index}
                  isHovered={hoveredCard === index}
                  onHover={setHoveredCard}
                />
              ))}
            </div>
            
            <motion.button 
              className="back-btn"
              onClick={() => { setStarted(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              whileHover={{ scale: 1.05 }}
            >
              ← Start Over
            </motion.button>
          </section>
        </>
      )}
    </div>
  )
}

export default App
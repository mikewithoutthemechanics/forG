import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import reasons from './reasons'
import './App.css'

const ParallaxBackground = () => {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, 200])
  const y2 = useTransform(scrollY, [0, 1000], [0, -150])
  const y3 = useTransform(scrollY, [0, 1000], [0, 100])
  
  return (
    <div className="parallax-bg">
      <motion.div className="parallax-layer layer-1" style={{ y: y1 }}>
        <div className="stars" />
      </motion.div>
      <motion.div className="parallax-layer layer-2" style={{ y: y2 }}>
        <div className="moon" />
      </motion.div>
      <motion.div className="parallax-layer layer-3" style={{ y: y3 }}>
        <div className="mountains" />
      </motion.div>
    </div>
  )
}


const HeroSection = ({ onEnter }) => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.8])
  
  return (
    <motion.section 
      className="hero-section"
      style={{ y, opacity, scale }}
    >
      <motion.div 
        className="sunflower-hero"
        animate={{ 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <div className="sunflower-glow" />
        <div className="sunflower-center">
          {[...Array(16)].map((_, i) => (
            <div 
              key={i} 
              className="center-seed"
              style={{ transform: `rotate(${i * 22.5}deg) translateY(-18px)` }}
            />
          ))}
        </div>
        {[...Array(28)].map((_, i) => (
          <div 
            key={i}
            className="sunflower-petal"
            style={{ transform: `rotate(${i * 12.86}deg) translateY(-85px)` }}
          />
        ))}
      </motion.div>
      
      <motion.h1 
        className="hero-title"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        For My Gezelle
      </motion.h1>
      
      <motion.p 
        className="hero-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Scroll to explore 💛
      </motion.p>
      
      <motion.button 
        className="scroll-indicator"
        onClick={onEnter}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{ bottom: '50px' }}
      >
        ↓
      </motion.button>
    </motion.section>
  )
}

const LetterSection = () => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [300, 800], [100, 0])
  const opacity = useTransform(scrollY, [300, 500], [0, 1])
  
  return (
    <motion.section 
      className="letter-section"
      style={{ y, opacity }}
    >
      <motion.div className="love-letter">
        <h2 className="letter-title">💛 My Dearest Gezelle 💛</h2>
        <div className="divider" />
        <p className="letter-text">
          I know I've been so preoccupied lately, but I want you to know something...
        </p>
        <p className="letter-highlight">
          Having you by my side gives me more motivation than ever to keep building this life for us!
        </p>
        <p className="letter-text">
          Here are 100 reasons why I love you 💕
        </p>
      </motion.div>
    </motion.section>
  )
}

const ReasonCard = ({ reason, index }) => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [index * 50, index * 50 + 500], [50, 0])
  const opacity = useTransform(scrollY, [index * 50, index * 50 + 200], [0, 1])
  
  return (
    <motion.div 
      className="reason-card"
      style={{ y, opacity }}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, x: 10 }}
    >
      <span className="reason-num">{index + 1}</span>
      <span className="reason-msg">{reason}</span>
    </motion.div>
  )
}

function App() {
  const [started, setStarted] = useState(false)
  const { scrollY } = useScroll()
  
  const showLetter = useTransform(scrollY, [400, 700], [0, 1])
  const letterOpacity = useTransform(scrollY, [500, 700], [0, 1])
  
  return (
    <div className="app">
      <ParallaxBackground />
      
      
      <HeroSection onEnter={() => window.scrollTo({ top: 400, behavior: 'smooth' })} />
      
      <motion.div style={{ transform: showLetter, opacity: letterOpacity }}>
        <LetterSection />
      </motion.div>
      
      <section className="reasons-section">
        <motion.h1 
          className="section-title"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
        >
          💛 100 Reasons Why I Love You 💛
        </motion.h1>
        
        <div className="reasons-container">
          {reasons.map((reason, index) => (
            <ReasonCard key={index} reason={reason} index={index} />
          ))}
        </div>
      </section>
      
      <motion.button 
        className="back-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
      >
        ↑
      </motion.button>
    </div>
  )
}

export default App
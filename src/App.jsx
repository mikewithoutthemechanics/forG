import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import reasons from './reasons'
import './App.css'

const Sunflower = ({ className, delay = 0 }) => (
  <motion.svg 
    className={className}
    viewBox="0 0 100 100"
    initial={{ rotate: 0 }}
    animate={{ rotate: 360 }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear", delay }}
  >
    <circle cx="50" cy="50" r="12" fill="#8B4513"/>
    <circle cx="50" cy="50" r="8" fill="#5D3A1A"/>
    {[...Array(20)].map((_, i) => {
      const angle = (i * 360) / 20;
      const rad = (angle * Math.PI) / 180;
      return (
        <ellipse
          key={i}
          cx={50 + 35 * Math.cos(rad)}
          cy={50 + 35 * Math.sin(rad)}
          rx="6"
          ry="18"
          fill="#FFD700"
          transform={`rotate(${angle} 50 50)`}
        />
      );
    })}
  </motion.svg>
)

const FloatingPetal = ({ delay }) => (
  <motion.div
    className="petal"
    initial={{ 
      x: Math.random() * 100 - 50,
      y: -20,
      rotate: 0,
      opacity: 0 
    }}
    animate={{ 
      y: [null, 400],
      rotate: [0, 360],
      opacity: [0, 1, 0]
    }}
    transition={{ 
      duration: 8 + Math.random() * 4,
      repeat: Infinity,
      delay,
      ease: "linear"
    }}
    style={{
      left: `${Math.random() * 100}%`,
    }}
  />
)

const Star = ({ delay, size }) => (
  <motion.div
    className="star"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
    transition={{ 
      duration: 2 + Math.random() * 2,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
    style={{
      width: size,
      height: size,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
  />
)

function App() {
  const [showMessage, setShowMessage] = useState(false)
  const [showReasons, setShowReasons] = useState(false)

  return (
    <div className="container">
      {/* Floating decorations */}
      <Sunflower className="sunflower-decor top-left" delay={0} />
      <Sunflower className="sunflower-decor top-right" delay={-5} />
      <Sunflower className="sunflower-decor bottom-left" delay={-10} />
      <Sunflower className="sunflower-decor bottom-right" delay={-15} />
      
      {[...Array(8)].map((_, i) => (
        <FloatingPetal key={i} delay={i * 2} />
      ))}
      
      {[...Array(12)].map((_, i) => (
        <Star key={i} delay={i * 0.5} size={3 + Math.random() * 4} />
      ))}

      <AnimatePresence>
        {!showMessage && !showReasons && (
          <motion.div 
            className="intro-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <motion.div 
              className="hero-content"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.h1 
                className="title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                For Gezelle
              </motion.h1>
              
              <motion.p 
                className="subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                100 reasons why I love you
              </motion.p>
              
              <motion.button 
                className="enter-btn"
                onClick={() => setShowMessage(true)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Enter
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
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="message-content">
              <motion.div 
                className="message-paper"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Sunflower className="corner-sunflower" />
                
                <motion.p 
                  className="salutation"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  My dearest Gezelle,
                </motion.p>
                
                <motion.div 
                  className="divider"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                />
                
                <motion.p 
                  className="message-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  I've been so caught up in everything lately, but I want you to know — having you by my side gives me more motivation than ever to keep building this life with you.
                </motion.p>
                
                <motion.p 
                  className="message-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                >
                  Every moment with you is a gift. Here's 100 reasons why I love you.
                </motion.p>
                
                <motion.button 
                  className="continue-btn"
                  onClick={() => setShowReasons(true)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read them →
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showReasons && (
          <motion.div 
            className="reasons-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.h1 
              className="page-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              100 Reasons Why I Love You
            </motion.h1>
            
            <div className="reasons-container">
              {reasons.map((reason, index) => (
                <motion.div 
                  key={index}
                  className="reason-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-30px" }}
                  transition={{ delay: index * 0.01, duration: 0.3 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <span className="reason-num">{index + 1}</span>
                  <span className="reason-msg">{reason}</span>
                </motion.div>
              ))}
            </div>
            
            <motion.button 
              className="back-home"
              onClick={() => { setShowReasons(false); setShowMessage(false); }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              ← Back to start
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
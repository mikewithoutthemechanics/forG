import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import reasons from './reasons'
import './App.css'

const SunflowerSVG = () => (
  <svg className="sunflower" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    {/* Center */}
    <circle cx="50" cy="50" r="15" fill="#8B4513"/>
    <circle cx="50" cy="50" r="10" fill="#654321"/>
    {/* Petals */}
    {[...Array(16)].map((_, i) => {
      const angle = (i * 360) / 16;
      const rad = (angle * Math.PI) / 180;
      const x1 = 50 + 15 * Math.cos(rad);
      const y1 = 50 + 15 * Math.sin(rad);
      const x2 = 50 + 45 * Math.cos(rad);
      const y2 = 50 + 45 * Math.sin(rad);
      return (
        <ellipse
          key={i}
          cx={50 + 30 * Math.cos(rad)}
          cy={50 + 30 * Math.sin(rad)}
          rx="8"
          ry="20"
          fill="#FFD700"
          transform={`rotate(${angle} 50 50)`}
        />
      );
    })}
    {/* Inner petals */}
    {[...Array(8)].map((_, i) => {
      const angle = (i * 360) / 8 + 11.25;
      const rad = (angle * Math.PI) / 180;
      return (
        <ellipse
          key={`inner-${i}`}
          cx={50 + 22 * Math.cos(rad)}
          cy={50 + 22 * Math.sin(rad)}
          rx="5"
          ry="12"
          fill="#FFA500"
          transform={`rotate(${angle} 50 50)`}
        />
      );
    })}
  </svg>
)

function App() {
  const [showMessage, setShowMessage] = useState(false)
  const [showReasons, setShowReasons] = useState(false)

  const goToMessage = () => {
    setShowMessage(true)
  }

  const goToReasons = () => {
    setShowMessage(false)
    setShowReasons(true)
  }

  return (
    <div className="container">
      <AnimatePresence>
        {!showMessage && !showReasons && (
          <motion.div 
            className="intro-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <motion.div 
              className="heart-container"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2
              }}
            >
              <motion.div 
                className="heart-glow"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="heart"
                animate={{ 
                  scale: [1, 1.08, 1],
                  rotate: [0, 3, -3, 0]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ❤️
              </motion.div>
            </motion.div>
            
            <motion.h1 
              className="title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              100 Reasons Why I Love You
            </motion.h1>
            
            <motion.button 
              className="click-me-btn"
              onClick={goToMessage}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              Click Me
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMessage && (
          <motion.div 
            className="message-screen"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
          >
            <div className="sunflower-container">
              <SunflowerSVG />
            </div>
            <motion.div 
              className="glass-card"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.p 
                className="salutation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                To my dearest Gezelle,
              </motion.p>
              <motion.p 
                className="message-body"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                I know I've been so preoccupied, and I can't express how having you by my side has given me more motivation than ever to keep building this life for us!
              </motion.p>
              <motion.button 
                className="continue-btn"
                onClick={goToReasons}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue ↓
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
                  className="reason-card glass-card-sm"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ delay: index * 0.015, duration: 0.4 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  <span className="reason-number">{index + 1}</span>
                  <span className="reason-text">{reason}</span>
                </motion.div>
              ))}
            </div>
            
            <button className="back-btn" onClick={() => setShowReasons(false)}>
              ← Back
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
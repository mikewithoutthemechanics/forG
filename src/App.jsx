import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import reasons from './reasons'
import './App.css'

const GiantSunflower = () => (
  <motion.div 
    className="giant-sunflower"
    animate={{ 
      rotate: [0, 5, -5, 0],
      scale: [1, 1.02, 1]
    }}
    transition={{ 
      duration: 4, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
  >
    <div className="sunflower-center" />
    {[...Array(24)].map((_, i) => {
      const angle = i * 15;
      return (
        <div 
          key={i} 
          className="petal"
          style={{ 
            transform: `rotate(${angle}deg) translateY(-60px)`,
            animationDelay: `${i * 0.1}s`
          }} 
        />
      );
    })}
  </motion.div>
)

const FloatingPetal = ({ delay, size, left }) => (
  <motion.div
    className="floating-petal"
    initial={{ 
      x: 0,
      y: -50,
      rotate: 0,
      opacity: 0 
    }}
    animate={{ 
      y: [null, 600],
      rotate: [0, 360],
      opacity: [0, 0.8, 0]
    }}
    transition={{ 
      duration: 8 + Math.random() * 4,
      repeat: Infinity,
      delay,
      ease: "linear"
    }}
    style={{
      left: `${left}%`,
      width: size,
      height: size,
    }}
  />
)

function App() {
  const [showMessage, setShowMessage] = useState(false)
  const [showReasons, setShowReasons] = useState(false)

  return (
    <div className="container">
      {/* Giant sunflower in center */}
      {!showMessage && !showReasons && (
        <GiantSunflower />
      )}
      
      {/* Floating petals */}
      {[...Array(12)].map((_, i) => (
        <FloatingPetal 
          key={i} 
          delay={i * 1.5} 
          size={20 + Math.random() * 30}
          left={10 + Math.random() * 80}
        />
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
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.h1 
                className="title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                For My Gezelle
              </motion.h1>
              
              <motion.p 
                className="subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                100 reasons why I love you
              </motion.p>
              
              <motion.button 
                className="enter-btn"
                onClick={() => setShowMessage(true)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 }}
                whileHover={{ scale: 1.08 }}
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
            className="message-screen"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <motion.div 
              className="letter-container"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <div className="sunflower-corner top-right" />
              <div className="sunflower-corner bottom-left" />
              
              <motion.h2 
                className="letter-title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                💛 My Dearest Gezelle 💛
              </motion.h2>
              
              <motion.p 
                className="letter-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                I know I've been so preoccupied lately, but I want you to know something...
              </motion.p>
              
              <motion.p 
                className="letter-highlight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Having you by my side gives me more motivation than ever to keep building this life for us!
              </motion.p>
              
              <motion.p 
                className="letter-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                Here are 100 reasons why I love you 💕
              </motion.p>
              
              <motion.button 
                className="continue-btn"
                onClick={() => setShowReasons(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
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
            className="reasons-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.h1 
              className="page-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              💛 100 Reasons Why I Love You 💛
            </motion.h1>
            
            <div className="reasons-container">
              {reasons.map((reason, index) => (
                <motion.div 
                  key={index}
                  className="reason-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-20px" }}
                  transition={{ delay: index * 0.012, duration: 0.3 }}
                  whileHover={{ scale: 1.02, x: 8 }}
                >
                  <span className="reason-num">{index + 1}</span>
                  <span className="reason-msg">{reason}</span>
                </motion.div>
              ))}
            </div>
            
            <motion.button 
              className="back-btn"
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
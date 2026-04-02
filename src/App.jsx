import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import reasons from './reasons'
import './App.css'

const AnimatedHeart = () => (
  <motion.div
    className="floating-heart"
    animate={{
      y: [0, -20, 0],
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.6, 0.3]
    }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
  >
    💛
  </motion.div>
)

const Sparkle = ({ delay }) => (
  <motion.div
    className="sparkle"
    initial={{ scale: 0, rotate: 0 }}
    animate={{ scale: [0, 1, 0], rotate: [0, 180, 360] }}
    transition={{ duration: 1.5, repeat: Infinity, delay, ease: "easeInOut" }}
  />
)

const FloatingHeart = ({ delay }) => (
  <motion.div
    className="heart-particle"
    initial={{ 
      x: Math.random() * 100 - 50,
      y: -20,
      scale: 0,
      opacity: 0 
    }}
    animate={{ 
      y: [null, 500],
      scale: [0, 1, 0.5],
      opacity: [0, 1, 0],
      x: [null, Math.random() * 100 - 50]
    }}
    transition={{ 
      duration: 6 + Math.random() * 3,
      repeat: Infinity,
      delay,
      ease: "linear"
    }}
  >
    💕
  </motion.div>
)

function App() {
  const [showMessage, setShowMessage] = useState(false)
  const [showReasons, setShowReasons] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <div className="container">
      {/* Floating elements */}
      <AnimatedHeart />
      <AnimatedHeart style={{ top: '20%', right: '10%', animationDelay: '-0.5s' }} />
      <AnimatedHeart style={{ bottom: '30%', left: '5%', animationDelay: '-1s' }} />
      
      {[...Array(15)].map((_, i) => (
        <FloatingHeart key={i} delay={i * 0.8} />
      ))}
      
      {[...Array(20)].map((_, i) => (
        <Sparkle key={i} delay={i * 0.3} />
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
              className="hero"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                className="heart-ring"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 1, type: "spring" }}
              >
                <span className="big-heart">💕</span>
              </motion.div>
              
              <motion.h1 
                className="title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                For My Gezelle 💕
              </motion.h1>
              
              <motion.p 
                className="tagline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                A declaration of love
              </motion.p>
              
              <motion.button 
                className="enter-btn"
                onClick={() => setShowMessage(true)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Tap to enter 💗
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
              className="love-letter"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <motion.div 
                className="letter-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="heart-icon">💕</span>
                <span className="heart-icon">💗</span>
                <span className="heart-icon">💖</span>
              </motion.div>
              
              <motion.p 
                className="salutation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                My Gezelle,
              </motion.p>
              
              <motion.p 
                className="love-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                I know I've been caught up in work lately, but I need you to know something...
              </motion.p>
              
              <motion.p 
                className="love-message highlight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Having you by my side gives me more motivation than ever to build this life for us.
              </motion.p>
              
              <motion.p 
                className="love-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                You are my everything. Here's 100 reasons why I love you...
              </motion.p>
              
              <motion.button 
                className="continue-btn"
                onClick={() => setShowReasons(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Read them 💕
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
            <motion.div
              className="reasons-header"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <span className="header-hearts">💕 💗 💖</span>
              <h1>100 Reasons Why I Love You</h1>
            </motion.div>
            
            <div className="reasons-container">
              {reasons.map((reason, index) => (
                <motion.div 
                  key={index}
                  className="reason-card"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-20px" }}
                  transition={{ delay: index * 0.015, duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="reason-number">{index + 1}</span>
                  <span className="reason-text">{reason}</span>
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
              ← Back to start
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
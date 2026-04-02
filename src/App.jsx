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


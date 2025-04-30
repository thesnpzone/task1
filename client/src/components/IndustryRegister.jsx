import React from 'react'
import { motion } from 'framer-motion';
const IndustryRegister = () => {
  return (
    <motion.div
    className="container-fluid vh-100"
    initial={{ x: '100%', opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: '100%', opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
      <h1 className='text-center' style={{color:'  #385BD5'}}>IndustryRegister</h1>
    </motion.div>
  )
}

export default IndustryRegister

// components/GradientBorder.jsx
import { motion } from 'framer-motion';

export default function GradientBorder() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative p-1 rounded-lg"
      style={{
        background:
          'linear-gradient(90deg, #ff008c, #d309e1, #9c1aff, #7700ff)',
      }}>
      <div className="bg-white rounded-lg p-4">
        <input
          type="text"
          className="w-full p-2 border-none outline-none"
          placeholder="Input with gradient border"
        />
      </div>
    </motion.div>
  );
}

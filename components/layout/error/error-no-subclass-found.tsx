import React from "react";
import { motion } from "framer-motion";

export default function ErrorNoSubClassFound() {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-center max-w-md mx-auto p-8 bg-[#3498db] rounded-2xl shadow-lg"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-2xl font-bold text-white mb-8">
          Oops, something went wrong
        </h1>
        <motion.button
          onClick={() => window.history.back()}
          className="bg-white text-[#3498db] px-8 py-3 rounded-xl hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Go Back
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

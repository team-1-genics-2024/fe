import React from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function ErrorNoClassFound() {
  return (
    <motion.div
      className="text-center py-16 bg-[#3498db] rounded-2xl shadow-lg text-white"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <BookOpen className="w-16 h-16 mx-auto opacity-80 mb-4" />
      <p>No class found. Please try again later.</p>
    </motion.div>
  );
}

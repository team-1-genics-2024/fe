import React from "react";
import { motion } from "framer-motion";
import { Book } from "lucide-react";

export default function LoadingUnprotectedRoute() {
  const loadingVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#3498db]/5">
      <motion.div
        className="relative w-24 h-24"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl bg-[#3498db]"
          variants={loadingVariants}
          animate="animate"
        />
        <div className="absolute inset-2 bg-white rounded-2xl flex items-center justify-center">
          <Book className="text-[#3498db]" />
        </div>
      </motion.div>
    </div>
  );
}

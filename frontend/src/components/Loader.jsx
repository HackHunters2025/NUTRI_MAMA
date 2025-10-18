import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F6F8FB]">
      <motion.div
        className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      ></motion.div>
      <span className="ml-4 text-lg font-semibold text-gray-600">
        Loading...
      </span>
    </div>
  );
};

export default Loader;

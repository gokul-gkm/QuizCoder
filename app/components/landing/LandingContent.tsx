"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiArrowRight,
  FiCode,
  FiAward,
  FiBookOpen,
  FiTarget,
  FiTrendingUp,
  FiUserCheck,
} from "react-icons/fi";

export default function LandingContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-blue-500/10 rounded-xl backdrop-blur-sm border border-blue-500/20">
            <FiCode className="w-12 h-12 text-blue-400" />
          </div>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-300 bg-clip-text text-transparent mb-6">
          Test Your Coding Knowledge
        </h1>
        <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-8">
          Challenge yourself with interactive coding quizzes, track your
          progress, and improve your programming skills with instant feedback.
        </p>

        <div className="flex gap-4 justify-center">
          <Link href="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold flex items-center group hover:from-blue-500 hover:to-blue-400 transition-all duration-300"
            >
              Start Learning
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-xl bg-white/5 text-white font-semibold backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              Login
            </motion.button>
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {features.map((feature, index) => (
          <div key={index} className="relative group h-[280px]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/25 via-blue-400/20 to-purple-500/20 rounded-2xl -z-10 blur-xl group-hover:blur-2xl transition-all duration-300" />
            <div className="card backdrop-blur-xl bg-blue-950/10 border border-blue-500/20 group-hover:border-blue-500/30 transition-all duration-300 rounded-2xl p-6 h-full flex flex-col">
              <div className="p-3 bg-blue-500/20 rounded-xl w-fit mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 flex-grow">{feature.description}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-24 text-center text-gray-500 text-sm"
      >
        <p>© 2024 QuizCoder. All rights reserved.</p>
      </motion.div>
    </div>
  );
}

const features = [
  {
    icon: <FiTarget className="w-6 h-6 text-blue-400" />,
    title: "Targeted Learning",
    description:
      "Take quizzes specifically designed to test and improve your programming knowledge. Each quiz focuses on key coding concepts and best practices.",
  },
  {
    icon: <FiTrendingUp className="w-6 h-6 text-blue-400" />,
    title: "Progress Tracking",
    description:
      "Monitor your performance with detailed statistics. See your scores, track improvements, and identify areas that need more focus.",
  },
  {
    icon: <FiBookOpen className="w-6 h-6 text-blue-400" />,
    title: "Instant Feedback",
    description:
      "Get immediate results after completing each quiz. Review your answers, see detailed explanations, and learn from your mistakes.",
  },
  {
    icon: <FiUserCheck className="w-6 h-6 text-blue-400" />,
    title: "Student & Instructor Roles",
    description:
      "Flexible platform supporting both learners and educators. Students take quizzes while instructors can create and manage them.",
  },
  {
    icon: <FiAward className="w-6 h-6 text-blue-400" />,
    title: "Performance Analytics",
    description:
      "View comprehensive analytics of your quiz attempts. Track your best scores and see how you've improved over time.",
  },
  {
    icon: <FiCode className="w-6 h-6 text-blue-400" />,
    title: "Programming Focus",
    description:
      "Content specifically tailored for programmers. Test your knowledge of various programming languages, concepts, and techniques.",
  },
];

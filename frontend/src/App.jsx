import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Home from "./pages/Home.jsx";
export default function App() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-hero">
      {" "}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none fixed inset-0 -z-10"
      >
        {" "}
        <div className="absolute -top-24 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-primary-500/40 via-fuchsia-500/30 to-emerald-400/30 blur-3xl animate-float" />{" "}
      </motion.div>{" "}
      <header className="sticky top-0 z-20 border-b border-white/10 backdrop-blur-xl bg-black/20">
        {" "}
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          {" "}
          <div className="flex items-center gap-3">
            {" "}
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-primary-400 to-fuchsia-500 grid place-items-center font-bold">
              UM
            </div>{" "}
            <div className="text-lg font-semibold tracking-wide">
              User Management <span className="text-white/50">9.8</span>
            </div>{" "}
          </div>{" "}
          <div className="hidden sm:flex items-center gap-2">
            {" "}
            <a href="#create" className="btn">
              Create
            </a>{" "}
            <a href="#list" className="btn btn-primary">
              Dashboard
            </a>{" "}
          </div>{" "}
        </div>{" "}
      </header>{" "}
      <main className="mx-auto max-w-7xl px-4 py-8">
        {" "}
        <Home mounted={mounted} />{" "}
      </main>{" "}
      <footer className="mx-auto max-w-7xl px-4 pb-10 text-center text-white/60">
        {" "}
        © 2025 Rezaday. All rights reserved. User Management App.{" "}
      </footer>{" "}
    </div>
  );
}

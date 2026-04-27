import React, { useState, Suspense, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

const TeethModule = React.lazy(() => import('./TeethModule'));

export default function TeethModuleWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Horizontal Strip / Banner */}
      <section className="py-12 bg-white dark:bg-slate-950 relative">
        <div className="container mx-auto px-4 cursor-pointer group" onClick={() => setIsOpen(true)}>
          <div className="bg-[#546B41]/5 dark:bg-[#546B41]/10 border border-[#546B41]/20 rounded-3xl p-6 md:p-8 flex items-center justify-between transition-all duration-300 hover:bg-[#546B41]/10 dark:hover:bg-[#546B41]/20 hover:scale-[1.01] hover:shadow-2xl">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#546B41] to-[#6d8a55] flex items-center justify-center flex-shrink-0 text-[#FFF8EC] shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 ml-1" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">Interactive 3D Teeth Set</h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base max-w-2xl">Click to explore the human dental anatomy in a fully interactive 3D module. Click the center to open the jaw.</p>
              </div>
            </div>
            <div className="hidden md:flex text-[#546B41] dark:text-[#b4c99e] font-semibold items-center gap-2 group-hover:translate-x-2 transition-transform bg-white/50 dark:bg-white/5 px-6 py-3 rounded-full border border-[#546B41]/10">
              Launch Module &rarr;
            </div>
          </div>
        </div>
      </section>

      {/* Centered Transparent Popup */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[998] bg-black/60 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />

            {/* Centered popup — flex wrapper for dead-center */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-[999] flex items-center justify-center pointer-events-none p-4 md:p-8"
            >
              <div className="pointer-events-auto w-full max-w-6xl aspect-[16/9] max-h-[85vh]">
                <div className="relative w-full h-full rounded-3xl border border-white/20 shadow-2xl overflow-hidden bg-black/20"
                     style={{ backdropFilter: 'blur(10px)' }}>

                  {/* Close button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/30 border border-white/30 flex items-center justify-center text-white transition-all backdrop-blur-md shadow-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* 3D Teeth Model */}
                  <Suspense fallback={
                    <div className="flex items-center justify-center w-full h-full">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                    </div>
                  }>
                    <TeethModule />
                  </Suspense>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

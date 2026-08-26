/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarNav from "./SidebarNav";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <div className="relative sticky top-0 hidden h-screen shrink-0 md:block">
        <img className="h-full w-auto" src="/sidebar.png" alt="" />
        <SidebarNav />
      </div>

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="open menu"
        className="fixed top-4 left-4 z-40 flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full bg-[#3B82C4] shadow-lg md:hidden"
      >
        <span className="h-0.5 w-6 rounded-full bg-white" />
        <span className="h-0.5 w-6 rounded-full bg-white" />
        <span className="h-0.5 w-6 rounded-full bg-white" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-black/40 md:hidden"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
              className="relative h-full"
            >
              <img className="h-full w-auto" src="/sidebar.png" alt="" />
              <SidebarNav onNavigateAction={() => setOpen(false)} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="close menu"
                className="absolute top-6 right-6 font-finger-paint text-2xl text-white"
              >
                x
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function DeleteProjectButton({
  action,
  className,
}: {
  action: () => Promise<void>;
  className?: string;
}) {
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
      <button type="button" onClick={() => setOpen(true)} className={className}>
        Delete :(
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="relative aspect-758/537 w-full max-w-md"
            >
              <img
                src="/dialog-box-template.png"
                alt=""
                className="absolute inset-0 h-full w-full"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-20 py-16 text-center">
                <p className="font-finger-paint text-lg text-[#5C4A2E]">
                  delete this Wonder? this can&apos;t be undone :(
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-lg bg-[#D0E4B4] px-4 py-2 font-finger-paint text-black/60 transition hover:scale-105"
                  >
                    nevermind :3
                  </button>
                  <form action={action}>
                    <button
                      type="submit"
                      className="rounded-lg bg-[#F2B3AD] px-4 py-2 font-finger-paint text-black/60 transition hover:scale-105"
                    >
                      delete it :(
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

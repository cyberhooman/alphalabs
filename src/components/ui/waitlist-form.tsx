import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";

const SMALL_BREAKPOINT = 570;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const childVariants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5 },
  },
};

const useWindowWidth = () => {
  const getWidth = () =>
    typeof window !== "undefined" ? window.innerWidth : SMALL_BREAKPOINT;
  const [width, setWidth] = useState(getWidth());

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const width = useWindowWidth();

  const triggerConfetti = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.7 },
      zIndex: 1000,
    });
  }, []);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!email) {
        return;
      }

      setSubmitted(true);
      triggerConfetti();
    },
    [email, triggerConfetti],
  );

  const isStacked = width <= SMALL_BREAKPOINT;

  const thankYouMessage = (
    <motion.div
      key="thank-you"
      layout
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)", transition: { duration: 0.5 } }}
      exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.5 } }}
      className="flex flex-col items-center text-center"
    >
      <h3 className="text-3xl font-semibold text-gray-900">
        Thanks for joining the waitlist!
      </h3>
      <p className="mt-3 text-base text-gray-600">
        We will keep you posted with launch updates and early access perks.
      </p>
    </motion.div>
  );

  const formContent = (
    <motion.div
      key="form"
      layout
      className="w-full"
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)", transition: { duration: 0.5 } }}
      exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.5 } }}
    >
      <motion.div
        className={isStacked ? "mb-4 text-left" : "mb-8 text-center"}
        variants={childVariants}
      >
        <h3 className="text-3xl font-semibold text-gray-900">
          Join the waitlist for
          <span className={isStacked ? "pl-2" : "block"}>
            <span className="bg-gradient-to-r from-[#ff9292] to-[#ff0000] bg-clip-text text-transparent">
              AlphaLabs Market Flow
            </span>
          </span>
        </h3>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className={
          isStacked
            ? "flex w-full flex-col gap-4"
            : "relative flex w-full items-center gap-4 rounded-full border border-gray-200 bg-white p-2"
        }
        variants={childVariants}
      >
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@example.com"
          className={
            isStacked
              ? "w-full rounded-full border border-gray-200 px-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#3a3aff]"
              : "flex-1 rounded-full bg-transparent px-4 py-4 text-lg focus:outline-none"
          }
          required
        />
        <button
          type="submit"
          className="rounded-full bg-[#3a3aff] px-6 py-4 text-lg font-medium text-white transition hover:bg-[#4a2aff]"
        >
          Join waitlist
        </button>
      </motion.form>
    </motion.div>
  );

  return (
    <motion.div
      layout
      className={`w-full max-w-3xl rounded-[32px] border border-black/10 bg-white shadow-[0_40px_120px_rgba(0,0,0,0.18)] ${
        isStacked ? "p-8" : "p-12"
      }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="wait">
        {submitted ? thankYouMessage : formContent}
      </AnimatePresence>
    </motion.div>
  );
};

export { WaitlistForm };


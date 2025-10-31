"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Home, Package, DollarSign, Share2 } from "lucide-react";

interface NavItem {
  title: string;
  link: string;
  icon: React.ElementType;
}

interface FloatingNavProps {
  className?: string;
  onNavClick?: (link: string) => void;
}

export const FloatingNav = ({ className, onNavClick }: FloatingNavProps) => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const navItems: NavItem[] = [
    { title: "Home", link: "home", icon: Home },
    { title: "Product", link: "product", icon: Package },
    { title: "Pricing", link: "pricing", icon: DollarSign },
    { title: "Social", link: "social", icon: Share2 },
  ];

  const handleClick = (link: string) => {
    onNavClick?.(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-10 inset-x-0 mx-auto flex max-w-fit items-center gap-1 rounded-full border border-white/[0.2] bg-black/30 backdrop-blur-lg px-4 py-2 shadow-lg z-[5000]",
        className
      )}
    >
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const isHovered = hoveredIndex === index;

        return (
          <motion.button
            key={item.title}
            onClick={() => handleClick(item.link)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={cn(
              "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
              isHovered
                ? "text-white"
                : "text-zinc-400 hover:text-zinc-200"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Background highlight */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  layoutId="navbar-indicator"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.2 }
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15 }
                  }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF6B6B]/20 to-[#FF6B6B]/10"
                />
              )}
            </AnimatePresence>

            {/* Icon */}
            <motion.div
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? [0, -10, 10, -10, 0] : 0,
              }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              <Icon size={18} />
            </motion.div>

            {/* Text */}
            <motion.span
              initial={{ width: 0, opacity: 0 }}
              animate={{
                width: isHovered ? "auto" : 0,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="relative z-10 overflow-hidden whitespace-nowrap"
            >
              {item.title}
            </motion.span>

            {/* Glow effect on hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.5, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 rounded-full bg-[#FF6B6B] blur-xl"
                  style={{ zIndex: -1 }}
                />
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </motion.div>
  );
};

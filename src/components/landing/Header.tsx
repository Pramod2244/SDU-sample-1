"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Admissions &amp; Aid", href: "#admissions" },
    { name: "Academics", href: "#academics" },
    { name: "Campus Life", href: "#campus-life" },
    { name: "About", href: "#about" },
    { name: "News &amp; Events", href: "#news" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-card shadow-md" : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className={cn("font-headline text-2xl font-bold", isScrolled ? "text-primary" : "text-white")}>
              SDUAHDR
            </Link>
            <nav className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} className={cn("text-sm font-medium transition-colors", isScrolled ? "text-foreground hover:text-primary" : "text-white hover:text-white/80")}>
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="hidden lg:flex items-center space-x-2">
              <Button variant={isScrolled ? "outline" : "default"} className={cn(!isScrolled && "bg-white text-primary hover:bg-white/90")}>Apply</Button>
              <Button variant={isScrolled ? "default" : "outline"} className={cn("transition-colors", !isScrolled && "border-white text-white hover:bg-white hover:text-primary")}>Visit</Button>
            </div>
            <div className="lg:hidden">
              <Button onClick={() => setIsMenuOpen(true)} size="icon" variant="ghost" className={cn(isScrolled ? "text-foreground" : "text-white hover:text-white hover:bg-white/10")}>
                <Menu />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
            className="fixed inset-0 z-50 bg-card p-6 lg:hidden"
          >
            <div className="flex justify-between items-center mb-10">
              <Link href="/" className="font-headline text-2xl font-bold text-primary">
                SDUAHDR
              </Link>
              <Button onClick={() => setIsMenuOpen(false)} size="icon" variant="ghost">
                <X />
              </Button>
            </div>
            <nav className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-foreground hover:text-primary">
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="mt-10 flex flex-col space-y-4">
              <Button size="lg">Apply</Button>
              <Button size="lg" variant="outline">Visit</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

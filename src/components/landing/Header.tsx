"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const menuTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menuName: string) => {
    if (menuTimeout.current) {
      clearTimeout(menuTimeout.current);
    }
    setOpenMenu(menuName);
  };

  const handleMouseLeave = () => {
    menuTimeout.current = setTimeout(() => {
      setOpenMenu(null);
    }, 150); // a small delay to allow moving between trigger and content
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const topNavLinks = [
    { name: "News", href: "#news" },
    { name: "Events", href: "#news" },
    { name: "Visit", href: "#" },
    { name: "Give", href: "#" },
  ];

  const mainNavLinks = [
    {
      name: "Who We Are",
      href: "#about",
      subLinks: [
        { name: "Overview", href: "#about" },
        { name: "Vision & Mission", href: "#about" },
        { name: "Leadership", href: "#" },
      ],
    },
    {
      name: "Admissions & Aid",
      href: "#admissions",
      subLinks: [
        { name: "Admission Process", href: "#admissions" },
        { name: "Programmes Offered", href: "#academics" },
        { name: "Fee Structure", href: "#" },
        { name: "Admission Enquiry", href: "#" },
      ],
    },
    {
      name: "Academics",
      href: "#academics",
      subLinks: [
        { name: "Programmes Offered", href: "#academics" },
        { name: "Constituent Colleges", href: "/academics/schools-and-colleges" },
        { name: "Departments", href: "/academics/schools-and-colleges" },
      ]
    },
    { name: "Research", href: "#" },
    { name: "Life at SDUAHER", href: "#campus-life" },
  ];
  
  const allNavLinksForMobile = [
    ...mainNavLinks,
    { name: "News", href: "#news"},
    { name: "Events", href: "#news"},
    { name: "Visit", href: "#"},
    { name: "Give", href: "#"},
    { name: "Contact", href: "#footer" },
  ]

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
        {/* Top bar */}
        <div className={cn("hidden lg:block transition-colors border-b", isScrolled ? "bg-secondary/50 border-border" : "bg-transparent border-transparent")}>
          <div className="container mx-auto px-4 flex justify-end items-center h-10">
            <div className="flex items-center space-x-6 text-base">
              {topNavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "font-medium transition-colors",
                    isScrolled ? "text-foreground hover:text-primary" : "text-white hover:text-white/80"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">Apply</Button>
            </div>
          </div>
        </div>


        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className={cn("font-headline text-3xl font-bold transition-colors duration-500", isScrolled ? "text-primary" : "text-white", "hover:text-primary")}>
              SDUAHER
            </Link>
            <nav className="hidden lg:flex items-center space-x-1">
              {mainNavLinks.map((link) =>
                link.subLinks ? (
                  <DropdownMenu
                    key={link.name}
                    open={openMenu === link.name}
                    onOpenChange={(isOpen) => !isOpen && setOpenMenu(null)}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn("text-lg font-medium px-3 py-2", isScrolled ? "text-foreground hover:bg-transparent hover:text-primary" : "text-white hover:bg-white/10 hover:text-white")}
                        onMouseEnter={() => handleMouseEnter(link.name)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {link.name}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      onMouseEnter={() => handleMouseEnter(link.name)}
                      onMouseLeave={handleMouseLeave}
                      className="bg-card border-t-4 border-primary"
                      sideOffset={14}
                    >
                      {link.subLinks.map((subLink) => (
                        <DropdownMenuItem key={subLink.name} asChild>
                          <Link href={subLink.href} className="text-foreground" onClick={() => setOpenMenu(null)}>
                            {subLink.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "text-lg font-medium transition-colors px-3 py-2 rounded-md",
                      isScrolled ? "text-foreground hover:text-primary hover:bg-transparent" : "text-white hover:text-white/80 hover:bg-white/10"
                    )}
                    onMouseEnter={() => setOpenMenu(null)}
                  >
                    {link.name}
                  </Link>
                )
              )}
               <Button size="icon" variant="ghost" className={cn(isScrolled ? "text-foreground hover:text-primary" : "text-white hover:text-white/80", "ml-2")}>
                  <Search className="h-5 w-5"/>
               </Button>
            </nav>
            
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
                SDUAHER
              </Link>
              <Button onClick={() => setIsMenuOpen(false)} size="icon" variant="ghost">
                <X />
              </Button>
            </div>
            <nav className="flex flex-col">
              {allNavLinksForMobile.map((link) =>
                link.subLinks ? (
                  <Accordion key={link.name} type="single" collapsible className="w-full">
                    <AccordionItem value={link.name} className="border-b">
                      <AccordionTrigger className="py-3 text-xl font-medium text-foreground hover:text-primary hover:no-underline">
                        {link.name}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col space-y-2 pl-6 border-l border-border ml-2">
                          {link.subLinks.map((subLink) => (
                            <Link
                              key={subLink.name}
                              href={subLink.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="py-2 text-lg text-foreground/80 hover:text-primary"
                            >
                              {subLink.name}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="py-3 text-xl font-medium text-foreground hover:text-primary border-b"
                  >
                    {link.name}
                  </Link>
                )
              )}
            </nav>
            <div className="mt-10 flex flex-col space-y-4">
              <Button size="lg">Apply</Button>
              <Button size="lg" variant="outline" className="flex items-center gap-2">
                <Search className="h-5 w-5"/> Search
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

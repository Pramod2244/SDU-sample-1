
'use client';

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

interface HeaderProps {
  transparent?: boolean;
}

const Header = ({ transparent = true }: HeaderProps) => {
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
    }, 150);
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

  const isHeroMode = transparent && !isScrolled;

  const topNavLinks = [
    { name: "Notice Board", href: "/notices" },
    { name: "News", href: "#news" },
    { name: "Events", href: "#news" },
    { name: "Visit", href: "#" },
  ];

  const mainNavLinks = [
    {
      name: "About Us",
      href: "/about-us",
      subLinks: [
        { name: "SDUMC Overview", href: "/about-us" },
        { name: "Vision & Mission", href: "/about-us#vision" },
        { name: "Why choose SDUMC?", href: "/about-us#why-sdumc" },
        { name: "Campus Gallery", href: "/about-us#gallery" },
      ],
    },
    {
      name: "Office Bearers",
      href: "/office-bearers/principal",
      subLinks: [
        { name: "Principal", href: "/office-bearers/principal" },
        { name: "Vice Principal", href: "/office-bearers/vice-principal" },
        { name: "Medical Superintendent", href: "/office-bearers/medical-superintendent" },
      ],
    },
    {
      name: "Academics",
      href: "/academics/programmes",
      subLinks: [
        { name: "Programmes Offered", href: "/academics/programmes" },
        { name: "Departments", href: "/academics/departments" },
        { name: "Constituent Colleges", href: "/academics/schools-and-colleges" },
      ]
    },
    {
      name: "Admissions & Aid",
      href: "#admissions",
      subLinks: [
        { name: "Admission Process", href: "#admissions" },
        { name: "Programmes Offered", href: "/academics/programmes" },
        { name: "Fee Structure", href: "#" },
        { name: "Admission Enquiry", href: "#" },
      ],
    },
    { name: "News & Notices", href: "/notices" },
    { name: "Life at SDUAHER", href: "/life-at-sduaher" },
    { name: "Be Legendary", href: "/be-legendary" },
  ];
  
  const allNavLinksForMobile = [
    ...mainNavLinks,
    { name: "Notice Board", href: "/notices"},
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
          isHeroMode ? "bg-transparent" : "bg-card shadow-md"
        )}
      >
        <div className={cn("hidden lg:block transition-colors border-b", isHeroMode ? "bg-transparent border-transparent" : "bg-secondary/50 border-border")}>
          <div className="container mx-auto px-4 flex justify-end items-center h-10">
            <div className="flex items-center space-x-6 text-base">
              {topNavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "font-medium transition-colors text-lg focus-visible:outline-none focus-visible:ring-0",
                    isHeroMode ? "text-white hover:text-white/80" : "text-foreground hover:text-primary"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground focus-visible:ring-0 focus-visible:ring-offset-0">Apply</Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className={cn("font-headline text-3xl font-bold transition-colors duration-500 focus-visible:outline-none focus-visible:ring-0", isHeroMode ? "text-white" : "text-primary", "hover:text-primary")}>
              SDUAHER
            </Link>
            <nav className="hidden lg:flex items-center space-x-2">
              {mainNavLinks.map((link) =>
                link.subLinks ? (
                  <DropdownMenu
                    key={link.name}
                    open={openMenu === link.name}
                    onOpenChange={(isOpen) => !isOpen && setOpenMenu(null)}
                    modal={false}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          "text-lg font-medium px-3 py-2 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 focus:bg-transparent",
                          isHeroMode ? "text-white hover:bg-white/10 hover:text-white" : "text-foreground hover:bg-transparent hover:text-primary",
                          openMenu === link.name && "text-primary"
                        )}
                        onMouseEnter={() => handleMouseEnter(link.name)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {link.name}
                        <motion.div
                          animate={{ rotate: openMenu === link.name ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-1"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </motion.div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      onMouseEnter={() => handleMouseEnter(link.name)}
                      onMouseLeave={handleMouseLeave}
                      className="relative bg-card border-none shadow-soft-lg before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[4px] before:bg-primary min-w-[220px] p-2 pointer-events-auto"
                      sideOffset={14}
                    >
                      {link.subLinks.map((subLink) => (
                        <DropdownMenuItem key={subLink.name} asChild className="focus:bg-primary/5 focus:text-primary cursor-pointer rounded-lg">
                          <Link href={subLink.href} className="text-foreground w-full py-2.5 px-3 font-medium" onClick={() => setOpenMenu(null)}>
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
                      "text-lg font-medium transition-colors px-3 py-2 rounded-md focus-visible:outline-none focus-visible:ring-0",
                      isHeroMode ? "text-white hover:text-white/80 hover:bg-white/10" : "text-foreground hover:text-primary hover:bg-transparent"
                    )}
                    onMouseEnter={() => setOpenMenu(null)}
                  >
                    {link.name}
                  </Link>
                )
              )}
               <Button size="icon" variant="ghost" className={cn(isHeroMode ? "text-white hover:text-white/80" : "text-foreground hover:text-primary", "ml-2 focus-visible:ring-0 focus-visible:ring-offset-0")}>
                  <Search className="h-5 w-5"/>
               </Button>
            </nav>
            
            <div className="lg:hidden">
              <Button onClick={() => setIsMenuOpen(true)} size="icon" variant="ghost" className={cn(isHeroMode ? "text-white hover:text-white hover:bg-white/10" : "text-foreground", "focus-visible:ring-0")}>
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
            className="fixed inset-0 z-[60] bg-card lg:hidden flex flex-col"
          >
            <div className="flex justify-between items-center p-6 flex-shrink-0 border-b">
              <Link href="/" className="font-headline text-2xl font-bold text-primary" onClick={() => setIsMenuOpen(false)}>
                SDUAHER
              </Link>
              <Button onClick={() => setIsMenuOpen(false)} size="icon" variant="ghost" className="focus-visible:ring-0">
                <X />
              </Button>
            </div>
            
            <div className="flex-grow overflow-y-auto">
                <nav className="flex flex-col px-6">
                <Accordion type="multiple" className="w-full">
                  {allNavLinksForMobile.map((link) =>
                      link.subLinks ? (
                      <AccordionItem key={link.name} value={link.name} className="border-b">
                          <AccordionTrigger className="py-4 text-xl font-medium text-foreground hover:text-primary hover:no-underline focus-visible:ring-0">
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
                      ) : (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="py-4 text-xl font-medium text-foreground hover:text-primary border-b flex items-center"
                        >
                            {link.name}
                        </Link>
                      )
                  )}
                </Accordion>
                </nav>
            </div>

            <div className="p-6 pt-4 border-t flex flex-col space-y-4 flex-shrink-0">
              <Button size="lg" className="focus-visible:ring-0">Apply</Button>
              <Button size="lg" variant="outline" className="flex items-center gap-2 focus-visible:ring-0">
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

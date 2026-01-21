"use client";

import { motion } from "framer-motion";
import { Twitter, Instagram, Linkedin, Facebook } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const socialIcons = [
    { icon: Twitter, href: "#" },
    { icon: Facebook, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Linkedin, href: "#" },
  ];

  const links = [
    { label: "Sitemap", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Accessibility", href: "#" },
    { label: "Contact Us", href: "#" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-accent text-accent-foreground"
    >
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="space-y-4">
            <h3 className="font-headline text-2xl font-bold">SDUAHDR</h3>
            <p>123 University Avenue, Metro City, 10001</p>
            <p>Email: contact@sduahdr.edu</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-headline text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-headline text-xl font-semibold">Connect With Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              {socialIcons.map((social, index) => (
                <Link key={index} href={social.href} target="_blank" rel="noopener noreferrer">
                  <social.icon className="h-6 w-6 hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-accent-foreground/20 text-center text-sm text-accent-foreground/70">
          <p>&copy; {new Date().getFullYear()} SDUAHDR University. All Rights Reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;

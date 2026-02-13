
"use client";

import { motion } from "framer-motion";
import { Twitter, Instagram, Linkedin, Facebook, MapPin, Phone, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.04-5.36-.01-1.02.04-2.04.04-3.06.01-2.2-.08-4.4-.08-6.6.01-.22.02-.43.02-.65Z" />
    </svg>
);

const Footer = () => {
    const footerBgImage = PlaceHolderImages.find((img) => img.id === "footer-bg");

    const mainNav = [
        { label: "Admissions & Aid", href: "/#admissions" },
        { label: "Academics", href: "/academics/programmes" },
        { label: "Life at SDUAHER", href: "/life-at-sduaher" },
        { label: "Research", href: "/research" },
    ];

    const infoFor = [
        { label: "Admitted Students", href: "#" },
        { label: "Alumni", href: "#" },
        { label: "Current Students", href: "#" },
        { label: "Faculty & Staff", href: "#" },
        { label: "Parents & Families", href: "#" },
    ];
    
    const quickLinks = [
        { label: "Notice Board", href: "/notices" },
        { label: "Departments", href: "/academics/departments" },
        { label: "Canvas", href: "#", external: true },
        { label: "mySDUAHER", href: "#", external: true },
        { label: "Email", href: "#", external: true },
        { label: "Campus Store", href: "#" },
        { label: "Faculty Directory", href: "#" },
    ];

    const socialIcons = [
        { icon: TikTokIcon, href: "#" },
        { icon: Twitter, href: "#" },
        { icon: Instagram, href: "#" },
        { icon: Linkedin, href: "#" },
        { icon: Facebook, href: "#" },
    ];

    const legalLinks = [
        { label: "Policies & Regulations", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Accessibility", href: "#" },
    ];

    return (
        <footer id="footer" className="bg-black text-white">
            {/* Next Steps Section */}
            <div className="relative text-center py-24 px-4 overflow-hidden min-h-[400px] flex items-center justify-center">
                {footerBgImage && (
                    <Image
                        src={footerBgImage.imageUrl}
                        alt={footerBgImage.description}
                        fill
                        className="object-cover opacity-40"
                        data-ai-hint={footerBgImage.imageHint}
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
                <div className="relative z-10">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-headline text-5xl md:text-7xl font-bold uppercase tracking-wider mb-8"
                    >
                        Next Steps
                    </motion.h2>
                    <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-6">
                        <Button asChild size="lg" className="w-full sm:w-auto text-lg px-12 py-7 rounded-full shadow-xl shadow-primary/20">
                            <Link href="/#admissions">Apply Now</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="w-full sm:w-auto text-lg px-12 py-7 rounded-full bg-white/10 backdrop-blur-md border-white/20 hover:bg-white hover:text-black transition-all">
                           <Link href="#">Visit Campus</Link>
                        </Button>
                        <Button asChild size="lg" variant="ghost" className="w-full sm:w-auto text-lg px-12 py-7 rounded-full text-white hover:bg-white/10">
                           <Link href="#footer">Request Info</Link>
                        </Button>
                    </div>
                </div>
            </div>
            
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
                    {/* Main Nav */}
                    <div className="lg:col-span-2 space-y-4">
                        {mainNav.map((link) => (
                            <Link key={link.label} href={link.href} className="block font-headline text-xl hover:text-primary transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Information For */}
                    <div className="lg:col-span-3">
                         <h3 className="font-bold text-sm uppercase tracking-widest text-white/40 mb-6">Information for</h3>
                         <ul className="space-y-3">
                             {infoFor.map((link) => (
                                 <li key={link.label}>
                                     <Link href={link.href} className="text-white/70 hover:text-primary transition-colors hover:underline">
                                         {link.label}
                                     </Link>
                                 </li>
                             ))}
                         </ul>
                    </div>
                    
                    {/* Quick Links */}
                    <div className="lg:col-span-3">
                         <h3 className="font-bold text-sm uppercase tracking-widest text-white/40 mb-6">Quick Links</h3>
                         <ul className="space-y-3">
                             {quickLinks.map((link) => (
                                 <li key={link.label}>
                                     <Link href={link.href} className="inline-flex items-center text-white/70 hover:text-primary transition-colors hover:underline">
                                         {link.label}
                                         {link.external && <ArrowUpRight className="ml-1 h-3 w-3 opacity-50" />}
                                     </Link>
                                 </li>
                             ))}
                         </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-4 bg-accent/20 border border-white/5 p-8 rounded-3xl backdrop-blur-sm">
                        <h3 className="font-headline text-2xl font-bold mb-6 text-primary">SDUAHER</h3>
                        <div className="space-y-6 text-white/70">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-white/5 rounded-lg">
                                    <MapPin className="h-5 w-5 text-primary shrink-0" />
                                </div>
                                <span>TAMAKA, KOLAR - 563103,<br/>KARNATAKA, INDIA.</span>
                            </div>
                             <div className="flex items-start gap-4">
                                <div className="p-2 bg-white/5 rounded-lg">
                                    <Phone className="h-5 w-5 text-primary shrink-0" />
                                </div>
                                <span>+91 8152 210604</span>
                            </div>
                             <Link href="#" className="font-bold text-white hover:text-primary transition-colors underline underline-offset-4 flex items-center gap-2">
                                Campus Map & Directions <ArrowUpRight className="h-4 w-4" />
                             </Link>
                        </div>
                        <div className="flex space-x-4 mt-10">
                            {socialIcons.map((social, index) => (
                                <Link key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-primary transition-all duration-300">
                                    <social.icon className="h-5 w-5" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/5">
                <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
                    <p>&copy; {new Date().getFullYear()} SDUAHER. Built for Academic Excellence.</p>
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 md:mt-0">
                        {legalLinks.map((link) => (
                            <Link key={link.label} href={link.href} className="hover:text-white transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

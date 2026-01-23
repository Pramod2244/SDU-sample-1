"use client";

import { motion } from "framer-motion";
import { Twitter, Instagram, Linkedin, Facebook, MapPin, Phone, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";

// A simple SVG for TikTok
const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.04-5.36-.01-1.02.04-2.04.04-3.06.01-2.2-.08-4.4-.08-6.6.01-.22.02-.43.02-.65Z" />
    </svg>
);


const Footer = () => {
    const footerBgImage = PlaceHolderImages.find((img) => img.id === "footer-bg");

    const mainNav = [
        { label: "Admissions & Aid", href: "#admissions" },
        { label: "Academics", href: "/academics/schools-and-colleges" },
        { label: "Life at SDUAHER", href: "/life-at-sduaher" },
        { label: "Who We Are", href: "#about" },
    ];

    const infoFor = [
        { label: "Admitted Students", href: "#" },
        { label: "Alumni", href: "#" },
        { label: "Current Students", href: "#" },
        { label: "Faculty & Staff", href: "#" },
        { label: "Parents & Families", href: "#" },
    ];
    
    const quickLinks = [
        { label: "Redhawk Hub", href: "#", external: true },
        { label: "Canvas", href: "#", external: true },
        { label: "mySDUAHER", href: "#", external: true },
        { label: "Email", href: "#", external: true },
        { label: "ConnectSDU", href: "#", external: true },
        { label: "Campus Store", href: "#" },
        { label: "Careers at SDUAHER", href: "#" },
        { label: "Faculty & Staff Directory", href: "#" },
        { label: "Offices & Departments Directory", href: "#" },
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
        { label: "Ethics Line", href: "#" },
    ];

    return (
        <footer id="footer" className="bg-black text-white">
            {/* Next Steps Section */}
            <div className="relative text-center py-20 px-4">
                {footerBgImage && (
                    <Image
                        src={footerBgImage.imageUrl}
                        alt={footerBgImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={footerBgImage.imageHint}
                    />
                )}
                <div className="absolute inset-0 bg-black/70" />
                <div className="relative z-10">
                    <h2 className="font-headline text-5xl font-bold uppercase tracking-wider">Next Steps</h2>
                    <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Button asChild size="lg" className="w-full sm:w-auto text-lg px-12 py-6">
                            <Link href="/#admissions">Apply</Link>
                        </Button>
                        <Button asChild size="lg" className="w-full sm:w-auto text-lg px-12 py-6">
                           <Link href="#">Visit</Link>
                        </Button>
                        <Button asChild size="lg" className="w-full sm:w-auto text-lg px-12 py-6">
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
                         <h3 className="font-semibold text-white/60 mb-4">Information for</h3>
                         <ul className="space-y-2">
                             {infoFor.map((link) => (
                                 <li key={link.label}>
                                     <Link href={link.href} className="hover:text-primary transition-colors hover:underline">
                                         {link.label}
                                     </Link>
                                 </li>
                             ))}
                         </ul>
                    </div>
                    
                    {/* Quick Links */}
                    <div className="lg:col-span-3">
                         <h3 className="font-semibold text-white/60 mb-4 invisible hidden lg:block">.</h3>
                         <ul className="space-y-2">
                             {quickLinks.map((link) => (
                                 <li key={link.label}>
                                     <Link href={link.href} className="inline-flex items-center hover:text-primary transition-colors hover:underline">
                                         {link.label}
                                         {link.external && <ArrowUpRight className="ml-1 h-4 w-4" />}
                                     </Link>
                                 </li>
                             ))}
                         </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-4 bg-accent p-8 rounded-lg">
                        <h3 className="font-headline text-xl font-bold mb-6">SDUAHER</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 mt-1 shrink-0" />
                                <span>TAMAKA, KOLAR - 563103,<br/>KARNATAKA, INDIA.</span>
                            </div>
                             <div className="flex items-start gap-3">
                                <Phone className="h-5 w-5 mt-1 shrink-0" />
                                <span>+91 8152 210604</span>
                            </div>
                             <Link href="#" className="font-bold underline hover:text-primary transition-colors">
                                Campus Map & Directions
                             </Link>
                        </div>
                        <div className="flex space-x-4 mt-8">
                            {socialIcons.map((social, index) => (
                                <Link key={index} href={social.href} target="_blank" rel="noopener noreferrer">
                                    <social.icon className="h-6 w-6 hover:text-primary transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/20">
                <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
                    <p>&copy; {new Date().getFullYear()} SDUAHER. All Rights Reserved.</p>
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 md:mt-0">
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

"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const contentItems = [
    {
        title: 'State-of-the-Art Research Facilities',
        description: 'Our labs are equipped with the latest technology, providing an unparalleled environment for discovery and innovation.',
        image: PlaceHolderImages.find(img => img.id === 'legendary-content-1'),
        align: 'left'
    },
    {
        title: 'World-Class Mentorship',
        description: 'Learn from leading experts and acclaimed physicians who are dedicated to nurturing the next generation of healthcare professionals.',
        image: PlaceHolderImages.find(img => img.id === 'legendary-content-2'),
        align: 'right'
    }
];

const MoreContent = () => {
    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
    };
    
    return (
        <section className="bg-background py-20 lg:py-32">
            <div className="container mx-auto px-4 space-y-24">
                {contentItems.map((item, index) => (
                    <div 
                        key={index}
                        className="grid lg:grid-cols-2 gap-12 items-center"
                    >
                        <motion.div 
                            className={`relative h-96 rounded-xl overflow-hidden shadow-2xl ${item.align === 'right' ? 'lg:order-2' : ''}`}
                            initial={{ opacity: 0, x: item.align === 'right' ? 50 : -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        >
                           {item.image && (
                                <Image 
                                    src={item.image.imageUrl}
                                    alt={item.image.description}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={item.image.imageHint}
                                />
                           )}
                        </motion.div>
                        <motion.div 
                            className={`space-y-6 ${item.align === 'right' ? 'lg:order-1' : ''}`}
                            initial={{ opacity: 0, x: item.align === 'right' ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        >
                            <h2 className="font-headline text-4xl font-bold text-primary">{item.title}</h2>
                            <p className="text-lg text-foreground/80 leading-relaxed">{item.description}</p>
                            <Button variant="link" className="p-0 text-lg text-primary">Learn More <ArrowRight className="ml-2" /></Button>
                        </motion.div>
                    </div>
                ))}

                {/* Final CTA Section */}
                 <motion.div
                    className="text-center pt-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={itemVariants}
                >
                    <h2 className="font-headline text-5xl md:text-7xl font-bold text-primary">Your Legacy Starts Here.</h2>
                    <p className="mt-6 text-xl text-foreground/80 max-w-3xl mx-auto">
                        Ready to answer the call? Explore our programs, meet our faculty, and discover how you can be legendary at SDUAHER.
                    </p>
                    <div className="mt-10 flex justify-center gap-4">
                        <Button size="lg" asChild>
                            <Link href="/#admissions">Apply Now</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                           <Link href="/#footer">Request Info</Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default MoreContent;

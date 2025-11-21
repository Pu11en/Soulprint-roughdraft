"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-black flex items-center">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto] items-center gap-8 lg:gap-16">
                    {/* Left Column - Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex flex-col justify-center py-12">
                            {/* Headline */}
                            <h1 className="font-koulen text-[64px] leading-[0.9] tracking-tight text-white sm:text-[88px] lg:text-[112px] uppercase">
                                STOP USING AI
                                <br />
                                IN DEFAULT MODE
                            </h1>

                            {/* Subheading */}
                            <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-400 font-sans">
                                Default mode is dead.
                            </p>

                            {/* CTAs */}
                            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                                <Button size="xl" className="bg-[#ea580c] hover:bg-[#ea580c]/90 text-white font-medium h-12 px-8 rounded-md">
                                    Break the Mold
                                </Button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Hero Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="hidden lg:block"
                    >
                        <img 
                            src="/images/hero-badge.png" 
                            alt="Badge" 
                            width="400" 
                            height="400"
                            className="object-contain"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

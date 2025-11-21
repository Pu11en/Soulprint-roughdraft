"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-black flex items-center">
            <div className="container px-4 md:px-6">
                <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2">
                    {/* Left Column - Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative z-10"
                    >
                        <div className="relative flex flex-col justify-center py-12">
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

                    {/* Right Column - Visual Element */}
                    <div className="relative hidden lg:block h-[600px] w-full">
                        <div className="relative h-full w-full">
                             <Image 
                                src="/images/hero-woman.png" 
                                alt="Woman portrait" 
                                fill
                                className="object-contain object-center"
                                priority
                             />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

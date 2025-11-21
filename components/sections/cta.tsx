"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export function CTA() {
    return (
        <section className="py-20 md:py-32 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />

            <div className="container relative z-10 px-4">
                <motion.div
                    className="max-w-4xl mx-auto text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 font-koulen">
                        Make Every AI You Use Actually Yours.
                    </h2>
                    <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                        Add one or two compelling sentences that reinforce your main value proposition and overcome final objections. Align this copy with your CTA button text.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button size="xl" className="group">
                            Get Started Free
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                        <Button size="xl" variant="outline">
                            Schedule a Demo
                        </Button>
                    </div>
                    {/* Trust indicators */}
                    <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Free 14-day trial
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            No credit card required
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Cancel anytime
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Decorative background image */}
            <Image
                src="/images/Group 2.png"
                alt="Decorative background"
                fill
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl -z-10 object-cover"
            />
        </section>
    );
}

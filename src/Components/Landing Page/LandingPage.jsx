import Header from "./Header";
import Hero from "./Hero";
import Demo from "./Demo";
import Floating from "./Floating";
import Working from "./Working";
import Footer from "./Footer";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function LandingPage() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll();

    // Reveal footer after 90%
    const opacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);
    const pointerEvents = useTransform(scrollYProgress, (v) => v >= 0.9 ? "auto" : "none");



    return (
        <div ref={ref} className="relative">

            {/* ---------------- Main Content ---------------- */}
            <div>
                <Header />
                <Hero />
                <Demo />
                <Floating />
                <Working />
            </div>

            {/* ---------------- Unlock Scroll Space ---------------- */}
            {/* This creates the "one more scroll" feeling */}
            <div className="h-screen" />

            {/* ---------------- Footer ---------------- */}
            <motion.div
                style={{ opacity, pointerEvents }}
                className="h-screen fixed bottom-0 z-10 w-full"
            >
                <Footer />
            </motion.div>

        </div>
    );
}
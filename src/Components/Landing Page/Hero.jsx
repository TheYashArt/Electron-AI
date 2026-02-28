import { motion, AnimatePresence } from "framer-motion";
import { use, useState } from "react";
import Animation from "./animation";
import Typewriter from "./Typewriter";
import { useNavigate } from "react-router-dom";
import image from "../../assets/logo.png"

export default function Hero() {
    const [typingDone, setTypingDone] = useState(false);
    const nav = useNavigate()

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            {/* ── Hero section: blobs are clipped inside this box ── */}
            <div className="relative w-full h-screen overflow-hidden bg-white">
                <Animation />
                <motion.div
                    layout
                    transition={{ layout: { type: "spring", stiffness: 260, damping: 20 } }}
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-1">


                    {/* "Electron AI" fades in after typing is done */}
                    <AnimatePresence>
                        {typingDone && (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="text-xl"
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <img src={image} width={50} />
                                    <div className="flex gap-1">
                                    <span className="">Electron </span> <span className="font-bold">AI</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {/* Typewriter runs first */}
                    <motion.div
                        layout
                        transition={{ layout: { type: "spring", stiffness: 260, damping: 20 } }}>
                        <Typewriter text="Instant Answers form your Knowledge" onComplete={() => setTypingDone(true)} />
                    </motion.div>

                    <AnimatePresence>
                        {typingDone && (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="text-xl"
                            >
                                <button
                                    onClick={() => { nav("/login") }}
                                    className="bg-gray-600 text-white px-10 py-2 rounded-full w-full mt-6 cursor-pointer">
                                    <span className="text-white font-bold text-xl">
                                        Get Started
                                    </span>
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div>
    );
}
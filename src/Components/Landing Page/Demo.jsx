import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Sparkle from "./Sparkle";

export default function Demo() {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const generateSparkles = (count) =>
        Array.from({ length: count }).map((_, i) => (
            <Sparkle
                key={i}
                radius={Math.floor(Math.random() * 200) + 60}
                duration={Math.floor(Math.random() * 20) + 6}
                delay={Math.random()}
                color={Math.random() < 0.5 ? "#ff55f4" : "#54bcfd"} 
            />
        ));

    return (
        <div id="demo" ref={ref} className="h-[600px] px-2 md:px-10 bg-white">
            <motion.div
                style={{ scale }}
                className="relative w-full h-full bg-black rounded-4xl overflow-hidden"
            >
                {/* Sparkle animation layer */}
                <div className="absolute inset-0 bg-[#0f0f1a]">
                    <div className="absolute inset-0 flex">
                        <div className="relative w-1/4 h-full flex flex-col justify-center">{generateSparkles(16)}</div>
                        <div className="relative w-1/4 h-full flex flex-col justify-center">{generateSparkles(16)}</div>
                        <div className="relative w-1/4 h-full flex flex-col justify-center">{generateSparkles(16)}</div>
                        <div className="relative w-1/4 h-full flex flex-col justify-center">{generateSparkles(16)}</div>
                    </div>
                </div>

                {/* Foreground content */}
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <div className=" w-3/4 h-3/4 md:h-[calc(100%-150px)] md:w-[calc(100%-400px)] bg-gray-500 rounded-md text-white flex items-center justify-center text-xl">
                        Demo Video
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
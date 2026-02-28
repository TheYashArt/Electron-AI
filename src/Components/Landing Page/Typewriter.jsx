import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Typewriter = ({page, text, texts, onComplete, typingSpeed = 50, deletingSpeed = 30, pauseTime = 5000 }) => {
    const [visibleCount, setVisibleCount] = useState(0);
    const [phase, setPhase] = useState("typing"); // "typing" | "pausing" | "deleting"
    const [textIndex, setTextIndex] = useState(0);

    const strings = texts || (text ? [text] : [""]);
    const currentText = strings[textIndex];

    useEffect(() => {
        if (phase === "typing") {
            if (visibleCount >= currentText.length) {
                if (texts) {
                    setPhase("pausing");
                } else {
                    onComplete?.();
                }
                return;
            }
            const timer = setTimeout(() => setVisibleCount((v) => v + 1), typingSpeed);
            return () => clearTimeout(timer);
        } else if (phase === "pausing") {
            const timer = setTimeout(() => setPhase("deleting"), pauseTime);
            return () => clearTimeout(timer);
        } else if (phase === "deleting") {
            if (visibleCount <= 0) {
                setTextIndex((i) => Math.floor(Math.random() * strings.length));
                setPhase("typing");
                return;
            }
            const timer = setTimeout(() => setVisibleCount((v) => v - 1), deletingSpeed);
            return () => clearTimeout(timer);
        }
    }, [phase, visibleCount, currentText, texts, onComplete, typingSpeed, deletingSpeed, pauseTime, strings.length]);

    const visibleText = currentText.slice(0, visibleCount);

    return (
        <motion.div className={` ${page === "chat" ? "text-3xl" : "text-[20px] md:text-[50px]"} w-[250px] md:w-[750px] text-center leading-relaxed break-words`}>
            <span>{visibleText}</span>

            {/* Gradient Blinking Cursor */}
            <motion.span
                className="inline-block ml-1"
                style={{
                    width: "2px",
                    height: "1em",
                    background: "linear-gradient(45deg, #ff55f4, #54bcfd)",
                    verticalAlign: "middle",
                }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </motion.div>
    );
};

export default Typewriter;
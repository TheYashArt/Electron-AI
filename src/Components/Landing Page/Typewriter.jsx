import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Typewriter = ({ text, onComplete }) => {
    const [visibleCount, setVisibleCount] = useState(0);

    // Build word groups with their character index ranges
    const words = text.split(" ");
    let charIndex = 0;
    const wordGroups = words.map((word) => {
        const start = charIndex;
        charIndex += word.length + 1; // +1 for the space after
        return { word, start };
    });
    const totalChars = text.length;

    useEffect(() => {
        if (visibleCount >= totalChars) {
            onComplete?.();
            return;
        }
        const timer = setTimeout(() => {
            setVisibleCount((v) => v + 1);
        }, 10);
        return () => clearTimeout(timer);
    }, [visibleCount, totalChars]);

    return (
        <div className=" text-[20px] md:text-[50px] w-[250px] md:w-[750px] text-center leading-relaxed">
            {wordGroups.map(({ word, start }, wordIdx) => (
                // Each word is nowrap — no mid-word line breaks
                <span key={wordIdx} className="inline-block whitespace-nowrap">
                    {Array.from(word).map((char, charIdx) => {
                        const globalIdx = start + charIdx;
                        return (
                            <span
                                key={charIdx}
                                style={{
                                    opacity: globalIdx < visibleCount ? 1 : 0,
                                    transition: "opacity 0.08s ease",
                                    display: "inline",
                                }}
                            >
                                {char}
                            </span>
                        );
                    })}
                    {/* Space after each word (except last) */}
                    {wordIdx < wordGroups.length - 1 && (
                        <span
                            style={{
                                opacity: start + word.length < visibleCount ? 1 : 0,
                                transition: "opacity 0.08s ease",
                            }}
                        >
                            {"\u00A0"}
                        </span>
                    )}
                </span>
            ))}
        </div>
    );
};

export default Typewriter;
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const OrbLayer = ({ mouseX, mouseY, stiffness, damping, size, color, blur, opacity }) => {
    const x = useSpring(mouseX, { stiffness, damping, restDelta: 0.001 });
    const y = useSpring(mouseY, { stiffness, damping, restDelta: 0.001 });

    return (
        <motion.div
            style={{
                x,
                y,
                width: size,
                height: size,
                backgroundColor: color,
                filter: `blur(${blur}px)`,
                opacity: opacity,
                translateX: "-50%",
                translateY: "-50%",
            }}
            className="absolute rounded-full pointer-events-none"
        />
    );
};

export default function Animation() {
    const containerRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const el = containerRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            // Positions are relative to the container, not the viewport
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Background soft glow */}
            <OrbLayer
                mouseX={mouseX} mouseY={mouseY}
                stiffness={30} damping={40}
                size={600} color="#54bcfd" blur={120} opacity={0.15}
            />

            {/* Trailing layers */}
            <OrbLayer
                mouseX={mouseX} mouseY={mouseY}
                stiffness={40} damping={30}
                size={180} color="#ff55f4" blur={60} opacity={0.4}
            />

            <OrbLayer
                mouseX={mouseX} mouseY={mouseY}
                stiffness={60} damping={25}
                size={140} color="#54bcfd" blur={40} opacity={0.3}
            />
        </div>
    );
}

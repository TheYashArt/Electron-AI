import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

const OrbLayer = ({ mouseX, mouseY, stiffness, damping, size, color, blur, opacity, delay = 0 }) => {
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
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
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
                size={180} color="#ff55f4" blur={60} opacity={0.2}
            />

            <OrbLayer
                mouseX={mouseX} mouseY={mouseY}
                stiffness={60} damping={25}
                size={140} color="#54bcfd" blur={40} opacity={0.3}
            />

            {/* <OrbLayer
                mouseX={mouseX} mouseY={mouseY}
                stiffness={90} damping={20}
                size={100} color="#ff55f4" blur={20} opacity={0.4}
            /> */}

            {/* Main Orbs */}
            {/* <OrbLayer
                mouseX={mouseX} mouseY={mouseY}
                stiffness={150} damping={15}
                size={60} color="#54bcfd" blur={10} opacity={0.6}
            /> */}

            {/* <OrbLayer
                mouseX={mouseX} mouseY={mouseY}
                stiffness={250} damping={10}
                size={30} color="#ff55f4" blur={4} opacity={0.8}
            /> */}

            {/* Core */}
            {/* <OrbLayer
                mouseX={mouseX} mouseY={mouseY}
                stiffness={500} damping={5}
                size={12} color="#ffffff" blur={1} opacity={1}
            /> */}
        </div>
    );
}

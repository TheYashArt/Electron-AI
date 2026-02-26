import components from "../../assets/Icons/components.png";
import cpu from "../../assets/Icons/cpu.png";
import electricMeter from "../../assets/Icons/electric-meter.png";
import electricalpanel from "../../assets/Icons/electrical-panel.png";
import fuseBox from "../../assets/Icons/fuse-box.png";
import plug from "../../assets/Icons/plug.png";
import resistor from "../../assets/Icons/resistor.png";
import semiconductor from "../../assets/Icons/semiconductor.png";
import settings from "../../assets/Icons/settings.png";
import system from "../../assets/Icons/system.png";
import transistor from "../../assets/Icons/transistor.png";
import wire from "../../assets/Icons/wire.png";

import { motion } from "framer-motion";
export default function Floating() {

    const FloatingImage = ({ src, index }) => {
        return (
            <motion.div
                initial={{ y: 0 }}
                animate={{
                    y: [0, -30, 0, 30, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: [
                        "easeOut",   // leaving center → going up
                        "linear",    // coming back to center
                        "easeIn",    // leaving center → going down
                        "linear"     // coming back to center
                    ],
                    delay: index * 0.6, // 👈 serial wave effect
                }}
                className="bg-gray-100 p-6 rounded-full shadow-lg">

                <motion.img
                    src={src}
                    alt=""

                    className="w-8 h-8  object-cover rounded-xl bg-gray-100"
                />
            </motion.div>
        );
    };

    const images = [
        components,
        cpu,
        electricMeter,
        electricalpanel,
        fuseBox,
        plug,
        resistor,
        semiconductor,
        settings,
        system,
        transistor,
        wire,
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-wrap gap-8 py-30 justify-between bg-white">
            {images.map((src, index) => (
                <div
                    key={index}
                    className={index > 3 ? "hidden md:block" : ""}
                >
                    <FloatingImage src={src} index={index} />
                </div>
            ))}
        </motion.div>
    );
}
import { motion } from "framer-motion";
import { Upload, MessageSquare, Settings } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Working() {

    const [active, setActive] = useState(null)
    const nav = useNavigate();

    const cards = [
        { name: "Upload Documents", description: "Easily upload your files and documents to get started.", icon: Upload, color: "from-[#54bcfd]/40 to-[#ffffff]" },
        { name: "Generate Embedding", description: "Generate Embeddings and store them.", icon: Settings, color: "from-[#F8E559]/40 to-[#ffffff]" },
        { name: "Chat", description: "Chat with your Knowledge seemlessly", icon: MessageSquare, color: "from-[#ff55f4]/40 to-[#ffffff]" },
    ]
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative bg-white"
            id="how-it-works">
            <div className="text-4xl text-center pt-20">How it works</div>

            <div className="flex md:flex-row flex-col w-full justify-center p-5 gap-6 mt-10">
                {cards.map((card, index) => {
                    const isActive = active === index;
                    const isInactive = active !== null && active !== index;

                    return (
                        <motion.div
                            key={index}
                            onHoverStart={() => setActive(index)}
                            onHoverEnd={() => setActive(null)}
                            onClick={card.name === "Chat" ? () => {nav("/chat")} : card.name === "Upload Documents" ? () => {nav("/upload")} : null}
                            animate={{
                                scale: isActive ? 1.08 : 1,
                                filter: isInactive ? "blur(1px)" : "blur(0px)",
                                opacity: isInactive ? 0.6 : 1,
                            }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className={`bg-gradient-to-b ${card.color} rounded-lg p-6 w-full h-fit py-12 px-10 md:w-1/4 text-center`}

                        >
                            <div className="flex justify-center">
                                <card.icon size={48} className="mb-4" />
                            </div>
                            <h2 className="text-2xl font-semibold my-5">{card.name}</h2>
                            <p className="text-gray-600 my-3">{card.description}</p>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    )
}
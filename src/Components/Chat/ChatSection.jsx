import { useState, useRef, useEffect } from "react";
import { Bot, Copy, User, Send } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function ChatSection({ messages, onSendMessage }) {

    const [msg, setMsg] = useState("");

    const sendMessage = () => {
        const trimmed = msg.trim();
        if (!trimmed) return;
        onSendMessage(trimmed);
        setMsg("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }
    };

    const [copiedIndex, setCopiedIndex] = useState(null);
    const bottomRef = useRef(null);

    useEffect(() => {
        if (messages.length > 0) {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages.length]);

    const handleCopy = async (text, index) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedIndex(index);

            setTimeout(() => {
                setCopiedIndex(null);
            }, 1500);
        } catch (err) {
            console.error("Copy failed", err);
        }
    };

    return (
        <div className="relative chat-section h-screen text-black p-5 flex flex-col gap-5">
            <div data-lenis-prevent className="no-scrollbar flex-1 overflow-y-auto pb-20 pt-2">
                {messages.length === 0 ? (
                    <div className="flex text-center items-center text-4xl font-semibold justify-center h-full text-gray-500">
                        Start a new conversation
                    </div>
                ) : (
                    messages.map((chat, index) => (
                        <div className={`flex ${chat.role === "User" ? "justify-end" : "justify-start"} my-5`} key={index}>
                            <div className="flex flex-col items-start max-w-2xl wrap-break-word">
                                <div className={`chat-message w-fit max-w-2xl py-2 rounded-lg ${chat.role === "User" ? "bg-[#e5f3ff] self-end px-5" : "bg-white self-start"}`}>
                                    <div>{chat.message}</div>
                                </div>
                                <div className={`flex ${chat.role === "User" ? "justify-end" : "justify-start"} w-full`}>
                                    <div className={`flex ${chat.role === "User" ? "justify-end" : "justify-start"}`}>
                                        <motion.div
                                            whileTap={{ scale: 0.8 }}
                                            whileHover={{ scale: 1.1 }}
                                            onClick={() => handleCopy(chat.message, index)}
                                            className={`cursor-pointer mt-2 relative flex w-full ${chat.role === "User" ? "justify-end" : "justify-start"}`}
                                        >
                                            {copiedIndex === index ? (
                                                <AnimatePresence>
                                                    {copiedIndex === index && (
                                                        <motion.span
                                                            initial={{ opacity: 0, y: -5 }}
                                                            animate={{ opacity: 1, y: -15 }}
                                                            exit={{ opacity: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                            className="absolute text-xs font-semibold text-green-500 left-0 top-0"
                                                        >
                                                            Copied
                                                        </motion.span>
                                                    )}
                                                </AnimatePresence>
                                            ) :
                                                (<Copy size={15} />)}
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                <div ref={bottomRef} />
            </div>
            <AnimatePresence>
                {messages.length == 0 ? (
                    <div className="w-full flex justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: -200 }}
                            animate={{ opacity: 1, y: -230 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white mt-3 absolute bottom-5 left-1/2 -translate-x-1/2 transform w-[95%] sm:w-[85%] md:w-[70%] lg:w-[60%] max-w-3xl flex border px-5 rounded-full border-gray-300 items-center align-middle">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                value={msg}
                                onChange={(e) => setMsg(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full p-3 rounded-full  focus:outline-none focus:ring-0"
                            />
                            <button
                                onClick={sendMessage}
                                disabled={!msg.trim()}
                                className={`p-2.5 rounded-full flex items-center justify-center transition-colors duration-200 ${msg.trim() ? "text-black" : " text-gray-500 cursor-not-allowed"}`}
                            >
                                <Send size={25} />
                            </button>
                        </motion.div>
                    </div>

                ) :
                    (
                        <motion.div className="flex justify-center w-full">
                            <motion.div
                                initial={{ opacity: 0, y: -200 }}
                                animate={{ opacity: 1, y: 15 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white mt-3 absolute bottom-5 left-1/2 -translate-x-1/2 transform w-[95%] sm:w-[85%] md:w-[70%] lg:w-[60%] max-w-3xl flex border px-3 rounded-full border-gray-300 items-center align-middle">
                                <input
                                    type="text"
                                    placeholder="Ask Electron AI ..."
                                    value={msg}
                                    onChange={(e) => setMsg(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="w-full p-3 rounded-full  focus:outline-none focus:ring-0"
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={!msg.trim()}
                                    className={`p-2.5 rounded-full flex items-center justify-center transition-colors duration-200
                                        ${!msg.trim() ? "text-black" : " text-gray-500 cursor-not-allowed"}`}
                                >
                                    <Send size={25} />
                                </button>
                            </motion.div>
                        </motion.div>
                    )
                }

            </AnimatePresence>
        </div >
    );
}

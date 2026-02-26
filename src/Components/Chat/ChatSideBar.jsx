import { Plus, Sidebar, EllipsisVertical, MessageSquare, Settings, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function ChatSideBar() {
    const chats = ["chat1", "chat2", "chat3", "chat4", "chat5", "chat6", "chat7", "chat8", "chat9", "chat10", "chat11", "chat12", "chat13", "chat14", "chat15", "chat16", "chat17", "chat18", "chat19", "chat20"];
    const setitngOptions = ["profile", "Settings"]
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [ismodel, setIsmodel] = useState(false)
    return (
        <div>
            {
                !sidebarOpen && (
                    <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }} 
                    transition={{ duration: 0.6 }}  
                    className="absolute top-4 left-4">
                        <Sidebar size={30} onClick={() => setSidebarOpen(prev => !prev)} />
                    </motion.div>
                )
            }

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ width: sidebarOpen ? "100%" : "0", opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-black h-screen bg-gray-100 flex flex-col overflow-hidden">

                {/* ── Header ── */}
                <div className="flex justify-between items-center py-2.5 px-3">
                    {/* Title: hidden on mobile */}
                    <div className="md:block text-xl font-semibold truncate">
                        Electron AI
                    </div>
                    <div
                        className="cursor-pointer"
                        onClick={() => setSidebarOpen(prev => !prev)}
                    >
                        <Sidebar size={20} />
                    </div>
                </div>

                {/* ── Action Buttons ── */}
                <div className="py-3.5 flex flex-col gap-2 px-2">
                    {/* New Chat */}
                    <div className="flex hover:bg-gray-200 transition duration-300 rounded-full py-1.5 px-2 justify-between items-center cursor-pointer">
                        {/* Icon always visible */}
                        <div className="flex justify-between w-full items-center gap-2">
                            {/* Label hidden on mobile */}
                            <span className=" md:block text-sm">New Chat</span>
                            <Plus size={18} />
                        </div>
                    </div>

                    {/* Manage Knowledge */}
                    <div className="flex hover:bg-gray-200 transition cursor-pointer duration-300 rounded-full py-1.5 px-2 items-center gap-2">
                        <span className=" md:block text-sm">Manage Knowledge</span>
                    </div>
                </div>

                {/* ── History ── */}
                <div className="flex-1 min-h-0 flex flex-col gap-2 py-3 px-2">
                    {/* Label hidden on mobile */}
                    <div className=" md:block text-xs text-gray-500 font-semibold uppercase tracking-wider px-2 mb-1">
                        History
                    </div>

                    <div data-lenis-prevent className="no-scrollbar overflow-y-auto min-h-0 flex-1 flex flex-col gap-1">
                        {chats.map((chat, index) => (
                            <div key={index} className="flex hover:bg-gray-200 transition cursor-pointer duration-300 rounded-full py-2 px-2 justify-between items-center group">
                                {/* Icon always shown on mobile; hidden on desktop (text takes over) */}
                                <div className="flex items-center gap-2 min-w-0">
                                    <span className=" md:block truncate text-sm">{chat}</span>
                                </div>
                                <EllipsisVertical size={16} className=" md:group-hover:block shrink-0" />
                            </div>
                        ))}
                    </div>
                </div>

                <AnimatePresence>
                    {ismodel && (
                        <motion.div
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0, y: 40 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.8, opacity: 0, y: 40 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                className="bg-white p-6 rounded-xl shadow-2xl h-[70%] md:w-[50%] flex flex-col"
                            >
                                {/*side bar */}
                                <div>
                                    {setitngOptions.map((option, index) => {
                                        return (
                                            <div key={index} className="flex items-center gap-2 mb-4 cursor-pointer">
                                                {option === "profile" ? <User size={18} /> : <Settings size={18} />}
                                                <span className="text-sm capitalize">{option}</span>
                                            </div>
                                        )
                                    })}
                                </div>

                                <p className="text-gray-600 mb-6">
                                    This is your animated modal in the middle of the screen.
                                </p>

                                <button
                                    onClick={() => setIsmodel(false)}
                                    className="px-4 py-2 bg-gray-200 rounded cursor-pointer"
                                >
                                    Close
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>


                <div className="h-12 flex items-center px-3 gap-4 bg-gray-200 py-8">
                    {/* Footer */}
                    <div className="h-10 w-10 rounded-full bg-gray-600 cursor-pointer"
                        onClick={() => { setIsmodel(true) }} />
                    <div>
                        Name
                    </div>
                </div>
            </motion.div>
        </div>

    )
}
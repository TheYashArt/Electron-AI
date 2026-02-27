import { Plus, Sidebar, EllipsisVertical, Settings, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { nav } from "framer-motion/client";
export default function ChatSideBar({
    isOpen,
    setIsOpen,
    onNewChat,
    chats,
    onSelectChat,
    currentChatId,
    onRenameChat,
    onDeleteChat
}) {
    const setitngOptions = ["profile", "Settings"]
    const navigate = useNavigate()
    const [ismodel, setIsmodel] = useState(false)
    const [selectedOption, setSelectedOption] = useState("profile")
    const models = ["gpt-3.5-turbo", "gpt-4", "gpt-4-32k"]
    const [selectedModel, setSelectedModel] = useState("gpt-3.5-turbo")
    const [userName, setUserName] = useState("GMS")
    const [editingChat, setEditingChat] = useState(null)
    const [editTitle, setEditTitle] = useState("")

    const handleLogout = () => {
        //Handle Logout API
        navigate("/login")
    }

    const openEditChat = (chat) => {
        setEditingChat(chat)
        setEditTitle(chat.title || "New Chat")
    }

    const closeEditChat = () => {
        setEditingChat(null)
        setEditTitle("")
    }

    const handleSaveChat = () => {
        if (editingChat && editTitle.trim()) {
            onRenameChat(editingChat.id, editTitle.trim())
        }
        closeEditChat()
    }

    const handleDeleteChat = () => {
        if (editingChat) {
            onDeleteChat(editingChat.id)
        }
        closeEditChat()
    }
    return (
        <>
            <AnimatePresence>
                {
                    !isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute h-screen top-4 left-4 z-1 w-10 rounded-full flex items-start justify-center cursor-pointer">
                            <Sidebar size={25} onClick={() => setIsOpen(true)} className="cursor-pointer" />
                        </motion.div>
                    )
                }
            </AnimatePresence>

            <motion.div
                initial={false}
                animate={{ width: isOpen ? 260 : 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-black h-screen bg-[#F9F9F9] flex flex-col overflow-hidden shrink-0">

                {/* ── Header ── */}
                <div className="flex justify-between items-center py-2.5 px-3 w-[260px]">
                    {/* Title: hidden on mobile */}
                    <div 
                    onClick={()=>{navigate("/")}}
                    className="md:block text-xl      cursor-pointer">
                        Electron <span className="font-bold">AI</span>
                    </div>
                    <div
                        className="cursor-pointer"
                        onClick={() => setIsOpen(false)}
                    >
                        <Sidebar size={20} />
                    </div>
                </div>

                {/* ── Action Buttons ── */}
                <div className="py-3.5 flex flex-col gap-2 px-2 w-[260px]">
                    {/* New Chat */}
                    <div
                        onClick={onNewChat}
                        className="flex hover:bg-gray-100 transition duration-300 rounded-full py-1.5 px-2 justify-between items-center cursor-pointer">
                        {/* Icon always visible */}
                        <div className="flex justify-between w-full items-center gap-2">
                            {/* Label hidden on mobile */}
                            <span className=" md:block text-sm">New Chat</span>
                            <Plus size={18} />
                        </div>
                    </div>

                    {/* Manage Knowledge */}
                    <div 
                    onClick={()=>{navigate("/upload")}}
                    className="flex hover:bg-gray-100 transition cursor-pointer duration-300 rounded-full py-1.5 px-2 items-center gap-2">
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
                        {chats.map((chat) => (
                            <div
                                key={chat.id}
                                onClick={() => onSelectChat(chat.id)}
                                className={`flex relative hover:bg-gray-100 transition cursor-pointer duration-300 rounded-full py-2 px-2 justify-between items-center group ${currentChatId === chat.id ? "bg-gray-200" : ""
                                    }`}
                            >
                                <div className="flex items-center gap-2 min-w-0">
                                    <span className="truncate text-sm">
                                        {chat.title || "New Chat"}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        openEditChat(chat)
                                    }}
                                    className="p-1 rounded-full hover:bg-gray-300 transition"
                                >
                                    <EllipsisVertical size={16} className="shrink-0" />
                                </button>
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
                                className="bg-white p-6 rounded-xl shadow-2xl h-[70%] w-[90%] md:w-[50%] flex flex-col justify-between"
                            >
                                <div className="flex h-full gap-6 py-2">

                                    {/*side bar */}
                                    <div className="w-[30%]">
                                        {setitngOptions.map((option, index) => {
                                            return (
                                                <div key={index}
                                                    onClick={() => { setSelectedOption(option) }}
                                                    className="flex items-center gap-2 mb-4 cursor-pointer hover:bg-gray-200 p-2 rounded">
                                                    {option === "profile" ? <User size={18} /> : <Settings size={18} />}

                                                    <span className="text-sm capitalize">{option}</span>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    <AnimatePresence>
                                        {selectedOption === "profile" ? (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="flex-1 p-4 rounded-lg"
                                            >
                                                {/* content */}

                                                <div>
                                                    <div className="w-full bg-gray-200 px-3 py-2 rounded-xl">
                                                        {userName}
                                                    </div>
                                                    <div
                                                        onClick={handleLogout}
                                                        className="w-full bg-gray-200 mt-4 px-3 py-2 rounded-xl text-red-500 cursor-pointer font-bold">
                                                        Log Out
                                                    </div>
                                                </div>

                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="flex-1 p-4 rounded-lg"
                                            >
                                                {/* content */}

                                                <div>
                                                    <div className="py-2">
                                                        Change Model
                                                    </div>

                                                    {models.map((model, index) => {
                                                        return (
                                                            <div
                                                                onClick={() => { setSelectedModel(model) }}
                                                                key={index} className={`px-3 my-2 py-2 rounded-lg w-full cursor-pointer ${selectedModel === model ? "bg-gray-200" : "bg-gray-100"}`}>
                                                                {model}
                                                            </div>
                                                        )
                                                    })}
                                                </div>

                                            </motion.div>
                                        )}

                                    </AnimatePresence>

                                </div>

                                <button
                                    onClick={() => setIsmodel(false)}
                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
                                >
                                    Save
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>


                <div className="h-12 flex items-center px-3 gap-4 bg-gray-100 py-8">
                    {/* Footer */}
                    <div className="h-10 w-10 rounded-full bg-gray-600 cursor-pointer"
                        onClick={() => { setIsmodel(true) }} />
                    <div>
                        {userName}
                    </div>
                </div>

                <AnimatePresence>
                    {editingChat && (
                        <motion.div
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                                className="bg-white w-[90%] md:w-[380px] p-6 rounded-xl shadow-2xl"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <div className="text-lg font-semibold">Edit chat</div>
                                        <p className="text-sm text-gray-500">Rename or delete this conversation.</p>
                                    </div>
                                </div>

                                <label className="text-xs font-semibold text-gray-600">Chat name</label>
                                <input
                                    autoFocus
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    className="w-full mt-2 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    placeholder="Enter a name"
                                />

                                <div className="flex justify-between items-center mt-6">
                                    <button
                                        type="button"
                                        onClick={handleDeleteChat}
                                        className="text-red-600 font-medium hover:bg-red-50 px-3 py-2 rounded-lg"
                                    >
                                        Delete chat
                                    </button>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={closeEditChat}
                                            className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleSaveChat}
                                            disabled={!editTitle.trim()}
                                            className={`px-4 py-2 rounded-lg text-white ${editTitle.trim() ? "bg-gray-900 hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"}`}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </>

    )
}

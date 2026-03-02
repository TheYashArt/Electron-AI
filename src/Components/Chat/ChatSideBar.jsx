import { Plus, Sidebar, EllipsisVertical, Settings, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { nav } from "framer-motion/client";
import image from "../../assets/logo.png"
import ProfileModel from "../Models/ProfileModel";
import EditChatModel from "../Models/EditChatModel";
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
    
    const navigate = useNavigate()
    const [ismodel, setIsmodel] = useState(false)
    const [selectedOption, setSelectedOption] = useState("profile")
    const models = ["High", "Medium", "Low", "Custom"]
    const [selectedModel, setSelectedModel] = useState("High")
    const [isEditingUsername, setIsEditingUsername] = useState(false)
    const [isEditingEmail, setIsEditingEmail] = useState(false)
    const [userName, setUserName] = useState("GMS")
    const [userEmail, setUserEmail] = useState("UserEmail.@gmail.com")
    const [editingChat, setEditingChat] = useState(null)
    const [editTitle, setEditTitle] = useState("")
    const [hasChanged, setHasChanged] = useState(false)

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
                    <div className="flex items-center gap-2 text-center"
                        onClick={() => { nav("/") }}>
                        {/* <img src={image} alt="logo" width={50} /> */}
                        <span className="text-2xl text-center">Electron</span>  <span className="text-2xl font-semibold text-center">AI</span>
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
                        onClick={() => { navigate("/upload") }}
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
                                <div className="flex items-center gap-2 min-w-0 px-2.5">
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

                <ProfileModel
                ismodel={ismodel}
                setIsmodel={setIsmodel}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                userName={userName}
                setUserName={setUserName}
                userEmail={userEmail}
                setUserEmail={setUserEmail}
                isEditingUsername={isEditingUsername}
                setIsEditingUsername={setIsEditingUsername}
                isEditingEmail={isEditingEmail}
                setIsEditingEmail={setIsEditingEmail}
                hasChanged={hasChanged}
                setHasChanged={setHasChanged}
                handleLogout={handleLogout}
                models={models}
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
            />


                <div
                    onClick={() => { setIsmodel(true) }}
                    className="h-12 flex items-center px-3 gap-4 bg-gray-100 py-8 hover:bg-gray-200 cursor-pointer   ">
                    {/* Footer */}
                    <div className="h-10 w-10 rounded-full bg-gray-400 font-bold text-xl cursor-pointer flex justify-center items-center"
                    >
                        {userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        {userName}
                    </div>
                </div>

                <EditChatModel
                editingChat={editingChat}
                setEditingChat={setEditingChat}
                editTitle={editTitle}
                setEditTitle={setEditTitle}
                handleDeleteChat={handleDeleteChat}
                handleSaveChat={handleSaveChat}
                closeEditChat={closeEditChat}
                />
            </motion.div>
        </>

    )
}

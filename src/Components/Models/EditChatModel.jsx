import { AnimatePresence, motion } from "framer-motion"

export default function EditChatModel({editingChat,setEditingChat,editTitle,setEditTitle,handleDeleteChat,handleSaveChat, closeEditChat}) {
    return (
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
                                            className="px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-100"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleSaveChat}
                                            disabled={!editTitle.trim()}
                                            className={`px-4 py-2 rounded-full text-white ${editTitle.trim() ? "bg-gray-900 hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"}`}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
    )
}
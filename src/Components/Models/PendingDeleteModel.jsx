import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function PendingDeleteModel({pendingDelete,setPendingDelete,handleDelete}) {
    return (
        <AnimatePresence>
                {pendingDelete && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
                        onClick={() => setPendingDelete(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", stiffness: 260, damping: 22 }}
                            className="bg-white w-[90%] md:w-[420px] p-6 rounded-2xl shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <div className="text-lg font-semibold">Delete project?</div>
                                    <p className="text-sm text-gray-500">This action cannot be undone.</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setPendingDelete(null)}
                                    className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            <div className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-sm text-gray-700">
                                {pendingDelete.name}
                            </div>
                            <div className="flex justify-end gap-3 mt-5">
                                <button
                                    type="button"
                                    onClick={() => setPendingDelete(null)}
                                    className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

    )
}
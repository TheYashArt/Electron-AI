import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function NewProjectModel({
    isModel,
    setIsModel,
    projectName,
    setProjectName,
    projectDesc,
    setProjectDesc,
    handleCreate
}) {
    return (
        <AnimatePresence>
            {isModel && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={() => setIsModel(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 24 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 24 }}
                        transition={{ type: "spring", stiffness: 260, damping: 22 }}
                        className="bg-white w-[90%] md:w-[60%] max-w-xl p-6 rounded-2xl shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <div className="text-lg font-semibold">Create new project</div>
                                <p className="text-sm text-gray-500">
                                    Give your project a name and optional description.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsModel(false)}
                                className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-700">Project name</label>
                                <input
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                    placeholder="My research project"
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-gray-700">Description</label>
                                <textarea
                                    value={projectDesc}
                                    onChange={(e) => setProjectDesc(e.target.value)}
                                    placeholder="Optional short description"
                                    rows={3}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 resize-none"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={() => setIsModel(false)}
                                className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                disabled={!projectName.trim()}
                                onClick={handleCreate}
                                className={`px-4 py-2 rounded-lg text-white ${projectName.trim()
                                    ? "bg-gray-900 hover:bg-black"
                                    : "bg-gray-300 cursor-not-allowed"
                                    }`}
                            >
                                Create
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
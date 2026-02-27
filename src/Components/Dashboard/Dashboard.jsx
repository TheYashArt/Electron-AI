import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Plus, Settings, Trash, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [isModel, setIsModel] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [projectDesc, setProjectDesc] = useState("");
    const [userName, setUserName] = useState("Yash")
    const [userEmail, setUserEmail] = useState("[EMAIL_ADDRESS]")
    const models = ["High", "Medium", "Low"]
    const [currentModel, setCurrentModel] = useState("High")
    const [SetitngOpen, setSetitngOpen] = useState(false)
    const nav = useNavigate()

    const [projects, setProjects] = useState([
        { id: 1, name: "Project 1", desc: "Example description" },
        { id: 2, name: "Project 2", desc: "Another description" }
    ]);
    const [pendingDelete, setPendingDelete] = useState(null);

    const handleCreate = () => {
        if (!projectName.trim()) return;
        const id = Date.now();
        setProjects((prev) => [
            ...prev,
            { id, name: projectName.trim(), desc: projectDesc.trim() }
        ]);
        setProjectName("");
        setProjectDesc("");
        setIsModel(false);
    };

    const handleDelete = () => {
        if (!pendingDelete) return;
        setProjects((prev) => prev.filter((p) => p.id !== pendingDelete.id));
        setPendingDelete(null);
    };

    return (
        <motion.div className="flex flex-col">
            <div className="flex cursor-pointer justify-between px-10 pt-5">
                <div 
                onClick={()=>{nav("/")}}
                className="text-2xl">Electron <span className="font-bold">AI</span></div>
                <div className="flex justify-between gap-5 items-center">
                    <div
                        onClick={() => { setSetitngOpen(true) }}
                        className="w-10 h-10 cursor-pointer rounded-full border border-gray-200 flex justify-center items-center">
                        {userName.slice(0, 1).toUpperCase()}
                    </div>
                </div>
            </div>

            <div className="flex justify-end px-10 py-10">
                <button
                    onClick={() => setIsModel(true)}
                    className="px-3 py-2 flex justify-center items-center gap-4 rounded-2xl bg-gradient-to-r from-[#ff55f4]/60 to-[#54bcfd]/60"
                >
                    <Plus size={20} />
                    New Project
                </button>
            </div>

            <div data-lenis-prevent className=" no-scrollbar grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-10">
                {projects.length === 0 && (
                    <div className="col-span-full text-center text-gray-500 py-10 border border-dashed rounded-3xl">
                        No projects yet. Click "New Project" to get started.
                    </div>
                )}

                {projects.map((project) => (
                    <div className="glow-btn" key={project.id}>
                        <div className="w-full h-[170px] bg-white rounded-3xl shadow-sm border border-gray-100">
                            <div className="w-full h-full bg-gray flex justify-start items-start px-5 py-5 relative rounded-3xl">
                                <button
                                    type="button"
                                    onClick={() => setPendingDelete(project)}
                                    className="absolute right-5 top-5 text-red-500 cursor-pointer p-2 rounded-full hover:bg-red-50 transition"
                                    aria-label={`Delete ${project.name}`}
                                >
                                    <Trash size={18} />
                                </button>
                                <div>
                                    <div className="text-xl font-semibold">{project.name}</div>
                                    <div className="text-gray-400 max-w-[60%]">{project.desc || "No description"}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

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


            <AnimatePresence>
                {SetitngOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 flex bg-black/10 backdrop-blur-[1px] justify-end z-50"
                        onClick={() => setSetitngOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 24 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 24 }}
                            transition={{ type: "spring", stiffness: 260, damping: 22 }}
                            className="bg-white h-fit mt-[70px] w-[80%] md:w-[15%] max-w-xl p-1 pb-2 rounded-2xl shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-end w-full">
                                <button
                                    type="button"
                                    onClick={() => setSetitngOpen(false)}
                                    className=" p-2 rounded-full hover:bg-gray-100 text-gray-600"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <div className="w-15 h-15 rounded-full bg-gray-200 text-3xl font-semibold flex items-center justify-center">
                                    {userName.slice(0, 1).toUpperCase()}
                                </div>
                                <div className="flex flex-col text-center">
                                    <span className="text-lg my-2.5">{userName}</span>
                                    <span className="text-sm text-gray-500">{userEmail}</span>
                                </div>
                                <div className="mt-5">
                                    <button className=" cursor-pointer px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600">Log out</button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

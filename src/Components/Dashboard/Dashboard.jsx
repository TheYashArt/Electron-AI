import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Plus, Settings, Trash, X, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileModel from "../Models/ProfileModel";
import image from "../../assets/logo.png"
import NewProjectModel from "../Models/NewProjectModel";
import PendingDeleteModel from "../Models/PendingDeleteModel";

export default function Dashboard() {
    const [isModel, setIsModel] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [projectDesc, setProjectDesc] = useState("");
    const [userName, setUserName] = useState("Yash")
    const [userEmail, setUserEmail] = useState("[EMAIL_ADDRESS]")
    const [isEditingUsername, setIsEditingUsername] = useState(false)
    const [isEditingEmail, setIsEditingEmail] = useState(false)
    const models = ["High", "Medium", "Low", "Custom"]
    const [currentModel, setCurrentModel] = useState("High")
    const [SetitngOpen, setSetitngOpen] = useState(false)
    const [ismodel, setIsmodel] = useState(false)
    const [hasChanged, setHasChanged] = useState(false)
    const nav = useNavigate()
    const setitngOptions = ["profile", "settings"]
    const [selectedOption, setSelectedOption] = useState("profile")
    const [selectedModel, setSelectedModel] = useState("High")

    const [projects, setProjects] = useState([
        { id: 1, name: "Project 1", desc: "Example description", type: "User" },
        { id: 2, name: "Project 2", desc: "Another description", type: "Shared" },
        { id: 3, name: "Project 3", desc: "Example description", type: "User" },
        { id: 4, name: "Project 4", desc: "Another description", type: "Shared" },
        { id: 5, name: "Project 5", desc: "Example description", type: "User" },
        { id: 6, name: "Project 6", desc: "Another description", type: "Shared" },
        { id: 7, name: "Project 7", desc: "Example description", type: "User" },
        { id: 8, name: "Project 8", desc: "Another description", type: "Shared" },
        { id: 9, name: "Project 9", desc: "Example description", type: "User" },
        { id: 10, name: "Project 10", desc: "Another description", type: "Shared" },
    ]);
    const [pendingDelete, setPendingDelete] = useState(null);

    const handleCreate = () => {
        if (!projectName.trim()) return;
        const id = Date.now();
        setProjects((prev) => [
            ...prev,
            { id, name: projectName.trim(), desc: projectDesc.trim(), type: "User" }
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

    const handleLogout = () => {
        //logout logic here...
        nav("/login")
    }

    return (
        <motion.div className="flex flex-col h-screen">
            <div className="shrink-0">
                <div className="flex cursor-pointer justify-between px-10 pt-5">
                    <div className="flex items-center gap-2 text-center"
                        onClick={() => { nav("/") }}>
                        <img src={image} alt="logo" width={50} />
                        <span className="text-2xl text-center">Electron</span>  <span className="text-2xl font-semibold text-center">AI</span>
                    </div>
                    <div className="flex justify-between gap-5 items-center">
                        <div
                            onClick={() => {
                                // setSetitngOpen(true)
                                setIsmodel(true)
                            }}
                            className="w-10 h-10 cursor-pointer rounded-full border border-gray-200 flex justify-center items-center">
                            {userName.slice(0, 1).toUpperCase()}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end px-10 py-10">
                    <button
                        onClick={() => setIsModel(true)}
                        className="px-5 font-semibold py-2 flex justify-center items-center gap-4 rounded-full bg-gray-600 text-white"
                    >
                        <Plus size={20} />
                        New Project
                    </button>
                </div>
            </div>

            <div data-lenis-prevent className="flex-1 no-scrollbar overflow-y-auto flex flex-col gap-10 px-10 pb-10">
                {projects.length === 0 && (
                    <div className="text-center text-gray-500 py-10 border border-dashed rounded-3xl">
                        No projects yet. Click "New Project" to get started.
                    </div>
                )}

                {/* Your Projects Section */}
                <div className="flex flex-col gap-5">
                    <h2 className="text-2xl font-semibold">Your Projects</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {projects.map((project) => (
                            project.type === "User" && (
                                <div
                                    onClick={() => { nav("/upload") }}
                                    className="glow-btn" key={project.id}>
                                    <div className="w-full h-[170px] bg-white rounded-3xl shadow-sm border border-gray-100">
                                        <div className="w-full h-full bg-gray flex justify-start items-start px-5 py-5 relative rounded-3xl">
                                            <button
                                                type="button"
                                                onClick={(e) => { e.stopPropagation(); setPendingDelete(project); }}
                                                className="absolute right-5 top-5 text-red-500 cursor-pointer p-2 rounded-full hover:bg-red-50 transition"
                                                aria-label={`Delete ${project.name}`}
                                            >
                                                <Trash size={18} />
                                            </button>
                                            <div>
                                                <div className="text-xl font-semibold">{project.name}</div>
                                                <div className="text-gray-400 max-w-[60%] mt-1">{project.desc || "No description"}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>

                {/* Shared Projects Section */}
                <div className="flex flex-col gap-5">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold">Shared Projects</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {projects.map((project) => (
                            project.type === "Shared" && (
                                <div
                                    onClick={() => { nav("/upload") }}
                                    className="glow-btn" key={project.id}>
                                    <div className="w-full h-[170px] bg-white rounded-3xl shadow-sm border border-gray-100">
                                        <div className="w-full h-full bg-gray flex justify-start items-start px-5 py-5 relative rounded-3xl">
                                            <button
                                                type="button"
                                                onClick={(e) => { e.stopPropagation(); setPendingDelete(project); }}
                                                className="absolute right-5 top-5 text-red-500 cursor-pointer p-2 rounded-full hover:bg-red-50 transition"
                                                aria-label={`Delete ${project.name}`}
                                            >
                                                <Trash size={18} />
                                            </button>
                                            <div>
                                                <div className="text-xl font-semibold">{project.name}</div>
                                                <div className="text-gray-400 max-w-[60%] mt-1">{project.desc || "No description"}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>

            <NewProjectModel
                isModel={isModel}
                setIsModel={setIsModel}
                projectName={projectName}
                setProjectName={setProjectName}
                projectDesc={projectDesc}
                setProjectDesc={setProjectDesc}
                handleCreate={handleCreate}
            />


            <PendingDeleteModel
                pendingDelete={pendingDelete}
                setPendingDelete={setPendingDelete}
                handleDelete={handleDelete}
            />
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
        </motion.div>
    );
}

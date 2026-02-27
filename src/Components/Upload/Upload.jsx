import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { UploadCloud, X } from "lucide-react";
import DataCard from "./DataCard";
import { nav } from "framer-motion/client";
import { useNavigate } from "react-router-dom";

const formatBytes = (bytes) => {
    if (!bytes && bytes !== 0) return "";
    const sizes = ["Bytes", "KB", "MB", "GB"];
    if (bytes === 0) return "0 Bytes";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};

const buildId = () =>
    typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export default function Upload() {
    const [files, setFiles] = useState([]);
    const [previewFile, setPreviewFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef(null);
    const urlsRef = useRef([]);
    const nav = useNavigate()

    const addFiles = (fileList) => {
        const incoming = Array.from(fileList || []);
        if (!incoming.length) return;

        const mapped = incoming.map((file, index) => {
            const url = URL.createObjectURL(file);
            urlsRef.current.push(url);
            return {
                id: buildId() + index,
                name: file.name,
                size: formatBytes(file.size),
                type: file.type || "Document",
                url
            };
        });

        setFiles((prev) => [...prev, ...mapped]);
    };

    const handleFileChange = (e) => {
        addFiles(e.target.files);
        // reset input so the same file can be chosen again
        e.target.value = "";
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        addFiles(e.dataTransfer.files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleRemove = (id) => {
        setFiles((prev) => {
            const target = prev.find((file) => file.id === id);
            if (target) {
                URL.revokeObjectURL(target.url);
                urlsRef.current = urlsRef.current.filter((u) => u !== target.url);
            }
            return prev.filter((file) => file.id !== id);
        });
        if (previewFile?.id === id) {
            setPreviewFile(null);
        }
    };

    const handleClear = () => {
        files.forEach((file) => URL.revokeObjectURL(file.url));
        urlsRef.current = [];
        setFiles([]);
        setPreviewFile(null);
    };

    const handleView = (file) => setPreviewFile(file);

    useEffect(
        () => () => {
            urlsRef.current.forEach((url) => URL.revokeObjectURL(url));
        },
        []
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="h-screen flex flex-col gap-5 justify-start pt-6 px-5"
        >
            <div className="flex justify-between items-end">
                <div>
                    <div className="font-bold text-xl">File Upload</div>
                    <div>Upload Multiple Files, preview then generate embeddings</div>
                </div>
                <div>
                    <div className="flex gap-3 items-center">
                        <button 
                        onClick={()=>{nav("/chat")}}
                        className="font-semibold cursor-pointer bg-gray-700 text-white border-gray-300 text-gray-600 px-5 py-1 rounded-xl flex justify-center items-center gap-2 transition-colors duration-200">
                            Chat
                        </button>
                        <button
                            onClick={handleClear}
                            disabled={!files.length}
                            className={`cursor-pointer ${files.length ? "hover:text-red-600 text-gray-700" : "text-gray-400 cursor-not-allowed"}`}
                        >
                            Clear all
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={`flex flex-col gap-3 h-fit py-8 border border-dashed rounded-4xl items-center justify-center transition-colors duration-150 ${isDragging ? "border-[#ff55f4] bg-[#ff55f4]/10" : "border-gray-300"
                    }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                <div className="flex flex-col justify-center items-center bg-[#ff55f4]/20 p-3 rounded-2xl ">
                    <UploadCloud size={30} className="text-[#ff55f4]" />
                </div>

                <div className="text-center">
                    Drag and Drop your files here
                    <br />
                    or
                </div>

                <div>
                    <button
                        onClick={() => inputRef.current?.click()}
                        className="cursor-pointer border border-gray-400 text-gray-600 px-3 py-1 rounded-xl flex justify-center items-center gap-2 hover:border-gray-600 hover:text-black transition-colors duration-200"
                    >
                        Select Files
                    </button>
                    <input
                        ref={inputRef}
                        type="file"
                        accept=".pdf"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>
            </div>

            <div data-lenis-prevent className="overflow-y-auto no-scrollbar grid grid-cols-1 md:grid-cols-3 gap-4 pb-6">
                {files.map((file) => (
                    <DataCard
                        key={file.id}
                        file={file}
                        onView={handleView}
                        onRemove={handleRemove}
                    />
                ))}
            </div>

            <AnimatePresence>
                {previewFile && (
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
                            className="bg-white w-[95%] md:w-[80%] lg:w-[70%] h-[85vh] p-4 rounded-2xl shadow-2xl flex flex-col"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <div className="text-lg font-semibold truncate">{previewFile.name}</div>
                                    <div className="text-xs text-gray-500">
                                        {previewFile.size} · {previewFile.type}
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setPreviewFile(null)}
                                    className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            <div className="flex-1 overflow-hidden border rounded-xl bg-gray-50">
                                <iframe
                                    title={previewFile.name}
                                    src={previewFile.url}
                                    className="w-full h-full"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

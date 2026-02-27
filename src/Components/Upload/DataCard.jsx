import { Eye, File, Trash } from "lucide-react";

export default function DataCard({ file, onView, onRemove }) {
    return (
        <div className="shadow-lg rounded-lg px-6 py-3 flex flex-col justify-between gap-3 bg-white">
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100">
                    <File size={22} className="text-gray-700" />
                </div>
                <div className="flex flex-col min-w-0">
                    <div className="font-semibold truncate">{file.name}</div>
                    <div className="flex gap-3 text-[12px] text-gray-500">
                        <span>{file.size}</span>
                        <span className="text-gray-400">{file.type || "Unknown"}</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-between">
                <button
                    className="border border-gray-400 w-25 text-gray-600 px-3 py-1 rounded-full flex justify-center items-center gap-2 hover:border-gray-600 hover:text-black transition-colors duration-200"
                    onClick={() => onView(file)}
                    type="button"
                >
                    <Eye size={18} className="inline-block mr-1" />
                    <span>View</span>
                </button>
                <button
                    className="border border-red-500 text-red-500 px-3 py-1 rounded-full flex justify-between items-center gap-2 hover:border-red-600 hover:text-red-600 transition-colors duration-200"
                    onClick={() => onRemove(file.id)}
                    type="button"
                >
                    <Trash size={18} className="inline-block mr-1" />
                    <span>Remove</span>
                </button>
            </div>
        </div>
    );
}

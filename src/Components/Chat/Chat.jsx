import { useState } from "react";
import { motion } from "framer-motion";
import ChatSection from "./ChatSection";
import ChatSideBar from "./ChatSideBar";

export default function Chat() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="flex h-screen w-screen overflow-hidden relative">

            {/* Desktop Sidebar (Always Visible) */}
            <div className=" md:w-[20%]">
                <ChatSideBar />
            </div>

            {/* Chat Section */}
            <div className="flex-1">
                <ChatSection />
            </div>
        </div>
    );
}
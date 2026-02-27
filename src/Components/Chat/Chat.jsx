import { useState } from "react";
import ChatSection from "./ChatSection";
import ChatSideBar from "./ChatSideBar";

export default function Chat() {
    const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);

    const [chats, setChats] = useState([
        {
            id: Date.now(),
            title: "New Chat",
            messages: []
        }
    ]);

    const [currentChatId, setCurrentChatId] = useState(chats[0].id);

    const handleNewChat = () => {
        const newChat = {
            id: Date.now(),
            title: `New Chat ${chats.length + 1}`,
            messages: []
        };

        setChats(prev => [newChat, ...prev]);
        setCurrentChatId(newChat.id);
    };

    const handleRenameChat = (id, title) => {
        setChats(prev =>
            prev.map(chat =>
                chat.id === id ? { ...chat, title } : chat
            )
        );
    };

    const handleDeleteChat = (id) => {
        setChats(prev => {
            const remaining = prev.filter(chat => chat.id !== id);

            if (remaining.length === 0) {
                const fallbackChat = {
                    id: Date.now(),
                    title: "New Chat",
                    messages: []
                };
                setCurrentChatId(fallbackChat.id);
                return [fallbackChat];
            }

            if (currentChatId === id) {
                setCurrentChatId(remaining[0].id);
            }

            return remaining;
        });
    };

    const handleSelectChat = (id) => {
        setCurrentChatId(id);
    };

    const handleSendMessage = (message) => {
        setChats(prev =>
            prev.map(chat =>
                chat.id === currentChatId
                    ? {
                        ...chat,
                        messages: [...chat.messages, { role: "User", message }]
                    }
                    : chat
            )
        );
    };

    const currentChat = chats.find(chat => chat.id === currentChatId);

    return (
        <div className="flex h-screen w-screen overflow-hidden relative bg-white">
            <ChatSideBar
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onNewChat={handleNewChat}
                chats={chats}
                onSelectChat={handleSelectChat}
                currentChatId={currentChatId}
                onRenameChat={handleRenameChat}
                onDeleteChat={handleDeleteChat}
            />

            <div className={`flex-1 min-w-0 ${isOpen ? "ml-0" : "ml-10"} `}>
                <ChatSection
                    messages={currentChat?.messages || []}
                    onSendMessage={handleSendMessage}
                />
            </div>
        </div>
    );
}

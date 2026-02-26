export default function ChatSection({isOpen, setIsOpen}) {
    return (
        <div className="chat-section h-screen text-black p-5">
            {/* Chat messages and input will go here */}
            {/* <div className="md: fixed top-4 left-4 z-[60]">
                <div
                    className="p-2 bg-white rounded shadow cursor-pointer"
                    onClick={() => setIsOpen(prev => !prev)}
                >
                    <Sidebar size={20} />
                </div> */}
            {/* </div> */}
        </div>
    );
}
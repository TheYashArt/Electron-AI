
import { AnimatePresence, motion } from "framer-motion";
import { User, Settings } from "lucide-react";

export default function ProfileModel({
    ismodel,
    setIsmodel,
    selectedOption,
    setSelectedOption,
    userName,
    setUserName,
    userEmail,
    setUserEmail,
    isEditingUsername,
    setIsEditingUsername,
    isEditingEmail,
    setIsEditingEmail,
    hasChanged,
    setHasChanged,
    handleLogout,
    models,
    selectedModel,
    setSelectedModel
}) {
    const setitngOptions = ["profile", "Settings"]
    return (
        <AnimatePresence>
            {ismodel && (
                <motion.div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={() => setIsmodel(false)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        initial={{ scale: 0.8, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 40 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="bg-white p-6 rounded-xl shadow-2xl h-[70%] w-[90%] md:w-[50%] flex flex-col justify-between"
                    >
                        <div className="flex h-full gap-6 py-2">

                            {/*side bar */}
                            <div className="md:w-[20%] w-fit ">
                                {setitngOptions.map((option, index) => {
                                    return (
                                        <div key={index}
                                            onClick={() => { setSelectedOption(option) }}
                                            className={`flex items-center gap-2 mb-4 cursor-pointer hover:bg-gray-200 p-2 rounded ${selectedOption == option ? "bg-gray-300" : "bg-white"} `}>
                                            {option === "profile" ? <User size={18} /> : <Settings size={18} />}

                                            <span className="text-sm capitalize hidden md:block">{option}</span>
                                        </div>
                                    )
                                })}
                            </div>

                            <AnimatePresence>
                                {selectedOption === "profile" ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex-1 p-4 rounded-lg "
                                    >
                                        {/* content */}

                                        <div className=" flex flex-col gap-4">
                                            <div className="flex justify-center">
                                                <div className="w-[80px] h-[80px] flex items-center justify-center text-4xl bg-gray-200 px-3 py-2 rounded-full">
                                                    {userName.slice(0, 1).toUpperCase()}
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-3 items-center">
                                                <div className="w-[70%]">
                                                    <div className="font-semibold">Username</div>
                                                    <div className={`flex w-full flex-col border px-3 py-1 rounded-lg transition-colors duration-150 ${isEditingUsername ? "border-black" : "border-gray-200"}`}>
                                                        <input
                                                            className="w-full ring-0 border-0 outline-none bg-transparent"
                                                            type="text"
                                                            value={userName}
                                                            onFocus={() => setIsEditingUsername(true)}
                                                            onBlur={() => setIsEditingUsername(false)}
                                                            onChange={(e) => {
                                                                setUserName(e.target.value)
                                                                setHasChanged(true)
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-[70%]">
                                                    <div className="font-semibold">Email</div>
                                                    <div className={`flex w-full flex-col border px-3 py-1 rounded-lg transition-colors duration-150 ${isEditingEmail ? "border-black" : "border-gray-200"}`}>
                                                        <input
                                                            className="w-full ring-0 border-0 outline-none bg-transparent"
                                                            type="text"
                                                            value={userEmail}
                                                            onFocus={() => setIsEditingEmail(true)}
                                                            onBlur={() => setIsEditingEmail(false)}
                                                            onChange={(e) => {
                                                                setUserEmail(e.target.value)
                                                                setHasChanged(true)
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div

                                                className="w-full flex justify-center">
                                                <div
                                                    onClick={handleLogout}
                                                    className="w-fit bg-gray-200 mt-4 px-3 py-2 rounded-xl text-red-500 cursor-pointer font-bold">
                                                    Log Out
                                                </div>
                                            </div>
                                        </div>

                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex-1 p-4 rounded-lg"
                                    >
                                        {/* content */}

                                        <div>
                                            <div className="py-2">
                                                Change Model
                                            </div>
                                            <div className="grid grid-cols-2 gap-3 ">
                                                {models.map((model, index) => {
                                                    return (
                                                        <div
                                                            onClick={() => {
                                                                setSelectedModel(model)
                                                                setHasChanged(true)
                                                            }}
                                                            key={index} className={`px-3 py-2 rounded-lg w-full cursor-pointer ${selectedModel === model ? "bg-gray-200 border-gradient" : "bg-gray-100"}`}>
                                                            {model}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                    </motion.div>
                                )}

                            </AnimatePresence>

                        </div>

                        {hasChanged && (
                            <div className="flex justify-end">
                                <button
                                    onClick={() => {
                                        setIsmodel(false)
                                        setHasChanged(false)
                                    }}
                                    className="px-6 py-2 bg-gray-600 text-white hover:bg-gray-700 rounded-full cursor-pointer"
                                >
                                    Save
                                </button>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
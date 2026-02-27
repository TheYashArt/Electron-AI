import { motion, AnimatePresence } from "framer-motion";
import { Mail, Eye, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {

    const [islogin, setIslogin] = useState(false)
    const nav = useNavigate()
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            <div>
                {/* Header */}
                <div className="py-6 flex items-center justify-between px-6 cursor-pointer"
                onClick={()=>{nav("/")}}>
                    <div className="text-3xl font-semibold">
                        Electron AI
                    </div>
                </div>

                {/* form */}
                <form className="flex justify-center gap-4 ">
                    <div className="flex flex-col gap-4 w-75 md:w-96">
                        <div className="text-3xl flex justify-center py-5">
                            {islogin? "Create Account" : "Welcome Back!"}
                        </div>

                        <motion.div
                            layout
                            transition={{ layout: { type: "spring", stiffness: 260, damping: 20 } }}
                            className="flex flex-col gap-9"
                        >
                            <AnimatePresence initial={false} presenceAffectsLayout>
                                {islogin && (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.1 }}
                                    >
                                        <div className="mb-1 text-md text-gray-800">
                                            Enter your Name
                                        </div>

                                        <div className="w-full border-gradient px-4 py-2 flex items-center">
                                            <div className="pr-3">
                                                <User size={20} />
                                            </div>

                                            <input
                                                type="text"
                                                className="w-full bg-white outline-none text-white placeholder-gray-500"
                                                placeholder="Your name"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* EMAIL */}
                            <motion.div layout>
                                <div className="mb-1 text-md text-gray-800">
                                    Enter your Email
                                </div>

                                <div className="w-full border-gradient px-4 py-2 flex items-center">
                                    <div className="pr-3">
                                        <Mail size={20} />
                                    </div>

                                    <input
                                        type="text"
                                        className="w-full bg-white outline-none text-white placeholder-gray-500"
                                        placeholder="example@gmail.com"
                                    />
                                </div>
                            </motion.div>

                            {/* PASSWORD */}
                            <motion.div layout>
                                <div className="mb-1 text-md text-gray-800">
                                    Enter your Password
                                </div>

                                <div className="w-full border-gradient px-4 py-2 flex items-center">
                                    <div className="pr-3">
                                        <Eye size={20} />
                                    </div>

                                    <input
                                        type="password"
                                        className="w-full bg-transparent outline-none text-white placeholder-gray-500"
                                        placeholder="password@123"
                                    />
                                </div>
                            </motion.div>
                        </motion.div>

                        <div>
                            <button 
                            onClick={()=>{nav("/dashboard")}}
                            className="bg-gradient-to-r from-[#ff55f4]/37 to-[#54bcfd]/56 text-white px-4 py-2 rounded-full w-full mt-6">
                                <span className="text-black font-bold text-xl">
                                   {islogin ? "Sign Up" : "Login"}
                                </span>
                            </button>
                        </div>

                        <div className="text-center mt-5">
                            {islogin ? "Already" : "Don't"} have an Account? <span className="text-blue-500 cursor-pointer" onClick={() => { setIslogin(!islogin) }}>{islogin ? "Login" : "Sign Up"}</span>
                        </div>

                    </div>
                </form>
            </div >
        </motion.div>




    );
}
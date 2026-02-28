import { motion, AnimatePresence } from "framer-motion";
import { Mail, Eye, User, EyeClosed, Lock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../../assets/logo.png"
import Animation from "../Landing Page/animation";
export default function Login() {

    const [islogin, setIslogin] = useState(false)
    const [show, setShow] = useState(false)
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const nav = useNavigate()
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-screen overflow-hidden"
        >
            <Animation />
            <div className="bg-transparent relative z-10 h-full flex flex-col">
                {/* Header */}
                <div className="pt-6  flex items-center justify-between px-6 cursor-pointer"
                    onClick={() => { nav("/") }}>
                    <div className="flex items-center justify-center gap-2">
                        <img src={image} width={50} />
                        <div className="flex gap-1 text-2xl">
                            <span className="">Electron </span> <span className="font-bold">AI</span>
                        </div>
                    </div>
                </div>

                {/* form */}
                <form className="flex-1 flex justify-center items-center gap-1 p-6">
                    <div className="flex flex-col gap-4 w-full md:w-96 bg-white p-8 rounded-3xl justify-center">
                        <div className="text-3xl flex justify-center py-5 font-semibold">
                            {islogin ? "Create Account" : "Welcome Back!"}
                        </div>

                        <motion.div
                            layout
                            transition={{ layout: { type: "spring", stiffness: 260, damping: 20 } }}
                            className="flex flex-col gap-3"
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

                                        <div className="w-full border border-gray-500 rounded-2xl  px-4 py-2 flex items-center">
                                            <div className="pr-3">
                                                <User size={20} />
                                            </div>

                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e)=>{setName(e.target.value)}}
                                                className="w-full bg-white outline-none placeholder-gray-500"
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

                                <div className="w-full border border-gray-500 rounded-2xl px-4 py-2 flex items-center">
                                    <div className="pr-3">
                                        <Mail size={20} />
                                    </div>

                                    <input
                                        type="text"
                                        value={email}
                                        onChange={(e)=>{setEmail(e.target.value)}}
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

                                <div className="w-full border border-gray-500 rounded-2xl  px-4 py-2 flex items-center">
                                    <div className="pr-3">
                                        <Lock size={20} />
                                    </div>

                                    <input
                                        type={show ? "text" : "password"}
                                        value={password}
                                        onChange={(e)=>{setPassword(e.target.value)}}
                                        className="w-full bg-transparent outline-none placeholder-gray-500"
                                        placeholder="password@123"
                                    />
                                    
                                    {password.trim() !== "" && 
                                    <div 
                                    onClick={()=>{setShow(!show)}}
                                    className="cursor-pointer"
                                    >
                                        {show ?
                                            <Eye size={20} />
                                            : <EyeClosed size={20} />}
                                    </div>}
                                </div>

                            </motion.div>
                        </motion.div>

                        <div>
                            <button
                                onClick={() => { nav("/dashboard") }}
                                className="bg-gray-600 text-white px-4 py-2 rounded-full w-full mt-6">
                                <span className=" font-bold text-xl">
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
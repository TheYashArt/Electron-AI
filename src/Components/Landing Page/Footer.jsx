import { Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"
import image from "../../assets/GMS.png"
export default function Footer() {
    return (
        <div id="footer" className="relative h-screen overflow-hidden flex flex-col justify-end gap-30 pb-6">

            {/* Background Blob */}
            <div className="absolute bottom-0 left-1/2  z-0 pointer-events-none">
                <div
                    className="w-[900px] h-[900px] rounded-full
                            bg-[radial-gradient(circle,_#ff55f4_0%,_#ff55f4_25%,_#54bcfd_45%,_#54bcfd_70%,_transparent_100%)]
                            blur-3xl opacity-20"
                    style={{ transform: "translate(-50%, 50%)" }}
                />
            </div>

            {/* Footer Content */}
            <div className="relative z-10 flex md:flex-row flex-col md:justify-center w-full gap-20 px-10 md:px-20 ">
                <div className=" w-full px-7">
                    <div className="text-3xl">
                        Electron <span className="font-semibold">AI</span>
                    </div>
                    <div className="mt-3">
                        Powered by
                    </div>
                    <div className="text-gray-600">
                        <img src={image} width={60} />
                    </div>
                </div>
                <div className="w-full px-7">
                    <div className="tetx-2xl mb-2 font-semibold">
                        Products
                    </div>
                    <div>
                        <ul className="list-inside text-gray-600">
                            <li><motion.a
                                initial={{ color: "black" }}
                                whileHover={{ color: "blue" }}
                                href="#footer">Vision RAG</motion.a></li>
                            <li><motion.a
                                initial={{ color: "black" }}
                                whileHover={{ color: "blue" }}
                                transition={{ duration: 0.3 }}
                                href="#footer">Text RAG</motion.a></li>
                            <li><motion.a
                                initial={{ color: "black" }}
                                whileHover={{ color: "blue" }}
                                transition={{ duration: 0.3 }}
                                href="#footer">Persona Agent</motion.a></li>
                        </ul>
                    </div>
                </div>
                <div className="w-full px-7">
                    <div className="tetx-2xl font-semibold">
                        Contact
                    </div>
                    <div className="flex gap-3 mt-3.5">
                        <Mail size={20} className="inline-block mr-2 hover:text-green-500 cursor-pointer" />
                        <Linkedin size={20} className="inline-block mr-2 hover:text-blue-500 cursor-pointer" />
                    </div>
                </div>
            </div>

            <div className="flex justify-between px-5 text-center mt-10">
                <div className="text-gray-500">
                    &copy; Electron AI {new Date().getFullYear()}
                </div>
                <div className=" text-gray-500">
                    All rights reserved
                </div>

            </div>

        </div>
    );
}
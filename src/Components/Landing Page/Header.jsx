import { useNavigate } from "react-router-dom";
import image from "../../assets/logo.png"
export default function Header() {
    const nav = useNavigate()
    const handleClickDemo = () => {
        document.getElementById("demo")?.scrollIntoView({
            behavior: "smooth"
        });
    };
    const handleClickWork = () => {
        document.getElementById("how-it-works")?.scrollIntoView({
            behavior: "smooth"
        });
    };
    return (
        <div className=" z-10 w-full flex justify-between py-4 px-10 items-center bg-transparent">
            <div className="flex items-center gap-2 text-center">
                <img src={image} alt="logo" width={50} />
                <span className="text-2xl text-center">Electron</span>  <span className="text-2xl font-semibold text-center">AI</span>
            </div>
            <div className="flex gap-10">
                <div className="hidden md:flex md:gap-5 md:items-center">
                    <div className="cursor-pointer hover:text-gray-400">
                        <span onClick={handleClickDemo} >Demo </span>
                    </div>
                    <div className="cursor-pointer hover:text-gray-400">
                        <span onClick={handleClickWork}> How it Works</span>
                    </div>
                </div>
                <button className="bg-gray-600 text-white px-8 font-semibold py-2 rounded-full cursor-pointer"
                    onClick={() => { nav("/login") }}>
                    Login
                </button>
            </div>
        </div>
    );
}
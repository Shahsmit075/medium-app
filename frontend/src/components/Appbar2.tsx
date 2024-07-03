import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";
import logoImage from "../assets/medium_image.png"; 

export const Appbar2 = () => {
    return (
        <div className="border-b bg-gray-900 dark:bg-gray-900 flex justify-between px-10 py-4">
            <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer text-white">
                <div className="mb-0">
                    <img
                        src={logoImage}
                        alt="Medium Clone Logo"
                        className="w-48 lg:w-60"
                    />
                </div>
            </Link>
            <div>
                <Link to={`/publish`}>
                    <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center">
                        New
                    </button>
                </Link>
                <Avatar size={"big"} name="Smit" />
            </div>
        </div>
    );
}

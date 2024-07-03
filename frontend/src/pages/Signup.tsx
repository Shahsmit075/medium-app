import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";
import logoImage from "../assets/medium_image.png"; // Replace with your actual logo path

export const Signup = () => {
    return <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
          {/* Logo */}
          <div className="mb-0">
                <img
                    src={logoImage}
                    alt="Medium Clone Logo"
                    className="w-64 lg:w-70"
                />
            </div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <Auth type="signup" />
            </div>
            <div className="hidden lg:block">
                <Quote />
            </div>
        </div>
    </div>
} 

import logoimg from '../assets/founderimg.png';

export const Quote = () => {
    return (
        <div className="bg-gray-900 min-h-screen flex justify-center items-center p-6">
            <div className="max-w-md p-8 bg-gray-800 rounded-lg shadow-lg flex flex-col items-center">
                <div className="text-xl font-semibold text-white text-center mb-4">
                    "Writing is a way to delve into the depths of your thoughts and share them with the world. Every story, every article, is a journey that brings your readers closer to new perspectives and ideas."
                </div>
                <div className="flex items-center mb-4">
                    <img 
                        src={logoimg}
                        alt="Author Image"
                        className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div className="text-lg font-medium text-white text-left">
                        Evan Clark Williams
                    </div>
                </div>
                <div className="text-sm font-light text-gray-400 text-center">
                    Entrepreneur | Medium Founder
                </div>
            </div>
        </div>
    );
}

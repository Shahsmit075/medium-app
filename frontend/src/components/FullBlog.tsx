import { Blog } from "../hooks";
import { Appbar2 } from "./Appbar2";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <Appbar2 />
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                    <div className="col-span-8">
                        <div className="text-4xl font-extrabold text-white">
                            {blog.title}
                        </div>
                        <div className="text-gray-400 pt-2">
                            Post on 2nd December 2023
                        </div>
                        <div className="pt-4 text-gray-300">
                            {blog.content}
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className="text-gray-400 text-lg">
                            Author
                        </div>
                        <div className="flex w-full">
                            <div className="pr-4 flex flex-col justify-center">
                                <Avatar size="big" name={blog.author.name || "Anonymous"} />
                            </div>
                            <div>
                                <div className="text-xl font-bold text-white">
                                    {blog.author.name || "Anonymous"}
                                </div>
                                <div className="pt-2 text-gray-400">
                                    Random catch phrase about the author's ability to grab the user's attention
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

import { Appbar2 } from "../components/Appbar2";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs, Blog } from "../hooks"; // Adjust the import path as per your project structure

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if(loading) {
        return <div>
            <Appbar2 />
            <div>
                <BlogSkeleton />
            </div>
        </div>
    }
    return (
        <div>
            <Appbar2 />
            <div className="p-4 bg-gray-900 min-h-screen dark:bg-gray-900">
                <div className="max-w-screen-md mx-auto">
                    {loading ? (
                        <p className="text-white text-center mt-4">Loading...</p>
                    ) : blogs.length > 0 ? (
                        blogs.map((blog: Blog) => (
                            <div key={blog.id} className="mb-4">
                                <BlogCard
                                    id={blog.id}
                                    authorName={blog.author.name || "Anonymous"}
                                    title={blog.title}
                                    content={blog.content}
                                    publishedDate={"2nd Feb 2024"} // Adjust with actual published date
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-white text-center mt-4">No blogs found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

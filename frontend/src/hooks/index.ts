import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Blog {
    content: string;
    title: string;
    id: number;
    author: {
        name: string;
    };
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog | null>(null); // Single blog state, initialized to null

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const Token = localStorage.getItem("Token");
                if (!Token) {
                    throw new Error("No JWT token found.");
                }

                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                    headers: {
                        Authorization: Token,
                    },
                });

                console.log("API Response:", response.data);

                // Assuming the API returns a single blog object
                if (response.data && typeof response.data === "object") {
                    setBlog(response.data); // Set the single blog object
                } else {
                    throw new Error("Invalid blog data received.");
                }
            } catch (error) {
                console.error("Error fetching blog:", error);
            } finally {
                setLoading(false); // Set loading to false even on error or success
            }
        };

        fetchBlog();
    }, [id]); // Dependency array includes id to refetch when id changes

    return {
        loading,
        blog,
    };
};



export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const Token = localStorage.getItem("Token");
                if (!Token) {
                    throw new Error("No JWT token found.");
                }

                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    headers: {
                        Authorization: Token,
                    },
                });
                console.log("API Response:", response.data);
                if (Array.isArray(response.data)) {
                    setBlogs(response.data); // Assuming blogs are directly returned as an array
                    setLoading(false);
                } else {
                    throw new Error("Invalid blogs data received.");
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setLoading(false); // Set loading to false even on error
            }
        };

        fetchBlogs();
    }, []); // Empty dependency array to run only once on mount

    return {
        loading,
        blogs,
    };
};

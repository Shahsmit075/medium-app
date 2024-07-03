import { Link } from 'react-router-dom';

interface BlogCardProps {
    id: number;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`}>
            <div className="p-4 rounded-lg border-solid border-2 border-sky-500 pb-4 w-screen max-w-screen-md cursor-pointer dark:bg-gray-800">
                <div className="flex items-center">
                    <Avatar name={authorName} />
                    <div className="pl-2 text-sm text-gray-400">{authorName}</div>
                    <div className="pl-2"><Circle /></div>
                    <div className="pl-2 text-sm text-gray-500">{publishedDate}</div>
                </div>
                <div className="text-xl font-semibold text-white pt-2">
                    {title}
                </div>
                <div className="text-md text-gray-300">
                    {content.slice(0, 100) + "..."}
                </div>
                <div className="text-gray-500 text-sm pt-4">
                    {`${Math.ceil(content.length / 100)} minute(s) read`}
                </div>
            </div>
        </Link>
    );
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400"></div>;
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return (
        <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 dark:bg-blue-400 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
            <span className={`${size === "small" ? "text-xs" : "text-lg"} font-extralight text-gray-600 dark:text-black`}>
                {name[0]}
            </span>
        </div>
    );
}

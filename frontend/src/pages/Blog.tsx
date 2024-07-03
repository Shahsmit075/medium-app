import { useBlog } from "../hooks"
import {useParams} from "react-router-dom";
import { Appbar2 } from "../components/Appbar2";
import { FullBlog } from "../components/FullBlog";
import {Spinner} from "../components/Spinner"
// import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blog = () => {

  const { id } = useParams();
  const {loading, blog} = useBlog({ id: id || "" });

  if (loading) {
    return (
        <div>
            <Appbar2 />
            <div className="h-screen flex flex-col justify-center bg-slate-900">
                <div className="flex justify-center">
                    <Spinner />
                </div>
            </div>
        </div>
    );
  }

  if (!blog) {
    return (
        <div>
            <Appbar2 />
            <div className="h-screen flex flex-col justify-center">
                <div className="flex justify-center">
                    <p>No blog found or error loading blog.</p>
                </div>
            </div>
        </div>
    );
  }

  return <div>
    <FullBlog blog={blog} />
  </div>  
  }
  
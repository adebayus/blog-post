import { useEffect, useRef, useState } from "react";
import PostCard from "./post-card";
import Pagination from "../pagination";
import { getBlogPost } from "@/uitls/PostService";
import { IPost, IPostResponse } from "@/types/types";

const PostBLog = () => {

    const containerRef = useRef<HTMLDivElement>(null)
    const [width, setWidth] = useState<number>(0)
    const [posts, setPosts] = useState<IPostResponse>()

    useEffect(() => {
        if (!containerRef.current) return
        console.log(containerRef.current.clientWidth / 4)
        setWidth((containerRef.current.clientWidth / 4))
    }, [])

    useEffect(() => {
        getPost()
    }, [])

    const getPost = async () => {
        const response = await getBlogPost()
        setPosts(response)
    }

    return (
        <div>
            <div ref={containerRef} className="flex flex-wrap">
                { posts?.data.map((post: IPost) => (<PostCard key={post.id} width={width} />)) }
            </div>
            <div className="p-5 mx-auto">
                <Pagination page={posts?.meta.pagination.page} limit={posts?.meta.pagination.limit} total={posts?.meta.pagination.total} pages={posts?.meta.pagination.pages} onClickHandler={function (id: number): void {
                    throw new Error("Function not implemented.");
                }} />
            </div>
        </div>

    );
}

export default PostBLog;
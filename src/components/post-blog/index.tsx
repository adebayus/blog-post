import { useContext, useEffect, useRef, useState } from "react";
import PostCard from "./post-card";
import Pagination from "../pagination";
import { IPost, IPostResponse } from "@/types/types";
import { BlogContext } from "@/store/post";
import Axios from "@/uitls/Axios";

const PostBLog = () => {

    const { state: { post }, dispatch } = useContext(BlogContext)

    const containerRef = useRef<HTMLDivElement>(null)
    const [width, setWidth] = useState<number>(0)


    useEffect(() => {
        if (!containerRef.current) return
        setWidth((containerRef.current.clientWidth / 4))
    }, [])

    useEffect(() => {
        getPost()
    }, [])

    const getPost = async (page: number = 1, limit: number = 10) => {
        // await getBlogPost()
        dispatch({
            type: "LOADING_POST"
        })

        try {
            const response = await Axios.get<IPostResponse>(`/posts?page=${page}&per_page=${limit}`)
            dispatch({ type: "SUCCESS_GET_POST", payload: response.data })
        } catch (error) {

        }
    }

    return (
        <div>
            <div ref={containerRef} className="flex flex-wrap">
                {post?.data.map((post: IPost) => (<PostCard data={post} width={width} />))}
            </div>
            <div className="p-5 mx-auto">
                <Pagination
                    page={post.meta.page}
                    limit={post.meta.limit}
                    total={post.meta.total}
                    pages={post.meta.pages}
                    onClickHandler={function (id: number): void {
                        getPost(id)
                    }} />
            </div>
        </div>

    );
}

export default PostBLog;
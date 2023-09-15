import Comment from "@/components/comment";
import { BlogContext } from "@/store/post";
import { IComment, IPost, IPostResponse, IUser } from "@/types/types";
import Axios from "@/uitls/Axios";
import { useRouter } from "next/router";
import { use, useContext, useEffect, useState } from "react";



const DetailPost = () => {

    const router = useRouter()
    const { id } = router.query
    const { state: { detailPost: { post, user }, comments }, dispatch } = useContext(BlogContext)

    const test = [1, 2, 3, 4]

    useEffect(() => {
        if (!router.isReady) return

        getDetailPost()
        getComments()
    }, [router.isReady])

    const getDetailPost = async () => {

        if (id == undefined || id == null) {
            return;
        }

        try {
            dispatch({ type: "LOADING_DETAIL_POST" })
            const detailPost = await Axios.get<{ data: IPost }>(`/posts/${id}`)
            const userId = detailPost.data.data.user_id
            const user = await Axios.get<{ data: IUser }>(`/users/${userId}`)
            dispatch({ type: "SUCCESS_GET_DETAIL_POST", payload: { post: detailPost.data.data, user: user.data.data } })
        } catch (error) {

        }
    }

    const getComments = async () => {
        try {
            dispatch({ type: "LOADING_COMMENT" })
            const response = await Axios.get<{ data: IComment[] }>(`/posts/${id}/comments`)
            const comments = response.data.data
            dispatch({ type: "SUCCESS_GET_COMMENT", payload: comments })
        } catch (error) {

        }
    }

    return (
        <div
            className="w-full max-w-4xl mx-auto py-6 flex flex-col gap-7"
        >
            <div>
                <img src="/images/image-card.jpeg" className="h-[500px] w-full object-bottom rounded" />
            </div>

            {/* author */}
            <div className="gap-5 flex flex-col">

                <span className="text-xl font-bold text-gray-500"> Authored  By </span>

                <div className="flex gap-4 items-center pl-3">
                    <div className="bg-gray-400 w-[50px] h-[50px] rounded-[25px] flex items-center justify-center font-bold text-2xl text-white">
                        {user?.name?.charAt(0).toLocaleUpperCase()}
                    </div>

                    <div className="flex flex-col">
                        <p className="font-bold text-lg text-gray-400"> {user?.name} </p>
                        <p className="font-medium text-base text-gray-400"> {user?.email} </p>
                    </div>
                </div>
            </div>

            {/* content */}
            <div className="flex flex-col gap-5">
                <h1 className="text-5xl font-bold"> {post?.title} </h1>
                <p className="text-2xl text-gray-800"> {post?.body} </p>
            </div>

            {/* Commentary */}

            <div className="flex flex-col p-5 bg-gray-50 rounded-md gap-4">
                <span className="font-extrabold text-2xl"> Comments ({comments.data.length ?? 0}) </span>
                <div className="flex flex-col px-4 gap-6">
                    {comments?.data.map((item) => {
                        return <Comment key={item.id} data={item} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default DetailPost;
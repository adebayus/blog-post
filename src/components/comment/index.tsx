import { IComment } from "@/types/types";

interface ICommentProps {
    data: IComment
}

const Comment = ({ data }: ICommentProps) => {
    return (
        <div>
            <div className="flex gap-4 items-start pl-3">
                <div className="bg-gray-400 w-[50px] h-[50px] rounded-[25px] flex items-center justify-center font-bold text-2xl text-white">
                    {data?.name?.charAt(0).toLocaleUpperCase()}
                </div>

                <div className="flex flex-col">
                    <p className="font-bold text-lg text-gray-700"> {data?.name} </p>
                    <p className="font-medium text-base text-gray-700"> {data?.email} </p>
                </div>
            </div>
            <div className="mt-2 pl-[80px] font-medium text-lg text-gray-900 ">
                {data?.body}
            </div>
        </div>
    )
}

export default Comment;
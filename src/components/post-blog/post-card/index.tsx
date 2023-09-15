import { IPost } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

export interface IPostCard {
    width: number
    data: IPost
}

const PostCard = (
    { width, data }: IPostCard
) => {

    const encodedData = encodeURIComponent(JSON.stringify(data))

    return (
        <div
            style={{ width: `${width}px` }}
            className="p-2">
            <div className=" bg-white rounded-xl shadow-lg">
                <div className="h-[250px] rounded-t-xl">
                    <img src="/images/image-card.jpeg" className="w-full h-full rounded-t-xl" />
                </div>

                <div className="p-5 flex flex-col gap-4 ">
                    <h1 className="text-3xl font-bold line-clamp-2"> {data.title} </h1>
                    <p className="line-clamp-6"> {data.body} </p>

                    <Link href={`/${data.id}`}>
                        <div
                            className="flex justify-end cursor-pointer text-lg font-medium text-blue-600"
                        >
                            Read More
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PostCard;
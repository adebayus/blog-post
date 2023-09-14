import Image from "next/image";

export interface IPostCard {
    width: number
}

const PostCard = (
    { width }: IPostCard
) => {
    return (
        <div
            style={{ width: `${width}px` }}
            className="p-2">
            <div className=" bg-white rounded-xl shadow-lg">
                <div className="h-[250px] rounded-t-xl">
                    <img src="/images/image-card.jpeg" className="w-full h-full rounded-t-xl" />
                </div>

                <div className="p-5 flex flex-col gap-4 ">
                    <h1 className="text-3xl font-bold"> Title </h1>
                    <p className="line-clamp-6"> Aeger molestiae antepono. Bellicus libero dolore. Aequus collum minima. Amo quas utor. Sodalitas beneficium anser. Culpo nostrum totus. Illo conduco verbum. Vultuosus teres clementia. Laudantium crastinus cubitum. Aveho subito qui. Certe fuga architecto. Compono brevis denuncio. Spargo aqua et. </p>
                    <div className="flex justify-end cursor-pointer text-lg font-medium text-blue-600"> Read More </div>
                </div>
            </div>
        </div>
    )
}

export default PostCard;
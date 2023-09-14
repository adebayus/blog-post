import { IPostResponse } from "@/types/types";
import Axios from "./Axios";

export const getBlogPost = async () : Promise<IPostResponse> => {
    try {
        const response = await Axios.get<IPostResponse>("https://gorest.co.in/public/v1/posts?page=1&per_page=5")
        console.log(response.data, "wkwkw1k")
        return response.data;
    } catch (error) {
        throw error
    }
}
import { IPostResponse } from "@/types/types";
import Axios from "./Axios";

interface IPostRequest { 
    
}

export const getBlogPost = async () => {
    try {
        const response = await Axios.get<IPostResponse>("https://gorest.co.in/public/v1/posts?page=1&per_page=5")
        console.log(response.data, "wkwkw1k")
        // return response.data;
    } catch (error) {
        // throw error
    }
}
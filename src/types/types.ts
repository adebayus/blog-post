import { LOADING_POST } from "../store/post/action-type";


export interface ITab {
    id: number,
    title: string,
}


// contract post response 
export interface IPagination {
    page: number | undefined,
    limit: number | undefined,
    total: number | undefined,
    pages: number | undefined,
    onClickHandler: (id: number) => void
}

export interface IMeta {
    pagination: IMetaPagination
}

export interface IMetaPagination {
    total: number,
    pages: number,
    page: number,
    limit: number,
}

export interface IPost {
    id?: number,
    title?: string,
    body?: string,
    userId?: number,
    user_id?: number
}

export interface IPostResponse {
    data: IPost[],
    meta: IMeta
}
// 

//  Response User 

export interface IUser {
    id?: number,
    name?: string,
    email?: string,
    gender?: string,
    status?: string
}

export interface IUserResponse {
    data: IUser[],
    meta: IMeta
}


//

export interface IState {
    post: IStatePostBlog
    detailPost: IStateDetailPost
    comments: IStateComment
    users: IStateUser
}

export interface IStateDetailPost {
    loading: boolean,
    error: string,
    post: IPost,
    user: IUser
}

export interface IStateUser {
    loading: boolean,
    error: string,
    data: IUser[],
    meta: IMetaPagination
}

export interface IStateComment {
    loading: boolean,
    error: string,
    data: IComment[]
}

export interface IAction {
    type: string

}

export interface IStatePostBlog {
    loading: boolean,
    data: IPost[],
    meta: IMetaPagination,
    error: string
}

export interface IPayloadDetailPost {
    post: IPost,
    user: IUser
}

export interface IComment {
    id?: number,
    name?: string,
    email?: string,
    body?: string
}

export type ActionTypes =
    | { type: "LOADING_POST" }
    | { type: "SUCCESS_GET_POST", payload: IPostResponse }
    | { type: "LOADING_DETAIL_POST" }
    | { type: "SUCCESS_GET_DETAIL_POST", payload: IPayloadDetailPost }
    | { type: "LOADING_COMMENT" }
    | { type: "SUCCESS_GET_COMMENT", payload: IComment[] }
    | { type: "LOADING_USERS" }
    | { type: "SUCCESS_GET_USERS", payload: IUserResponse }
    
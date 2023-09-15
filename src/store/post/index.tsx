import { ActionTypes, IState } from "@/types/types";
import React, { Dispatch, createContext } from "react";

const initialState: IState = {
    post: {
        loading: false,
        data: [],
        meta: {
            total: 1,
            pages: 1,
            page: 1,
            limit: 10
        },
        error: ""
    },
    detailPost: { 
        loading: false, 
        post: {},
        user: {},
        error: "" 
    }, 
    comments: { 
        loading: false, 
        data: [], 
        error: "" 
    }
}

const reducer = (state: IState = initialState, action: ActionTypes): IState => {
    switch (action.type) {
        case "LOADING_POST":
            return { ...state, post: { ...state.post, loading: true } }
        case "SUCCESS_GET_POST":
            return {
                ...state,
                post: {
                    ...state.post,
                    loading: false, 
                    data: action.payload.data, 
                    meta: action.payload.meta.pagination
                }
            }
        case "LOADING_DETAIL_POST":
            return { ...state, detailPost: { ...state.detailPost, loading: true } }
        case "SUCCESS_GET_DETAIL_POST": 
            return { ...state, detailPost: { ...state.detailPost, loading: false, post: action.payload.post, user: action.payload.user }}
        case "LOADING_COMMENT":
            return { ...state, detailPost: { ...state.detailPost, loading: true } }
        case "SUCCESS_GET_COMMENT": 
            return { ...state, comments: { ...state.comments, loading: false, data: action.payload }}
        default:
            return state
    }
}

export const BlogContext = createContext<
    {
        state: IState,
        dispatch: Dispatch<ActionTypes>
    }
>({ state: initialState, dispatch: () => { } })

export const BlogContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [state, dispatch] = React.useReducer(reducer, initialState)

    return (
        <BlogContext.Provider value={{ state, dispatch }}>
            {children}
        </BlogContext.Provider>
    )
} 
import { IAction, IState } from "@/types/types";
import React, { Dispatch, ReactNode, createContext } from "react";

const initialState: IState = {
    post: {
        data: [],
        meta: {
            pagination: {
                limit: 0,
                page: 1,
                pages: 0,
                total: 0
            }
        }
    }
}

const reducer = (state: IState = initialState, action: IAction) => {
    switch (action.type) {
        default:
            return state
    }
}

export const BlogContext = createContext<
    {
        state: IState,
        dispatch: Dispatch<IAction>
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
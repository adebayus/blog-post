
export interface ITab { 
    id: number,
    title: string,
}

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
    id: number,
    title: string,
    body: string,
    userId: number,
}

export interface IPostResponse {
    data: IPost[],
    meta: IMeta
}

export interface IState { 
    post : IPostResponse  
}

export interface IAction {  
    type: string
}
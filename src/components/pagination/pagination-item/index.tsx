
export interface IPaginationItem {
    isActive: boolean,
    title: string,
    onClickHandler: () => void
}

const PaginationItem = ({ isActive = false, title, onClickHandler }: IPaginationItem) => {
    return (
        <div
            onClick={onClickHandler}
            className={`${ isActive ? "" : "cursor-pointer"  } w-[50px] h-[50px] rounded-sm flex justify-center items-center ${isActive ? "bg-slate-500 text-white" : "text-slate-500 bg-white"}`}
        >
            {title}
        </div>
    )
}

export default PaginationItem;
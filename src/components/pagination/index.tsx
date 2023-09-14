import { IPagination } from "@/types/types";
import { useEffect, useState } from "react";
import PaginationItem from "./pagination-item";


const Pagination = (
    {
        limit = 10,
        page = 1,
        total = 100,
        pages = 10,
        onClickHandler: handlePageClick
    }: IPagination
) => {

    const getUpperLowerBound = (): [number, number] => {
        let lowerLimit = (page - (page % limitNumberPage)) + 1

        let upperLimit = page + (5 - (page % limitNumberPage))
        let upper = upperLimit > pages ? pages : upperLimit

        return [lowerLimit, upper]
    }

    const handlePrevNextClick = (isNext: boolean) => {
        if (isNext) {
            handlePageClick(upperLimit + limitNumberPage)
        } else {
            handlePageClick(lowerLimit - limitNumberPage)
        }
    }

    const limitNumberPage = 5
    const [lowerLimit, upperLimit] = getUpperLowerBound()

    const listPage = Array.from({ length: upperLimit - lowerLimit + 1 }, (_, i) => i + lowerLimit)

    const isPrevDisabled = 1 == lowerLimit
    const isNextDisabled = pages == upperLimit

    return (
        <div className="w-fit flex mx-auto text-xl font-medium gap-5 items-center p-1 text-gray-600">
            <div
                className={`${isPrevDisabled ? "text-gray-400" : "cursor-pointer"}`}
                onClick={() => {
                    if (isPrevDisabled) return
                    handlePrevNextClick(false)
                }}
            >
                Prev
            </div>
            <div className="flex">
                {listPage.map((number: number) => (
                    <PaginationItem
                        key={number}
                        onClickHandler={() => { 
                            if(number == page) return 
                            handlePageClick(number)
                        }}
                        isActive={number == page}
                        title={number.toString()}
                    />))}
            </div>
            <div
                className={`${isNextDisabled ? "text-gray-400" : "cursor-pointer"}`}
                onClick={() => {
                    if (isNextDisabled) return
                    handlePrevNextClick(true)
                }}
            >
                Next
            </div>
        </div>
    )
}

export default Pagination;
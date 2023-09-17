import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { IUser, IUserResponse } from "@/types/types";
import Axios from "@/uitls/Axios";
import { BlogContext } from "@/store/post";
import { capitalize } from "@/uitls/utils";
import Pagination from "../pagination";
import Modal from "react-modal";
import UserCreate from "./modal";

const UserPage = () => {

    const { state: { users }, dispatch } = useContext(BlogContext)
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const [isEdit, setIsEdit] = useState(false)
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null)

    const columns: string[] = [
        "Id",
        "Name",
        "Email",
        "Gender",
        "Status",
        "Action"
    ]

    useEffect(() => {
        getAllUser()
    }, [modalIsOpen])

    const getAllUser = async (page: number = 1, limit: number = 10) => {
        try {
            dispatch({ type: "LOADING_USERS" })
            const response = await Axios.get<IUserResponse>(`/users?page=${page}&per_page=${limit}`)
            dispatch({ type: "SUCCESS_GET_USERS", payload: response.data })
        } catch {

        }
    }

    const customStyles = {
        content: {
            top: '40%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: "700px",
        },
    };

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const deleteHandler = async (id: number) => {
        try {
            await Axios.delete<IUser>("users/" + id)
            getAllUser()
        } catch {

        }
    }

    return (
        <div className="flex flex-col">
            <Modal 
                isOpen={modalIsOpen} 
                style={customStyles} 
                ariaHideApp={false}
                onRequestClose={closeModal}
                >
                <UserCreate isEdit={isEdit} onCanceled={closeModal} user={selectedUser} />
            </Modal>
            <div className="flex flex-col gap-10">
                {/* button  */}
                <div>
                    <div 
                        className="px-6 py-3 bg-green-400 w-fit rounded-md text-white font-Bold text-xl cursor-pointer"
                        onClick={() => { 
                            setSelectedUser(null)
                            setIsEdit(false)
                            openModal()
                        }}
                    >
                        Add User
                    </div>
                </div>
                <div>
                    <table className="bg-white-800 w-full">
                        <thead className="h-[50px] bg-slate-500 rounded-md text-white text-xl">
                            <tr className="">
                                {columns.map((column: string) => (
                                    <th className={`px-6 py-5 text-left`} key={column}>
                                        {column}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.map((user: IUser, index: number) => (
                                <tr key={index} className={`${index % 2 == 0 ? "bg-slate-200" : "bg-white"} text-xl font-medium`}>
                                    <td className="px-6 py-5"> {user.id} </td>
                                    <td className="px-6 py-5"> {capitalize(user.name!)} </td>
                                    <td className="px-6 py-5"> {capitalize(user.email!)} </td>
                                    <td className="px-6 py-5"> {capitalize(user.gender!)} </td>
                                    <td className="px-6 py-5">
                                        <div className={`px-6 py-2 ${user.status == "active" ? "bg-green-300 text-gray-600" : "bg-gray-300 text-gray-600"}  rounded-lg flex justify-center items-center`}>
                                            {capitalize(user.status!)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex gap-2">
                                            <div 
                                                className="px-6 py-3 bg-yellow-400 w-fit rounded-md text-white font-Bold text-xl cursor-pointer"
                                                onClick={() => {
                                                    setSelectedUser(user)
                                                    setIsEdit(true)
                                                    openModal()
                                                }}    
                                            >
                                                Edit
                                            </div>
                                            <div 
                                                className="px-6 py-3 bg-red-400 w-fit rounded-md text-white font-Bold text-xl cursor-pointer"
                                                onClick={() => {
                                                    deleteHandler(user.id!)
                                                }}
                                                >
                                                Delete
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-5 mx-auto">
                    <Pagination
                        page={users.meta.page}
                        limit={users.meta.limit}
                        total={users.meta.total}
                        pages={users.meta.pages}
                        onClickHandler={function (id: number): void {
                            getAllUser(id)
                        }} />
                </div>
            </div>
        </div>
    )
}

export default UserPage;
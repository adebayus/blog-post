import { IUser } from "@/types/types";
import Axios from "@/uitls/Axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IUserCreateProps {
    isEdit: boolean
    user?: IUser | null
    onCanceled: () => void
}

interface IFormInput {
    name: string,
    email: string,
    gender: string,
    status: string
}

const UserCreate = ({ isEdit = false, user, onCanceled }: IUserCreateProps) => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, dirtyFields }
    } = useForm<IFormInput>(
        {
            defaultValues: {
                name: user?.name ?? "",
                email: user?.email ?? "",
                gender: user?.gender ?? "male",
                status: user?.status ?? "active"
            }
        }
    );

    const [ isLoading, setIsLoading ] = useState<boolean>(false)

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        setIsLoading(true)
        if (isEdit) {
            updateUser(data)
        } else {
            addUser(data)
        }
    }

    const updateUser = async (data: IFormInput) => {
        try { 
            await Axios.put<IUser>("users/" + user!.id, data)
            setIsLoading(false)
            onCanceled()
        } catch(error) { 
            setIsLoading(false)
        }
        
    }

    const addUser = async (data: IFormInput) => {
        try {
            await Axios.post<IUser>("/users", data)
            onCanceled()
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    }


    return (
        <div className="flex flex-col gap-5">
            <div className="text-4xl font-bold py-5">
                {isEdit ? "Edit User" : "Add User"}
            </div>
            <div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5"
                >
                    <div className="flex flex-col gap-2">
                        <label className="text-xl font-normal">Name</label>
                        <input placeholder="Enter Name" className="text-xl font-medium w-full bg-white p-3 border-2 border-slate-500 rounded-lg" {...register("name", { required: true })} />
                        { errors.name && <span className="text-red-500 text-xl font-medium">This field is required</span> }
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xl font-normal">Email</label>
                        <input placeholder="Enter Email" className="text-xl font-medium w-full bg-white p-3 border-2 border-slate-500 rounded-lg" {...register("email", { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g })} />
                        { errors.email && <span className="text-red-500 text-xl font-medium">This field is required or Incorrect email format </span> }
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xl font-normal">Gender</label>
                        <select id="gender" className="text-xl font-medium w-full bg-white p-3 border-2 border-slate-500 rounded-lg" {...register("gender", { required: true })} >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xl font-normal">Status</label>
                        <select id="gender" className="text-xl font-medium w-full bg-white p-3 border-2 border-slate-500 rounded-lg" {...register("status", { required: true })} >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <div className="flex flex-row-reverse gap-3">
                        <input disabled={isLoading} type="submit" className={`px-6 py-3 ${!isLoading ? "bg-green-500 text-white" : "bg-gray-300 text-gray-500" } w-fit rounded-md font-Bold text-xl cursor-pointer`} />
                        <div onClick={onCanceled} className="px-6 py-3 bg-red-400 w-fit rounded-md text-white font-Bold text-xl cursor-pointer"> Cancel  </div>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default UserCreate;
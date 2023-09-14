import { ITab } from "@/types/types"


interface ILayout {
    children?: React.ReactNode,
    tabsList: ITab[],
    selectedTab: number,
    setSelectedTab: (id: number) => void

}

const Layout = ({ children, tabsList, selectedTab, setSelectedTab }: ILayout) => {

    const handleTabClick = (id: number) => {
        if (selectedTab == id) return
        setSelectedTab(id)
    }

    return (
        <div className="container mx-auto py-8 min-h-screen flex flex-col">
            <div className="flex flex-col gap-14 flex-1">
                <h1 className="text-[48px] font-bold" > Blog Post </h1>
                {/* container selected tab */}
                <div className="bg-gray-300 flex max-w-[900px] w-full h-[70px] mx-auto rounded p-2 gap-2">
                    {tabsList.map((tab: ITab) => (
                        <div
                            onClick={() => handleTabClick(tab.id)}
                            key={tab.id}
                            className={`flex-1 ${selectedTab == tab.id ? "bg-white" : ""} cursor-pointer rounded justify-center items-center flex font-bold text-xl ${selectedTab == tab.id ? "text-black" : "text-gray-400"}`}>
                            {tab.title}
                        </div>
                    ))}
                </div>
                <div className='bg-white p-10 flex-1 rounded shadow'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout;
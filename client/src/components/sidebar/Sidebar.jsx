import { useContext } from "react"
import { PiChats } from "react-icons/pi"
import TabContext from "../../context/TabContext"
import useResponsive from "../../hooks/useResponsive"
import TABS from "../../utils/tabs"
import TabButton from "../tabs/TabButton"

function Sidebar() {
    const { activeTab, isSidebarOpen, tabComponents, tabIcons } =
        useContext(TabContext)
    const { isMobileSidebarOpen } = useResponsive()

    return (
        <aside className="flex w-full md:h-full md:max-h-full md:min-h-full md:w-auto">
            <div
                className="fixed bottom-0 right-0 z-50 flex h-[50px] w-full gap-24 self-end overflow-auto bg-emerald-700 p-3 md:static md:h-full md:w-auto md:flex-col md:p-2 md:pt-4"
                style={isMobileSidebarOpen ? {} : { display: "none" }}
            >
                <TabButton tabName={TABS.FILES} icon={tabIcons[TABS.FILES]} />
                <TabButton tabName={TABS.Chat} icon={tabIcons[TABS.Chat]} />
                <TabButton tabName={TABS.USERS} icon={tabIcons[TABS.USERS]} />
                <TabButton
                    tabName={TABS.SETTINGS}
                    icon={tabIcons[TABS.SETTINGS]}
                />
            </div>
            <div
                className="absolute left-0 top-0 z-20 w-full flex-grow flex-col bg-emerald-600 md:static md:w-[300px]"
                style={isSidebarOpen ? {} : { display: "none" }}
            >
                {tabComponents[activeTab]}
            </div>
        </aside>
    )
}

export default Sidebar

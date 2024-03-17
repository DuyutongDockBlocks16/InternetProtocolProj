import EditorComponent from "../components/editor/EditorComponent"
import Sidebar from "../components/sidebar/Sidebar"
import useUserActivity from "../hooks/useUserActivity"

function EditorPage() {
    // Listen user online/offline status
    useUserActivity()

    return (
        <div>
            <div className="w-full text-start py-8 bg-green-600 text-2xl">
            &nbsp;&nbsp;&nbsp; Collaboration Tool
            </div>
            <div className="flex h-screen min-h-screen max-w-full items-center justify-center overflow-x-hidden">
            
                <EditorComponent />
                <Sidebar />
            </div>
        </div>
    )
}

export default EditorPage

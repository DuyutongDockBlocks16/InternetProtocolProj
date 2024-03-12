import { useContext, useRef } from "react"
import { IoSend } from "react-icons/io5"
import AppContext from "../../context/AppContext"
import ACTIONS from "../../utils/actions"
import { formatDate } from "../../utils/formateDate"
import ChatContext from "../../context/ChatContext"

function ChatInput() {
    const { socket, clients, roomId } = useContext(AppContext)
    const { setMessages } = useContext(ChatContext)
    const inputRef = useRef(null)

    const handleSendMessage = (e) => {
        e.preventDefault()

        const inputVal = inputRef.current.value.trim()
        const client = clients.find((client) => client.socketId === socket.id)

        if (inputVal.length > 0) {
            const message = {
                message: inputVal,
                username: client?.username || "Unknown",
                socketId: socket.id,
                timestamp: formatDate(new Date()),
            }
            socket.emit(ACTIONS.SEND_MESSAGE, { roomId, message })
            setMessages((messages) => [...messages, message])
            inputRef.current.value = ""
        }
    }

    return (
        <form
            onSubmit={handleSendMessage}
            className="flex justify-between border border-primary"
        >
            <input
                type="text"
                className="w-full flex-grow border-none bg-dark p-2 outline-none"
                placeholder="What do you want to say?"
                ref={inputRef}
            />
            <button
                className="flex items-center justify-center bg-primary p-2 text-dark"
                type="submit"
                
            >
                Send
                {/* <IoSend size={24} /> */}
            </button>
        </form>
    )
}

export default ChatInput

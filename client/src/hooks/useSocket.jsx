import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { initSocket } from "../services/socket"
import ACTIONS from "../utils/actions"
import { toast } from "react-hot-toast"
import AppContext from "../context/AppContext"

function useSocket() {
    const location = useLocation()
    const navigate = useNavigate()

    const { socket, setSocket, setClients, username, setUsername, setRoomId } =
        useContext(AppContext)
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [joinError, setJoinError] = useState(false);
    const { roomId } = useParams()
    const roomPassword = location.state?.roomPassword || "";

    useEffect(() => {
        // if the user is not coming from the home page
        if (!location.state?.username) {
            navigate("/", { state: { roomId } })
        } else {
            // set username to context
            setRoomId(roomId)
            setUsername(location.state.username)
        }
    }, [navigate, roomId, location.state?.username, setUsername, setRoomId])

    useEffect(() => {
        const handleErrs = (err) => {
            console.log("socket error", err)
            console.log("socket connection failed, try again later")
            setIsError(true)
        }

        const init = () => {
            setIsLoading(true);
            setIsError(false);

            if (!socket) {
                const newSocket = initSocket(roomId, location.state?.username, roomPassword);
                setSocket(newSocket);

                newSocket.on("connect", () => setIsLoading(false));
                newSocket.on("connect_error", handleErrs);
                newSocket.on("connect_failed", handleErrs);

                newSocket.emit(ACTIONS.JOIN, {
                    roomId,
                    username: location.state?.username,
                    roomPassword,
                });

                newSocket.on(ACTIONS.UPDATE_CLIENTS_LIST, ({ clients }) => {
                    setClients(clients);
                });

                newSocket.on('room_join_error', (error) => {
                    toast.error('Failed to join room: ' + error.error);
                    setJoinError(true);
                    navigate("/");
                });

                newSocket.on(ACTIONS.DISCONNECTED, ({ username, socketId }) => {
                    toast.success(`${username} left the room`);
                    setClients((prev) => prev.filter((client) => client.socketId !== socketId));
                });

            }
        };

        init()

        return () => {
            if (socket == null) return

            socket.disconnect()
            socket.off("connect")
            socket.off("connect_error")
            socket.off("connect_failed")
            socket.off(ACTIONS.DISCONNECTED)
            socket.off(ACTIONS.UPDATE_CLIENTS_LIST)
            socket.off("room_join_error");
        }
    }, [socket, setSocket, navigate, roomId, setClients, location.state, roomPassword])

    return { isLoading, isError, joinError }
}

export default useSocket

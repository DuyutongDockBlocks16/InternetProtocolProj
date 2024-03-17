import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import toast from "react-hot-toast"
import AppContext from "../../context/AppContext"

function FormComponent() {
    const navigate = useNavigate()
    const location = useLocation()
    const [roomId, setRoomId] = useState("")
    const [roomPassword, setRoomPassword] = useState("");
    const [username, setUsername] = useState("")
    const {
        setRoomId: setRoomIdToContext,
        setUsername: setUsernameToContext,
        username: usernameInContext,
    } = useContext(AppContext)
    const { joinError, setJoinError } = useContext(AppContext); // Getting state and methods from AppContext
    const [isJoining, setIsJoining] = useState(false);

    const createNewRoomId = () => {
        setRoomId(uuidv4())
        toast.success("Created a new ROOM Id")
    }

    const joinRoom = (e) => {
        e.preventDefault()

        if (!roomId || !username || !roomPassword) {
            toast.error("ROOM Id, username, and room password are required")
            return
        } else if (roomId.length < 5) {
            toast.error("ROOM Id must be at least 5 characters long")
            return
        } else if (username.length < 3) {
            toast.error("Username must be at least 3 characters long")
            return
        }

        // set roomId & username to context
        setRoomIdToContext(roomId)
        setUsernameToContext(username)

        setIsJoining(true);
        // set joinError to false each time we try to join a room in order to clear the previous error state
        setJoinError(false);
        navigate(`/editor/${roomId}`, {
            state: {
                username,
                roomPassword,
            },
        })
    }

    useEffect(() => {
        if (location.state?.roomId) {
            setRoomId(location.state.roomId)
            if (usernameInContext.length === 0) {
                toast.success("Enter your username")
            }
        }
    }, [location.state?.roomId, usernameInContext])

    useEffect(() => {
        if (joinError) {
            setIsJoining(false);
        }
    }, [joinError]);

    return (
        <div className="flex w-full max-w-[1000px] flex-col items-center justify-center gap-4 p-4 sm:w-11/12 sm:p-8">
            <h1 className="mb-4 text-3xl md:mb-8 md:text-6xl text-emerald-700">Collaboration Tool</h1>
            <div className="text-right w-full h-full">
            <h4 className="text-base font-bold text-emerald-500">
                Welcome to use the Collaboration Tool ver.1
                </h4>
            </div>
            <form onSubmit={joinRoom} className="flex w-full flex-col gap-4 text-emerald-700">
                <input
                    type="text"
                    name="roomId"
                    placeholder="Type in your room ID"
                    className="w-full border-none px-3 py-2 text-emerald-700 focus:outline-none shadow-md"
                    onChange={(e) => setRoomId(e.target.value)}
                    value={roomId}
                />
                <input
                    type="password"
                    name="roomPassword"
                    placeholder="Type in your room password"
                    className="w-full border-none px-3 py-2 text-emerald-700 focus:outline-none shadow-md"
                    onChange={(e) => setRoomPassword(e.target.value)}
                    value={roomPassword}
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Type in your username"
                    className="w-full border-none px-3 py-2 text-emerald-700 focus:outline-none shadow-md"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                <button
                    type="submit"
                    className="self-end bg-primary px-8 py-2 text-emerald-700 hover:bg-emerald-800 hover:text-emerald-500 shadow-lg rounded-lg transform hover:scale-105 transition duration-150 ease-in-out"
                    onClick={joinRoom}
                >
                    Join
                </button>
            </form>
            <p className="select-none justify-center">
                {"Click here to create a new room, "}{" "}
                <span
                    className="cursor-pointer text-primary underline"
                    onClick={createNewRoomId}
                >
                    new room
                </span>
            </p>
        </div>
    )
}

export default FormComponent

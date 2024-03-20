import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

function Loading({ isError }) {
    const location = useLocation()
    const navigate = useNavigate()
    const username = location?.state?.username || ""

    const [message, setMessage] = useState(`Joining the room as ${username}...`)

    const gotoHomePage = () => {
        navigate("/")
    }

    useEffect(() => {
        if (isError) {
            setMessage("Something went wrong, please refresh the page.")
        }
    }, [isError])

    return (
        <div className="flex h-screen min-h-screen flex-col items-center justify-center gap-6">
            {/* {!isError && (
                <div className="flex items-center justify-center space-x-2">
                    <span className="sr-only">Loading...</span>
                    <div className="h-4 w-4  rounded-full bg-slate-300"></div>
                    <div className="h-4 w-4  rounded-full bg-slate-300"></div>
                    <div className="h-4 w-4  rounded-full bg-slate-300"></div>
                </div>
            )} */}
            <span className="text-lg font-medium text-slate-300">
                {message}
            </span>
            {isError && (
                <button
                    className="bg-primary px-8 py-2 text-black"
                    onClick={gotoHomePage}
                >
                    LoginPage
                </button>
            )}
        </div>
    )
}

Loading.propTypes = {
    isError: PropTypes.bool.isRequired,
}

export default Loading

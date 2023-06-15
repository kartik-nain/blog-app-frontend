import { useEffect } from 'react'
import { useAuth } from '../security/AuthContext'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const AuthContext = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        AuthContext.logout()
    })

    return (
        <div className="flex flex-col items-center justify-center h-screen">
      <h3 className="text-2xl font-bold mb-8">
        You have successfully logged out
      </h3>
      <div className="flex flex-col items-center">
        <p className="mb-4">Click below to login.</p>
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">
          Login
        </button>
      </div>
    </div>
    )
}

export default Logout
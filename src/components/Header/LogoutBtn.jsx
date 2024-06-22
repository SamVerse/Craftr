import React from 'react'
import authService from '../../appwrite/auth'
import { logout } from '../../features/authentication/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
        navigate('/');
        
    }

    return (
        <button 
        className='inline-block px-6 py-2 duration-200 hover:bg-red-600 rounded-full' 
        onClick={logoutHandler}
        >    
            Logout
        </button>
    )
}

export default LogoutBtn

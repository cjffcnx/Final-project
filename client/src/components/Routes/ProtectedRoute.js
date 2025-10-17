import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import API from '../../services/API'
import { getCurrentUser } from '../../redux/features/auth/authActions'
import { Navigate } from 'react-router-dom'
const ProtectedRoute = ({ children }) => {

    const dispatch = useDispatch()

    //get user current

    const getUser = async () => {
        try {
            dispatch(getCurrentUser())
        } catch (error) {
            localStorage.clear()
            console.log(error);

        }
    }

    useEffect(() => {
        getUser()
    }, [dispatch])

    if (localStorage.getItem('token')) {
        return children
    } else {
        return <Navigate to='/login' />
    }
}

export default ProtectedRoute
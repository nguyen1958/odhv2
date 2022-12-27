import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { LoginContext } from '../App'

const NotFound = () => {
    const navigate = useNavigate()
    const login = useContext(LoginContext)
   
    useEffect(() => {
        console.log("effect:", login)
        if (!login) navigate("/", true)
    }, [login,navigate])

    return (
        <h1 className="text-center">Page inexistant</h1>
    );
}

export default NotFound;
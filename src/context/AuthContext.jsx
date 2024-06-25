import { createContext, useState, useContext, useEffect } from "react";
import {loginRequest, verifyTokenRequest, logoutRequest} from '../api/auth.js'
import Cookies from 'js-cookie'

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth mus be used with in an AuthProvider")
    }
    return context
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errorsbe , setErrors] = useState([])
    const [loading, setLoading] = useState(true)

    const signin = async (user) => {
        try {
            const res = await loginRequest(user)            

            Cookies.set('token', res.data.token)
            
            setIsAuthenticated(true)
            setUser(res.data)
          } catch (error) {
            setErrors(error.response.data)
          }
    }

    const logout = async () => {
        try {
            const res = await logoutRequest()
            setIsAuthenticated(false)
            setUser(null)
            const cookies = Cookies.get()
            console.log(cookies)
            Cookies.set('token', "")
          } catch (error) {
            console.log(error)
          }
    }

    useEffect(() => {
        if (errorsbe.length > 0){
            const timer = setTimeout(() => {
                setErrors([])
            }, 3000);
            return () => clearTimeout(timer)
        }
    }, [errorsbe])

    useEffect(() => {        
        async function chekLogin() {
            const cookies = Cookies.get()            
            if (!cookies.token) {
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
                return
            }
            try {                
                const res = await verifyTokenRequest(cookies.token)            
                    if (!res.data) {
                        setIsAuthenticated(false)
                        setLoading(false)
                        return
                    }

                    setIsAuthenticated(true)
                    setUser(res.data)
                    setLoading(false)
                } catch (error) {
                    setIsAuthenticated(false)
                    setUser(null)
                    setLoading(false)
                }
            
        }
        chekLogin()
    },[])

    

    return (
        <AuthContext.Provider value={{
            signin,
            logout,
            user,
            isAuthenticated,
            errorsbe,
            loading
            
        }}>
            {children}
        </AuthContext.Provider>
    )
}
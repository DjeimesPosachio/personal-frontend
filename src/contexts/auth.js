import { createContext, useEffect, useState } from "react";
import { useApi } from '../hooks/useApi';
import { Redirect } from "react-router-dom";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthTOken] = useState();

    const api = useApi();

    useEffect(() => {
        const loadingStoreData = async () => {
            const storageToken = localStorage.getItem("@Auth:token")
            const storageUser = localStorage.getItem("@Auth:user")
    
            if ( storageUser && storageToken) {
                setAuthTOken(storageToken)
            }
        }
        loadingStoreData();    
    }, [])

    const signIn = async (email, password) => {
        const response = await api.signIn(email, password)

        if (response?.data?.error) {
            alert(response?.data?.error)
        } else {
            setAuthTOken(response?.data?.token)

            localStorage.setItem("@Auth:token", response?.data?.token)
            localStorage.setItem("@Auth:user", JSON.stringify(response?.data?.user))
        }
    };

    const signOut = () => {
        localStorage.removeItem("@Auth:token")
        localStorage.removeItem("@Auth:user")
        setAuthTOken(null)
        return <Redirect to="/login" />
    };

    return (
        <AuthContext.Provider
            value={{ 
                authToken, signed: !!authToken, signIn, signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
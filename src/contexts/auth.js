import { createContext, useEffect, useState } from "react";
import { useApi } from '../hooks/useApi';
import { Redirect } from "react-router-dom";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();

    const api = useApi();

    useEffect(() => {
        const loadingStoreData = async () => {
            const storageToken = localStorage.getItem("@Auth:token")
            const storageUser = localStorage.getItem("@Auth:user")
    
            if ( storageUser && storageToken) {
                setUser(storageUser)
            }
        }
        loadingStoreData();    
    }, [])

    const signIn = async (email, password) => {
        const response = await api.signIn(email, password)

        if (response.data.error) {
            alert(response.data.error)
        } else {
            setUser(response.data.user)

            localStorage.setItem("@Auth:token", response.data.token)
            localStorage.setItem("@Auth:user", JSON.stringify(response.data.user))
        }
    };

    const signOut = () => {
        localStorage.clear()
        setUser(null)
        return <Redirect to="/login" />
    };

    return (
        <AuthContext.Provider
            value={{ 
                user, signed: !!user, signIn, signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
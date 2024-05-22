import { createContext, useEffect, useState } from "react";
import { useApi } from '../hooks/useApi';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState();

    const api = useApi();

    useEffect(() => {
        const loadingStoreData = async () => {
            const storageToken = localStorage.getItem("@Auth:token")
            const storageUser = localStorage.getItem("@Auth:user")

            if ( storageUser && storageToken) {
                setAuthToken(storageToken)
            }
        }
        loadingStoreData();
    }, [])

    const signIn = async (email, password) => {
        const response = await api.signIn(email, password)

        if (response?.data?.error) {
            console.log('entra aki')
            alert(response?.data?.error)
        } else {
            setAuthToken(response?.token)

            localStorage.setItem("@Auth:token", JSON.stringify(response?.token))
            localStorage.setItem("@Auth:user", JSON.stringify(response?.user))
        }
    };

    const signOut = async () => {
        localStorage.removeItem("@Auth:token")
        localStorage.removeItem("@Auth:user")
        setAuthToken(null)
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

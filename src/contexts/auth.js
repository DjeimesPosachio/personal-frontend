import { createContext, useEffect, useState } from "react";
import { useApi } from '../hooks/useApi';
import { message } from "antd";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState();
    const [userLogged, setUserLogged] = useState();

    const api = useApi();

    useEffect(() => {
        const loadingStoreData = async () => {
            const storageToken = localStorage.getItem("@Auth:token")
            const storageUser = localStorage.getItem("@Auth:user")

            if (storageUser && storageToken) {
                setAuthToken(storageToken)
                setUserLogged(JSON.parse(storageUser))
            }
        }
        loadingStoreData();

    }, [])

    const signIn = (email, password) => {
        return api.signIn(email, password)
            .then(response => {
                setAuthToken(response?.token)
                setUserLogged(response?.usuario)

                localStorage.setItem("@Auth:token", JSON.stringify(response?.token))
                localStorage.setItem("@Auth:user", JSON.stringify(response?.usuario))

            }).catch(error => {
                console.log('ERROR', error)
                message.error(error?.data?.error || 'Erro ao fazer login');
                alert(error?.data?.error)
            })

    };

    const signOut = async () => {
        localStorage.removeItem("@Auth:token")
        localStorage.removeItem("@Auth:user")
        setAuthToken(null);
        setUserLogged(null);
    };

    return (
        <AuthContext.Provider
            value={{
                authToken, signed: !!authToken, signIn, signOut,
                userLogged,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

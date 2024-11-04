import { createContext, useEffect, useState } from "react";
import { authService, registerService, responseGoogle } from "../services/authService";

export const LoginContext = createContext();

const LoginContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const userObject = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('jwtToken');
    
        if (token && userObject) {
            setIsLoggedIn(true);
            setUser(userObject);
        } else {
            setIsLoggedIn(false);
            setUser(null);
        }

        setLoading(false);
    }, []);
    
    const googleLogin = async (res) => {
        try {
            const response = await responseGoogle(res);
            setIsLoggedIn(true);
            setUser(response.user);
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('jwtToken', response.token);
        } catch (error) {
            console.error("Login failed:", error.message);
            alert(error.message);
        }
    }

    const login = async (username, password) => {
        try {
            const response = await authService(username, password);
            setIsLoggedIn(true);
            setUser(response.user);
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('jwtToken', response.token);
        } catch (error) {
            console.error("Login failed:", error.message);
            throw new Error("Login failed: " + error.message);
        }
    };

    const signUp = async (name, username, email, password) => {
        try {
            await registerService(name, username, email, password);
        } catch (error) {
            console.error("Registration failed:", error.message);
            throw new Error("Registration failed: " + error.message);
        }
    }

    const logout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
    };

    const contextValue = {
        login,
        logout,
        isLoggedIn,
        user,
        signUp,
        googleLogin,
        loading
    };

    return (
        <LoginContext.Provider value={contextValue}>
            {props.children}
        </LoginContext.Provider>
    );
};

export default LoginContextProvider;

import { createContext, useEffect, useRef, useState } from "react";
import {authService,registerService,responseGoogle} from "../services/authService";
import { songsData } from "../assets/assets";
import { json } from "react-router-dom";

export const LoginContext = createContext();

const LoginContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Kiểm tra token trong localStorage khi ứng dụng khởi động
        const token = localStorage.getItem('jwtToken');
        const storedUser = localStorage.getItem('username');

        if (token && storedUser) {
            setIsLoggedIn(true);
            const userIcon = JSON.parse(storedUser);
            setUser(userIcon.charAt(0).toUpperCase());
            console.log('User logged in:', storedUser);
        }
    }, []);

    const googleLogin = async (res) => {
        try {
            const response = await responseGoogle(res);
            setIsLoggedIn(true);
            setUser(response.username.charAt(0).toUpperCase());
        } catch (error) {
            console.error("Login failed:", error.message);
            alert(error.message);
        }
    }
    
    const login = async (username, password) => {
        try {
            const response = await authService(username, password);
            setIsLoggedIn(true);
            setUser(response.username);     
        } catch (error) {
            console.error("Login failed:", error.message);
            throw new Error("Login failed: " + error.message);
        }
    };

    const signUp = async (name,username,email,password) => {
        try {
            await registerService(name,username,email,password);
        } catch (error) {
            console.error("Registration failed:", error.message);
            throw new Error("Registration failed: " + error.message);
        }
    }

    const logout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        setUser(null);
    };

    const contextValue = {
        login, logout,
        isLoggedIn, user,
        signUp, googleLogin
    };

    return (
        <LoginContext.Provider value={contextValue}>
            {props.children}
        </LoginContext.Provider>
    );
};

export default LoginContextProvider;

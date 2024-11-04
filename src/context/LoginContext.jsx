import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";
import { createContext, useEffect, useState } from "react";
import { authService, registerService, responseGoogle } from "../services/authService";

export const LoginContext = createContext();

const LoginContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [username, setusername] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isChange, setChange] = useState(false);
    const [Info, setInfo] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        // Kiểm tra token trong localStorage khi ứng dụng khởi động
        const token = localStorage.getItem('jwtToken');
        const storedUser = localStorage.getItem('username');
        const storeId = JSON.parse(localStorage.getItem('userId')); // Loại bỏ dấu ngoặc kép nếu có
        setUserId(storeId);


        if (token && storedUser && storeId) {
            setIsLoggedIn(true);
            setUser(JSON.parse(storedUser).charAt(0).toUpperCase());
            console.log('User logged in:', storeId);
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
            const response = await authService.authServices(username, password);
            setIsLoggedIn(true);
            setusername(response.user.name);
            setUser(response.user.name.charAt(0).toUpperCase()); // Cập nhật thông tin người dùng chỉ với chữ cái đầu tiên

            // Cập nhật thông tin người dùng    
            setUser(response.user);
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('jwtToken', response.token);
        } catch (error) {
            console.error("Login failed:", error.message);
            throw new Error("Login failed: " + error.message);
        }
    };

    // Theo dõi sự thay đổi của isLoggedIn
    useEffect(() => {
        console.log('Login status changed:', isLoggedIn, user, userId);
    }, [isLoggedIn, user]); // Ghi log khi isLoggedIn hoặc user thay đổi

    // Đăng xuất người dùng
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
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
        setUser(null);
        setUserId(null);
    };

    const contextValue = {
        login, logout,
        isLoggedIn, user, userId, username, isChange, setChange, setInfo, Info
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

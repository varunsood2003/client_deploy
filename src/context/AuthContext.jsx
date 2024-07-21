import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    });

    const updateUser = (data) => {
        setCurrentUser(data);
    };

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("user", JSON.stringify(currentUser));
        } else {
            localStorage.removeItem("user");
        }
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

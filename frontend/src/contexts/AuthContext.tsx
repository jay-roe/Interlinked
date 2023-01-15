import { createContext, useContext, useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    deleteUser,
    signInWithEmailAndPassword,
} from "firebase/auth";
import type { UserCredential } from "firebase/auth";

import auth from "../config/firebase";
import type {User} from "firebase/auth";

interface AuthContextType {
    currentUser: User
    login: (email: string, password: string) => Promise<UserCredential>
    register: (email: string, password: string) => Promise<UserCredential>
    logout: () => Promise<void>
    deleteAccount: () => Promise<void>
}

// Creates a context that will be passed down to all routes, allowing authentication functions to be used
const AuthContext = createContext({currentUser: null, login: null, register: null, logout: null} as AuthContextType);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState<User>();
    const [loading, setLoading] = useState<boolean>(true);

    // Register user with email and password. Passes logic to firebase function
    function register(email: string, password: string) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Login user with email and password. Passes logic to firebase function
    function login(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Logs out of the current user session.
    function logout() {
        return auth.signOut();
    }

    // Deletes user
    function deleteAccount() {
        return deleteUser(auth.currentUser);
    }

    // On first load of the page, prepare an unsubscribe function
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    // The functions passed down to context provider's children
    const value = {
        currentUser,
        login,
        register,
        logout,
        deleteAccount
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
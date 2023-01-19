import { createContext, useContext, useState, useEffect } from "react";
import {
    EmailAuthProvider,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    deleteUser,
    reauthenticateWithCredential,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import type { AuthCredential, UserCredential } from "firebase/auth";

import auth from "../config/firebase";
import type {User} from "firebase/auth";

interface AuthContextType {
    currentUser: User
    login: (email: string, password: string) => Promise<UserCredential>
    loginWithGoogle: () => Promise<UserCredential>
    register: (email: string, password: string) => Promise<UserCredential>
    logout: () => Promise<void>
    deleteAccount: () => Promise<void>
    reauthenticateEmail: (email: string, password: string) => Promise<UserCredential>
    reauthenticateOAuth: (credential: UserCredential) => Promise<UserCredential>
}

// Creates a context that will be passed down to all routes, allowing authentication functions to be used
const AuthContext = createContext({currentUser: null, login: null, loginWithGoogle: null, register: null, logout: null, reauthenticateEmail: null, reauthenticateOAuth: null} as AuthContextType);

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

    // Login user with email and password in popup.
    function loginWithGoogle() {
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
    }

    // Logs out of the current user session.
    function logout() {
        return auth.signOut();
    }

    // Deletes user
    function deleteAccount() {
        return deleteUser(auth.currentUser);
    }

    // Must reobtain credentials when user is doing security risky task (deleting account, changing password/email) 😱
    function reauthenticateEmail(email: string, password: string) {
        const credential = EmailAuthProvider.credential(email, password);
        return reauthenticateWithCredential(auth.currentUser, credential);
    }

    function reauthenticateOAuth(userCredential: UserCredential) {
        const credential = GoogleAuthProvider.credentialFromResult(userCredential);
        return reauthenticateWithCredential(auth.currentUser, credential);
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
        loginWithGoogle,
        register,
        logout,
        deleteAccount,
        reauthenticateEmail,
        reauthenticateOAuth
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
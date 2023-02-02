'use client';

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
import type { UserCredential } from "firebase/auth";

import auth from "../config/firebase";
import type { User as AuthUser } from "firebase/auth";
import type { User } from "../types/User";
import { db } from "../config/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface AuthContextType {
    currentUser: User
    authUser: AuthUser
    login: (email: string, password: string) => Promise<UserCredential>
    loginWithGoogle: () => Promise<UserCredential>
    register: (email: string, password: string) => Promise<UserCredential>
    logout: () => Promise<void>
    deleteAccount: () => Promise<void>
    reauthenticateEmail: (email: string, password: string) => Promise<UserCredential>
    reauthenticateOAuth: (credential: UserCredential) => Promise<UserCredential>
}

// Creates a context that will be passed down to all routes, allowing authentication functions to be used
const AuthContext = createContext({currentUser: null, authUser: null, login: null, loginWithGoogle: null, register: null, logout: null, reauthenticateEmail: null, reauthenticateOAuth: null} as AuthContextType);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    // User data from Firestore database. Use this for most data.
    const [currentUser, setCurrentUser] = useState<User>();

    // User data from Firebase Auth. Use this for email verification or provider data.
    const [authUser, setAuthUser] = useState<AuthUser>();
    const [loading, setLoading] = useState<boolean>(true);

    /**
     * Creates user in Firestore and updates current user state
     */
    async function createUser(credential: UserCredential) {
        // Create a new user document in database using same user id as auth
        const newUser = credential.user;
        const emptyUser: User = {
            awards: [],
            codingLanguages: [],
            connections: [],
            courses: [],
            education: [],
            email: newUser.email,
            experience: [],
            languages: [],
            name: newUser.displayName,
            profilePicture: newUser.photoURL,
            projects: [],
            recommendations: [],
            skills: [],
            volunteering: []
        };
        await setDoc(doc(db.users, newUser.uid), emptyUser);
        setCurrentUser(emptyUser);
    }

    /**
     * Register user with email and password.
     */
    async function register(email: string, password: string) {
        const credential = await createUserWithEmailAndPassword(auth, email, password);

        await createUser(credential);

        return credential;
    }

    /**
     * Login user with email and password. Passes logic to firebase function
     */
    async function login(email: string, password: string) {
        const credential =  await signInWithEmailAndPassword(auth, email, password);

        // Set user as state from database
        const userDoc = await getDoc(doc(db.users, credential.user.uid));
        setCurrentUser(userDoc.data());

        return credential;
    }

    /**
     * Login user with email and password in popup.
     */ 
    async function loginWithGoogle() {
        const googleProvider = new GoogleAuthProvider();
        const credential =  await signInWithPopup(auth, googleProvider);

        // Get user from database
        const userDoc = await getDoc(doc(db.users, credential.user.uid));
        
        // User exists -> set user as state
        if (userDoc.exists()) {
            setCurrentUser(userDoc.data());
        } 
        // User doesn't exist -> create user
        else {
            await createUser(credential);
        }

        return credential;
    }

    /**
     * Logs out of the current user session.
     */
    async function logout() {
        return await auth.signOut();
    }

    /**
     * Deletes user.
     */
    async function deleteAccount() {
        return await deleteUser(auth.currentUser);
    }

    /** 
     * Reauthenticate account with email login.
     * Must reobtain credentials when user is doing security risky task (deleting account, changing password/email) 🔒
     */ 
    async function reauthenticateEmail(email: string, password: string) {
        const credential = EmailAuthProvider.credential(email, password);
        return await reauthenticateWithCredential(auth.currentUser, credential);
    }

    /** 
     * Reauthenticate account with google login.
     * Must reobtain credentials when user is doing security risky task (deleting account) 🔒
     */ 
    async function reauthenticateOAuth(userCredential: UserCredential) {
        const credential = GoogleAuthProvider.credentialFromResult(userCredential);
        return await reauthenticateWithCredential(auth.currentUser, credential);
    }

    // On first load of the page, prepare an unsubscribe function
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setLoading(true);

            setAuthUser(user);

            // User just logged out
            if (!user) {
                setCurrentUser(null);
                setLoading(false);
            }

            // Ensure user data is loaded if user logged in
            else if (!currentUser) {
                getDoc(doc(db.users, user.uid)).then(res => {
                    setCurrentUser(res.data());
                    setLoading(false);
                })
            }
        });

        return unsubscribe;
    }, []);

    // The functions passed down to context provider's children
    const value = {
        currentUser,
        authUser,
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
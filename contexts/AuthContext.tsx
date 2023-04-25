'use client';

import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import type { UserCredential } from 'firebase/auth';

import auth from '../config/firebase';
import type { User as AuthUser } from 'firebase/auth';
import type { User, Admin } from '../types/User';
import { db } from '../config/firestore';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import md5 from 'md5';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import LoadingScreen from '@/components/Loading/Loading';
import NavBar from '@/components/NavBar/NavBar';

interface AuthContextType {
  currentUser: User;
  currentAdmin: Admin;
  authUser: AuthUser;
  login: (email: string, password: string) => Promise<UserCredential>;
  loginWithGoogle: () => Promise<UserCredential>;
  register: (
    email: string,
    password: string,
    company: boolean
  ) => Promise<UserCredential>;
  refresh: () => Promise<User>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  reauthenticateEmail: (
    email: string,
    password: string
  ) => Promise<UserCredential>;
  reauthenticateOAuth: (credential: UserCredential) => Promise<UserCredential>;
}

// Creates a context that will be passed down to all routes, allowing authentication functions to be used
const AuthContext = createContext({
  currentUser: null,
  currentAdmin: null,
  authUser: null,
  login: null,
  loginWithGoogle: null,
  register: null,
  logout: null,
  reauthenticateEmail: null,
  reauthenticateOAuth: null,
} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // Router for redirecting users globally.
  const router = useRouter();
  const locale = useLocale();

  // User data from Firestore database. Use this for most data.
  const [currentUser, setCurrentUser] = useState<User>();
  const [currentAdmin, setCurrentAdmin] = useState<Admin>();

  // User data from Firebase Auth. Use this for email verification or provider data.
  const [authUser, setAuthUser] = useState<AuthUser>();
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * Creates user in Firestore and updates current user state
   */
  async function createUser(newUser: AuthUser, company: boolean = false) {
    // Create a new user document in database using same user id as auth
    const emptyUser: User = {
      awards: [],
      certifications: [],
      codingLanguages: [],
      linkedUserIds: [],
      courses: [],
      education: [],
      email: newUser.email,
      experience: [],
      languages: [],
      name: newUser.displayName || newUser.email.split('@')[0] || '',
      nameCaseInsensitive:
        newUser.displayName?.toLowerCase() ||
        newUser.email.split('@')[0]?.toLowerCase() ||
        '',
      profilePicture:
        newUser.photoURL ||
        `https://www.gravatar.com/avatar/${md5(
          newUser.email.trim().toLowerCase()
        )}?d=identicon&s=160`,
      projects: [],
      recommendations: [],
      skills: [],
      volunteering: [],
      isCompany: company,
    };

    await setDoc(doc(db.users, newUser.uid), emptyUser);

    // Refresh auth user state with signed in user
    setAuthUser(newUser);
    setCurrentUser(emptyUser);

    console.log('new user created. current and auth user updated.', emptyUser);
  }

  /**
   * Register user with email and password.
   */
  async function register(email: string, password: string, company: boolean) {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await createUser(credential.user, company);

    return credential;
  }

  /**
   * Login user with email and password. Passes logic to firebase function
   */
  async function login(email: string, password: string) {
    return await signInWithEmailAndPassword(auth, email, password);
  }

  /**
   * Login user with email and password in popup.
   */
  async function loginWithGoogle() {
    const googleProvider = new GoogleAuthProvider();
    return await signInWithPopup(auth, googleProvider);
  }

  /**
   * Refresh current user from database, and reload auth user from Firebase Authentication.
   */
  async function refresh() {
    // Refresh auth user
    await auth.currentUser.reload();

    // Refresh current user
    if (auth.currentUser) {
      const userDoc = await getDoc(doc(db.users, auth.currentUser.uid));
      if (!userDoc.exists()) {
        await createUser(auth.currentUser);
      } else {
        setCurrentUser(userDoc.data());
      }

      return userDoc.data();
    }
  }

  /**
   * Logs out of the current user session.
   */
  async function logout() {
    router.push('/' + locale + '/');
    await auth.signOut();
  }

  /**
   * Deletes user.
   */
  async function deleteAccount() {
    await deleteDoc(doc(db.users, auth.currentUser.uid));
    // TODO: Delete all subcollections (if any)
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
      console.log('auth state changed triggered!');

      setLoading(true);

      setAuthUser(user);

      // User just logged out
      if (!user) {
        setCurrentUser(null);
        setCurrentAdmin(null);
        setLoading(false);
      }

      // User/Admin logged in
      else if (!currentAdmin && !currentUser) {
        getDoc(doc(db.genericUser, user.uid)).then((res) => {
          if (res.exists()) {
            if (res.get('isAdmin')) {
              // Admin logged in
              setCurrentAdmin(res.data() as Admin);
            } else {
              // User logged in
              setCurrentUser(res.data());
            }
          } else {
            createUser(user);
          }
          setLoading(false);
        });
      }
    });

    return unsubscribe;
  }, []);

  // The functions passed down to context provider's children
  const value = useMemo(
    () => ({
      currentUser,
      currentAdmin,
      authUser,
      login,
      loginWithGoogle,
      register,
      refresh,
      logout,
      deleteAccount,
      reauthenticateEmail,
      reauthenticateOAuth,
    }),
    [currentUser, currentAdmin, authUser]
  );

  // Render loading screen instead of page content while authentication loading
  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <main className="flex min-h-screen flex-col bg-purple-background">
          <NavBar />
          <LoadingScreen />
        </main>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

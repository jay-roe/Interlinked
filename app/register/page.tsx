"use client";

import Link from "next/link";
import styles from './Register.module.css';
import {useState} from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import { FaGoogle } from "react-icons/fa";
import GoogleButton from "@/components/Button/GoogleButton/GoogleButton";

export default function Register() {
    const router = useRouter();
    const { authUser, register, loginWithGoogle } = useAuth();
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        console.log(authUser);
        
        if (authUser) {
            router.push("/");
        }
    }, [authUser, router]);

    async function handleFormSubmit(e: React.MouseEvent) {
        e.preventDefault();

        if (password !== confirmPassword) {
            return alert("Passwords do not match");
        }

        try {
            setLoading(true);
            console.log(register);
            await register(email, password);
            router.push("/profile");
        } catch (err) {
            alert(err.message);
        }

        setLoading(false);
    }

    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-4 text-3xl text-center tracking-tight font-light dark:text-white">
                        Register your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                required
                                className="mb-2 block w-full appearance-none rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                                className="mb-2 block w-full appearance-none rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                        <div>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                                className="mb-2 block w-full appearance-none rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                                placeholder="Confirm Password"
                            />
                        </div>
                    </div>
                    <div>
                        <Button
                            data-testid="register"
                            type="submit"
                            onClick={(event) => handleFormSubmit(event)}
                            disabled={loading}
                            className=" w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-800 hover:bg-sky-900"
                        >
                            Register
                        </Button>
                    </div>
                    <div className={styles.HorizontalSeparator}></div>
                    <div>
                        <GoogleButton onClick={() => loginWithGoogle()}>Register with Google</GoogleButton>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <Link
                                href="/login"
                                className="text-blue-600 hover:underline dark:text-blue-500"
                            >
                                Already have an account? Login
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
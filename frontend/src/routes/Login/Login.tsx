import { StyledLogin } from "./Login.styles";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAuth} from "../../contexts/AuthContext";
import { Button } from "react-bootstrap";
import { HorizontalSeparator } from "../Register/Register.styles";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { authUser, login, loginWithGoogle } = useAuth();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (authUser) {
            navigate("/");
        }
    }, [authUser, navigate]);

    async function handleFormSubmit(e: React.MouseEvent) {
        e.preventDefault();

        try {
            setLoading(true);
            await login(email, password);
            navigate("/");
        } catch (err) {
            console.error(err);
            alert("Failed to login");
        }

        setLoading(false);
    }


    return (
        <StyledLogin className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-4 text-3xl text-center tracking-tight font-light dark:text-white">
                        Login to your account
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
                                className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
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
                                className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>
                    <div>
                        <Button
                            type="submit"
                            onClick={handleFormSubmit}
                            disabled={loading}
                            className=" w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-800 hover:bg-sky-900"
                        >
                            Login
                        </Button>
                    </div>
                    <HorizontalSeparator>OR</HorizontalSeparator>
                    <div>
                        <Button onClick={() => loginWithGoogle()}><FaGoogle /> Login with Google</Button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <Link
                                to="/register"
                                className="text-blue-600 hover:underline dark:text-blue-500"
                            >
                                Don't have an account? Register
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </StyledLogin>
    );
  }
export default Login;

import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import Home from './routes/Home/Home';
import Demo from './routes/Demo/Demo';
import NavBar from './components/NavBar/NavBar';

import {Global} from './index.styles';
import {ProtectedRoute} from "./components/ProtectedRoute/ProtectedRoute";
import Login from "./routes/Login/Login";
import Register from "./routes/Register/Register";
import {AuthProvider} from "./contexts/AuthContext";
import Profile from './routes/Profile/Profile';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <AuthProvider>
        <Global>
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    {/* We may want to move to Switch routes based on changing requirements. */}
                    <Route path="/" element={<Home/>}>
                        <Route
                            path="*"
                            element={
                                <main style={{padding: "1rem"}}>
                                    <p>There's nothing here!</p>
                                </main>
                            }
                        />
                    </Route>
                    <Route
                        path="/demo"
                        element={
                            <ProtectedRoute>
                                <Demo/>
                            </ProtectedRoute>
                        }
                    />

                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route 
                        path="/profile" 
                        element={
                            // <ProtectedRoute>
                                <Profile />
                            // </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </Global>
    </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

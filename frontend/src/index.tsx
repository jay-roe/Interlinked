import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import Home from './routes/Home/Home';
import Demo from './routes/Demo/Demo';
import NavBar from './components/NavBar/NavBar';

import { Global } from './index.styles';

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCndJ1p56QiX3yTzg-tXq_dshjdtCwYYfY",
  authDomain: "interlinked-420e3.firebaseapp.com",
  projectId: "interlinked-420e3",
  storageBucket: "interlinked-420e3.appspot.com",
  messagingSenderId: "415871175145",
  appId: "1:415871175145:web:8710d367357d7fb6e2e378"
};

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Global>
  <BrowserRouter>
    <NavBar/>
    <Routes>
      {/* We may want to move to Switch routes based on changing requirements. */}
      <Route path="/" element={<Home />}>
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Route>
      <Route path="/demo" element={<Demo />} />
    </Routes>
  </BrowserRouter>
  </Global>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

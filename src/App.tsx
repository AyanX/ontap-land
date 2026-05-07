import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home'; 
import FooterComponent from './components/Footer/FooterComponent';
import Navbar from './components/Navbar/Navbar';
import styles from './App.module.css';
import React, { Suspense } from 'react';

//lazy load signup

const LazySignup = React.lazy(() => import('./pages/signup/Signup'));

function SignUpLayout() {
  return (
    <div className={styles.signupLayout}>
      <Navbar />
      <div className={styles.signupContent}>
        <LazySignup />
      </div>
      <FooterComponent />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={
            <Suspense fallback={<div  style={{width: '100%', height: '100svh' , display:"grid", placeItems:"center"           }}>Loading...</div>}>
          <SignUpLayout />
        </Suspense>
        
        
        } 
          
          />
      </Routes>
    </BrowserRouter>
  );
}

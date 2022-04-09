/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import { useSelector } from "react-redux";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Header";
import LandingScreen from "../Landing";
import { LoginScreen, SignUpScreen } from "../Auth";
import HomeScreen from "../Home";
import NoMatchScreen from "../Misc";

function App() {
  const userId = useSelector((state) => state.user.userId);
  const isAuthenticated = userId && userId.length > 0;

  return (
    <div className="h-screen flex flex-col">
      <Router>
        <Header />
        <section className="bg-white text-gray-700 flex-grow">
          <Routes>
            {!isAuthenticated && (
              <Route path="/login" element={<LoginScreen />} />
            )}
            {!isAuthenticated && (
              <Route path="/signup" element={<SignUpScreen />} />
            )}
            <Route path="/user" element={<HomeScreen />} />
            <Route exact path="/" element={<LandingScreen />} />
            <Route path="*" element={<NoMatchScreen />} />
          </Routes>
        </section>
        <footer className="body-font">
          <div className="bg-gray-100 border-t border-gray-300">
            <div className="container mx-auto py-4 px-5">
              <p className="text-gray-500 text-sm text-center">
                © 2022 Abhijit Gupta
              </p>
            </div>
          </div>
        </footer>
      </Router>
    </div>
  );
}

export default App;

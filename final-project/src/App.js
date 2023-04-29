import React from "react";
import {Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Nav, Shop, Admin } from "./components";

const App = () => {
  return (
    <AnimatePresence mode="wait">
      <div>
        <Nav/>
        <main>
          <Routes>
            <Route path="/*" element={<Shop />}/>
            <Route path="/admin" element={<Admin />}/>
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;

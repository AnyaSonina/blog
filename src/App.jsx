import React from "react";
import {Routes, Route} from "react-router-dom"
import AllPosts from "./components/AllPosts";
import OnePost from "./components/OnePost";


function App() {
  return (
    
    <Routes>  
      
        <Route element={<AllPosts/>} path="/" exact/>
        <Route element={<OnePost/>} path="/:slug"/>
     
    </Routes>
    
    
  );
}

export default App;

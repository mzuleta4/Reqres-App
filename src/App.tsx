import React from 'react';
import './App.css';
import MainComponent from "./Components/MainComponent/MainComponent";
import LoginComponent from "./Components/LoginComponent/LoginComponent";
import {useSelector} from "react-redux";

const App: React.FC = () => {
    const token = useSelector((state: any) => state.Auth.logged);
  return (
    <div className="App">
        {token ? <MainComponent/> : <LoginComponent/>}
    </div>
  );
}

export default App;

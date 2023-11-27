

import React from 'react';
import  MainPage  from './pages/MainPage.tsx'
import BasicExample from './components/navbar'
import Colorants from './components/Colorant/Colorant.tsx'
import {BrowserRouter as HashRouter,Route,Routes} from 'react-router-dom'
//import Header from "./Header.tsx";
const App: React.FC = () => {
    return (
        <HashRouter>
            <BasicExample></BasicExample>
            <Routes>
                <Route path="/RIP_frontend/" element={<MainPage/>}/>
                <Route path="/RIP_frontend/colorants/:id" element={<Colorants Name="" Image='' ID_Colorant={0} Description='' Properties='' Link='' Status=''/>}/>
            </Routes>
        </HashRouter>

    );
};

export default App;



import React from 'react';
import  MainPage  from './pages/MainPage.tsx'
import BasicExample from './components/navbar'
import Colorants from './components/Colorant/Colorant.tsx'
import {BrowserRouter as HashRouter,Route,Routes} from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage.tsx';
import AllDyesPage from './pages/AllDyesPage/AllDyes.tsx';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage.tsx';
import BasketPage from './pages/BasketPage/BasketPage.tsx';
const App: React.FC = () => {
    return (
        <HashRouter>
            <BasicExample></BasicExample>
            <Routes>
                <Route path="/RIP_frontend/" element={<MainPage/>}/>
                <Route path="/RIP_frontend/dyes" element={<AllDyesPage />} />
                <Route path="/RIP_frontend/:id" element={<Colorants Name="" Image='' ID_Colorant={0} Description='' Properties='' Link='' Status=''/>}/>
                <Route path="/RIP_frontend/login" element={<LoginPage />} />
                <Route path="/RIP_frontend/registration" element={<RegistrationPage />} />
                <Route path="/RIP_frontend/BasketPage" element={<BasketPage />} />
            </Routes>
        </HashRouter>

    );
};

export default App;
